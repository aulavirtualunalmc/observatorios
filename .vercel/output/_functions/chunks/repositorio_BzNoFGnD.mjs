import { E as maybeRenderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { r as renderScript, t as $$SkyShader } from "./SkyShader_DL8DbueI.mjs";
import { t as ServicioRepositorio } from "./repositorio.service_B7J6HIr8.mjs";
import { useEffect, useMemo, useState } from "react";
import { AddCircleIcon, AddSquareIcon, AltArrowDownIcon, AltArrowLeftIcon, AltArrowRightIcon, ArrowRightIcon, BookBookmarkIcon, CloseCircleIcon, DangerTriangleIcon, FileTextIcon, GlobeIcon, InboxIcon, LayersMinimalisticIcon, LibraryIcon, LikeIcon, LinkRoundIcon, Pen2Icon, RefreshIcon, RoundedMagnifierZoomInIcon, StarsMinimalisticIcon, TrashBinMinimalisticIcon, UsersGroupRoundedIcon } from "@solar-icons/react/outline";
import { Checkbox, Table, Toast, toast } from "@heroui/react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { createPortal } from "react-dom";
//#region src/modules/repositorio/components/CardDocumentoRepositorio.astro
createAstro("https://astro.build");
var $$CardDocumentoRepositorio = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CardDocumentoRepositorio;
	const { documento } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<article class="group/card relative flex flex-col justify-between rounded-[28px] p-6 bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_24px_50px_-14px_rgba(9,60,120,0.2)]"${addAttribute(documento.id, "data-doc-id")}><!-- Encabezado de la Card: Línea de investigación, Categoría y Año --><div class="flex items-center justify-between gap-2 pb-3.5 border-b border-black/[0.05]"><div class="flex items-center gap-1.5 min-w-0 flex-wrap"><span class="inline-flex items-center gap-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] truncate">${documento.lineaInvestigacion}</span>${documento.categoria && renderTemplate`<span class="inline-flex items-center text-[0.66rem] font-bold text-[#787774] bg-black/[0.04] px-2 py-0.5 rounded-full truncate max-w-[130px]">${documento.categoria}</span>`}</div><span class="font-mono text-[0.72rem] font-bold text-[#0064c1] bg-[#0064c1]/10 px-2.5 py-0.5 rounded-full border border-[#0064c1]/20 shrink-0">${documento.ano}</span></div><!-- Contenido: Título, Metadatos y Autores --><div class="flex flex-col gap-4 my-4"><!-- Título principal --><h3 class="m-0 text-base md:text-[1.08rem] font-bold text-[#0a0a0a] tracking-tight leading-snug group-hover/card:text-[#0064c1] transition-colors duration-300 line-clamp-3">${documento.titulo}</h3><!-- Metadatos clave: Tipo de fuente y País --><div class="grid grid-cols-2 gap-3 py-2 px-3 rounded-2xl bg-black/[0.02] border border-black/[0.04]"><div class="flex flex-col gap-0.5 min-w-0"><span class="text-[0.68rem] font-medium text-[#787774]">Tipo de fuente</span><span class="text-xs font-bold text-[#0a0a0a] truncate">${documento.tipoFuente}</span></div><div class="flex flex-col gap-0.5 min-w-0"><span class="text-[0.68rem] font-medium text-[#787774]">País</span><span class="text-xs font-bold text-[#0a0a0a] truncate">${documento.pais}</span></div></div><!-- Autores --><div class="flex flex-col gap-1"><span class="text-[0.68rem] font-medium text-[#787774]">Autores</span><p class="m-0 text-xs text-[#2f3437] font-medium leading-relaxed line-clamp-2">${documento.autores.join(", ")}</p></div></div><!-- Footer de la Card: Botón Consultar Documento + Botón Like sin contador --><div class="pt-3.5 border-t border-black/[0.06] mt-auto flex items-center gap-2.5"><a${addAttribute(`/dashboard/repositorio/${documento.id}`, "href")} class="group/btn relative flex-1 inline-flex items-center justify-center gap-2 h-10 px-4 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);"><span class="relative z-10">Consultar documento</span>${renderComponent($$result, "ArrowRightIcon", ArrowRightIcon, {
		"size": 14,
		"strokeWidth": 2,
		"className": "relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5"
	})}</a><!-- Botón de Like interactivo (solo icono sin número contador) --><button type="button"${addAttribute(documento.id, "data-repo-like-btn")} class="btn-repo-like group/like relative grid h-10 w-10 place-items-center rounded-full text-[#787774] bg-white/90 border border-black/[0.08] hover:text-[#0064c1] hover:bg-[#0064c1]/[0.08] shadow-[0_2px_8px_-2px_rgba(9,60,120,0.06)] backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer shrink-0" title="Me gusta este documento" aria-label="Me gusta este documento">${renderComponent($$result, "LikeIcon", LikeIcon, {
		"size": 16,
		"strokeWidth": 1.8,
		"className": "transition-transform duration-200 group-hover/like:-rotate-12"
	})}</button></div></article>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/repositorio/components/CardDocumentoRepositorio.astro", void 0);
//#endregion
//#region src/modules/repositorio/components/ContenidoRepositorio.astro
var $$ContenidoRepositorio = createComponent(async ($$result, $$props, $$slots) => {
	const documentos = await ServicioRepositorio.obtenerDocumentos();
	const gruposPorCategoria = /* @__PURE__ */ new Map();
	documentos.forEach((doc) => {
		const cat = doc.categoria?.trim() || "Otras Investigaciones";
		if (!gruposPorCategoria.has(cat)) gruposPorCategoria.set(cat, []);
		gruposPorCategoria.get(cat).push(doc);
	});
	const listaCategorias = Array.from(gruposPorCategoria.keys()).sort((a, b) => {
		if (a.toLowerCase().includes("otras") || a.toLowerCase().includes("general")) return 1;
		if (b.toLowerCase().includes("otras") || b.toLowerCase().includes("general")) return -1;
		return a.localeCompare(b);
	});
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise isolate overflow-x-clip"><!-- Atmósfera superior con SkyShader --><div class="absolute inset-x-0 top-0 h-[360px] -z-10 overflow-hidden pointer-events-none" style="mask-image: linear-gradient(180deg, black 0%, black 45%, transparent 100%); -webkit-mask-image: linear-gradient(180deg, black 0%, black 45%, transparent 100%);">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><div class="flex-1 flex flex-col px-6 md:px-12 pt-10 md:pt-14 pb-16 max-w-7xl w-full mx-auto gap-8"><!-- Encabezado de Repositorio --><header class="relative z-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]"><div class="flex flex-col gap-2 max-w-2xl"><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]"><span class="h-2 w-2 rounded-full bg-[#0064c1]"></span>Colección Seleccionada</div><h1 class="m-0 text-[clamp(2rem,3.4vw,2.8rem)] font-bold text-[#0a0a0a] tracking-[-0.035em] leading-[1.08] mix-blend-multiply opacity-95">Documentos disponibles</h1><p class="m-0 text-sm text-[#787774] font-medium tracking-tight">Explora la producción académica agrupada por categorías o consulta fichas técnicas individuales.</p></div><!-- Filtros: Desplegable Personalizado a la Izquierda y Buscador a la Derecha --><div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto"><!-- 1. Desplegable Personalizado de Categorías (Lado Izquierdo) --><div class="relative inline-block text-left"><button type="button" id="btn-dropdown-categoria" class="group/drop flex items-center justify-between gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/80 shadow-[0_4px_16px_-4px_rgba(9,60,120,0.1)] hover:border-[#0064c1]/40 focus:border-[#0064c1] transition-all cursor-pointer w-full sm:w-auto min-w-[210px]" aria-expanded="false" aria-haspopup="true"><div class="flex items-center gap-2 min-w-0">${renderComponent($$result, "LayersMinimalisticIcon", LayersMinimalisticIcon, {
		"size": 16,
		"className": "text-[#0064c1] shrink-0"
	})}<span id="texto-categoria-activa" class="text-xs font-bold text-[#0a0a0a] truncate max-w-[150px] sm:max-w-[170px]">Todas las categorías</span></div><span id="badge-total-categoria-activa" class="font-mono text-[0.68rem] font-bold text-[#0064c1] bg-[#0064c1]/10 px-2 py-0.5 rounded-full shrink-0">${documentos.length}</span>${renderComponent($$result, "AltArrowDownIcon", AltArrowDownIcon, {
		"size": 14,
		"strokeWidth": 2.5,
		"className": "text-[#787774] group-hover/drop:text-[#0064c1] transition-transform duration-200 shrink-0",
		"id": "flecha-dropdown-categoria"
	})}</button><!-- Menú Flotante Personalizado del Desplegable --><div id="menu-desplegable-categorias" class="hidden absolute left-0 sm:left-0 top-[115%] z-50 flex-col gap-1 p-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/90 shadow-[0_20px_40px_-10px_rgba(9,60,120,0.22),0_1px_3px_rgba(0,0,0,0.04)] animate-rise min-w-[260px] max-w-sm max-h-72 overflow-y-auto custom-scrollbar"><!-- Opción: Todas las Categorías --><button type="button" data-cat-valor="todas" data-cat-label="Todas las categorías"${addAttribute(documentos.length, "data-cat-total")} class="opcion-categoria-item flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-left hover:bg-[#0064c1]/10 text-xs text-[#0a0a0a] font-semibold transition-colors cursor-pointer w-full group bg-[#0064c1]/[0.08]"><div class="flex items-center gap-2 min-w-0">${renderComponent($$result, "LayersMinimalisticIcon", LayersMinimalisticIcon, {
		"size": 15,
		"className": "text-[#0064c1] shrink-0"
	})}<span class="truncate">Todas las categorías</span></div><span class="font-mono text-[0.68rem] font-bold text-[#0064c1] bg-[#0064c1]/10 px-2 py-0.5 rounded-full shrink-0">${documentos.length}</span></button><div class="h-px bg-black/[0.05] my-1 mx-1"></div><!-- Opciones individuales de categoría -->${listaCategorias.map((cat) => {
		const totalDocs = gruposPorCategoria.get(cat)?.length || 0;
		return renderTemplate`<button type="button"${addAttribute(cat.toLowerCase(), "data-cat-valor")}${addAttribute(cat, "data-cat-label")}${addAttribute(totalDocs, "data-cat-total")} class="opcion-categoria-item flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-left hover:bg-[#0064c1]/10 text-xs text-[#0a0a0a] font-medium transition-colors cursor-pointer w-full group"><div class="flex items-center gap-2 min-w-0">${renderComponent($$result, "BookBookmarkIcon", BookBookmarkIcon, {
			"size": 14,
			"className": "text-[#787774] group-hover:text-[#0064c1] shrink-0"
		})}<span class="truncate group-hover:text-[#0064c1]">${cat}</span></div><span class="font-mono text-[0.68rem] font-semibold text-[#787774] bg-black/[0.04] group-hover:bg-[#0064c1]/10 group-hover:text-[#0064c1] px-2 py-0.5 rounded-full shrink-0">${totalDocs}</span></button>`;
	})}</div></div><!-- 2. Buscador Inteligente (Lado Derecho) --><div class="relative w-full sm:w-72"><div class="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/80 shadow-[0_4px_16px_-4px_rgba(9,60,120,0.1)] focus-within:border-[#0064c1]/40 focus-within:shadow-[0_4px_20px_-2px_rgba(0,100,193,0.18)] transition-all">${renderComponent($$result, "RoundedMagnifierZoomInIcon", RoundedMagnifierZoomInIcon, {
		"size": 16,
		"className": "text-[#787774] shrink-0"
	})}<input id="buscador-repositorio" type="text" autocomplete="off" placeholder="Buscar por título, autor, país..." class="bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-full"><button id="btn-limpiar-busqueda" type="button" class="hidden text-[#787774] hover:text-[#0a0a0a] transition-colors cursor-pointer" aria-label="Limpiar búsqueda">${renderComponent($$result, "CloseCircleIcon", CloseCircleIcon, { "size": 15 })}</button></div><!-- Panel Desplegable de Sugerencias Inteligentes --><div id="panel-sugerencias-repositorio" class="hidden absolute left-0 right-0 top-[115%] z-50 flex-col gap-1 p-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/90 shadow-[0_16px_36px_-10px_rgba(9,60,120,0.22),0_1px_3px_rgba(0,0,0,0.04)] animate-rise max-h-72 overflow-y-auto custom-scrollbar"><!-- Las sugerencias se inyectan dinámicamente con JS --></div></div></div></header><!-- Contenedor Principal de Secciones por Categoría o Empty State -->${documentos.length === 0 ? renderTemplate`<div class="flex flex-col items-center justify-center p-12 sm:p-16 rounded-[32px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md text-center max-w-md mx-auto w-full gap-3 animate-rise"><div class="grid h-16 w-16 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1]">${renderComponent($$result, "LibraryIcon", LibraryIcon, {
		"size": 32,
		"strokeWidth": 1.5
	})}</div><div class="flex flex-col gap-1"><h3 class="m-0 text-lg font-bold text-[#0a0a0a]">No hay documentos publicados</h3><p class="m-0 text-xs text-[#787774] leading-relaxed">Actualmente no se encuentran publicaciones ni investigaciones registradas en el catálogo.</p></div></div>` : renderTemplate`<div id="contenedor-secciones-repositorio" class="flex flex-col gap-12">${listaCategorias.map((nombreCategoria) => {
		const docsEnCat = gruposPorCategoria.get(nombreCategoria) || [];
		return renderTemplate`<section class="seccion-categoria-repositorio flex flex-col gap-5 animate-rise"${addAttribute(nombreCategoria.toLowerCase(), "data-categoria-nombre")}><div class="flex items-center justify-between gap-3 pb-3 border-b border-black/[0.06]"><div class="flex items-center gap-3"><span class="grid h-9 w-9 place-items-center rounded-xl text-[#0064c1] bg-[#0064c1]/10 border border-[#0064c1]/20 shadow-xs">${renderComponent($$result, "BookBookmarkIcon", BookBookmarkIcon, {
			"size": 18,
			"strokeWidth": 2
		})}</span><div class="flex items-center gap-2.5 flex-wrap"><h2 class="m-0 text-lg md:text-xl font-bold text-[#0a0a0a] tracking-tight">${nombreCategoria}</h2><span class="inline-flex items-center font-mono text-xs font-bold text-[#0064c1] bg-[#0064c1]/10 px-2.5 py-0.5 rounded-full border border-[#0064c1]/20">${docsEnCat.length} ${docsEnCat.length === 1 ? "documento" : "documentos"}</span></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">${docsEnCat.map((doc) => renderTemplate`<div class="item-documento-repositorio"${addAttribute(doc.titulo.toLowerCase(), "data-titulo")}${addAttribute(doc.lineaInvestigacion.toLowerCase(), "data-linea")}${addAttribute((doc.categoria || "otras investigaciones").toLowerCase(), "data-categoria")}${addAttribute(doc.pais.toLowerCase(), "data-pais")}${addAttribute(doc.tipoFuente.toLowerCase(), "data-fuente")}${addAttribute(doc.autores.join(" ").toLowerCase(), "data-autores")}${addAttribute(`${doc.titulo} ${doc.lineaInvestigacion} ${doc.categoria || ""} ${doc.pais} ${doc.tipoFuente} ${doc.autores?.join(" ") || ""}`.toLowerCase(), "data-texto")}>${renderComponent($$result, "CardDocumentoRepositorio", $$CardDocumentoRepositorio, { "documento": doc })}</div>`)}</div></section>`;
	})}<div id="mensaje-sin-resultados" class="hidden flex-col items-center justify-center p-12 rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14)] text-center max-w-md mx-auto w-full gap-2 animate-rise"><div class="grid h-12 w-12 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1]">${renderComponent($$result, "RoundedMagnifierZoomInIcon", RoundedMagnifierZoomInIcon, { "size": 24 })}</div><h3 class="m-0 text-base font-bold text-[#0a0a0a]">No se encontraron documentos</h3><p class="m-0 text-xs text-[#787774]">Intenta cambiar la categoría seleccionada o buscar con otros términos.</p></div></div>`}</div></div>${renderScript($$result, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/repositorio/components/ContenidoRepositorio.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/repositorio/components/ContenidoRepositorio.astro", void 0);
//#endregion
//#region src/modules/repositorio/components/DetalleDocumentoRepositorio.astro
createAstro("https://astro.build");
var $$DetalleDocumentoRepositorio = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DetalleDocumentoRepositorio;
	const { documento } = Astro.props;
	const obtenerInicial = (nombre) => {
		return nombre.trim().charAt(0).toUpperCase();
	};
	const enlaces = documento.paginasWeb && documento.paginasWeb.length > 0 ? documento.paginasWeb : documento.enlaceDocumento ? [documento.enlaceDocumento] : [];
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise isolate overflow-x-clip bg-[#fbfbfa]"><div class="flex-1 flex flex-col px-6 md:px-12 pt-8 md:pt-10 pb-16 max-w-7xl w-full mx-auto gap-8"><!-- Botón Volver al Repositorio --><div class="flex items-center"><a href="/dashboard/repositorio" class="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-[#0064c1] bg-white border border-[#0064c1]/20 hover:bg-[#0064c1] hover:text-white shadow-[0_2px_10px_-2px_rgba(0,100,193,0.14)] hover:shadow-[0_4px_16px_-2px_rgba(0,100,193,0.3)] transition-all duration-200 active:scale-95 cursor-pointer">${renderComponent($$result, "AltArrowLeftIcon", AltArrowLeftIcon, {
		"size": 16,
		"strokeWidth": 2.5,
		"className": "transition-transform duration-200 group-hover:-translate-x-1"
	})}<span>Volver al repositorio</span></a></div><!-- Header Principal de la Ficha del Documento --><header class="flex flex-col gap-5 pb-6 border-b border-black/[0.06]"><div class="flex flex-wrap items-center justify-between gap-4"><div class="flex items-center gap-3"><span class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);">${renderComponent($$result, "FileTextIcon", FileTextIcon, {
		"size": 22,
		"strokeWidth": 1.8
	})}</span><div class="flex flex-col"><span class="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#0064c1]">Documento Consultado</span><div class="flex items-center gap-2 flex-wrap"><span class="text-xs font-semibold text-[#787774]">${documento.lineaInvestigacion} · ${documento.ano}</span>${documento.categoria && renderTemplate`<span class="text-[0.68rem] font-bold text-[#0064c1] bg-[#0064c1]/10 px-2.5 py-0.5 rounded-full">${documento.categoria}</span>`}</div></div></div><!-- Acciones superiores: Botón Like + Badge de año --><div class="flex items-center gap-2.5"><!-- Botón de Like destacado sin contador --><button type="button" id="btn-like-detalle-doc"${addAttribute(documento.id, "data-repo-id")} class="group/like relative inline-flex items-center justify-center gap-2 h-9 px-4 rounded-full text-xs font-bold text-[#787774] bg-white border border-black/[0.08] hover:text-[#0064c1] hover:bg-[#0064c1]/[0.08] shadow-[0_2px_8px_-2px_rgba(9,60,120,0.06)] transition-all duration-200 active:scale-95 cursor-pointer" title="Me gusta este documento" aria-label="Me gusta este documento">${renderComponent($$result, "LikeIcon", LikeIcon, {
		"size": 16,
		"strokeWidth": 1.8,
		"className": "transition-transform duration-200 group-hover/like:-rotate-12"
	})}<span>Me gusta</span></button><!-- Badge flotante de año --><span class="font-mono text-xs font-bold text-[#0064c1] bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/80 shadow-sm">${documento.ano}</span></div></div><div class="flex flex-col gap-2"><span class="text-xs font-bold uppercase tracking-wider text-[#787774]">${documento.tipoFuente}</span><h1 class="m-0 text-[clamp(1.75rem,2.8vw,2.4rem)] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-tight mix-blend-multiply opacity-95">${documento.titulo}</h1><p class="m-0 text-sm text-[#787774] font-medium tracking-tight">Una ficha de lectura con los datos esenciales, autores y referencia de esta publicación.</p></div></header><!-- Layout Dividido: Columna Izquierda (Resumen & APA & Páginas Web) + Columna Derecha (Ficha Técnica & Autores) --><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><!-- Columna Principal (8 columnas) --><div class="lg:col-span-8 flex flex-col gap-8"><!-- Box Resumen del Documento (Lectura Rápida) --><div class="flex flex-col gap-4 p-6 md:p-8 rounded-[28px] bg-gradient-to-b from-[#f4f9ff] to-[#eaf3fe]/60 border border-[#0064c1]/15 shadow-[0_16px_36px_-16px_rgba(9,60,120,0.1)]"><div class="flex items-center gap-3"><span class="grid h-9 w-9 place-items-center rounded-xl bg-white text-[#0064c1] shadow-xs border border-[#0064c1]/20">${renderComponent($$result, "StarsMinimalisticIcon", StarsMinimalisticIcon, {
		"size": 18,
		"strokeWidth": 2
	})}</span><div class="flex flex-col"><span class="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#0064c1]">Lectura Rápida</span><h3 class="m-0 text-base font-bold text-[#0a0a0a] tracking-tight">Resumen del documento</h3></div></div><p class="m-0 text-sm md:text-[0.95rem] text-[#2f3437] leading-relaxed font-normal">${documento.resumen || "Sin resumen disponible para este documento."}</p></div><!-- Box Páginas Web / Enlaces Disponibles -->${enlaces.length > 0 && renderTemplate`<div class="flex flex-col gap-3 p-6 rounded-[28px] bg-white/95 border border-black/[0.06] shadow-xs"><div class="flex items-center gap-2 text-xs font-bold text-[#0a0a0a]"><span class="grid h-5 w-5 place-items-center rounded-md bg-[#0064c1]/10 text-[#0064c1] text-[0.68rem] font-mono font-bold">${renderComponent($$result, "GlobeIcon", GlobeIcon, { "size": 13 })}</span><span class="uppercase tracking-wider">Páginas Web y Fuentes Digitales (${enlaces.length})</span></div><div class="flex flex-wrap gap-2.5 pt-1">${enlaces.map((enlace, idx) => renderTemplate`<a${addAttribute(enlace, "href")} target="_blank" rel="noopener noreferrer" class="group/link inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f4f9ff] hover:bg-[#0064c1] border border-[#0064c1]/20 hover:border-[#0064c1] text-xs font-medium text-[#0064c1] hover:text-white transition-all shadow-2xs cursor-pointer max-w-full">${renderComponent($$result, "LinkRoundIcon", LinkRoundIcon, {
		"size": 14,
		"className": "shrink-0"
	})}<span class="truncate max-w-[320px] font-mono">${enlace}</span></a>`)}</div></div>`}<!-- Box Referencia APA con botón para copiar --><div class="flex flex-col gap-3"><div class="flex items-center gap-2 text-xs font-bold text-[#0a0a0a]"><span class="grid h-5 w-5 place-items-center rounded-md bg-[#0064c1]/10 text-[#0064c1] text-[0.68rem] font-mono font-bold">01</span><span class="uppercase tracking-wider">Referencia APA</span></div><div class="relative py-1"><p class="m-0 text-xs md:text-sm text-[#2f3437] leading-relaxed italic font-serif">${documento.referenciaApa || "Referencia en formato APA no disponible."}</p></div></div></div><!-- Columna Lateral: Ficha Técnica y Autores (4 columnas) --><aside class="lg:col-span-4 flex flex-col gap-6 lg:pl-8 lg:border-l lg:border-black/[0.06]"><!-- Encabezado de Ficha Técnica --><div class="flex items-center justify-between pb-3 border-b border-black/[0.06]"><div class="flex flex-col"><span class="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#0064c1]">Ficha Técnica</span><h3 class="m-0 text-sm font-bold text-[#0a0a0a]">Datos del documento</h3></div><button type="button" class="text-[#0064c1] hover:text-[#0f2fe8] transition-colors cursor-pointer" aria-label="Agregar o expandir">${renderComponent($$result, "AddSquareIcon", AddSquareIcon, {
		"size": 20,
		"strokeWidth": 2
	})}</button></div><!-- Tabla de Datos --><div class="flex flex-col divide-y divide-black/[0.05] text-xs"><div class="flex items-center justify-between py-2.5"><span class="text-[#787774] font-medium">Año</span><span class="font-bold text-[#0a0a0a] font-mono">${documento.ano}</span></div><div class="flex items-center justify-between py-2.5"><span class="text-[#787774] font-medium">País</span><span class="font-bold text-[#0a0a0a]">${documento.pais}</span></div>${documento.categoria && renderTemplate`<div class="flex items-center justify-between py-2.5"><span class="text-[#787774] font-medium">Categoría</span><span class="font-bold text-[#0064c1]">${documento.categoria}</span></div>`}<div class="flex flex-col gap-1 py-2.5"><span class="text-[#787774] font-medium">Tipo de fuente</span><span class="font-bold text-[#0a0a0a]">${documento.tipoFuente}</span></div></div><!-- Sección de Autores --><div class="flex flex-col gap-3 pt-2"><div class="flex items-center justify-between text-xs"><span class="font-bold text-[#0a0a0a]">Autores</span><span class="font-mono text-[#787774] font-semibold">${documento.autores.length}</span></div><div class="flex flex-col gap-2.5">${documento.autores.map((autor) => renderTemplate`<div class="flex items-center gap-2.5"><span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0064c1]/10 text-[#0064c1] text-[0.7rem] font-bold">${obtenerInicial(autor)}</span><span class="text-xs text-[#2f3437] font-medium truncate">${autor}</span></div>`)}</div></div></aside></div></div></div>${renderScript($$result, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/repositorio/components/DetalleDocumentoRepositorio.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/repositorio/components/DetalleDocumentoRepositorio.astro", void 0);
//#endregion
//#region src/modules/repositorio/components/TablaContenidoRepositorio.tsx
var FILAS_POR_PAGINA = 8;
var TablaContenidoRepositorio = ({ documentosIniciales = [] }) => {
	const [montado, setMontado] = useState(false);
	const [lista, setLista] = useState(documentosIniciales || []);
	const [selectedKeys, setSelectedKeys] = useState(/* @__PURE__ */ new Set());
	const [busqueda, setBusqueda] = useState("");
	const [filtroPais, setFiltroPais] = useState("todos");
	const [filtroTipo, setFiltroTipo] = useState("todos");
	const [pagina, setPagina] = useState(1);
	const [cargando, setCargando] = useState(false);
	const [itemAEliminar, setItemAEliminar] = useState(null);
	const [modalMasivoEliminar, setModalMasivoEliminar] = useState(false);
	const [eliminando, setEliminando] = useState(false);
	useEffect(() => {
		setMontado(true);
	}, []);
	const recargarDatos = async () => {
		setCargando(true);
		try {
			const resp = await fetch("/api/repositorio");
			if (resp.ok) {
				const data = await resp.json();
				setLista(Array.isArray(data) ? data : []);
			}
		} catch (err) {
			console.error("Error al recargar documentos del repositorio:", err);
		} finally {
			setCargando(false);
		}
	};
	useEffect(() => {
		if (!documentosIniciales || documentosIniciales.length === 0) recargarDatos();
	}, []);
	const opcionesPaises = useMemo(() => {
		const conjunto = /* @__PURE__ */ new Set();
		lista.forEach((d) => {
			if (d.pais) conjunto.add(d.pais);
		});
		return Array.from(conjunto).sort();
	}, [lista]);
	const opcionesTipos = useMemo(() => {
		const conjunto = /* @__PURE__ */ new Set();
		lista.forEach((d) => {
			if (d.tipoFuente) conjunto.add(d.tipoFuente);
		});
		return Array.from(conjunto).sort();
	}, [lista]);
	const documentosFiltrados = useMemo(() => {
		let resultado = Array.isArray(lista) ? lista : [];
		if (filtroPais !== "todos") resultado = resultado.filter((d) => d.pais === filtroPais);
		if (filtroTipo !== "todos") resultado = resultado.filter((d) => d.tipoFuente === filtroTipo);
		const termino = busqueda.toLowerCase().trim();
		if (termino) resultado = resultado.filter((d) => d.titulo?.toLowerCase().includes(termino) || d.lineaInvestigacion?.toLowerCase().includes(termino) || d.categoria?.toLowerCase().includes(termino) || d.resumen?.toLowerCase().includes(termino) || d.ano?.includes(termino) || d.autores?.some((a) => a.toLowerCase().includes(termino)) || d.paginasWeb?.some((p) => p.toLowerCase().includes(termino)));
		return resultado;
	}, [
		lista,
		filtroPais,
		filtroTipo,
		busqueda
	]);
	const totalRegistros = documentosFiltrados.length;
	const totalPaginas = Math.max(1, Math.ceil(totalRegistros / FILAS_POR_PAGINA));
	const documentosPaginados = useMemo(() => {
		const inicio = (pagina - 1) * FILAS_POR_PAGINA;
		return documentosFiltrados.slice(inicio, inicio + FILAS_POR_PAGINA);
	}, [documentosFiltrados, pagina]);
	const inicioRango = totalRegistros === 0 ? 0 : (pagina - 1) * FILAS_POR_PAGINA + 1;
	const finRango = Math.min(pagina * FILAS_POR_PAGINA, totalRegistros);
	const idsSeleccionados = useMemo(() => {
		if (selectedKeys === "all") return documentosFiltrados.map((d) => d.id);
		return Array.from(selectedKeys);
	}, [selectedKeys, documentosFiltrados]);
	const totalSeleccionados = idsSeleccionados.length;
	const confirmarEliminacion = async () => {
		if (!itemAEliminar) return;
		const idParaEliminar = itemAEliminar.id;
		const tituloEliminado = itemAEliminar.titulo;
		setEliminando(true);
		try {
			const resp = await fetch(`/api/repositorio/${idParaEliminar}`, { method: "DELETE" });
			if (!resp.ok) {
				const errorData = await resp.json().catch(() => ({}));
				throw new Error(errorData.error || "No se pudo eliminar el documento.");
			}
			setLista((prev) => prev.filter((d) => d.id !== idParaEliminar));
			setItemAEliminar(null);
			toast.success("Documento eliminado", { description: `Se eliminó "${tituloEliminado}" del repositorio.` });
		} catch (err) {
			toast.danger("Error al eliminar", { description: err.message || "No fue posible eliminar el documento." });
		} finally {
			setEliminando(false);
		}
	};
	const confirmarEliminacionMasiva = async () => {
		if (idsSeleccionados.length === 0) return;
		const totalAfectados = idsSeleccionados.length;
		setEliminando(true);
		try {
			const resp = await fetch("/api/repositorio", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ids: idsSeleccionados })
			});
			if (!resp.ok) {
				const errorData = await resp.json().catch(() => ({}));
				throw new Error(errorData.error || "No se pudieron eliminar los documentos.");
			}
			setLista((prev) => prev.filter((d) => !idsSeleccionados.includes(d.id)));
			setSelectedKeys(/* @__PURE__ */ new Set());
			setModalMasivoEliminar(false);
			toast.success("Documentos eliminados", { description: `Se eliminaron ${totalAfectados} documentos del repositorio exitosamente.` });
		} catch (err) {
			toast.danger("Error en eliminación masiva", { description: err.message || "No fue posible eliminar los documentos seleccionados." });
		} finally {
			setEliminando(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-6 w-full relative",
		children: [
			/* @__PURE__ */ jsx(Toast.Provider, { placement: "top" }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/80 shadow-[0_4px_16px_-4px_rgba(9,60,120,0.1)] w-full sm:w-72",
							children: [
								/* @__PURE__ */ jsx(RoundedMagnifierZoomInIcon, {
									size: 16,
									className: "text-[#787774] shrink-0"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									value: busqueda,
									onChange: (e) => {
										setBusqueda(e.target.value);
										setPagina(1);
									},
									placeholder: "Buscar título, autor, línea...",
									className: "bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-full"
								}),
								busqueda && /* @__PURE__ */ jsx("button", {
									onClick: () => {
										setBusqueda("");
										setPagina(1);
									},
									className: "text-[#787774] hover:text-[#0a0a0a] cursor-pointer",
									children: /* @__PURE__ */ jsx(CloseCircleIcon, { size: 14 })
								})
							]
						}),
						/* @__PURE__ */ jsxs("select", {
							value: filtroPais,
							onChange: (e) => {
								setFiltroPais(e.target.value);
								setPagina(1);
							},
							className: "px-3.5 py-2.5 rounded-full bg-white/90 border border-white/80 shadow-[0_4px_16px_-4px_rgba(9,60,120,0.08)] text-xs font-semibold text-[#0a0a0a] outline-none cursor-pointer",
							children: [/* @__PURE__ */ jsx("option", {
								value: "todos",
								children: "Todos los países"
							}), opcionesPaises.map((p) => /* @__PURE__ */ jsx("option", {
								value: p,
								children: p
							}, p))]
						}),
						/* @__PURE__ */ jsxs("select", {
							value: filtroTipo,
							onChange: (e) => {
								setFiltroTipo(e.target.value);
								setPagina(1);
							},
							className: "px-3.5 py-2.5 rounded-full bg-white/90 border border-white/80 shadow-[0_4px_16px_-4px_rgba(9,60,120,0.08)] text-xs font-semibold text-[#0a0a0a] outline-none cursor-pointer",
							children: [/* @__PURE__ */ jsx("option", {
								value: "todos",
								children: "Todos los tipos"
							}), opcionesTipos.map((t) => /* @__PURE__ */ jsx("option", {
								value: t,
								children: t
							}, t))]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: recargarDatos,
							disabled: cargando,
							title: "Sincronizar con Supabase",
							className: "grid h-9 w-9 place-items-center rounded-full bg-white border border-black/10 text-[#787774] hover:text-[#0064c1] hover:border-[#0064c1]/40 transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50",
							children: /* @__PURE__ */ jsx(RefreshIcon, {
								size: 16,
								className: cargando ? "animate-spin text-[#0064c1]" : ""
							})
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 self-start lg:self-auto shrink-0",
					children: [totalSeleccionados > 0 ? /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 p-1.5 px-3 rounded-full bg-red-500/10 border border-red-500/20 animate-rise",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "text-xs font-bold text-red-700 font-mono",
								children: [totalSeleccionados, " seleccionados"]
							}),
							/* @__PURE__ */ jsx("div", { className: "h-3.5 w-px bg-red-500/30 mx-1" }),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setModalMasivoEliminar(true),
								className: "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-xs cursor-pointer",
								children: [/* @__PURE__ */ jsx(TrashBinMinimalisticIcon, {
									size: 14,
									strokeWidth: 2
								}), "Eliminar"]
							})
						]
					}) : /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold text-[#787774]",
							children: "Total:"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-mono text-xs font-bold text-[#0064c1] bg-[#0064c1]/10 px-3 py-1 rounded-full",
							children: totalRegistros
						})]
					}), /* @__PURE__ */ jsxs("a", {
						href: "/dashboard/contenido-repositorio/nuevo",
						className: "group/btn relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm",
						style: {
							backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
							boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
						},
						children: [/* @__PURE__ */ jsx(AddCircleIcon, {
							size: 16,
							strokeWidth: 2,
							className: "relative z-10"
						}), /* @__PURE__ */ jsx("span", {
							className: "relative z-10",
							children: "Nuevo documento"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "overflow-hidden rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md",
				children: [/* @__PURE__ */ jsx(Table, { children: /* @__PURE__ */ jsx(Table.ScrollContainer, {
					className: "custom-scrollbar",
					children: /* @__PURE__ */ jsxs(Table.Content, {
						"aria-label": "Tabla de documentos del repositorio",
						className: "w-full text-left",
						selectedKeys,
						selectionMode: "multiple",
						onSelectionChange: setSelectedKeys,
						children: [/* @__PURE__ */ jsxs(Table.Header, { children: [
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 w-10 pe-0",
								children: /* @__PURE__ */ jsx(Checkbox, {
									"aria-label": "Seleccionar todos",
									slot: "selection",
									children: /* @__PURE__ */ jsx(Checkbox.Content, { children: /* @__PURE__ */ jsx(Checkbox.Control, { children: /* @__PURE__ */ jsx(Checkbox.Indicator, {}) }) })
								})
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1]",
								children: "Título / Documento"
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1]",
								children: "Línea de Investigación"
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1]",
								children: "Autores"
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1]",
								children: "Tipo / País / Año"
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] text-center",
								children: "Likes"
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] text-right",
								children: "Acciones"
							})
						] }), /* @__PURE__ */ jsx(Table.Body, { children: documentosPaginados.length === 0 ? /* @__PURE__ */ jsx(Table.Row, {
							id: "fila-vacia-repositorio",
							children: /* @__PURE__ */ jsx(Table.Cell, {
								className: "py-16 text-center",
								colSpan: 7,
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center justify-center gap-3 max-w-sm mx-auto",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "grid h-14 w-14 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1]",
											children: /* @__PURE__ */ jsx(InboxIcon, {
												size: 28,
												strokeWidth: 1.5
											})
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-col gap-1 text-center",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-sm font-bold text-[#0a0a0a]",
												children: "No hay documentos registrados"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-[#787774] m-0 leading-relaxed",
												children: busqueda || filtroPais !== "todos" || filtroTipo !== "todos" ? "No se encontraron coincidencias para los filtros aplicados." : "Comienza registrando publicaciones científicas e investigaciones en el repositorio."
											})]
										}),
										!busqueda && filtroPais === "todos" && filtroTipo === "todos" && /* @__PURE__ */ jsxs("a", {
											href: "/dashboard/contenido-repositorio/nuevo",
											className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#0064c1] bg-[#0064c1]/10 hover:bg-[#0064c1]/15 transition-all mt-1 cursor-pointer",
											children: [/* @__PURE__ */ jsx(AddCircleIcon, {
												size: 14,
												strokeWidth: 2
											}), /* @__PURE__ */ jsx("span", { children: "Registrar primer documento" })]
										})
									]
								})
							})
						}) : documentosPaginados.map((item) => /* @__PURE__ */ jsxs(Table.Row, {
							id: item.id,
							className: "transition-colors hover:bg-black/[0.02] group/row",
							children: [
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4 pe-0",
									children: /* @__PURE__ */ jsx(Checkbox, {
										"aria-label": `Seleccionar ${item.titulo}`,
										slot: "selection",
										variant: "secondary",
										children: /* @__PURE__ */ jsx(Checkbox.Content, { children: /* @__PURE__ */ jsx(Checkbox.Control, { children: /* @__PURE__ */ jsx(Checkbox.Indicator, {}) }) })
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1 max-w-md",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-bold text-[#0a0a0a] text-xs leading-snug group-hover/row:text-[#0064c1] transition-colors line-clamp-2",
											children: item.titulo
										}), item.paginasWeb && item.paginasWeb.length > 0 ? /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-1.5 flex-wrap",
											children: [/* @__PURE__ */ jsxs("a", {
												href: item.paginasWeb[0],
												target: "_blank",
												rel: "noopener noreferrer",
												className: "inline-flex items-center gap-1 text-[0.7rem] text-[#0064c1] hover:underline font-mono truncate max-w-[200px]",
												title: item.paginasWeb[0],
												children: [/* @__PURE__ */ jsx(LinkRoundIcon, {
													size: 12,
													className: "shrink-0"
												}), /* @__PURE__ */ jsx("span", {
													className: "truncate",
													children: item.paginasWeb[0]
												})]
											}), item.paginasWeb.length > 1 && /* @__PURE__ */ jsxs("span", {
												className: "text-[0.66rem] font-bold font-mono text-[#0064c1] bg-[#0064c1]/10 px-1.5 py-0.5 rounded-md",
												title: item.paginasWeb.join("\n"),
												children: [
													"+",
													item.paginasWeb.length - 1,
													" enlaces"
												]
											})]
										}) : item.enlaceDocumento ? /* @__PURE__ */ jsxs("a", {
											href: item.enlaceDocumento,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "inline-flex items-center gap-1 text-[0.7rem] text-[#0064c1] hover:underline font-mono truncate max-w-[200px]",
											children: [/* @__PURE__ */ jsx(LinkRoundIcon, {
												size: 12,
												className: "shrink-0"
											}), /* @__PURE__ */ jsx("span", {
												className: "truncate",
												children: item.enlaceDocumento
											})]
										}) : null]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1 items-start",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a0a0a] bg-black/[0.03] px-2.5 py-1 rounded-lg",
											children: [/* @__PURE__ */ jsx(BookBookmarkIcon, {
												size: 13,
												className: "text-[#0064c1] shrink-0"
											}), /* @__PURE__ */ jsx("span", {
												className: "truncate max-w-[160px]",
												children: item.lineaInvestigacion
											})]
										}), item.categoria && /* @__PURE__ */ jsx("span", {
											className: "text-[0.66rem] font-bold text-[#787774] bg-black/[0.04] px-2 py-0.5 rounded-full truncate max-w-[150px]",
											children: item.categoria
										})]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-xs font-semibold text-[#0a0a0a] truncate max-w-[180px]",
											children: item.autores && item.autores.length > 0 ? item.autores[0] : "Sin autor"
										}), item.autores && item.autores.length > 1 && /* @__PURE__ */ jsxs("span", {
											className: "text-[0.68rem] text-[#787774]",
											children: [
												"+",
												item.autores.length - 1,
												" coautores más"
											]
										})]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1 text-xs",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "font-semibold text-[#0a0a0a]",
													children: item.tipoFuente
												}),
												/* @__PURE__ */ jsx("span", {
													className: "text-[#787774]",
													children: "•"
												}),
												/* @__PURE__ */ jsx("span", {
													className: "font-mono font-bold text-[#0064c1]",
													children: item.ano
												})
											]
										}), /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 text-[0.7rem] text-[#787774]",
											children: [/* @__PURE__ */ jsx(GlobeIcon, { size: 11 }), item.pais]
										})]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4 text-center",
									children: /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0064c1]/[0.06] border border-[#0064c1]/15 text-[#0064c1]",
										title: `${item.likesCount || 0} me gusta acumulados`,
										children: [/* @__PURE__ */ jsx(LikeIcon, {
											size: 14,
											strokeWidth: 1.8
										}), /* @__PURE__ */ jsx("span", {
											className: "font-mono text-xs font-bold select-none",
											children: item.likesCount || 0
										})]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-5 text-right relative",
									children: /* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-center gap-1.5 relative",
										children: [
											/* @__PURE__ */ jsx("a", {
												href: `/dashboard/repositorio/${item.id}`,
												className: "grid h-8 w-8 place-items-center rounded-lg text-[#787774] hover:text-[#0064c1] hover:bg-[#0064c1]/10 transition-colors cursor-pointer",
												title: "Ver ficha pública",
												children: /* @__PURE__ */ jsx(LinkRoundIcon, {
													size: 16,
													strokeWidth: 1.8
												})
											}),
											/* @__PURE__ */ jsx("a", {
												href: `/dashboard/contenido-repositorio/editar/${item.id}`,
												className: "grid h-8 w-8 place-items-center rounded-lg text-[#787774] hover:text-[#0064c1] hover:bg-[#0064c1]/10 transition-colors cursor-pointer",
												title: "Editar documento",
												children: /* @__PURE__ */ jsx(Pen2Icon, {
													size: 16,
													strokeWidth: 1.8
												})
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setItemAEliminar(item),
												className: "grid h-8 w-8 place-items-center rounded-lg text-[#787774] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer",
												title: "Eliminar documento",
												children: /* @__PURE__ */ jsx(TrashBinMinimalisticIcon, {
													size: 16,
													strokeWidth: 1.8
												})
											})
										]
									})
								})
							]
						}, item.id)) })]
					})
				}) }), totalRegistros > 0 && /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-t border-black/[0.06] bg-black/[0.01]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-xs font-semibold text-[#787774] font-mono",
							children: [
								inicioRango,
								" to ",
								finRango,
								" of ",
								totalRegistros,
								" results"
							]
						}), /* @__PURE__ */ jsxs("span", {
							className: "text-xs text-[#787774]",
							children: [
								"Seleccionados:",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "font-semibold text-[#0a0a0a]",
									children: selectedKeys === "all" ? "Todos" : totalSeleccionados > 0 ? totalSeleccionados : "Ninguno"
								})
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1.5 self-end sm:self-auto",
						children: [
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								disabled: pagina === 1,
								onClick: () => setPagina((p) => Math.max(1, p - 1)),
								className: `inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${pagina === 1 ? "text-black/30 bg-transparent cursor-not-allowed" : "text-[#0a0a0a] bg-white border border-black/10 hover:bg-[#0064c1] hover:text-white hover:border-[#0064c1] shadow-xs cursor-pointer active:scale-95"}`,
								children: [/* @__PURE__ */ jsx(AltArrowLeftIcon, {
									size: 12,
									strokeWidth: 2.2
								}), "Prev"]
							}),
							Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setPagina(p),
								className: `grid h-8 w-8 place-items-center rounded-lg text-xs font-bold transition-all ${p === pagina ? "bg-[#0064c1] text-white shadow-xs" : "text-[#787774] hover:bg-black/[0.05] hover:text-[#0a0a0a] cursor-pointer"}`,
								children: p
							}, p)),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								disabled: pagina === totalPaginas,
								onClick: () => setPagina((p) => Math.min(totalPaginas, p + 1)),
								className: `inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${pagina === totalPaginas ? "text-black/30 bg-transparent cursor-not-allowed" : "text-[#0a0a0a] bg-white border border-black/10 hover:bg-[#0064c1] hover:text-white hover:border-[#0064c1] shadow-xs cursor-pointer active:scale-95"}`,
								children: ["Next", /* @__PURE__ */ jsx(AltArrowRightIcon, {
									size: 12,
									strokeWidth: 2.2
								})]
							})
						]
					})]
				})]
			}),
			itemAEliminar && montado && typeof document !== "undefined" && createPortal(/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-rise",
				onClick: (e) => {
					if (e.target === e.currentTarget && !eliminando) setItemAEliminar(null);
				},
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 max-w-sm w-full p-6 rounded-[28px] bg-white border border-black/[0.08] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600 font-bold",
								children: /* @__PURE__ */ jsx(DangerTriangleIcon, {
									size: 22,
									strokeWidth: 2
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col min-w-0",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "m-0 text-base font-bold text-[#0a0a0a]",
									children: "¿Eliminar documento?"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs text-[#787774] truncate",
									title: itemAEliminar.titulo,
									children: itemAEliminar.titulo
								})]
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "m-0 text-xs text-[#2f3437] leading-relaxed",
							children: "Se eliminará de forma definitiva del repositorio institucional. Esta acción no se puede deshacer."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: eliminando,
								onClick: () => setItemAEliminar(null),
								className: "px-4 py-2 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: eliminando,
								onClick: confirmarEliminacion,
								className: "px-4 py-2 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-sm cursor-pointer flex items-center gap-1.5",
								children: eliminando ? "Eliminando..." : "Sí, eliminar"
							})]
						})
					]
				})
			}), document.body),
			modalMasivoEliminar && montado && typeof document !== "undefined" && createPortal(/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-rise",
				onClick: (e) => {
					if (e.target === e.currentTarget && !eliminando) setModalMasivoEliminar(false);
				},
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 max-w-sm w-full p-6 rounded-[28px] bg-white border border-black/[0.08] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600 font-bold",
								children: /* @__PURE__ */ jsx(DangerTriangleIcon, {
									size: 22,
									strokeWidth: 2
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "m-0 text-base font-bold text-[#0a0a0a]",
									children: "¿Eliminar seleccionados?"
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-xs text-[#787774]",
									children: [totalSeleccionados, " documentos marcados"]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "m-0 text-xs text-[#2f3437] leading-relaxed",
							children: [
								"¿Deseas eliminar permanentemente los ",
								/* @__PURE__ */ jsxs("strong", { children: [totalSeleccionados, " documentos seleccionados"] }),
								" del repositorio? Esta acción no se puede deshacer."
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: eliminando,
								onClick: () => setModalMasivoEliminar(false),
								className: "px-4 py-2 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: eliminando,
								onClick: confirmarEliminacionMasiva,
								className: "px-4 py-2 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-sm cursor-pointer flex items-center gap-1.5",
								children: eliminando ? "Eliminando..." : "Sí, eliminar grupo"
							})]
						})
					]
				})
			}), document.body)
		]
	});
};
//#endregion
//#region src/modules/repositorio/components/ContenidoAdminRepositorio.astro
var $$ContenidoAdminRepositorio = createComponent(async ($$result, $$props, $$slots) => {
	const documentos = await ServicioRepositorio.obtenerDocumentos();
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise"><div class="pointer-events-none absolute inset-0 z-0 h-[22rem] overflow-hidden opacity-35">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><div class="flex-1 flex flex-col px-6 md:px-12 pt-10 md:pt-14 pb-16 max-w-7xl w-full mx-auto gap-8"><!-- Encabezado --><header class="relative z-10 flex flex-col gap-2 pb-6 border-b border-black/[0.06]"><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]"><span class="h-2 w-2 rounded-full bg-[#0064c1]"></span>Gestión de Producción Científica</div><h1 class="m-0 text-[clamp(2rem,3.4vw,2.8rem)] font-bold text-[#0a0a0a] tracking-[-0.035em] leading-[1.08] mix-blend-multiply opacity-95">Contenido Repositorios</h1><p class="m-0 text-sm text-[#787774] font-medium tracking-tight">Administra, edita, registra y elimina los documentos, libros, artículos científicos y publicaciones del catálogo del Observatorio.</p></header><!-- Tabla con Filtros y Selección Múltiple --><div class="relative z-10 w-full">${renderComponent($$result, "TablaContenidoRepositorio", TablaContenidoRepositorio, {
		"client:load": true,
		"documentosIniciales": documentos,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/repositorio/components/TablaContenidoRepositorio.tsx",
		"client:component-export": "default"
	})}</div></div></div>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/repositorio/components/ContenidoAdminRepositorio.astro", void 0);
//#endregion
//#region src/modules/repositorio/components/FormularioCrearDocumento.tsx
var FormularioCrearDocumento = () => {
	const [titulo, setTitulo] = useState("");
	const [ano, setAno] = useState((/* @__PURE__ */ new Date()).getFullYear().toString());
	const [lineaInvestigacion, setLineaInvestigacion] = useState("");
	const [tipoFuente, setTipoFuente] = useState("Artículo científico");
	const [pais, setPais] = useState("Colombia");
	const [categoria, setCategoria] = useState("");
	const [autorInput, setAutorInput] = useState("");
	const [autores, setAutores] = useState([]);
	const [paginaWebInput, setPaginaWebInput] = useState("");
	const [paginasWeb, setPaginasWeb] = useState([]);
	const [resumen, setResumen] = useState("");
	const [referenciaApa, setReferenciaApa] = useState("");
	const [guardando, setGuardando] = useState(false);
	const agregarAutor = () => {
		const limpio = autorInput.trim();
		if (limpio && !autores.includes(limpio)) {
			setAutores([...autores, limpio]);
			setAutorInput("");
		}
	};
	const removerAutor = (nombre) => {
		setAutores(autores.filter((a) => a !== nombre));
	};
	const agregarPaginaWeb = () => {
		let limpio = paginaWebInput.trim();
		if (!limpio) return;
		if (!limpio.startsWith("http://") && !limpio.startsWith("https://")) limpio = `https://${limpio}`;
		if (!paginasWeb.includes(limpio)) {
			setPaginasWeb([...paginasWeb, limpio]);
			setPaginaWebInput("");
		}
	};
	const removerPaginaWeb = (url) => {
		setPaginasWeb(paginasWeb.filter((p) => p !== url));
	};
	const manejarSubmit = async (e) => {
		e.preventDefault();
		if (!titulo.trim() || !lineaInvestigacion.trim() || !ano.trim() || !pais.trim()) {
			toast.danger("Campos obligatorios", { description: "Por favor completa el título, línea de investigación, año y país." });
			return;
		}
		setGuardando(true);
		try {
			const resp = await fetch("/api/repositorio", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
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
					referenciaApa: referenciaApa.trim() || null
				})
			});
			if (!resp.ok) {
				const errorData = await resp.json().catch(() => ({}));
				throw new Error(errorData.error || "No se pudo guardar el documento.");
			}
			toast.success("Documento registrado", { description: `"${titulo}" se ha agregado exitosamente al repositorio.` });
			setTimeout(() => {
				window.location.href = "/dashboard/contenido-repositorio";
			}, 1e3);
		} catch (err) {
			toast.danger("Error al registrar", { description: err.message || "Ocurrió un error inesperado al guardar." });
			setGuardando(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col w-full gap-8 max-w-6xl mx-auto",
		children: [
			/* @__PURE__ */ jsx(Toast.Provider, { placement: "top" }),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center",
				children: /* @__PURE__ */ jsxs("a", {
					href: "/dashboard/contenido-repositorio",
					className: "group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-[#0064c1] bg-white border border-[#0064c1]/20 hover:bg-[#0064c1] hover:text-white shadow-[0_2px_10px_-2px_rgba(0,100,193,0.14)] hover:shadow-[0_4px_16px_-2px_rgba(0,100,193,0.3)] transition-all duration-200 active:scale-95 cursor-pointer",
					children: [/* @__PURE__ */ jsx(AltArrowLeftIcon, {
						size: 16,
						strokeWidth: 2.5,
						className: "transition-transform duration-200 group-hover:-translate-x-1"
					}), /* @__PURE__ */ jsx("span", { children: "Volver a Contenido Repositorios" })]
				})
			}),
			/* @__PURE__ */ jsxs("header", {
				className: "flex flex-col gap-2 pb-6 border-b border-black/[0.06]",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]",
						children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-[#0064c1]" }), "Producción Científica"]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "m-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-tight mix-blend-multiply opacity-95",
						children: "Registrar Nuevo Documento en Repositorio"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "m-0 text-sm text-[#787774] font-medium tracking-tight",
						children: "Agrega artículos, libros, informes o investigaciones al catálogo institucional del Observatorio."
					})
				]
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: manejarSubmit,
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-7 flex flex-col gap-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 pb-2 border-b border-black/[0.05]",
									children: [/* @__PURE__ */ jsx("span", {
										className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
										children: "1"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
										children: "Datos Principales"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["Título del documento / investigación:", /* @__PURE__ */ jsx("input", {
										type: "text",
										value: titulo,
										onChange: (e) => setTitulo(e.target.value),
										placeholder: "Ej. Comportamiento de los estudios globales sobre migración...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]",
										required: true
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1.5 font-semibold text-[#0a0a0a]",
										children: ["Línea de investigación:", /* @__PURE__ */ jsx("input", {
											type: "text",
											value: lineaInvestigacion,
											onChange: (e) => setLineaInvestigacion(e.target.value),
											placeholder: "Ej. Migración Latinoamericana, Educación...",
											className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]",
											required: true
										})]
									}), /* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1.5 font-semibold text-[#0a0a0a]",
										children: ["Año de publicación:", /* @__PURE__ */ jsx("input", {
											type: "text",
											value: ano,
											onChange: (e) => setAno(e.target.value),
											placeholder: "Ej. 2026",
											className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] font-mono",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1.5 font-semibold text-[#0a0a0a]",
										children: ["Tipo de fuente:", /* @__PURE__ */ jsx("input", {
											type: "text",
											value: tipoFuente,
											onChange: (e) => setTipoFuente(e.target.value),
											placeholder: "Ej. Artículo científico, Libro, Informe técnico...",
											className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]",
											required: true
										})]
									}), /* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1.5 font-semibold text-[#0a0a0a]",
										children: ["País:", /* @__PURE__ */ jsx("input", {
											type: "text",
											value: pais,
											onChange: (e) => setPais(e.target.value),
											placeholder: "Ej. Colombia, México, Chile...",
											className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["Categoría:", /* @__PURE__ */ jsx("input", {
										type: "text",
										value: categoria,
										onChange: (e) => setCategoria(e.target.value),
										placeholder: "Ej. Migración y Fronteras, Derechos Humanos, Economía...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]"
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4 pt-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 pb-2 border-b border-black/[0.05]",
								children: [/* @__PURE__ */ jsx("span", {
									className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
									children: "2"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
									children: "Autores / Investigadores"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2.5",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("input", {
										type: "text",
										value: autorInput,
										onChange: (e) => setAutorInput(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												agregarAutor();
											}
										},
										placeholder: "Nombre y apellidos del autor (presiona Enter)...",
										className: "flex-1 px-4 py-2.5 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]"
									}), /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: agregarAutor,
										className: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0064c1] hover:bg-[#0052a3] transition-all cursor-pointer shadow-xs active:scale-95",
										children: [/* @__PURE__ */ jsx(AddCircleIcon, {
											size: 14,
											strokeWidth: 2
										}), /* @__PURE__ */ jsx("span", { children: "Añadir" })]
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap gap-2 min-h-[36px] p-2.5 rounded-xl bg-black/[0.02] border border-black/[0.06]",
									children: autores.length === 0 ? /* @__PURE__ */ jsx("span", {
										className: "text-xs text-[#787774] italic",
										children: "No se han añadido autores aún. Escribe el nombre arriba y haz clic en Añadir."
									}) : autores.map((autor) => /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/10 shadow-2xs text-xs font-medium text-[#0a0a0a]",
										children: [
											/* @__PURE__ */ jsx(UsersGroupRoundedIcon, {
												size: 13,
												className: "text-[#0064c1]"
											}),
											/* @__PURE__ */ jsx("span", { children: autor }),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => removerAutor(autor),
												className: "text-[#787774] hover:text-red-600 transition-colors cursor-pointer",
												title: "Eliminar autor",
												children: /* @__PURE__ */ jsx(CloseCircleIcon, { size: 13 })
											})
										]
									}, autor))
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4 pt-2",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 pb-2 border-b border-black/[0.05]",
									children: [/* @__PURE__ */ jsx("span", {
										className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
										children: "3"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
										children: "Resumen, Páginas Web y Referencia APA"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["Resumen / Abstract del documento:", /* @__PURE__ */ jsx("textarea", {
										rows: 4,
										value: resumen,
										onChange: (e) => setResumen(e.target.value),
										placeholder: "Descripción concisa de la investigación, metodología y hallazgos principales...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] resize-none leading-relaxed"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["Referencia bibliográfica en formato APA:", /* @__PURE__ */ jsx("textarea", {
										rows: 2,
										value: referenciaApa,
										onChange: (e) => setReferenciaApa(e.target.value),
										placeholder: "Ej. Sarango, A. F. H. (2026). Comportamiento de los estudios globales... Bitácora Urbano Territorial, 34(1).",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] resize-none font-serif leading-relaxed"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-2.5",
									children: [
										/* @__PURE__ */ jsx("label", {
											className: "text-xs font-semibold text-[#0a0a0a]",
											children: "Páginas web / Enlaces del documento:"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "relative flex-1",
												children: [/* @__PURE__ */ jsx("span", {
													className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-[#787774]",
													children: /* @__PURE__ */ jsx(GlobeIcon, { size: 14 })
												}), /* @__PURE__ */ jsx("input", {
													type: "text",
													value: paginaWebInput,
													onChange: (e) => setPaginaWebInput(e.target.value),
													onKeyDown: (e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															agregarPaginaWeb();
														}
													},
													placeholder: "https://... o dominio (presiona Enter)...",
													className: "w-full pl-9 pr-4 py-2.5 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] font-mono"
												})]
											}), /* @__PURE__ */ jsxs("button", {
												type: "button",
												onClick: agregarPaginaWeb,
												className: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0064c1] hover:bg-[#0052a3] transition-all cursor-pointer shadow-xs active:scale-95 shrink-0",
												children: [/* @__PURE__ */ jsx(AddCircleIcon, {
													size: 14,
													strokeWidth: 2
												}), /* @__PURE__ */ jsx("span", { children: "Añadir enlace" })]
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex flex-wrap gap-2 min-h-[36px] p-2.5 rounded-xl bg-black/[0.02] border border-black/[0.06]",
											children: paginasWeb.length === 0 ? /* @__PURE__ */ jsx("span", {
												className: "text-xs text-[#787774] italic",
												children: "No has añadido páginas web. Puedes añadir varias ingresando la URL y haciendo clic en Añadir."
											}) : paginasWeb.map((paginaUrl) => /* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/10 shadow-2xs text-xs font-medium text-[#0064c1] max-w-full font-mono",
												children: [
													/* @__PURE__ */ jsx(LinkRoundIcon, {
														size: 13,
														className: "shrink-0"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "truncate max-w-[280px]",
														children: paginaUrl
													}),
													/* @__PURE__ */ jsx("button", {
														type: "button",
														onClick: () => removerPaginaWeb(paginaUrl),
														className: "text-[#787774] hover:text-red-600 transition-colors cursor-pointer shrink-0 ml-1",
														title: "Eliminar enlace",
														children: /* @__PURE__ */ jsx(CloseCircleIcon, { size: 13 })
													})
												]
											}, paginaUrl))
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-3 pt-6 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("a", {
								href: "/dashboard/contenido-repositorio",
								className: "px-5 py-2.5 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: guardando,
								className: `group/btn relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-white text-xs font-semibold tracking-[-0.01em] transition-all duration-300 active:scale-[0.985] shadow-sm ${guardando ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`,
								style: {
									backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
									boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
								},
								children: guardando ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", { className: "h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" }), /* @__PURE__ */ jsx("span", {
									className: "relative z-10",
									children: "Guardando documento..."
								})] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
									className: "relative z-10",
									children: "Guardar en Repositorio"
								}), /* @__PURE__ */ jsx(ArrowRightIcon, {
									size: 14,
									strokeWidth: 2,
									className: "relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5"
								})] })
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-5 flex flex-col gap-4 sticky top-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-between pb-2 border-b border-black/[0.05]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
								children: "✓"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
								children: "Previsualización de Tarjeta"
							})]
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative flex flex-col justify-between rounded-[28px] p-6 bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between gap-2 flex-wrap",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1.5 flex-wrap",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-[#0064c1] bg-[#0064c1]/10 px-3 py-1 rounded-full",
											children: [/* @__PURE__ */ jsx(BookBookmarkIcon, {
												size: 12,
												strokeWidth: 2
											}), lineaInvestigacion || "Línea de investigación"]
										}), categoria && /* @__PURE__ */ jsx("span", {
											className: "inline-flex items-center text-[0.68rem] font-bold text-[#787774] bg-black/[0.04] px-2.5 py-0.5 rounded-full",
											children: categoria
										})]
									}), /* @__PURE__ */ jsx("span", {
										className: "font-mono text-xs font-bold text-[#787774] bg-black/[0.04] px-2.5 py-0.5 rounded-full",
										children: ano || "2026"
									})]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "m-0 text-base font-bold text-[#0a0a0a] leading-snug tracking-tight line-clamp-3",
									children: titulo || "Título del documento o investigación científica"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "m-0 text-xs text-[#787774] line-clamp-3 leading-relaxed",
									children: resumen || "Aquí se mostrará el resumen estructurado de la publicación cuando lo ingreses en el formulario..."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5 text-xs text-[#2f3437] font-medium pt-2 border-t border-black/[0.05]",
									children: [/* @__PURE__ */ jsx(UsersGroupRoundedIcon, {
										size: 14,
										className: "text-[#0064c1] shrink-0"
									}), /* @__PURE__ */ jsx("span", {
										className: "truncate",
										children: autores.length > 0 ? autores.join(", ") : "Autores del documento"
									})]
								}),
								paginasWeb.length > 0 && /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5 text-xs text-[#0064c1] font-mono pt-1",
									children: [/* @__PURE__ */ jsx(GlobeIcon, {
										size: 13,
										className: "shrink-0"
									}), /* @__PURE__ */ jsxs("span", {
										className: "truncate",
										children: [
											paginasWeb.length,
											" enlace",
											paginasWeb.length > 1 ? "s" : "",
											" web disponible",
											paginasWeb.length > 1 ? "s" : ""
										]
									})]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between gap-2 pt-3 border-t border-black/[0.05] text-xs",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1 text-[#787774]",
								children: [
									/* @__PURE__ */ jsx(GlobeIcon, { size: 12 }),
									pais || "País",
									" • ",
									tipoFuente
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-1 text-xs font-bold text-[#0064c1]",
								children: [/* @__PURE__ */ jsx("span", { children: "Ver ficha" }), /* @__PURE__ */ jsx(ArrowRightIcon, {
									size: 12,
									strokeWidth: 2
								})]
							})]
						})]
					})]
				})]
			})
		]
	});
};
//#endregion
//#region src/modules/repositorio/components/FormularioEditarDocumento.tsx
var FormularioEditarDocumento = ({ documento }) => {
	const [titulo, setTitulo] = useState(documento.titulo);
	const [ano, setAno] = useState(documento.ano);
	const [lineaInvestigacion, setLineaInvestigacion] = useState(documento.lineaInvestigacion);
	const [tipoFuente, setTipoFuente] = useState(documento.tipoFuente);
	const [pais, setPais] = useState(documento.pais);
	const [categoria, setCategoria] = useState(documento.categoria || "");
	const [autorInput, setAutorInput] = useState("");
	const [autores, setAutores] = useState(documento.autores || []);
	const [paginaWebInput, setPaginaWebInput] = useState("");
	const [paginasWeb, setPaginasWeb] = useState(documento.paginasWeb && documento.paginasWeb.length > 0 ? documento.paginasWeb : documento.enlaceDocumento ? [documento.enlaceDocumento] : []);
	const [resumen, setResumen] = useState(documento.resumen || "");
	const [referenciaApa, setReferenciaApa] = useState(documento.referenciaApa || "");
	const [guardando, setGuardando] = useState(false);
	const agregarAutor = () => {
		const limpio = autorInput.trim();
		if (limpio && !autores.includes(limpio)) {
			setAutores([...autores, limpio]);
			setAutorInput("");
		}
	};
	const removerAutor = (nombre) => {
		setAutores(autores.filter((a) => a !== nombre));
	};
	const agregarPaginaWeb = () => {
		let limpio = paginaWebInput.trim();
		if (!limpio) return;
		if (!limpio.startsWith("http://") && !limpio.startsWith("https://")) limpio = `https://${limpio}`;
		if (!paginasWeb.includes(limpio)) {
			setPaginasWeb([...paginasWeb, limpio]);
			setPaginaWebInput("");
		}
	};
	const removerPaginaWeb = (url) => {
		setPaginasWeb(paginasWeb.filter((p) => p !== url));
	};
	const manejarSubmit = async (e) => {
		e.preventDefault();
		if (!titulo.trim() || !lineaInvestigacion.trim() || !ano.trim() || !pais.trim()) {
			toast.danger("Campos obligatorios", { description: "Por favor completa el título, línea de investigación, año y país." });
			return;
		}
		setGuardando(true);
		try {
			const resp = await fetch(`/api/repositorio/${documento.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
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
					referenciaApa: referenciaApa.trim() || null
				})
			});
			if (!resp.ok) {
				const errorData = await resp.json().catch(() => ({}));
				throw new Error(errorData.error || "No se pudo actualizar el documento.");
			}
			toast.success("Documento actualizado", { description: `Los cambios en "${titulo}" se han guardado exitosamente.` });
			setTimeout(() => {
				window.location.href = "/dashboard/contenido-repositorio";
			}, 1e3);
		} catch (err) {
			toast.danger("Error al actualizar", { description: err.message || "Ocurrió un error inesperado al actualizar." });
			setGuardando(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col w-full gap-8 max-w-6xl mx-auto",
		children: [
			/* @__PURE__ */ jsx(Toast.Provider, { placement: "top" }),
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center",
				children: /* @__PURE__ */ jsxs("a", {
					href: "/dashboard/contenido-repositorio",
					className: "group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-[#0064c1] bg-white border border-[#0064c1]/20 hover:bg-[#0064c1] hover:text-white shadow-[0_2px_10px_-2px_rgba(0,100,193,0.14)] hover:shadow-[0_4px_16px_-2px_rgba(0,100,193,0.3)] transition-all duration-200 active:scale-95 cursor-pointer",
					children: [/* @__PURE__ */ jsx(AltArrowLeftIcon, {
						size: 16,
						strokeWidth: 2.5,
						className: "transition-transform duration-200 group-hover:-translate-x-1"
					}), /* @__PURE__ */ jsx("span", { children: "Volver a Contenido Repositorios" })]
				})
			}),
			/* @__PURE__ */ jsxs("header", {
				className: "flex flex-col gap-2 pb-6 border-b border-black/[0.06]",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]",
						children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-[#0064c1]" }), "Edición de Documento"]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "m-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-tight mix-blend-multiply opacity-95",
						children: "Editar Documento del Repositorio"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "m-0 text-sm text-[#787774] font-medium tracking-tight",
						children: "Actualiza los metadatos, categoría, resumen, autores o páginas web asociadas."
					})
				]
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: manejarSubmit,
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-7 flex flex-col gap-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 pb-2 border-b border-black/[0.05]",
									children: [/* @__PURE__ */ jsx("span", {
										className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
										children: "1"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
										children: "Datos Principales"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["Título del documento / investigación:", /* @__PURE__ */ jsx("input", {
										type: "text",
										value: titulo,
										onChange: (e) => setTitulo(e.target.value),
										placeholder: "Título del documento...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]",
										required: true
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1.5 font-semibold text-[#0a0a0a]",
										children: ["Línea de investigación:", /* @__PURE__ */ jsx("input", {
											type: "text",
											value: lineaInvestigacion,
											onChange: (e) => setLineaInvestigacion(e.target.value),
											placeholder: "Ej. Migración Latinoamericana...",
											className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]",
											required: true
										})]
									}), /* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1.5 font-semibold text-[#0a0a0a]",
										children: ["Año de publicación:", /* @__PURE__ */ jsx("input", {
											type: "text",
											value: ano,
											onChange: (e) => setAno(e.target.value),
											placeholder: "Ej. 2026",
											className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] font-mono",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1.5 font-semibold text-[#0a0a0a]",
										children: ["Tipo de fuente:", /* @__PURE__ */ jsx("input", {
											type: "text",
											value: tipoFuente,
											onChange: (e) => setTipoFuente(e.target.value),
											placeholder: "Ej. Artículo científico, Libro, Informe técnico...",
											className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]",
											required: true
										})]
									}), /* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1.5 font-semibold text-[#0a0a0a]",
										children: ["País:", /* @__PURE__ */ jsx("input", {
											type: "text",
											value: pais,
											onChange: (e) => setPais(e.target.value),
											placeholder: "Ej. Colombia, México, Chile...",
											className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["Categoría:", /* @__PURE__ */ jsx("input", {
										type: "text",
										value: categoria,
										onChange: (e) => setCategoria(e.target.value),
										placeholder: "Ej. Migración y Fronteras, Derechos Humanos, Economía...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]"
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4 pt-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 pb-2 border-b border-black/[0.05]",
								children: [/* @__PURE__ */ jsx("span", {
									className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
									children: "2"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
									children: "Autores / Investigadores"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-2.5",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("input", {
										type: "text",
										value: autorInput,
										onChange: (e) => setAutorInput(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												agregarAutor();
											}
										},
										placeholder: "Nombre y apellidos del autor...",
										className: "flex-1 px-4 py-2.5 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]"
									}), /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: agregarAutor,
										className: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0064c1] hover:bg-[#0052a3] transition-all cursor-pointer shadow-xs active:scale-95",
										children: [/* @__PURE__ */ jsx(AddCircleIcon, {
											size: 14,
											strokeWidth: 2
										}), /* @__PURE__ */ jsx("span", { children: "Añadir" })]
									})]
								}), /* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap gap-2 min-h-[36px] p-2.5 rounded-xl bg-black/[0.02] border border-black/[0.06]",
									children: autores.length === 0 ? /* @__PURE__ */ jsx("span", {
										className: "text-xs text-[#787774] italic",
										children: "Sin autores asignados. Escribe el nombre arriba y haz clic en Añadir."
									}) : autores.map((autor) => /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/10 shadow-2xs text-xs font-medium text-[#0a0a0a]",
										children: [
											/* @__PURE__ */ jsx(UsersGroupRoundedIcon, {
												size: 13,
												className: "text-[#0064c1]"
											}),
											/* @__PURE__ */ jsx("span", { children: autor }),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => removerAutor(autor),
												className: "text-[#787774] hover:text-red-600 transition-colors cursor-pointer",
												title: "Eliminar autor",
												children: /* @__PURE__ */ jsx(CloseCircleIcon, { size: 13 })
											})
										]
									}, autor))
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4 pt-2",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 pb-2 border-b border-black/[0.05]",
									children: [/* @__PURE__ */ jsx("span", {
										className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
										children: "3"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
										children: "Resumen, Páginas Web y Referencia APA"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["Resumen / Abstract del documento:", /* @__PURE__ */ jsx("textarea", {
										rows: 4,
										value: resumen,
										onChange: (e) => setResumen(e.target.value),
										placeholder: "Resumen del documento...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] resize-none leading-relaxed"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["Referencia bibliográfica en formato APA:", /* @__PURE__ */ jsx("textarea", {
										rows: 2,
										value: referenciaApa,
										onChange: (e) => setReferenciaApa(e.target.value),
										placeholder: "Referencia bibliográfica...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] resize-none font-serif leading-relaxed"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-2.5",
									children: [
										/* @__PURE__ */ jsx("label", {
											className: "text-xs font-semibold text-[#0a0a0a]",
											children: "Páginas web / Enlaces del documento:"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "relative flex-1",
												children: [/* @__PURE__ */ jsx("span", {
													className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-[#787774]",
													children: /* @__PURE__ */ jsx(GlobeIcon, { size: 14 })
												}), /* @__PURE__ */ jsx("input", {
													type: "text",
													value: paginaWebInput,
													onChange: (e) => setPaginaWebInput(e.target.value),
													onKeyDown: (e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															agregarPaginaWeb();
														}
													},
													placeholder: "https://... o dominio (presiona Enter)...",
													className: "w-full pl-9 pr-4 py-2.5 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] font-mono"
												})]
											}), /* @__PURE__ */ jsxs("button", {
												type: "button",
												onClick: agregarPaginaWeb,
												className: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0064c1] hover:bg-[#0052a3] transition-all cursor-pointer shadow-xs active:scale-95 shrink-0",
												children: [/* @__PURE__ */ jsx(AddCircleIcon, {
													size: 14,
													strokeWidth: 2
												}), /* @__PURE__ */ jsx("span", { children: "Añadir enlace" })]
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex flex-wrap gap-2 min-h-[36px] p-2.5 rounded-xl bg-black/[0.02] border border-black/[0.06]",
											children: paginasWeb.length === 0 ? /* @__PURE__ */ jsx("span", {
												className: "text-xs text-[#787774] italic",
												children: "No has añadido páginas web. Puedes añadir varias ingresando la URL y haciendo clic en Añadir."
											}) : paginasWeb.map((paginaUrl) => /* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/10 shadow-2xs text-xs font-medium text-[#0064c1] max-w-full font-mono",
												children: [
													/* @__PURE__ */ jsx(LinkRoundIcon, {
														size: 13,
														className: "shrink-0"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "truncate max-w-[280px]",
														children: paginaUrl
													}),
													/* @__PURE__ */ jsx("button", {
														type: "button",
														onClick: () => removerPaginaWeb(paginaUrl),
														className: "text-[#787774] hover:text-red-600 transition-colors cursor-pointer shrink-0 ml-1",
														title: "Eliminar enlace",
														children: /* @__PURE__ */ jsx(CloseCircleIcon, { size: 13 })
													})
												]
											}, paginaUrl))
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-3 pt-6 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("a", {
								href: "/dashboard/contenido-repositorio",
								className: "px-5 py-2.5 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: guardando,
								className: `group/btn relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-white text-xs font-semibold tracking-[-0.01em] transition-all duration-300 active:scale-[0.985] shadow-sm ${guardando ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`,
								style: {
									backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
									boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
								},
								children: guardando ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", { className: "h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" }), /* @__PURE__ */ jsx("span", {
									className: "relative z-10",
									children: "Guardando cambios..."
								})] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
									className: "relative z-10",
									children: "Guardar cambios"
								}), /* @__PURE__ */ jsx(ArrowRightIcon, {
									size: 14,
									strokeWidth: 2,
									className: "relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5"
								})] })
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-5 flex flex-col gap-4 sticky top-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-between pb-2 border-b border-black/[0.05]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
								children: "✓"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
								children: "Previsualización Actualizada"
							})]
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative flex flex-col justify-between rounded-[28px] p-6 bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between gap-2 flex-wrap",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1.5 flex-wrap",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-[#0064c1] bg-[#0064c1]/10 px-3 py-1 rounded-full",
											children: [/* @__PURE__ */ jsx(BookBookmarkIcon, {
												size: 12,
												strokeWidth: 2
											}), lineaInvestigacion || "Línea de investigación"]
										}), categoria && /* @__PURE__ */ jsx("span", {
											className: "inline-flex items-center text-[0.68rem] font-bold text-[#787774] bg-black/[0.04] px-2.5 py-0.5 rounded-full",
											children: categoria
										})]
									}), /* @__PURE__ */ jsx("span", {
										className: "font-mono text-xs font-bold text-[#787774] bg-black/[0.04] px-2.5 py-0.5 rounded-full",
										children: ano || "2026"
									})]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "m-0 text-base font-bold text-[#0a0a0a] leading-snug tracking-tight line-clamp-3",
									children: titulo || "Título del documento"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "m-0 text-xs text-[#787774] line-clamp-3 leading-relaxed",
									children: resumen || "Resumen del documento..."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5 text-xs text-[#2f3437] font-medium pt-2 border-t border-black/[0.05]",
									children: [/* @__PURE__ */ jsx(UsersGroupRoundedIcon, {
										size: 14,
										className: "text-[#0064c1] shrink-0"
									}), /* @__PURE__ */ jsx("span", {
										className: "truncate",
										children: autores.length > 0 ? autores.join(", ") : "Sin autores"
									})]
								}),
								paginasWeb.length > 0 && /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5 text-xs text-[#0064c1] font-mono pt-1",
									children: [/* @__PURE__ */ jsx(GlobeIcon, {
										size: 13,
										className: "shrink-0"
									}), /* @__PURE__ */ jsxs("span", {
										className: "truncate",
										children: [
											paginasWeb.length,
											" enlace",
											paginasWeb.length > 1 ? "s" : "",
											" web disponible",
											paginasWeb.length > 1 ? "s" : ""
										]
									})]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between gap-2 pt-3 border-t border-black/[0.05] text-xs",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1 text-[#787774]",
								children: [
									/* @__PURE__ */ jsx(GlobeIcon, { size: 12 }),
									pais || "País",
									" • ",
									tipoFuente
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-1 text-xs font-bold text-[#0064c1]",
								children: [/* @__PURE__ */ jsx("span", { children: "Ver ficha" }), /* @__PURE__ */ jsx(ArrowRightIcon, {
									size: 12,
									strokeWidth: 2
								})]
							})]
						})]
					})]
				})]
			})
		]
	});
};
//#endregion
export { $$ContenidoRepositorio as a, $$DetalleDocumentoRepositorio as i, FormularioCrearDocumento as n, $$ContenidoAdminRepositorio as r, FormularioEditarDocumento as t };
