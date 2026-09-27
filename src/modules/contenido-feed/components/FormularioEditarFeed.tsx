"use client";

import React, { useState } from "react";
import { Toast, toast } from "@heroui/react";
import {
  AltArrowLeftIcon,
  ArrowRightIcon,
  NotesIcon,
  VideocameraIcon,
  GalleryIcon,
  ClockCircleIcon,
  LinkRoundIcon,
  LayersMinimalisticIcon,
  EyeIcon,
  RefreshIcon,
} from "@solar-icons/react/outline";
import type { ItemFeedAdmin, TipoFeed } from "../services/contenido-feed.types";

interface Props {
  item: ItemFeedAdmin;
}

export const FormularioEditarFeed: React.FC<Props> = ({ item }) => {
  const [tipo, setTipo] = useState<TipoFeed>(item.tipo);
  const [titulo, setTitulo] = useState(item.titulo);
  const [descripcion, setDescripcion] = useState(item.descripcion);
  const [imagen, setImagen] = useState(item.imagen || "");
  const [fuenteOCanal, setFuenteOCanal] = useState(item.fuenteOCanal || "");
  const [categoria, setCategoria] = useState(item.categoria || "Actualidad");
  const [enlace, setEnlace] = useState(item.enlace);
  const [duracionOLectura, setDuracionOLectura] = useState(
    item.duracionOLectura || (item.tipo === "youtube" ? "Video HD" : "4 min de lectura")
  );
  const [estado, setEstado] = useState<"Publicado" | "Borrador">(item.estado);
  const [guardando, setGuardando] = useState(false);

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !enlace.trim()) {
      toast.danger("Campos requeridos", {
        description: "Por favor completa el título y enlace del contenido.",
      });
      return;
    }

    setGuardando(true);

    try {
      const resp = await fetch(`/api/contenido-feed/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo,
          enlace: enlace.trim(),
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
        throw new Error(errorData.error || "No se pudo actualizar el contenido.");
      }

      toast.success("Feed actualizado exitosamente", {
        description: `Los cambios en "${titulo}" se han guardado correctamente.`,
      });

      setTimeout(() => {
        window.location.href = "/dashboard/contenido-feed";
      }, 1000);
    } catch (err: any) {
      toast.danger("Error al actualizar", {
        description: err.message || "Ocurrió un error inesperado al actualizar.",
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
          Edición de Publicación
        </div>

        <h1 className="m-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-tight mix-blend-multiply opacity-95">
          Editar Contenido del Feed
        </h1>

        <p className="m-0 text-sm text-[#787774] font-medium tracking-tight">
          Actualiza los datos, portada o visibilidad del contenido en el observatorio.
        </p>
      </header>

      {/* Formulario Estructurado con el Design System de Registro Red */}
      <form onSubmit={manejarSubmit} className="flex flex-col gap-6 w-full">
        {/* Sección 1: Tipo y Enlace */}
        <div className="flex flex-col gap-4 p-6 md:p-8 rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md">
          <div className="flex items-center gap-2 pb-2 border-b border-black/[0.05]">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold">
              1
            </span>
            <span className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">
              Tipo y Enlace Web
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

          <div className="group/field flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              <LinkRoundIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
              URL del enlace
            </label>
            <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
              <input
                type="url"
                value={enlace}
                onChange={(e) => setEnlace(e.target.value)}
                placeholder="https://..."
                className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70 font-mono text-xs sm:text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Sección 2: Metadatos Principales */}
        <div className="flex flex-col gap-4 p-6 md:p-8 rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md">
          <div className="flex items-center gap-2 pb-2 border-b border-black/[0.05]">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold">
              2
            </span>
            <span className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">
              Detalles de Publicación
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
                placeholder="Título del contenido..."
                className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70"
                required
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="group/field flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              Descripción o resumen
            </label>
            <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
              <textarea
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Resumen del contenido..."
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
                  placeholder="Ej. El Tiempo / Canal Institucional"
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
              Portada y Visibilidad
            </span>
          </div>

          {/* URL Imagen Portada */}
          <div className="group/field flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]">
              <GalleryIcon size={18} strokeWidth={1.5} className="text-[#787774]" />
              URL de imagen de portada / miniatura
            </label>
            <div className="w-full rounded-2xl border border-black/10 bg-white hover:border-black/20 focus-within:border-[#259ce6] focus-within:ring-4 focus-within:ring-[#259ce6]/10 transition-colors duration-200 ease-out">
              <input
                type="url"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                placeholder="https://..."
                className="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70 font-mono text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Previsualización rápida de la imagen */}
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
              <span>Guardando cambios...</span>
            </span>
          ) : (
            <span className="relative z-10 flex items-center justify-center gap-2 transition-opacity duration-200">
              <span>Guardar Cambios</span>
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

export default FormularioEditarFeed;
