import { E as maybeRenderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent, x as Fragment } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { r as renderScript, t as $$SkyShader } from "./SkyShader_DL8DbueI.mjs";
import { t as ServicioContenidoFeed } from "./contenido-feed.service_C9sUPp6G.mjs";
import { AddCircleIcon, ArrowRightIcon, ClockCircleIcon, LikeIcon, LinkIcon, NotesIcon, PlayIcon, RoundedMagnifierZoomInIcon, StarsMinimalisticIcon, VideocameraIcon } from "@solar-icons/react/outline";
//#region src/modules/dashboard/services/dashboard.service.ts
/**
* Servicio del Dashboard
* Conecta directamente con la base de datos de Supabase para obtener las noticias y videos reales publicados.
*/
var ServicioDashboard = class {
	static async obtenerDatosHome() {
		try {
			const itemsFeed = await ServicioContenidoFeed.obtenerItems();
			return {
				usuarioNombre: "Usuario",
				noticias: itemsFeed.filter((item) => item.tipo === "noticia" && item.estado === "Publicado").sort((a, b) => {
					if (Boolean(a.destacado) && !Boolean(b.destacado)) return -1;
					if (!Boolean(a.destacado) && Boolean(b.destacado)) return 1;
					return 0;
				}).map((item) => {
					let minutosLectura = 4;
					if (item.duracionOLectura) {
						const match = item.duracionOLectura.match(/(\d+)/);
						if (match) minutosLectura = parseInt(match[1], 10);
					}
					return {
						id: item.id,
						fecha: item.fechaPublicacion || "Actual",
						categoria: item.categoria || "Actualidad",
						titulo: item.titulo,
						descripcion: item.descripcion || "",
						enlace: item.enlace,
						imagen: item.imagen,
						fuente: item.fuenteOCanal || "Web",
						lecturaMinutos: minutosLectura,
						destacado: Boolean(item.destacado),
						likesCount: item.likesCount || 0,
						dislikesCount: item.dislikesCount || 0
					};
				}),
				videos: itemsFeed.filter((item) => item.tipo === "youtube" && item.estado === "Publicado").sort((a, b) => {
					if (Boolean(a.destacado) && !Boolean(b.destacado)) return -1;
					if (!Boolean(a.destacado) && Boolean(b.destacado)) return 1;
					return 0;
				}).map((item) => ({
					id: item.id,
					titulo: item.titulo,
					duracion: item.duracionOLectura || "Video",
					canal: item.fuenteOCanal || "YouTube",
					enlace: item.enlace,
					imagenMiniatura: item.imagen,
					etiqueta: item.categoria || "YouTube",
					descripcion: item.descripcion || `Publicado por ${item.fuenteOCanal || "YouTube"}.`,
					destacado: item.destacado || false,
					likesCount: item.likesCount || 0,
					dislikesCount: item.dislikesCount || 0
				}))
			};
		} catch (error) {
			console.error("Error al obtener datos reales del feed en ServicioDashboard:", error);
			return {
				usuarioNombre: "Usuario",
				noticias: [],
				videos: []
			};
		}
	}
};
//#endregion
//#region src/modules/dashboard/components/CardNewsCarousel.astro
createAstro("https://astro.build");
var $$CardNewsCarousel = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CardNewsCarousel;
	const { noticias = [] } = Astro.props;
	const item = noticias[0];
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex flex-col justify-between rounded-[32px] p-6 md:p-8 bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-300 group/card min-h-[440px]"><!-- Efecto de volumen 3D superior y glow celeste --><div class="absolute inset-x-8 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0064c1]/50 to-transparent pointer-events-none"></div><!-- Header de la Card --><div class="flex items-center justify-between gap-4 pb-4 border-b border-black/[0.06]"><div class="flex items-center gap-3"><span class="grid h-11 w-11 place-items-center rounded-2xl text-white shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);">${renderComponent($$result, "NotesIcon", NotesIcon, {
		"size": 22,
		"strokeWidth": 1.8
	})}</span><div class="flex flex-col"><span class="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#0064c1]">Novedades</span><h3 class="m-0 text-lg font-bold text-[#0a0a0a] tracking-tight">News Feed</h3></div></div></div><!-- Contenido de la Noticia Destacada / Más Reciente -->${!item ? renderTemplate`<div class="flex flex-col items-center justify-center my-8 p-6 text-center gap-3"><div class="grid h-12 w-12 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1]">${renderComponent($$result, "NotesIcon", NotesIcon, {
		"size": 24,
		"strokeWidth": 1.5
	})}</div><div class="flex flex-col gap-1"><h4 class="m-0 text-sm font-bold text-[#0a0a0a]">No hay noticias en el feed</h4><p class="m-0 text-xs text-[#787774]">Las noticias publicadas aparecerán aquí automáticamente.</p></div><a href="/dashboard/contenido-feed/nuevo" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#0064c1] bg-[#0064c1]/10 hover:bg-[#0064c1]/15 transition-all mt-1">${renderComponent($$result, "AddCircleIcon", AddCircleIcon, {
		"size": 14,
		"strokeWidth": 2
	})}<span>Cargar noticia</span></a></div>` : renderTemplate`<div class="flex flex-col gap-4 my-5"><!-- Badges y Metadatos --><div class="flex items-center justify-between gap-2 text-xs font-semibold text-[#787774]"><div class="flex items-center gap-2 flex-wrap"><span class="inline-flex items-center gap-1 text-[#0064c1] font-bold uppercase tracking-wider text-[0.68rem] bg-[#0064c1]/[0.08] px-2.5 py-0.5 rounded-full">${renderComponent($$result, "StarsMinimalisticIcon", StarsMinimalisticIcon, {
		"size": 13,
		"strokeWidth": 2
	})}${item.categoria}</span>${item.destacado && renderTemplate`<span class="inline-flex items-center gap-1 text-amber-700 font-bold uppercase tracking-wider text-[0.66rem] bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full shadow-xs">★ Destacado</span>`}<span>•</span><span class="truncate">${item.fecha}</span></div>${item.fuente && renderTemplate`<span class="inline-flex items-center gap-1 text-[0.7rem] text-[#787774] font-medium">${renderComponent($$result, "LinkIcon", LinkIcon, {
		"size": 13,
		"strokeWidth": 1.5
	})}${item.fuente}</span>`}</div><!-- Portada limpia sin recuadros pesados -->${item.imagen && renderTemplate`<div class="relative w-full h-44 sm:h-48 overflow-hidden rounded-2xl bg-black/5 shadow-xs"><img${addAttribute(item.imagen, "src")}${addAttribute(item.titulo, "alt")} class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-105" loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>${item.fuente && renderTemplate`<span class="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 text-[0.72rem] text-white/95 font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">${renderComponent($$result, "LinkIcon", LinkIcon, {
		"size": 12,
		"strokeWidth": 2
	})}${item.fuente}</span>`}</div>`}<!-- Título y Descripción integrados naturalmente --><div class="flex flex-col gap-1.5"><h4 class="m-0 text-base md:text-[1.12rem] font-bold text-[#0a0a0a] tracking-tight leading-snug group-hover/card:text-[#0064c1] transition-colors duration-300 line-clamp-2">${item.titulo}</h4><p class="m-0 text-xs md:text-sm text-[#2f3437] leading-relaxed line-clamp-2">${item.descripcion}</p></div></div>`}<!-- Footer con botón de acción y tiempo estimado --><div class="pt-4 border-t border-black/[0.06] flex items-center justify-between gap-4 mt-auto"><div class="flex items-center gap-1.5 text-xs text-[#787774] font-medium">${renderComponent($$result, "ClockCircleIcon", ClockCircleIcon, {
		"size": 15,
		"strokeWidth": 1.8,
		"className": "text-[#0064c1]"
	})}<span class="font-mono text-[0.75rem]">${item?.lecturaMinutos || 4} min de lectura</span></div>${item ? renderTemplate`<a${addAttribute(item.enlace || "/dashboard/news", "href")}${addAttribute(item.enlace?.startsWith("http") ? "_blank" : "_self", "target")} rel="noopener noreferrer" class="group/btn relative inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);"><span class="relative z-10">Leer noticia</span>${renderComponent($$result, "ArrowRightIcon", ArrowRightIcon, {
		"size": 14,
		"strokeWidth": 2,
		"className": "relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5"
	})}</a>` : renderTemplate`<a href="/dashboard/news" class="inline-flex items-center gap-1.5 text-xs text-[#0064c1] font-semibold hover:underline"><span>Ir a News Feed</span>${renderComponent($$result, "ArrowRightIcon", ArrowRightIcon, {
		"size": 14,
		"strokeWidth": 2
	})}</a>`}</div></div>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/dashboard/components/CardNewsCarousel.astro", void 0);
//#endregion
//#region src/modules/dashboard/components/CardYoutubeCarousel.astro
createAstro("https://astro.build");
var $$CardYoutubeCarousel = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CardYoutubeCarousel;
	const { videos = [] } = Astro.props;
	const item = videos[0];
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex flex-col justify-between rounded-[32px] p-6 md:p-8 bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-300 group/card min-h-[440px]"><!-- Efecto de volumen 3D superior y glow celeste (idéntico a News Feed) --><div class="absolute inset-x-8 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0064c1]/50 to-transparent pointer-events-none"></div><!-- Header de la Card con color azul unificado --><div class="flex items-center justify-between gap-4 pb-4 border-b border-black/[0.06]"><div class="flex items-center gap-3"><span class="grid h-11 w-11 place-items-center rounded-2xl text-white shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);">${renderComponent($$result, "VideocameraIcon", VideocameraIcon, {
		"size": 22,
		"strokeWidth": 1.8
	})}</span><div class="flex flex-col"><span class="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#0064c1]">Para ver y aprender</span><h3 class="m-0 text-lg font-bold text-[#0a0a0a] tracking-tight">YouTube Feed</h3></div></div></div><!-- Contenido del Video Destacado / Más Reciente -->${!item ? renderTemplate`<div class="flex flex-col items-center justify-center my-8 p-6 text-center gap-3"><div class="grid h-12 w-12 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1]">${renderComponent($$result, "VideocameraIcon", VideocameraIcon, {
		"size": 24,
		"strokeWidth": 1.5
	})}</div><div class="flex flex-col gap-1"><h4 class="m-0 text-sm font-bold text-[#0a0a0a]">No hay videos en el feed</h4><p class="m-0 text-xs text-[#787774]">Los videos de YouTube que publiques aparecerán aquí.</p></div><a href="/dashboard/contenido-feed/nuevo" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#0064c1] bg-[#0064c1]/10 hover:bg-[#0064c1]/15 transition-all mt-1">${renderComponent($$result, "AddCircleIcon", AddCircleIcon, {
		"size": 14,
		"strokeWidth": 2
	})}<span>Cargar video</span></a></div>` : renderTemplate`<div class="flex flex-col gap-4 my-5"><!-- Badges y Metadatos en color azul institucional --><div class="flex items-center justify-between gap-2 text-xs font-semibold text-[#787774]"><div class="flex items-center gap-2 flex-wrap"><span class="inline-flex items-center gap-1 text-[#0064c1] font-bold uppercase tracking-wider text-[0.68rem] bg-[#0064c1]/[0.08] px-2.5 py-0.5 rounded-full">${renderComponent($$result, "VideocameraIcon", VideocameraIcon, {
		"size": 13,
		"strokeWidth": 2
	})}${item.etiqueta}</span>${item.destacado && renderTemplate`<span class="inline-flex items-center gap-1 text-amber-700 font-bold uppercase tracking-wider text-[0.66rem] bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full shadow-xs">★ Destacado</span>`}</div><span class="truncate">${item.canal}</span></div><!-- Portada limpia sin recuadros pesados -->${item.imagenMiniatura && renderTemplate`<div class="relative w-full h-44 sm:h-48 overflow-hidden rounded-2xl bg-zinc-900 shadow-xs"><img${addAttribute(item.imagenMiniatura, "src")}${addAttribute(item.titulo, "alt")} class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-105 opacity-90" loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div><div class="absolute inset-0 grid place-items-center pointer-events-none"><div class="grid h-12 w-12 place-items-center rounded-full text-white shadow-lg backdrop-blur-xs transition-transform duration-300 group-hover/card:scale-110" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);">${renderComponent($$result, "PlayIcon", PlayIcon, {
		"size": 20,
		"strokeWidth": 2
	})}</div></div><span class="absolute bottom-2.5 left-3 inline-flex items-center gap-1 text-[0.72rem] text-white font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">${item.canal}</span></div>`}<!-- Título y Descripción integrados naturalmente --><div class="flex flex-col gap-1.5"><h4 class="m-0 text-base md:text-[1.12rem] font-bold text-[#0a0a0a] tracking-tight leading-snug group-hover/card:text-[#0064c1] transition-colors duration-300 line-clamp-2">${item.titulo}</h4><p class="m-0 text-xs md:text-sm text-[#2f3437] leading-relaxed line-clamp-2">${item.descripcion}</p></div></div>`}<!-- Footer con botón de acción (idéntico en color y estilo a Leer Noticia) --><div class="pt-4 border-t border-black/[0.06] flex items-center justify-between gap-4 mt-auto"><div class="flex items-center gap-1.5 text-xs text-[#787774] font-medium">${renderComponent($$result, "ClockCircleIcon", ClockCircleIcon, {
		"size": 15,
		"strokeWidth": 1.8,
		"className": "text-[#0064c1]"
	})}<span class="font-mono text-[0.75rem]">${item?.duracion || "Video"}</span></div>${item ? renderTemplate`<a${addAttribute(item.enlace || "/dashboard/youtube", "href")} target="_blank" rel="noopener noreferrer" class="group/btn relative inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);"><span class="relative z-10">Ver video</span>${renderComponent($$result, "ArrowRightIcon", ArrowRightIcon, {
		"size": 14,
		"strokeWidth": 2,
		"className": "relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5"
	})}</a>` : renderTemplate`<a href="/dashboard/youtube" class="inline-flex items-center gap-1.5 text-xs text-[#0064c1] font-semibold hover:underline"><span>Ir a YouTube Feed</span>${renderComponent($$result, "ArrowRightIcon", ArrowRightIcon, {
		"size": 14,
		"strokeWidth": 2
	})}</a>`}</div></div>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/dashboard/components/CardYoutubeCarousel.astro", void 0);
//#endregion
//#region src/modules/dashboard/components/ContenidoDashboard.astro
var $$ContenidoDashboard = createComponent(async ($$result, $$props, $$slots) => {
	const datos = await ServicioDashboard.obtenerDatosHome();
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise isolate overflow-x-clip"><!-- Atmósfera superior SkyShader full width con degradado continuo hacia abajo --><div class="absolute inset-x-0 top-0 h-[380px] -z-10 overflow-hidden pointer-events-none" style="mask-image: linear-gradient(180deg, black 0%, black 50%, transparent 100%); -webkit-mask-image: linear-gradient(180deg, black 0%, black 50%, transparent 100%);">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><!-- Contenedor central del contenido --><div class="flex-1 flex flex-col px-6 md:px-12 pt-10 md:pt-14 pb-12 max-w-7xl w-full mx-auto gap-10"><!-- Encabezado de Bienvenida refinado e integrado con la atmósfera --><header class="relative z-10 flex flex-col gap-2 max-w-3xl"><!-- Badge de Modo Estudiante / Rol --><div id="banner-modo-estudiante" class="hidden items-center gap-2 mb-1 flex-wrap"><span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0064c1]/10 text-[#0064c1] border border-[#0064c1]/20 shadow-xs"><span class="h-2 w-2 rounded-full bg-[#0064c1] animate-pulse"></span>Red de Aprendizaje</span><span id="estudiante-meta-universidad" class="text-xs text-[#787774] font-medium hidden"></span></div><h1 class="m-0 text-[clamp(1.9rem,3.2vw,2.7rem)] font-normal text-[#0a0a0a] tracking-[-0.045em] leading-[1.05] mix-blend-multiply opacity-90">¡Bienvenido, <strong id="bienvenida-usuario-nombre" class="font-semibold text-[#0a0a0a]">${datos.usuarioNombre}</strong>! <span class="inline-block hover:rotate-12 transition-transform duration-300 cursor-default origin-bottom-right drop-shadow-sm">👋</span></h1><script>
        (function () {
          try {
            var sesionRaw = localStorage.getItem("observatorio_usuario_sesion");
            if (sesionRaw) {
              var s = JSON.parse(sesionRaw);
              var el = document.getElementById("bienvenida-usuario-nombre");
              if (el && s.nombre) {
                el.textContent = s.nombre;
              }
              var esEst =
                s.tipoUsuario === "estudiante" ||
                (s.rol && String(s.rol).toLowerCase() === "estudiante");
              var banner = document.getElementById("banner-modo-estudiante");
              if (banner && esEst) {
                banner.classList.remove("hidden");
                banner.classList.add("flex");
              }
            }
          } catch (e) {}
        })();
      <\/script><p id="bienvenida-subtitulo" class="m-0 text-[clamp(1rem,1.5vw,1.25rem)] font-[560] text-[#0a0a0a]/80 leading-[1.2] tracking-[-0.025em]">¿Qué deseas aprender hoy?</p><div class="mt-2 h-[2.5px] w-12 rounded-full bg-gradient-to-r from-[#0064c1] to-[#66b2ff]" aria-hidden="true"></div></header><!-- Sección de Cabecera para las Cards --><section class="mt-8 flex flex-col gap-6"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2"><div class="flex items-center gap-2"><span class="text-sm font-bold uppercase tracking-[0.14em] text-[#0064c1]">Contenido para ti</span><span class="text-xs text-[#787774]">• Explora y aprende</span></div></div><!-- Grid de Carruseles 3D --><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"><!-- Carrusel 1: News Feed -->${renderComponent($$result, "CardNewsCarousel", $$CardNewsCarousel, { "noticias": datos.noticias })}<!-- Carrusel 2: YouTube Feed -->${renderComponent($$result, "CardYoutubeCarousel", $$CardYoutubeCarousel, { "videos": datos.videos })}</div></section></div></div>${renderScript($$result, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/dashboard/components/ContenidoDashboard.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/dashboard/components/ContenidoDashboard.astro", void 0);
//#endregion
//#region src/modules/dashboard/components/ContenidoNewsFeed.astro
var $$ContenidoNewsFeed = createComponent(async ($$result, $$props, $$slots) => {
	const noticias = (await ServicioDashboard.obtenerDatosHome()).noticias || [];
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise isolate overflow-x-clip"><!-- Atmósfera superior con SkyShader y degradado --><div class="absolute inset-x-0 top-0 h-[360px] -z-10 overflow-hidden pointer-events-none" style="mask-image: linear-gradient(180deg, black 0%, black 45%, transparent 100%); -webkit-mask-image: linear-gradient(180deg, black 0%, black 45%, transparent 100%);">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><div class="flex-1 flex flex-col px-6 md:px-12 pt-10 md:pt-14 pb-16 max-w-7xl w-full mx-auto gap-8"><!-- Encabezado de News Feed --><header class="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]"><div class="flex flex-col gap-2 max-w-2xl"><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]"><span class="h-2 w-2 rounded-full bg-[#0064c1] animate-pulse"></span>Actualidad &amp; Novedades</div><h1 class="m-0 text-[clamp(2rem,3.4vw,2.8rem)] font-bold text-[#0a0a0a] tracking-[-0.035em] leading-[1.08] mix-blend-multiply opacity-95">News Feed</h1><p class="m-0 text-base text-[#0a0a0a]/75 font-medium tracking-tight">Noticias, investigaciones y convocatorias actualizadas en tiempo real desde el Observatorio.</p></div><!-- Barra de Filtros / Búsqueda --><div class="flex items-center gap-3"><div class="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/80 shadow-[0_4px_16px_-4px_rgba(9,60,120,0.1)]">${renderComponent($$result, "RoundedMagnifierZoomInIcon", RoundedMagnifierZoomInIcon, {
		"size": 16,
		"className": "text-[#787774]"
	})}<input id="buscador-noticias" type="text" placeholder="Buscar noticias..." class="bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-36 sm:w-48"></div></div></header><!-- Grid de Noticias o Empty State -->${noticias.length === 0 ? renderTemplate`<div class="flex flex-col items-center justify-center p-12 sm:p-16 rounded-[32px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md text-center max-w-md mx-auto w-full gap-4 animate-rise"><div class="grid h-16 w-16 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1]">${renderComponent($$result, "NotesIcon", NotesIcon, {
		"size": 32,
		"strokeWidth": 1.5
	})}</div><div class="flex flex-col gap-1.5"><h3 class="m-0 text-lg font-bold text-[#0a0a0a]">No hay noticias publicadas</h3><p class="m-0 text-xs text-[#787774] leading-relaxed">Actualmente no se encuentran noticias registradas. Puedes agregar nuevas publicaciones desde el panel de Contenido Feed.</p></div><a href="/dashboard/contenido-feed/nuevo" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold tracking-tight shadow-sm transition-all duration-300 active:scale-95 cursor-pointer mt-2" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);">${renderComponent($$result, "AddCircleIcon", AddCircleIcon, {
		"size": 16,
		"strokeWidth": 2
	})}<span>Cargar primera noticia</span></a></div>` : renderTemplate`<div id="grid-noticias" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">${noticias.map((item) => renderTemplate`<article class="articulo-noticia group relative flex flex-col justify-between rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.16),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md overflow-hidden transition-all duration-300"${addAttribute(item.id, "data-card-id")}${addAttribute(`${item.titulo} ${item.descripcion} ${item.fuente} ${item.categoria}`.toLowerCase(), "data-texto")}><!-- Imagen de Portada con Hover exclusivo -->${item.imagen ? renderTemplate`<div class="relative w-full h-48 sm:h-52 overflow-hidden bg-black/5"><img${addAttribute(item.imagen, "src")}${addAttribute(item.titulo, "alt")} class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"></div><!-- Badges de Fuente y Categoría sobre la imagen --><div class="absolute top-3 inset-x-3 flex items-center justify-between gap-2"><div class="flex items-center gap-1.5 flex-wrap"><span class="inline-flex items-center gap-1 text-[0.68rem] text-[#0064c1] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">${renderComponent($$result, "StarsMinimalisticIcon", StarsMinimalisticIcon, {
		"size": 12,
		"strokeWidth": 2
	})}${item.categoria}</span>${item.destacado && renderTemplate`<span class="inline-flex items-center gap-1 text-[0.66rem] text-amber-800 font-bold uppercase tracking-wider bg-amber-400/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">★ Destacado</span>`}</div>${item.fuente && renderTemplate`<span class="inline-flex items-center gap-1 text-[0.68rem] text-white font-medium bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">${renderComponent($$result, "LinkIcon", LinkIcon, {
		"size": 11,
		"strokeWidth": 1.5
	})}${item.fuente}</span>`}</div></div>` : renderTemplate`<div class="relative w-full h-24 bg-gradient-to-r from-[#0064c1]/10 to-[#4fa3ff]/10 p-4 flex items-center justify-between"><span class="inline-flex items-center gap-1 text-[0.68rem] text-[#0064c1] font-bold uppercase tracking-wider bg-white/95 px-2.5 py-1 rounded-full shadow-sm">${item.categoria}</span>${item.fuente && renderTemplate`<span class="text-xs font-semibold text-[#787774]">${item.fuente}</span>`}</div>`}<!-- Cuerpo de la Noticia --><div class="flex flex-col flex-1 p-5 md:p-6 justify-between gap-4"><div class="flex flex-col gap-2"><div class="flex items-center gap-2 text-xs font-semibold text-[#787774]"><span>${item.fecha}</span>${item.lecturaMinutos && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span>•</span><span class="flex items-center gap-1 text-[0.72rem]">${renderComponent($$result, "ClockCircleIcon", ClockCircleIcon, {
		"size": 12,
		"strokeWidth": 1.5
	})}${item.lecturaMinutos} min de lectura</span>` })}`}</div><h3 class="m-0 text-base md:text-[1.1rem] font-bold text-[#0a0a0a] tracking-tight leading-snug group-hover:text-[#0064c1] transition-colors duration-300 line-clamp-3">${item.titulo}</h3><p class="m-0 text-xs md:text-sm text-[#2f3437] leading-relaxed line-clamp-3">${item.descripcion}</p></div><!-- Acciones inferiores: Botón de Lectura + Acciones de Reacción --><div class="pt-3.5 border-t border-black/[0.06] mt-auto flex items-center gap-2"><a${addAttribute(item.enlace, "href")}${addAttribute(item.enlace.startsWith("http") ? "_blank" : "_self", "target")} rel="noopener noreferrer" class="group/btn relative flex-1 inline-flex items-center justify-center gap-2 h-10 px-4 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);"><span>Leer noticia</span>${renderComponent($$result, "ArrowRightIcon", ArrowRightIcon, {
		"size": 14,
		"strokeWidth": 2,
		"className": "transition-transform duration-300 group-hover/btn:translate-x-0.5"
	})}</a><!-- Botón de Like con contador persistente --><button type="button" data-reaction-btn="like" class="reaction-btn group/like relative flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-full text-[#787774] bg-white/90 border border-black/[0.08] hover:text-[#0064c1] hover:bg-[#0064c1]/[0.08] shadow-[0_2px_8px_-2px_rgba(9,60,120,0.06)] backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer" title="Me gusta" aria-label="Me gusta">${renderComponent($$result, "LikeIcon", LikeIcon, {
		"size": 16,
		"strokeWidth": 1.8,
		"className": "transition-transform duration-200 group-hover/like:-rotate-12"
	})}<span class="contador-likes text-xs font-bold select-none">${item.likesCount || 0}</span></button></div></div></article>`)}</div>`}</div></div>${renderScript($$result, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/dashboard/components/ContenidoNewsFeed.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/dashboard/components/ContenidoNewsFeed.astro", void 0);
//#endregion
//#region src/modules/dashboard/components/ContenidoYoutubeFeed.astro
var $$ContenidoYoutubeFeed = createComponent(async ($$result, $$props, $$slots) => {
	const videos = (await ServicioDashboard.obtenerDatosHome()).videos || [];
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise isolate overflow-x-clip"><!-- Atmósfera superior con SkyShader y degradado --><div class="absolute inset-x-0 top-0 h-[360px] -z-10 overflow-hidden pointer-events-none" style="mask-image: linear-gradient(180deg, black 0%, black 45%, transparent 100%); -webkit-mask-image: linear-gradient(180deg, black 0%, black 45%, transparent 100%);">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><div class="flex-1 flex flex-col px-6 md:px-12 pt-10 md:pt-14 pb-16 max-w-7xl w-full mx-auto gap-8"><!-- Encabezado de Youtube Feed --><header class="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]"><div class="flex flex-col gap-2 max-w-2xl"><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]"><span class="h-2 w-2 rounded-full bg-[#0064c1] animate-pulse"></span>Recursos Multimedia &amp; Aprendizaje</div><h1 class="m-0 text-[clamp(2rem,3.4vw,2.8rem)] font-bold text-[#0a0a0a] tracking-[-0.035em] leading-[1.08] mix-blend-multiply opacity-95">Youtube Feed</h1><p class="m-0 text-base text-[#0a0a0a]/75 font-medium tracking-tight">Talleres, conferencias y contenido audiovisual oficial del Observatorio.</p></div><!-- Buscador --><div class="flex items-center gap-3"><div class="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/80 shadow-[0_4px_16px_-4px_rgba(9,60,120,0.1)]">${renderComponent($$result, "RoundedMagnifierZoomInIcon", RoundedMagnifierZoomInIcon, {
		"size": 16,
		"className": "text-[#787774]"
	})}<input id="buscador-videos" type="text" placeholder="Buscar videos..." class="bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-36 sm:w-48"></div></div></header><!-- Grid de Videos o Empty State -->${videos.length === 0 ? renderTemplate`<div class="flex flex-col items-center justify-center p-12 sm:p-16 rounded-[32px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md text-center max-w-md mx-auto w-full gap-4 animate-rise"><div class="grid h-16 w-16 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1]">${renderComponent($$result, "VideocameraIcon", VideocameraIcon, {
		"size": 32,
		"strokeWidth": 1.5
	})}</div><div class="flex flex-col gap-1.5"><h3 class="m-0 text-lg font-bold text-[#0a0a0a]">No hay videos publicados</h3><p class="m-0 text-xs text-[#787774] leading-relaxed">Actualmente no se encuentran videos registrados. Puedes agregar nuevos enlaces de YouTube desde el panel de Contenido Feed.</p></div><a href="/dashboard/contenido-feed/nuevo" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold tracking-tight shadow-sm transition-all duration-300 active:scale-95 cursor-pointer mt-2" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);">${renderComponent($$result, "AddCircleIcon", AddCircleIcon, {
		"size": 16,
		"strokeWidth": 2
	})}<span>Cargar primer video</span></a></div>` : renderTemplate`<div id="grid-videos" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">${videos.map((item) => renderTemplate`<article class="articulo-video group relative flex flex-col justify-between rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.16),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md overflow-hidden transition-all duration-300"${addAttribute(item.id, "data-card-id")}${addAttribute(`${item.titulo} ${item.descripcion} ${item.canal} ${item.etiqueta}`.toLowerCase(), "data-texto")}><!-- Portada con Imagen Miniatura y Botón Play 3D -->${item.imagenMiniatura ? renderTemplate`<div class="relative w-full h-48 sm:h-52 overflow-hidden bg-black/5"><img${addAttribute(item.imagenMiniatura, "src")}${addAttribute(item.titulo, "alt")} class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div><!-- Badges superiores --><div class="absolute top-3 inset-x-3 flex items-center justify-between gap-2"><div class="flex items-center gap-1.5 flex-wrap"><span class="inline-flex items-center gap-1.5 text-[0.68rem] text-[#0064c1] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">${renderComponent($$result, "VideocameraIcon", VideocameraIcon, {
		"size": 13,
		"strokeWidth": 2
	})}${item.etiqueta}</span>${item.destacado && renderTemplate`<span class="inline-flex items-center gap-1 text-[0.66rem] text-amber-800 font-bold uppercase tracking-wider bg-amber-400/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">★ Destacado</span>`}</div>${item.canal && renderTemplate`<span class="inline-flex items-center gap-1 text-[0.68rem] text-white font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">${item.canal}</span>`}</div><!-- Botón Play Central Azul Institucional --><div class="absolute inset-0 grid place-items-center pointer-events-none"><div class="grid h-12 w-12 place-items-center rounded-full text-white shadow-lg backdrop-blur-xs transition-transform duration-300 group-hover:scale-110" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);">${renderComponent($$result, "PlayIcon", PlayIcon, {
		"size": 20,
		"strokeWidth": 2
	})}</div></div></div>` : renderTemplate`<div class="relative w-full h-24 bg-gradient-to-r from-[#0064c1]/10 to-[#4fa3ff]/10 p-4 flex items-center justify-between"><span class="text-xs font-bold text-[#0064c1] uppercase">${item.etiqueta}</span><span class="text-xs text-[#787774]">${item.canal}</span></div>`}<!-- Cuerpo del Video --><div class="flex flex-col flex-1 p-5 md:p-6 justify-between gap-4"><div class="flex flex-col gap-2"><div class="flex items-center gap-2 text-xs font-semibold text-[#787774]"><span>${item.canal}</span>${item.duracion && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span>•</span><span class="flex items-center gap-1 text-[0.72rem]">${renderComponent($$result, "ClockCircleIcon", ClockCircleIcon, {
		"size": 12,
		"strokeWidth": 1.5
	})}${item.duracion}</span>` })}`}</div><h3 class="m-0 text-base md:text-[1.1rem] font-bold text-[#0a0a0a] tracking-tight leading-snug group-hover:text-[#0064c1] transition-colors duration-300 line-clamp-3">${item.titulo}</h3><p class="m-0 text-xs md:text-sm text-[#2f3437] leading-relaxed line-clamp-3">${item.descripcion}</p></div><!-- Acciones inferiores --><div class="pt-3.5 border-t border-black/[0.06] mt-auto flex items-center gap-2"><a${addAttribute(item.enlace, "href")} target="_blank" rel="noopener noreferrer" class="group/btn relative flex-1 inline-flex items-center justify-center gap-2 h-10 px-4 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);"><span>Ver video</span>${renderComponent($$result, "ArrowRightIcon", ArrowRightIcon, {
		"size": 14,
		"strokeWidth": 2,
		"className": "transition-transform duration-300 group-hover/btn:translate-x-0.5"
	})}</a><!-- Botón de Like con contador persistente --><button type="button" data-reaction-btn="like" class="reaction-btn group/like relative flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-full text-[#787774] bg-white/90 border border-black/[0.08] hover:text-[#0064c1] hover:bg-[#0064c1]/[0.08] shadow-[0_2px_8px_-2px_rgba(9,60,120,0.06)] backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer" title="Me gusta" aria-label="Me gusta">${renderComponent($$result, "LikeIcon", LikeIcon, {
		"size": 16,
		"strokeWidth": 1.8,
		"className": "transition-transform duration-200 group-hover/like:-rotate-12"
	})}<span class="contador-likes text-xs font-bold select-none">${item.likesCount || 0}</span></button></div></div></article>`)}</div>`}</div></div>${renderScript($$result, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/dashboard/components/ContenidoYoutubeFeed.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/dashboard/components/ContenidoYoutubeFeed.astro", void 0);
//#endregion
export { $$ContenidoNewsFeed as n, $$ContenidoDashboard as r, $$ContenidoYoutubeFeed as t };
