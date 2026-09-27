"use client";

import React, { useState } from "react";
import { Toast, toast } from "@heroui/react";
import {
  AltArrowLeftIcon,
  ArrowRightIcon,
  BookBookmarkIcon,
  GlobeIcon,
  UsersGroupRoundedIcon,
  AddCircleIcon,
  CloseCircleIcon,
  LinkRoundIcon,
  FileTextIcon,
  CalendarIcon,
  LayersMinimalisticIcon,
  RefreshIcon,
} from "@solar-icons/react/outline";

export const FormularioCrearDocumento: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [ano, setAno] = useState(new Date().getFullYear().toString());
  const [lineaInvestigacion, setLineaInvestigacion] = useState("");
  const [tipoFuente, setTipoFuente] = useState("Artículo científico");
  const [pais, setPais] = useState("Colombia");
  const [categoria, setCategoria] = useState("");
  const [autorInput, setAutorInput] = useState("");
  const [autores, setAutores] = useState<string[]>([]);
  const [paginaWebInput, setPaginaWebInput] = useState("");
  const [paginasWeb, setPaginasWeb] = useState<string[]>([]);
  const [resumen, setResumen] = useState("");
  const [referenciaApa, setReferenciaApa] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Agregar autor
  const agregarAutor = () => {
    const limpio = autorInput.trim();
    if (limpio && !autores.includes(limpio)) {
      setAutores([...autores, limpio]);
      setAutorInput("");
    }
  };

  // Remover autor
  const removerAutor = (nombre: string) => {
    setAutores(autores.filter((a) => a !== nombre));
  };

  // Agregar página web
  const agregarPaginaWeb = () => {
    let limpio = paginaWebInput.trim();
    if (!limpio) return;

    if (!limpio.startsWith("http://") && !limpio.startsWith("https://")) {
      limpio = `https://${limpio}`;
    }

    if (!paginasWeb.includes(limpio)) {
      setPaginasWeb([...paginasWeb, limpio]);
      setPaginaWebInput("");
    }
  };

  // Remover página web
  const removerPaginaWeb = (url: string) => {
    setPaginasWeb(paginasWeb.filter((p) => p !== url));
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim() || !lineaInvestigacion.trim() || !ano.trim() || !pais.trim()) {
      toast.danger("Campos requeridos", {
        description: "Por favor completa el título, línea de investigación, año y país.",
      });
      return;
    }

    setGuardando(true);

    try {
      const resp = await fetch("/api/repositorio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: titulo.trim(),
          ano: ano.trim(),
          lineaInvestigacion: lineaInvestigacion.trim(),
          tipoFuente: tipoFuente.trim(),
          pais: pais.trim(),
          categoria: categoria.trim() || null,
          autores,
          paginasWeb,
          enlaceDocumento: paginasWeb.length > 0 ? paginasWeb[0] : null,
          resumen: resumen.trim() || null,
          referenciaApa: referenciaApa.trim() || null,
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "No se pudo guardar el documento.");
      }

      toast.success("Documento registrado", {
        description: `"${titulo}" se ha agregado exitosamente al repositorio.`,
      });

      setTimeout(() => {
        window.location.href = "/dashboard/contenido-repositorio";
      }, 800);
    } catch (err: any) {
      toast.danger("Error al registrar", {
        description: err.message || "Ocurrió un error inesperado al guardar.",
      });
      setGuardando(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-8 max-w-4xl mx-auto animate-rise">
      <Toast.Provider placement="top" />

      {/* Botón Volver */}
      <div className="flex items-center">
        <a
          href="/dashboard/contenido-repositorio"
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#787774] hover:text-[#0064c1] transition-colors cursor-pointer"
        >
          <AltArrowLeftIcon
            size={16}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          <span>Volver a Contenido Repositorios</span>
        </a>
      </div>

      {/* Encabezado Principal */}
      <header className="flex flex-col gap-2 pb-6 border-b border-black/[0.06]">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]">
          <span className="h-2 w-2 rounded-full bg-[#0064c1]"></span>
          Producción Científica
        </div>

        <h1 className="m-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-tight mix-blend-multiply opacity-95">
          Registrar Nuevo Documento en Repositorio
        </h1>

        <p className="m-0 text-sm text-[#787774] font-medium tracking-tight">
          Agrega artículos, libros, informes o investigaciones al catálogo institucional del Observatorio.
        </p>
      </header>

      {/* Formulario Estructurado con el Design System Oficial */}
      <form onSubmit={manejarSubmit} className="flex flex-col gap-6 w-full">
        {/* Sección 1: Información General */}
        <div className="flex flex-col gap-5 p-6 md:p-8 rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md">
          <div className="flex items-center gap-2 pb-2 border-b border-black/[0.05]">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold">
              1
            </span>
            <span className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">
              Datos Principales
            </span>
          </div>

          {/* Título */}
          <div className="group/field flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              <FileTextIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
              Título del documento / investigación
            </label>
            <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título completo del documento..."
                className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70"
                required
              />
            </div>
          </div>

          {/* Línea de Investigación y Año */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group/field flex flex-col gap-2">
              <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
                <BookBookmarkIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
                Línea de investigación (Tema central)
              </label>
              <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
                <input
                  type="text"
                  value={lineaInvestigacion}
                  onChange={(e) => setLineaInvestigacion(e.target.value)}
                  placeholder="Ej. Migración Latinoamericana..."
                  className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70"
                  required
                />
              </div>
            </div>

            <div className="group/field flex flex-col gap-2">
              <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
                <CalendarIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
                Año de publicación
              </label>
              <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
                <input
                  type="text"
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  placeholder="Ej. 2026"
                  className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70 font-mono"
                  required
                />
              </div>
            </div>
          </div>

          {/* Tipo de Fuente y País */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group/field flex flex-col gap-2">
              <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
                <LayersMinimalisticIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
                Tipo de documento / fuente
              </label>
              <div className="relative w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
                <select
                  value={tipoFuente}
                  onChange={(e) => setTipoFuente(e.target.value)}
                  className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none cursor-pointer appearance-none"
                >
                  <option value="Artículo científico">Artículo científico</option>
                  <option value="Artículo de Investigación">Artículo de Investigación</option>
                  <option value="Libro / Capítulo">Libro / Capítulo</option>
                  <option value="Informe institucional">Informe institucional</option>
                  <option value="Tesis / Disertación">Tesis / Disertación</option>
                  <option value="Tesis Doctoral">Tesis Doctoral</option>
                  <option value="Revista Científica">Revista Científica</option>
                  <option value="Repositorio Institucional">Repositorio Institucional</option>
                  <option value="Documento de trabajo">Documento de trabajo</option>
                  <option value="Conferencia / Ponencia">Conferencia / Ponencia</option>
                </select>
              </div>
            </div>

            <div className="group/field flex flex-col gap-2">
              <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
                <GlobeIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
                País de origen o estudio
              </label>
              <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
                <input
                  type="text"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  placeholder="Ej. Colombia, México, Chile..."
                  className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70"
                  required
                />
              </div>
            </div>
          </div>

          {/* Categoría / Temática */}
          <div className="group/field flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              Categoría temática (Opcional)
            </label>
            <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
              <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Ej. Migración y Fronteras, Derechos Humanos, Energía Renovable..."
                className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70"
              />
            </div>
          </div>
        </div>

        {/* Sección 2: Autores / Investigadores */}
        <div className="flex flex-col gap-5 p-6 md:p-8 rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md">
          <div className="flex items-center gap-2 pb-2 border-b border-black/[0.05]">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold">
              2
            </span>
            <span className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">
              Autores / Investigadores
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="group/field flex-1 w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
                <input
                  type="text"
                  value={autorInput}
                  onChange={(e) => setAutorInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      agregarAutor();
                    }
                  }}
                  placeholder="Nombre y apellidos del autor..."
                  className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70"
                />
              </div>

              <button
                type="button"
                onClick={agregarAutor}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#0064c1] hover:bg-[#0052a3] transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 w-full sm:w-auto"
              >
                <AddCircleIcon size={16} strokeWidth={2} />
                <span>Añadir Autor</span>
              </button>
            </div>

            {/* Chips de Autores */}
            <div className="flex flex-wrap gap-2 min-h-[44px] p-3 rounded-2xl bg-black/[0.02] border border-black/[0.06]">
              {autores.length === 0 ? (
                <span className="text-xs text-[#787774] italic self-center">
                  Sin autores asignados. Escribe el nombre arriba y haz clic en Añadir.
                </span>
              ) : (
                autores.map((autor) => (
                  <span
                    key={autor}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 shadow-2xs text-xs font-medium text-[#0a0a0a]"
                  >
                    <UsersGroupRoundedIcon size={14} className="text-[#0064c1]" />
                    <span>{autor}</span>
                    <button
                      type="button"
                      onClick={() => removerAutor(autor)}
                      className="text-[#787774] hover:text-red-600 transition-colors cursor-pointer ml-0.5"
                      title="Eliminar autor"
                    >
                      <CloseCircleIcon size={14} />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sección 3: Resumen, Páginas Web y Referencia APA */}
        <div className="flex flex-col gap-5 p-6 md:p-8 rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md">
          <div className="flex items-center gap-2 pb-2 border-b border-black/[0.05]">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold">
              3
            </span>
            <span className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">
              Resumen, Páginas Web y Cita APA
            </span>
          </div>

          {/* Resumen */}
          <div className="group/field flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              Resumen / Abstract del documento
            </label>
            <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
              <textarea
                rows={4}
                value={resumen}
                onChange={(e) => setResumen(e.target.value)}
                placeholder="Resumen o sinopsis de la publicación..."
                className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Referencia APA */}
          <div className="group/field flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              Referencia bibliográfica en formato APA
            </label>
            <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
              <textarea
                rows={2}
                value={referenciaApa}
                onChange={(e) => setReferenciaApa(e.target.value)}
                placeholder="Apellido, N. (Año). Título del artículo. Revista..."
                className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70 resize-none font-serif leading-relaxed"
              />
            </div>
          </div>

          {/* Páginas Web Múltiples */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              <GlobeIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
              Páginas web / Enlaces del documento
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="group/field flex-1 w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
                <input
                  type="text"
                  value={paginaWebInput}
                  onChange={(e) => setPaginaWebInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      agregarPaginaWeb();
                    }
                  }}
                  placeholder="https://... o dominio (ej: scielo.org/...)"
                  className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70 font-mono text-xs sm:text-sm"
                />
              </div>

              <button
                type="button"
                onClick={agregarPaginaWeb}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#0064c1] hover:bg-[#0052a3] transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 w-full sm:w-auto"
              >
                <AddCircleIcon size={16} strokeWidth={2} />
                <span>Añadir Enlace</span>
              </button>
            </div>

            {/* Chips de Páginas Web */}
            <div className="flex flex-wrap gap-2 min-h-[44px] p-3 rounded-2xl bg-black/[0.02] border border-black/[0.06]">
              {paginasWeb.length === 0 ? (
                <span className="text-xs text-[#787774] italic self-center">
                  No has añadido páginas web. Puedes añadir varias ingresando la URL y haciendo clic en Añadir Enlace.
                </span>
              ) : (
                paginasWeb.map((paginaUrl) => (
                  <span
                    key={paginaUrl}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 shadow-2xs text-xs font-medium text-[#0064c1] max-w-full font-mono"
                  >
                    <LinkRoundIcon size={13} className="shrink-0" />
                    <span className="truncate max-w-[280px]">{paginaUrl}</span>
                    <button
                      type="button"
                      onClick={() => removerPaginaWeb(paginaUrl)}
                      className="text-[#787774] hover:text-red-600 transition-colors cursor-pointer shrink-0 ml-1"
                      title="Eliminar enlace"
                    >
                      <CloseCircleIcon size={14} />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Botón Submit idéntico a FormularioRegistroRed */}
        <button
          type="submit"
          disabled={guardando}
          className="group relative w-full inline-flex items-center justify-center gap-2 mt-2 px-8 py-4 rounded-full text-white text-base font-semibold tracking-[-0.01em] whitespace-nowrap cursor-pointer overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-[#0064c1] focus-visible:outline-offset-[3px] disabled:opacity-85 disabled:cursor-not-allowed disabled:pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
            boxShadow:
              "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 8px 22px -6px rgba(58,138,244,0.4), 0 6px 32px -2px rgba(120,185,255,0.58)",
            textShadow: "0 1px 2px rgba(18,86,175,0.32)",
          }}
        >
          {guardando ? (
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <RefreshIcon size={20} className="animate-spin text-white" />
              <span>Guardando documento en repositorio...</span>
            </span>
          ) : (
            <span className="relative z-10 flex items-center justify-center gap-2 transition-opacity duration-200">
              <span>Guardar y Registrar Documento</span>
              <ArrowRightIcon
                size={18}
                strokeWidth={2}
                className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              />
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default FormularioCrearDocumento;
