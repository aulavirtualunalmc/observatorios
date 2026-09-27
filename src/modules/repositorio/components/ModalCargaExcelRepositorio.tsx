"use client";

import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import * as XLSX from "xlsx";
import {
  UploadTrackIcon,
  DocumentAddIcon,
  CloseCircleIcon,
  CheckCircleIcon,
  DangerTriangleIcon,
  FileTextIcon,
  DownloadIcon,
  BookBookmarkIcon,
  GlobeIcon,
  LinkRoundIcon,
  RefreshIcon,
} from "@solar-icons/react/outline";
import { toast } from "@heroui/react";

interface Props {
  abierto: boolean;
  alCerrar: () => void;
  alCompletar: () => void;
}

interface FilaExcelMapeada {
  titulo: string;
  ano: string;
  tipoDocumento: string;
  tipoFuente: string;
  autores: string[];
  pais: string;
  lineaInvestigacion: string;
  resumen?: string;
  referenciaApa?: string;
  enlaceAcceso?: string;
}

export const ModalCargaExcelRepositorio: React.FC<Props> = ({
  abierto,
  alCerrar,
  alCompletar,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [filasMapeadas, setFilasMapeadas] = useState<FilaExcelMapeada[]>([]);
  const [erroresParseo, setErroresParseo] = useState<string[]>([]);
  const [procesandoArchivo, setProcesandoArchivo] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [arrastrando, setArrastrando] = useState(false);

  if (!abierto) return null;

  // Limpiar estado
  const limpiar = () => {
    setArchivo(null);
    setFilasMapeadas([]);
    setErroresParseo([]);
    setProcesandoArchivo(false);
    setSubiendo(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const cerrarModal = () => {
    if (subiendo) return;
    limpiar();
    alCerrar();
  };

  // Procesar archivo Excel/CSV con XLSX
  const procesarArchivoExcel = async (archivoSeleccionado: File) => {
    setProcesandoArchivo(true);
    setErroresParseo([]);
    setArchivo(archivoSeleccionado);

    try {
      const buffer = await archivoSeleccionado.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const primerSheetName = workbook.SheetNames[0];

      if (!primerSheetName) {
        throw new Error("El archivo Excel no contiene ninguna hoja válida.");
      }

      const worksheet = workbook.Sheets[primerSheetName];
      const datosRaw: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      if (!datosRaw || datosRaw.length === 0) {
        throw new Error("El archivo Excel está vacío o no contiene filas con datos.");
      }

      const filasProcesadas: FilaExcelMapeada[] = [];
      const errores: string[] = [];

      datosRaw.forEach((row, index) => {
        const numFila = index + 2; // Considerando cabecera en fila 1

        // Buscar claves de forma flexible
        const encontrarValor = (posiblesNombres: string[]) => {
          for (const nom of posiblesNombres) {
            const encontrado = Object.keys(row).find(
              (k) => k.trim().toLowerCase() === nom.trim().toLowerCase()
            );
            if (encontrado !== undefined && row[encontrado] !== "") {
              return String(row[encontrado]).trim();
            }
          }
          return "";
        };

        const titulo = encontrarValor(["Título", "Titulo", "Title", "Nombre", "Documento"]);
        const ano = encontrarValor(["Año", "Ano", "Year", "Fecha"]);
        const tipoDocumento = encontrarValor([
          "Tipo de documento",
          "Tipo documento",
          "Categoria",
          "Categoría",
          "Tipo",
        ]);
        const tipoFuente = encontrarValor([
          "Tipo de fuente",
          "Tipo fuente",
          "Fuente",
          "Source",
          "Revista/Repositorio",
        ]);
        const autoresStr = encontrarValor(["Autores", "Autor", "Authors", "Author"]);
        const pais = encontrarValor(["País", "Pais", "Country", "Nación"]);
        const temaCentral = encontrarValor([
          "Tema central",
          "Tema",
          "Línea de investigación",
          "Linea de investigacion",
          "Línea",
          "Linea",
        ]);
        const resumen = encontrarValor(["Resumen", "Abstract", "Descripción", "Descripcion"]);
        const referenciaApa = encontrarValor(["Referencia APA", "Referencia apa", "Referencia", "APA"]);
        const enlaceAcceso = encontrarValor([
          "Enlace de acceso",
          "Enlace",
          "Link",
          "URL",
          "Página web",
          "Pagina web",
        ]);

        if (!titulo) {
          errores.push(`Fila ${numFila}: Se omitió porque no contiene un título.`);
          return;
        }

        // Parsear autores: dividir por punto y coma, salto de línea o coma
        let autoresArray: string[] = [];
        if (autoresStr) {
          if (autoresStr.includes(";")) {
            autoresArray = autoresStr.split(";").map((a) => a.trim()).filter(Boolean);
          } else if (autoresStr.includes("\n")) {
            autoresArray = autoresStr.split("\n").map((a) => a.trim()).filter(Boolean);
          } else {
            autoresArray = autoresStr.split(",").map((a) => a.trim()).filter(Boolean);
          }
        }

        filasProcesadas.push({
          titulo,
          ano: ano || String(new Date().getFullYear()),
          tipoDocumento: tipoDocumento || "Artículo de Investigación",
          tipoFuente: tipoFuente || "Repositorio Institucional",
          autores: autoresArray.length > 0 ? autoresArray : ["Autor no especificado"],
          pais: pais || "Internacional",
          lineaInvestigacion: temaCentral || "General",
          resumen: resumen || undefined,
          referenciaApa: referenciaApa || undefined,
          enlaceAcceso: enlaceAcceso || undefined,
        });
      });

      if (filasProcesadas.length === 0) {
        throw new Error(
          "No se pudieron extraer documentos válidos. Verifica que la columna 'Título' exista en la cabecera."
        );
      }

      setFilasMapeadas(filasProcesadas);
      setErroresParseo(errores);
    } catch (err: any) {
      toast.danger("Error al leer el archivo", {
        description: err.message || "No se pudo interpretar el archivo Excel.",
      });
      limpiar();
    } finally {
      setProcesandoArchivo(false);
    }
  };

  // Manejar selección por input
  const manejarCambioArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      procesarArchivoExcel(file);
    }
  };

  // Manejar drag & drop
  const manejarDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setArrastrando(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      procesarArchivoExcel(file);
    }
  };

  // Descargar Plantilla Excel vacía (solo encabezados de columnas)
  const descargarPlantilla = () => {
    const encabezados = [
      [
        "Año",
        "Tipo de documento",
        "Tipo de fuente",
        "Título",
        "Autores",
        "País",
        "Tema central",
        "Resumen",
        "Referencia APA",
        "Enlace de acceso",
      ],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(encabezados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Documentos_Repositorio");

    // Ajustar anchos de columnas
    worksheet["!cols"] = [
      { wch: 10 }, // Año
      { wch: 24 }, // Tipo de documento
      { wch: 26 }, // Tipo de fuente
      { wch: 50 }, // Título
      { wch: 40 }, // Autores
      { wch: 18 }, // País
      { wch: 45 }, // Tema central
      { wch: 55 }, // Resumen
      { wch: 50 }, // Referencia APA
      { wch: 40 }, // Enlace de acceso
    ];

    XLSX.writeFile(workbook, "Plantilla_Carga_Repositorio.xlsx");
  };

  // Enviar datos al backend
  const ejecutarCargaMasiva = async () => {
    if (filasMapeadas.length === 0) return;
    setSubiendo(true);

    try {
      const payload = filasMapeadas.map((f) => ({
        titulo: f.titulo,
        ano: f.ano,
        categoria: f.tipoDocumento,
        tipoFuente: f.tipoFuente,
        autores: f.autores,
        pais: f.pais,
        lineaInvestigacion: f.lineaInvestigacion,
        resumen: f.resumen,
        referenciaApa: f.referenciaApa,
        enlaceDocumento: f.enlaceAcceso,
        paginasWeb: f.enlaceAcceso ? [f.enlaceAcceso] : [],
      }));

      const resp = await fetch("/api/repositorio/masivo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentos: payload }),
      });

      const resultado = await resp.json();

      if (!resp.ok) {
        throw new Error(resultado.error || "Ocurrió un error al procesar la carga masiva.");
      }

      toast.success("¡Carga exitosa!", {
        description: resultado.mensaje || `Se cargaron ${resultado.creados} documentos correctamente.`,
      });

      limpiar();
      alCompletar();
      alCerrar();
    } catch (err: any) {
      toast.danger("Error en la carga masiva", {
        description: err.message || "No se pudieron insertar los registros.",
      });
    } finally {
      setSubiendo(false);
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-rise"
      onClick={(e) => {
        if (e.target === e.currentTarget && !subiendo) cerrarModal();
      }}
    >
      <div className="flex flex-col max-w-3xl w-full max-h-[90vh] bg-white rounded-[28px] border border-black/[0.08] shadow-[0_24px_60px_-15px_rgba(9,60,120,0.3)] overflow-hidden">
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] bg-gradient-to-r from-sky-50/50 via-white to-white">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1]">
              <UploadTrackIcon size={22} strokeWidth={2} />
            </span>
            <div className="flex flex-col">
              <h2 className="m-0 text-base font-bold text-[#0a0a0a] tracking-tight">
                Carga Masiva de Documentos por Excel
              </h2>
              <span className="text-xs text-[#787774] font-medium">
                Soporta hasta 500 registros simultáneos (.xlsx, .xls, .csv) de forma ultrarrápida.
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={subiendo}
            onClick={cerrarModal}
            className="grid h-8 w-8 place-items-center rounded-full text-[#787774] hover:text-[#0a0a0a] hover:bg-black/[0.05] transition-colors cursor-pointer"
          >
            <CloseCircleIcon size={18} />
          </button>
        </div>

        {/* Cuerpo del Modal con Scroll */}
        <div className="flex flex-col gap-5 p-6 overflow-y-auto custom-scrollbar flex-1">
          {/* Zona de Drop o Carga */}
          {!archivo ? (
            <div className="flex flex-col gap-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setArrastrando(true);
                }}
                onDragLeave={() => setArrastrando(false)}
                onDrop={manejarDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                  arrastrando
                    ? "border-[#0064c1] bg-[#0064c1]/[0.04] scale-[0.99]"
                    : "border-black/15 bg-black/[0.01] hover:border-[#0064c1]/50 hover:bg-[#0064c1]/[0.02]"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={manejarCambioArchivo}
                  accept=".xlsx, .xls, .csv"
                  className="hidden"
                />

                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1]">
                  {procesandoArchivo ? (
                    <RefreshIcon size={28} className="animate-spin text-[#0064c1]" />
                  ) : (
                    <DocumentAddIcon size={28} strokeWidth={1.8} />
                  )}
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-sm font-bold text-[#0a0a0a]">
                    {procesandoArchivo
                      ? "Procesando archivo..."
                      : "Arrastra y suelta tu archivo Excel aquí o haz clic para examinar"}
                  </span>
                  <p className="text-xs text-[#787774] max-w-md m-0 leading-relaxed">
                    Acepta formatos <strong>.XLSX</strong>, <strong>.XLS</strong> y <strong>.CSV</strong>. Compara automáticamente las columnas de Año, Tipo de documento, Tipo de fuente, Título, Autores, País, Tema central, Resumen, Referencia APA y Enlace.
                  </p>
                </div>
              </div>

              {/* Botón para descargar plantilla de referencia */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-sky-500/[0.06] border border-sky-500/15">
                <div className="flex items-center gap-2.5">
                  <FileTextIcon size={18} className="text-[#0064c1] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0a0a0a]">
                      ¿No tienes el formato exacto?
                    </span>
                    <span className="text-[0.72rem] text-[#787774]">
                      Descarga nuestra plantilla oficial con las columnas configuradas.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={descargarPlantilla}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#0064c1] bg-white border border-[#0064c1]/20 hover:bg-[#0064c1] hover:text-white transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <DownloadIcon size={14} strokeWidth={2} />
                  <span>Descargar Plantilla</span>
                </button>
              </div>
            </div>
          ) : (
            /* Vista Previa del Archivo y Registros Detectados */
            <div className="flex flex-col gap-4">
              {/* Tarjeta de Resumen del Archivo */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0064c1] text-white">
                    <FileTextIcon size={20} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0a0a0a] truncate max-w-sm">
                      {archivo.name}
                    </span>
                    <span className="text-[0.7rem] text-[#787774]">
                      {(archivo.size / 1024).toFixed(1)} KB •{" "}
                      <strong className="text-[#0064c1] font-mono">
                        {filasMapeadas.length} documentos válidos
                      </strong>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={subiendo}
                  onClick={limpiar}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#787774] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Cambiar archivo
                </button>
              </div>

              {/* Advertencias o Errores de Filas Omitidas */}
              {erroresParseo.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <DangerTriangleIcon size={14} className="text-amber-600" />
                    <span>Se omitieron {erroresParseo.length} filas sin título requerido</span>
                  </div>
                  <ul className="list-disc list-inside text-[0.7rem] text-amber-800 m-0 pl-1 max-h-16 overflow-y-auto">
                    {erroresParseo.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Previsualización de Registros a Insertar */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">
                    Muestra de registros listos para subir ({filasMapeadas.length})
                  </span>
                  <span className="text-[0.7rem] text-[#787774]">
                    Mostrando los primeros 5 de {filasMapeadas.length}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                  {filasMapeadas.slice(0, 5).map((fila, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.06] flex flex-col gap-1.5 hover:bg-black/[0.03] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-xs font-bold text-[#0a0a0a] leading-snug line-clamp-1">
                          {idx + 1}. {fila.titulo}
                        </span>
                        <span className="shrink-0 text-[0.66rem] font-bold font-mono px-2 py-0.5 rounded-full bg-[#0064c1]/10 text-[#0064c1]">
                          {fila.ano}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[0.68rem] text-[#787774]">
                        <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-black/5 font-semibold text-[#0a0a0a]">
                          <BookBookmarkIcon size={11} className="text-[#0064c1]" />
                          {fila.tipoFuente}
                        </span>

                        <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-black/5">
                          <GlobeIcon size={11} />
                          {fila.pais}
                        </span>

                        <span className="bg-white px-2 py-0.5 rounded-md border border-black/5 truncate max-w-[200px]">
                          Autores: {fila.autores.join(", ")}
                        </span>

                        {fila.enlaceAcceso && (
                          <span className="inline-flex items-center gap-1 text-[#0064c1] font-mono truncate max-w-[180px]">
                            <LinkRoundIcon size={11} />
                            {fila.enlaceAcceso}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pie del Modal con Acciones */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-black/[0.06] bg-black/[0.01]">
          <span className="text-xs text-[#787774] font-medium">
            {filasMapeadas.length > 0
              ? `${filasMapeadas.length} documentos listos para integrarse.`
              : "Selecciona o suelta tu archivo para comenzar."}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={subiendo}
              onClick={cerrarModal}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            {filasMapeadas.length > 0 && (
              <button
                type="button"
                disabled={subiendo}
                onClick={ejecutarCargaMasiva}
                className="group/btn relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm disabled:opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
                  boxShadow:
                    "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)",
                }}
              >
                {subiendo ? (
                  <>
                    <RefreshIcon size={15} className="animate-spin relative z-10" />
                    <span className="relative z-10">Cargando {filasMapeadas.length} documentos...</span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon size={15} strokeWidth={2} className="relative z-10" />
                    <span className="relative z-10">Subir {filasMapeadas.length} a la plataforma</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalCargaExcelRepositorio;
