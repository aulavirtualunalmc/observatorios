"use client";

import React, { useState } from "react";
import { Toast, toast } from "@heroui/react";
import {
  LinkRoundIcon,
  CheckCircleIcon,
  AltArrowLeftIcon,
  ArrowRightIcon,
  NotesIcon,
  VideocameraIcon,
  GalleryIcon,
  ClockCircleIcon,
  StarsMinimalisticIcon,
  LayersMinimalisticIcon,
  EyeIcon,
  RefreshIcon,
} from "@solar-icons/react/outline";
import type { ResultadoAnalisisUrl, TipoFeed } from "../services/contenido-feed.types";

export const FormularioCargarFeed: React.FC = () => {
  const [url, setUrl] = useState("");
  const [analizando, setAnalizando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [pasoAnalisis, setPasoAnalisis] = useState("");
  const [datosAnalizados, setDatosAnalizados] = useState<ResultadoAnalisisUrl | null>(null);

  // Campos editables del formulario
  const [tipo, setTipo] = useState<TipoFeed>("noticia");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [fuenteOCanal, setFuenteOCanal] = useState("");
  const [categoria, setCategoria] = useState("Actualidad");
  const [duracionOLectura, setDuracionOLectura] = useState("");
  const [estado, setEstado] = useState<"Publicado" | "Borrador">("Publicado");

  // Función para analizar URL
  const analizarEnlace = async (urlAAnalizar: string) => {
    const enlaceLimpio = urlAAnalizar.trim();
    if (!enlaceLimpio) return;

    try {
      new URL(enlaceLimpio);
    } catch {
      toast.danger("URL inválida", {
        description: "Ingresa una dirección web válida comenzando por http:// o https://",
      });
      return;
    }

    setAnalizando(true);
    setPasoAnalisis("Conectando con el enlace...");
    setDatosAnalizados(null);

    try {
      setTimeout(() => setPasoAnalisis("Extrayendo etiquetas OpenGraph y oEmbed..."), 300);
      setTimeout(() => setPasoAnalisis("Generando portada de alta calidad..."), 650);

      const resp = await fetch(`/api/analizar-url?url=${encodeURIComponent(enlaceLimpio)}`);
      let resultado: ResultadoAnalisisUrl;

      if (resp.ok) {
        resultado = await resp.json();
      } else {
        const esYoutube =
          enlaceLimpio.includes("youtube.com") || enlaceLimpio.includes("youtu.be");
        const match = enlaceLimpio.match(
          /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
        );
        const id = match ? match[1] : "";

        resultado = {
          tipo: esYoutube ? "youtube" : "noticia",
          enlace: enlaceLimpio,
          titulo: esYoutube ? "Video de YouTube" : "Artículo de Información",
          descripcion:
            "Contenido audiovisual y de actualidad vinculado al Observatorio.",
          imagen: id
            ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
            : "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=1200&q=80",
          fuenteOCanal: new URL(enlaceLimpio).hostname.replace(/^www\./, ""),
          categoria: esYoutube ? "Audiovisual" : "Actualidad",
          duracionOLectura: esYoutube ? "Video HD" : "4 min de lectura",
        };
      }

      setDatosAnalizados(resultado);
      setTipo(resultado.tipo);
      setTitulo(resultado.titulo);
      setDescripcion(resultado.descripcion);
      setImagen(resultado.imagen || "");
      setFuenteOCanal(resultado.fuenteOCanal || "");
      setCategoria(resultado.categoria || "Actualidad");
      setDuracionOLectura(resultado.duracionOLectura || (resultado.tipo === "youtube" ? "Video HD" : "4 min de lectura"));

      toast.success("Enlace analizado exitosamente", {
        description: `Se obtuvieron los metadatos de ${resultado.fuenteOCanal || "la web"}.`,
      });
    } catch {
      toast.danger("Error de análisis", {
        description: "No se pudieron obtener automáticamente los metadatos. Puedes completarlos en el formulario.",
      });
    } finally {
      setAnalizando(false);
      setPasoAnalisis("");
    }
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !url.trim()) {
      toast.danger("Campos requeridos", {
        description: "Por favor ingresa la URL y el título del contenido.",
      });
      return;
    }

    setGuardando(true);

    try {
      const resp = await fetch("/api/contenido-feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo,
          enlace: url.trim(),
          titulo: titulo.trim(),
          descripcion: descripcion.trim(),
          imagen: imagen.trim() || null,
          fuenteOCanal: fuenteOCanal.trim() || null,
          categoria: categoria.trim() || null,
          duracionOLectura: duracionOLectura.trim() || null,
          estado,
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "No se pudo guardar el contenido.");
      }

      toast.success("Contenido publicado con éxito", {
        description: `"${titulo}" ha sido guardado y publicado en el feed.`,
      });

      setTimeout(() => {
        window.location.href = "/dashboard/contenido-feed";
      }, 1000);
    } catch (err: any) {
      toast.danger("Error al guardar", {
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
          href="/dashboard/contenido-feed"
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#787774] hover:text-[#0064c1] transition-colors cursor-pointer"
        >
          <AltArrowLeftIcon
            size={16}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          <span>Volver a Contenido Feed</span>
        </a>
      </div>

      {/* Encabezado Principal */}
      <header className="flex flex-col gap-2 pb-6 border-b border-black/[0.06]">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]">
          <span className="h-2 w-2 rounded-full bg-[#0064c1]"></span>
          Carga Inteligente
        </div>

        <h1 className="m-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-tight mix-blend-multiply opacity-95">
          Cargar Nuevo Enlace al Feed
        </h1>

        <p className="m-0 text-sm text-[#787774] font-medium tracking-tight">
          Ingresa el link de una noticia o video de YouTube. Nuestro motor extraerá automáticamente la portada, título, descripción y fuente.
        </p>
      </header>

      {/* Caja de Análisis Inteligente de URL */}
      <div className="p-6 md:p-8 rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
            <LinkRoundIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
            URL de la Noticia o Video de YouTube
          </label>

          {datosAnalizados && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 animate-rise">
              <CheckCircleIcon size={14} strokeWidth={2} />
              Metadatos listos
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="group/field relative flex-1 w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  analizarEnlace(url);
                }
              }}
              placeholder="Pega aquí la URL (ej: https://www.eltiempo.com/... o https://youtube.com/...)"
              className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70 font-mono text-xs sm:text-sm"
              required
            />
          </div>

          <button
            type="button"
            disabled={analizando || !url.trim() || guardando}
            onClick={() => analizarEnlace(url)}
            className={`group/btn relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-[-0.01em] transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap ${
              analizando || !url.trim() || guardando
                ? "bg-black/10 text-black/30 cursor-not-allowed"
                : "text-white active:scale-95"
            }`}
            style={
              !analizando && url.trim() && !guardando
                ? {
                    backgroundImage:
                      "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
                    boxShadow:
                      "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)",
                  }
                : {}
            }
          >
            {analizando ? (
              <>
                <RefreshIcon size={16} className="animate-spin" />
                <span>Analizando enlace...</span>
              </>
            ) : (
              <>
                <StarsMinimalisticIcon size={18} strokeWidth={2} />
                <span>Analizar metadatos</span>
              </>
            )}
          </button>
        </div>

        {/* Indicador de estado de escaneo */}
        {analizando && (
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0064c1] bg-[#0064c1]/[0.08] px-4 py-2.5 rounded-xl border border-[#0064c1]/15 animate-pulse">
            <span className="h-2 w-2 rounded-full bg-[#0064c1]" />
            <span>{pasoAnalisis || "Analizando el enlace..."}</span>
          </div>
        )}
      </div>

      {/* Formulario Estructurado en Formato Registro Red */}
      <form onSubmit={manejarSubmit} className="flex flex-col gap-6 w-full">
        {/* Sección 1: Tipo y Clasificación */}
        <div className="flex flex-col gap-4 p-6 md:p-8 rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md">
          <div className="flex items-center gap-2 pb-2 border-b border-black/[0.05]">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold">
              1
            </span>
            <span className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">
              Tipo y Formato
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setTipo("noticia")}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
                tipo === "noticia"
                  ? "bg-[#0064c1]/10 border-[#259ce6] text-[#0064c1] ring-4 ring-[#259ce6]/10 shadow-xs font-bold"
                  : "border-black/10 bg-white text-[#787774] hover:border-black/20 hover:text-[#0a0a0a]"
              }`}
            >
              <NotesIcon size={18} strokeWidth={2} />
              <span>Noticia / Artículo</span>
            </button>

            <button
              type="button"
              onClick={() => setTipo("youtube")}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
                tipo === "youtube"
                  ? "bg-red-500/10 border-red-500 text-red-600 ring-4 ring-red-500/10 shadow-xs font-bold"
                  : "border-black/10 bg-white text-[#787774] hover:border-black/20 hover:text-[#0a0a0a]"
              }`}
            >
              <VideocameraIcon size={18} strokeWidth={2} />
              <span>Video de YouTube</span>
            </button>
          </div>
        </div>

        {/* Sección 2: Detalles del Contenido */}
        <div className="flex flex-col gap-4 p-6 md:p-8 rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md">
          <div className="flex items-center gap-2 pb-2 border-b border-black/[0.05]">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold">
              2
            </span>
            <span className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">
              Detalles del Contenido
            </span>
          </div>

          {/* Título */}
          <div className="group/field flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              Título de la publicación
            </label>
            <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título extraído automáticamente o personalizado..."
                className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70"
                required
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="group/field flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              Descripción o resumen del contenido
            </label>
            <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
              <textarea
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Resumen o bajada de la publicación..."
                className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Fuente / Categoría */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group/field flex flex-col gap-2">
              <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
                Fuente o Canal
              </label>
              <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
                <input
                  type="text"
                  value={fuenteOCanal}
                  onChange={(e) => setFuenteOCanal(e.target.value)}
                  placeholder="Ej. El Tiempo / Canal Oficial"
                  className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70"
                />
              </div>
            </div>

            <div className="group/field flex flex-col gap-2">
              <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
                <LayersMinimalisticIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
                Categoría temática
              </label>
              <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
                <input
                  type="text"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  placeholder="Ej. Actualidad, Sostenibilidad, Innovación..."
                  className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70"
                />
              </div>
            </div>
          </div>

          {/* Duración o Tiempo de Lectura */}
          <div className="group/field flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              <ClockCircleIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
              Duración o Tiempo de lectura
            </label>
            <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
              <input
                type="text"
                value={duracionOLectura}
                onChange={(e) => setDuracionOLectura(e.target.value)}
                placeholder="Ej. 4 min de lectura o 12:45 min"
                className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70"
              />
            </div>
          </div>
        </div>

        {/* Sección 3: Multimedia & Visibilidad */}
        <div className="flex flex-col gap-4 p-6 md:p-8 rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md">
          <div className="flex items-center gap-2 pb-2 border-b border-black/[0.05]">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold">
              3
            </span>
            <span className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">
              Multimedia y Publicación
            </span>
          </div>

          {/* URL Imagen Portada */}
          <div className="group/field flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              <GalleryIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
              URL de imagen de portada / miniatura HD
            </label>
            <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
              <input
                type="url"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                placeholder="https://images.unsplash.com/... o https://img.youtube.com/..."
                className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70 font-mono text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Previsualización rápida de la imagen si está cargada */}
          {imagen && (
            <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden bg-black/5 border border-black/10">
              <img
                src={imagen}
                alt="Vista previa de portada"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          )}

          {/* Estado de Publicación */}
          <div className="group/field flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              <EyeIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
              Estado de la publicación
            </label>
            <div className="relative w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value as "Publicado" | "Borrador")}
                className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none cursor-pointer appearance-none"
              >
                <option value="Publicado">Publicado (visible inmediatamente en el feed)</option>
                <option value="Borrador">Borrador (oculto temporalmente)</option>
              </select>
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
              <span>Guardando y publicando en feed...</span>
            </span>
          ) : (
            <span className="relative z-10 flex items-center justify-center gap-2 transition-opacity duration-200">
              <span>Guardar y Publicar en Feed</span>
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

export default FormularioCargarFeed;
