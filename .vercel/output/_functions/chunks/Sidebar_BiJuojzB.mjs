import { E as maybeRenderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { r as renderScript } from "./SkyShader_DL8DbueI.mjs";
import { AltArrowDownIcon, AltArrowLeftIcon, ChatSquareIcon, CloseSquareIcon, FolderWithFilesIcon, HamburgerMenuIcon, HomeIcon, LetterIcon, LibraryIcon, Logout2Icon, NotesIcon, ShieldUserIcon, UserPlusIcon, UsersGroupRoundedIcon, UsersGroupTwoRoundedIcon, VideocameraIcon } from "@solar-icons/react/outline";
//#region src/components/Sidebar.astro
createAstro("https://astro.build");
var $$Sidebar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Sidebar;
	const { active = "Inicio" } = Astro.props;
	const explorar = [
		{
			href: "/dashboard",
			label: "Inicio",
			icon: HomeIcon
		},
		{
			href: "/dashboard/repositorio",
			label: "Repositorio",
			icon: LibraryIcon,
			badge: "48"
		},
		{
			href: "/dashboard/news",
			label: "News Feed",
			icon: NotesIcon,
			badge: "3"
		},
		{
			href: "/dashboard/youtube",
			label: "Youtube Feed",
			icon: VideocameraIcon,
			badge: "1"
		}
	];
	const administracion = [
		{
			label: "Usuarios",
			icon: UsersGroupTwoRoundedIcon,
			subItems: [{
				href: "/dashboard/usuarios",
				label: "Usuarios Estudiantes",
				icon: UsersGroupRoundedIcon
			}, {
				href: "/dashboard/usuarios/administrativos",
				label: "Usuarios Administrativos",
				icon: ShieldUserIcon
			}]
		},
		{
			label: "Red de aprendizaje",
			icon: UsersGroupRoundedIcon,
			subItems: [{
				href: "/dashboard/red-aprendizaje",
				label: "Usuarios Nuevos",
				icon: UserPlusIcon,
				badge: "8",
				badgeType: "count"
			}, {
				href: "/dashboard/red-aprendizaje/correo",
				label: "Correo",
				icon: LetterIcon
			}]
		},
		{
			href: "/dashboard/contenido-repositorio",
			label: "Contenido Repositorios",
			icon: FolderWithFilesIcon
		},
		{
			href: "/dashboard/contenido-feed",
			label: "Contenido Feed",
			icon: ChatSquareIcon,
			badge: "4",
			badgeType: "count"
		}
	];
	return renderTemplate`<script>
  (function () {
    try {
      var sesionRaw = localStorage.getItem("observatorio_usuario_sesion");
      if (sesionRaw) {
        var sesion = JSON.parse(sesionRaw);
        var esEstudiante =
          sesion.tipoUsuario === "estudiante" ||
          (sesion.rol && String(sesion.rol).toLowerCase() === "estudiante");

        if (esEstudiante) {
          document.documentElement.classList.add("rol-estudiante");
          document.documentElement.classList.remove("rol-admin");

          // Redirección inmediata si se intenta acceder por URL directa a rutas de admin
          var ruta = window.location.pathname;
          if (
            ruta.indexOf("/dashboard/usuarios") === 0 ||
            ruta.indexOf("/dashboard/contenido-feed") === 0 ||
            ruta.indexOf("/dashboard/contenido-repositorio") === 0 ||
            ruta.indexOf("/dashboard/red-aprendizaje") === 0
          ) {
            window.location.replace("/dashboard");
          }
        } else {
          document.documentElement.classList.add("rol-admin");
          document.documentElement.classList.remove("rol-estudiante");
        }
      }
    } catch (e) {}
  })();
<\/script><!-- Barra Superior Móvil (solo visible en pantallas < lg) -->${maybeRenderHead($$result)}<header id="sidebar-mobile-header" class="lg:hidden fixed top-0 inset-x-0 h-14 bg-[#fbfbfa]/95 backdrop-blur-md border-b border-black/[0.07] z-30 flex items-center justify-between px-3.5 select-none transition-transform duration-300 shadow-sm" data-astro-cid-wv7whodv><button type="button" id="open-mobile-sidebar-btn" class="grid h-9 w-9 place-items-center rounded-xl bg-white border border-black/10 text-[#2f3437] shadow-sm transition-all duration-200 hover:text-[#0064c1] hover:border-[#0064c1]/40 active:scale-95 cursor-pointer" aria-label="Abrir menú de navegación" data-astro-cid-wv7whodv>${renderComponent($$result, "HamburgerMenuIcon", HamburgerMenuIcon, {
		"size": 20,
		"strokeWidth": 2,
		"data-astro-cid-wv7whodv": true
	})}</button><a href="/dashboard" class="flex items-center justify-center no-underline" data-astro-cid-wv7whodv><img src="/Group 19.svg" alt="Logo Observatorio" class="h-8 w-auto object-contain" data-astro-cid-wv7whodv></a><div class="flex items-center gap-2" data-astro-cid-wv7whodv><div class="grid h-8 w-8 place-items-center" data-astro-cid-wv7whodv><span id="sidebar-mobile-avatar" class="grid h-8 w-8 place-items-center rounded-xl text-white text-[0.7rem] font-bold shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1px 1px rgba(255,255,255,0.5), 0 2px 8px -1px rgba(58,138,244,0.4);" aria-hidden="true" data-astro-cid-wv7whodv>UI</span></div><!-- Botón logout móvil --><button type="button" id="sidebar-mobile-logout-btn" class="grid h-8 w-8 place-items-center rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200/60 shadow-xs transition-all duration-200 active:scale-95 cursor-pointer" title="Cerrar sesión" aria-label="Cerrar sesión" data-astro-cid-wv7whodv>${renderComponent($$result, "Logout2Icon", Logout2Icon, {
		"size": 16,
		"strokeWidth": 2,
		"data-astro-cid-wv7whodv": true
	})}</button></div></header><!-- Backdrop oscurecido para menú móvil --><div id="sidebar-mobile-backdrop" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden transition-opacity duration-300 opacity-0 data-[open=true]:opacity-100 data-[open=true]:block lg:hidden" aria-hidden="true" data-astro-cid-wv7whodv></div><aside data-astro-transition-persist="sidebar-principal" id="main-sidebar" data-collapsed="false" data-mobile-open="false" class="group/sidebar max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 max-lg:-translate-x-full max-lg:shadow-2xl max-lg:data-[mobile-open=true]:translate-x-0 lg:sticky lg:top-0 flex h-svh w-[17.5rem] lg:data-[collapsed=true]:w-[4.85rem] shrink-0 flex-col justify-between border-r border-black/[0.07] bg-[#fbfbfa]/95 backdrop-blur-md px-3 py-5 select-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-40" data-astro-cid-wv7whodv><!-- Botón toggle de escritorio (solo visible en pantallas >= lg) --><button type="button" id="toggle-sidebar-btn" class="max-lg:hidden absolute -right-3.5 top-7 z-50 grid h-7 w-7 place-items-center rounded-full bg-white border border-black/10 text-[#787774] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.12)] transition-all duration-200 hover:text-[#0064c1] hover:scale-110 hover:border-[#0064c1]/40 active:scale-95 cursor-pointer" aria-label="Contraer o expandir barra lateral" title="Contraer / Expandir" data-astro-cid-wv7whodv>${renderComponent($$result, "AltArrowLeftIcon", AltArrowLeftIcon, {
		"size": 16,
		"strokeWidth": 2.2,
		"className": "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-data-[collapsed=true]/sidebar:rotate-180 text-[#2f3437] group-hover:text-[#0064c1]",
		"data-astro-cid-wv7whodv": true
	})}</button><div class="flex flex-col gap-6 overflow-hidden" data-astro-cid-wv7whodv><!-- Encabezado con Logo ampliado y botón de cerrar en móvil --><div class="flex items-center justify-between lg:justify-center px-1 pt-1 h-12" data-astro-cid-wv7whodv><a href="/" class="group/logo flex items-center justify-center no-underline overflow-hidden shrink-0" aria-label="Volver al inicio" data-astro-cid-wv7whodv><img src="/Group 19.svg" alt="Logo Observatorio" class="h-11 w-auto max-w-[12rem] object-contain transition-transform duration-300 group-hover/logo:scale-105 shrink-0" data-astro-cid-wv7whodv></a><!-- Botón cerrar en móvil --><button type="button" id="close-mobile-sidebar-btn" class="lg:hidden grid h-8 w-8 place-items-center rounded-lg text-[#787774] hover:text-[#0a0a0a] hover:bg-black/5 active:scale-95 cursor-pointer border-none bg-transparent" aria-label="Cerrar menú lateral" data-astro-cid-wv7whodv>${renderComponent($$result, "CloseSquareIcon", CloseSquareIcon, {
		"size": 20,
		"strokeWidth": 1.8,
		"data-astro-cid-wv7whodv": true
	})}</button></div><!-- Navegación principal --><nav class="flex flex-1 flex-col gap-5 overflow-y-auto overscroll-contain pr-0.5 custom-scrollbar" data-astro-cid-wv7whodv><!-- Sección Explorar --><div class="flex flex-col gap-1" data-astro-cid-wv7whodv><p class="m-0 mb-1 px-3 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#787774] whitespace-nowrap transition-opacity duration-200 lg:group-data-[collapsed=true]/sidebar:opacity-0 lg:group-data-[collapsed=true]/sidebar:h-0 lg:group-data-[collapsed=true]/sidebar:mb-0 lg:group-data-[collapsed=true]/sidebar:overflow-hidden" data-astro-cid-wv7whodv>Explorar</p>${explorar.map(({ icon: Icon, ...item }) => {
		const esActivo = active === item.label;
		return renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(item.label, "title")} data-nav-item${addAttribute(item.href, "data-nav-href")}${addAttribute(item.label, "data-nav-label")} data-astro-prefetch="hover"${addAttribute(["nav-link-item group relative flex items-center h-11 px-1.5 rounded-2xl text-sm font-medium tracking-[-0.01em] no-underline transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden", esActivo ? "nav-active bg-white text-[#0064c1] font-semibold border border-white/80 shadow-[0_4px_16px_-4px_rgba(9,60,120,0.12),0_1px_2px_rgba(0,0,0,0.04)]" : "text-[#2f3437] hover:bg-black/[0.04] hover:text-[#0a0a0a] active:scale-[0.985]"], "class:list")} data-astro-cid-wv7whodv><!-- Contenedor fijo de ícono con posición fija absoluta izquierda --><div class="grid h-10 w-10 shrink-0 place-items-center" data-astro-cid-wv7whodv>${renderComponent($$result, "Icon", Icon, {
			"size": 20,
			"strokeWidth": esActivo ? 2 : 1.5,
			"class:list": ["nav-icon shrink-0 transition-colors duration-200", esActivo ? "text-[#0064c1]" : "text-[#787774] group-hover:text-[#0a0a0a]"],
			"data-astro-cid-wv7whodv": true
		})}</div><span class="truncate whitespace-nowrap ml-1.5 transition-all duration-200 lg:group-data-[collapsed=true]/sidebar:opacity-0 lg:group-data-[collapsed=true]/sidebar:w-0 lg:group-data-[collapsed=true]/sidebar:invisible" data-astro-cid-wv7whodv>${item.label}</span>${item.badge && item.badgeType === "new" && renderTemplate`<span class="ml-auto mr-1.5 px-2 py-0.5 rounded-full text-white text-[0.66rem] font-semibold leading-tight shadow-sm shrink-0 whitespace-nowrap transition-all duration-200 lg:group-data-[collapsed=true]/sidebar:opacity-0 lg:group-data-[collapsed=true]/sidebar:w-0 lg:group-data-[collapsed=true]/sidebar:p-0 lg:group-data-[collapsed=true]/sidebar:overflow-hidden" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1px 1px rgba(255,255,255,0.5), 0 2px 8px -1px rgba(58,138,244,0.45); text-shadow: 0 1px 2px rgba(18,86,175,0.32)" data-astro-cid-wv7whodv>${item.badge}</span>`}${item.badge && item.badgeType !== "new" && renderTemplate`<span${addAttribute(["ml-auto mr-1.5 px-2 py-0.5 rounded-full text-[0.7rem] font-semibold leading-tight font-mono shrink-0 whitespace-nowrap transition-all duration-200 lg:group-data-[collapsed=true]/sidebar:opacity-0 lg:group-data-[collapsed=true]/sidebar:w-0 lg:group-data-[collapsed=true]/sidebar:p-0 lg:group-data-[collapsed=true]/sidebar:overflow-hidden", esActivo ? "bg-[#0064c1]/10 text-[#0064c1]" : "bg-black/[0.05] text-[#787774] group-hover:bg-black/[0.08] group-hover:text-[#0a0a0a]"], "class:list")} data-astro-cid-wv7whodv>${item.badge}</span>`}</a>`;
	})}</div><!-- Sección Administración --><div id="sidebar-admin-section" class="flex flex-col gap-1 transition-all duration-200" data-astro-cid-wv7whodv><p class="m-0 mb-1 px-3 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#787774] whitespace-nowrap transition-opacity duration-200 lg:group-data-[collapsed=true]/sidebar:opacity-0 lg:group-data-[collapsed=true]/sidebar:h-0 lg:group-data-[collapsed=true]/sidebar:mb-0 lg:group-data-[collapsed=true]/sidebar:overflow-hidden" data-astro-cid-wv7whodv>Administración</p>${administracion.map(({ icon: Icon, subItems, ...item }) => {
		if (subItems && subItems.length > 0) {
			const tieneHijoActivo = subItems.some((s) => s.label === active);
			const esPadreActivo = active === item.label || tieneHijoActivo;
			return renderTemplate`<div class="group/collapsible flex flex-col transition-all duration-200" data-collapsible${addAttribute(esPadreActivo ? "true" : "false", "data-open")} data-astro-cid-wv7whodv><button type="button"${addAttribute(["w-full group relative flex items-center h-11 px-1.5 rounded-2xl text-sm font-medium tracking-[-0.01em] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer select-none border-none text-left bg-transparent", esPadreActivo ? "bg-white/80 text-[#0064c1] font-semibold border border-white/80 shadow-[0_2px_10px_-3px_rgba(9,60,120,0.08)]" : "text-[#2f3437] hover:bg-black/[0.04] hover:text-[#0a0a0a]"], "class:list")} data-collapsible-trigger data-astro-cid-wv7whodv><div class="grid h-10 w-10 shrink-0 place-items-center" data-astro-cid-wv7whodv>${renderComponent($$result, "Icon", Icon, {
				"size": 20,
				"strokeWidth": esPadreActivo ? 2 : 1.5,
				"class:list": ["shrink-0 transition-colors duration-200", esPadreActivo ? "text-[#0064c1]" : "text-[#787774] group-hover:text-[#0a0a0a]"],
				"data-astro-cid-wv7whodv": true
			})}</div><span class="truncate whitespace-nowrap ml-1.5 transition-all duration-200 lg:group-data-[collapsed=true]/sidebar:opacity-0 lg:group-data-[collapsed=true]/sidebar:w-0 lg:group-data-[collapsed=true]/sidebar:invisible" data-astro-cid-wv7whodv>${item.label}</span>${renderComponent($$result, "AltArrowDownIcon", AltArrowDownIcon, {
				"size": 14,
				"strokeWidth": 2.2,
				"className": "ml-auto mr-1.5 text-[#787774] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[open=true]/collapsible:rotate-180 lg:group-data-[collapsed=true]/sidebar:hidden shrink-0",
				"data-astro-cid-wv7whodv": true
			})}</button><!-- Sub-opciones desplegables con animación suave de apertura y cierre --><div class="collapsible-content overflow-hidden transition-[height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-data-[collapsed=true]/sidebar:hidden"${addAttribute(esPadreActivo ? "" : "height: 0px; opacity: 0;", "style")} data-astro-cid-wv7whodv><div class="flex flex-col gap-1 pl-2.5 pr-1 pt-1.5 pb-1 ml-4 my-0.5 border-l-2 border-slate-200/80" data-astro-cid-wv7whodv>${subItems.map((sub) => {
				const esSubActivo = active === sub.label;
				const SubIcon = sub.icon;
				return renderTemplate`<a${addAttribute(sub.href, "href")} data-nav-item${addAttribute(sub.href, "data-nav-href")}${addAttribute(sub.label, "data-nav-label")} data-astro-prefetch="hover"${addAttribute(["nav-sub-item group/sub flex items-center h-10 px-2 rounded-xl text-xs font-medium no-underline transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]", esSubActivo ? "nav-sub-active bg-white text-[#0064c1] font-bold shadow-[0_2px_8px_-2px_rgba(9,60,120,0.12)] border border-white/90" : "text-[#4b5563] hover:bg-black/[0.04] hover:text-[#0a0a0a]"], "class:list")} data-astro-cid-wv7whodv>${SubIcon && renderTemplate`<div class="grid h-6 w-6 shrink-0 place-items-center mr-2" data-astro-cid-wv7whodv>${renderComponent($$result, "SubIcon", SubIcon, {
					"size": 16,
					"strokeWidth": esSubActivo ? 2 : 1.5,
					"class:list": ["nav-sub-icon shrink-0 transition-colors duration-200", esSubActivo ? "text-[#0064c1]" : "text-[#787774] group-hover/sub:text-[#0a0a0a]"],
					"data-astro-cid-wv7whodv": true
				})}</div>`}<span class="truncate" data-astro-cid-wv7whodv>${sub.label}</span>${sub.badge && renderTemplate`<span${addAttribute(["ml-auto px-2 py-0.5 rounded-full text-[0.68rem] font-bold font-mono shrink-0 transition-colors", esSubActivo ? "bg-[#0064c1]/10 text-[#0064c1]" : "bg-black/[0.05] text-[#787774]"], "class:list")} data-astro-cid-wv7whodv>${sub.badge}</span>`}</a>`;
			})}</div></div></div>`;
		}
		const esActivo = active === item.label;
		return renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(item.label, "title")} data-nav-item${addAttribute(item.href, "data-nav-href")}${addAttribute(item.label, "data-nav-label")} data-astro-prefetch="hover"${addAttribute(["nav-link-item group relative flex items-center h-11 px-1.5 rounded-2xl text-sm font-medium tracking-[-0.01em] no-underline transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden", esActivo ? "nav-active bg-white text-[#0064c1] font-semibold border border-white/80 shadow-[0_4px_16px_-4px_rgba(9,60,120,0.12),0_1px_2px_rgba(0,0,0,0.04)]" : "text-[#2f3437] hover:bg-black/[0.04] hover:text-[#0a0a0a] active:scale-[0.985]"], "class:list")} data-astro-cid-wv7whodv><!-- Contenedor fijo de ícono con posición fija absoluta izquierda --><div class="grid h-10 w-10 shrink-0 place-items-center" data-astro-cid-wv7whodv>${renderComponent($$result, "Icon", Icon, {
			"size": 20,
			"strokeWidth": esActivo ? 2 : 1.5,
			"class:list": ["nav-icon shrink-0 transition-colors duration-200", esActivo ? "text-[#0064c1]" : "text-[#787774] group-hover:text-[#0a0a0a]"],
			"data-astro-cid-wv7whodv": true
		})}</div><span class="truncate whitespace-nowrap ml-1.5 transition-all duration-200 lg:group-data-[collapsed=true]/sidebar:opacity-0 lg:group-data-[collapsed=true]/sidebar:w-0 lg:group-data-[collapsed=true]/sidebar:invisible" data-astro-cid-wv7whodv>${item.label}</span>${item.badge && item.badgeType === "new" && renderTemplate`<span class="ml-auto mr-1.5 px-2 py-0.5 rounded-full text-white text-[0.66rem] font-semibold leading-tight shadow-sm shrink-0 whitespace-nowrap transition-all duration-200 lg:group-data-[collapsed=true]/sidebar:opacity-0 lg:group-data-[collapsed=true]/sidebar:w-0 lg:group-data-[collapsed=true]/sidebar:p-0 lg:group-data-[collapsed=true]/sidebar:overflow-hidden" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1px 1px rgba(255,255,255,0.5), 0 2px 8px -1px rgba(58,138,244,0.45); text-shadow: 0 1px 2px rgba(18,86,175,0.32)" data-astro-cid-wv7whodv>${item.badge}</span>`}${item.badge && item.badgeType !== "new" && renderTemplate`<span${addAttribute(["ml-auto mr-1.5 px-2 py-0.5 rounded-full text-[0.7rem] font-semibold leading-tight font-mono shrink-0 whitespace-nowrap transition-all duration-200 lg:group-data-[collapsed=true]/sidebar:opacity-0 lg:group-data-[collapsed=true]/sidebar:w-0 lg:group-data-[collapsed=true]/sidebar:p-0 lg:group-data-[collapsed=true]/sidebar:overflow-hidden", esActivo ? "bg-[#0064c1]/10 text-[#0064c1]" : "bg-black/[0.05] text-[#787774] group-hover:bg-black/[0.08] group-hover:text-[#0a0a0a]"], "class:list")} data-astro-cid-wv7whodv>${item.badge}</span>`}</a>`;
	})}</div></nav></div><!-- Tarjeta de Usuario Institucional y Botón de Logout debajo --><div class="flex flex-col gap-2 shrink-0 pt-2 border-t border-black/[0.05]" data-astro-cid-wv7whodv><div class="flex items-center gap-2 rounded-[20px] border border-white/80 bg-white/90 p-1.5 shadow-[0_10px_25px_-8px_rgba(9,60,120,0.15)] transition-all duration-300 hover:shadow-[0_14px_30px_-6px_rgba(9,60,120,0.22)] overflow-hidden" data-astro-cid-wv7whodv><div class="grid h-10 w-10 shrink-0 place-items-center" data-astro-cid-wv7whodv><span id="sidebar-user-avatar" class="grid h-9 w-9 place-items-center rounded-2xl text-white text-xs font-bold shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 14px -3px rgba(58,138,244,0.4); text-shadow: 0 1px 2px rgba(18,86,175,0.32)" aria-hidden="true" data-astro-cid-wv7whodv>UI</span></div><div class="flex min-w-0 flex-1 flex-col pl-0.5 transition-all duration-200 lg:group-data-[collapsed=true]/sidebar:opacity-0 lg:group-data-[collapsed=true]/sidebar:w-0 lg:group-data-[collapsed=true]/sidebar:invisible" data-astro-cid-wv7whodv><div class="flex items-center justify-between gap-1" data-astro-cid-wv7whodv><span id="sidebar-user-name" class="truncate text-xs font-semibold text-[#0a0a0a]" data-astro-cid-wv7whodv>&nbsp;</span></div><span id="sidebar-user-email" class="truncate text-[0.72rem] text-[#787774]" data-astro-cid-wv7whodv>&nbsp;</span><span id="sidebar-user-role" class="truncate text-[0.66rem] font-semibold text-[#0064c1] tracking-wide" data-astro-cid-wv7whodv>&nbsp;</span></div></div><!-- Botón de Logout situado abajo --><button type="button" id="btn-sidebar-logout" class="group/logout relative flex items-center h-10 px-1.5 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 active:scale-[0.985] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer select-none border border-transparent hover:border-rose-200/60 bg-transparent w-full" title="Cerrar sesión" aria-label="Cerrar sesión" data-astro-cid-wv7whodv><div class="grid h-10 w-10 shrink-0 place-items-center" data-astro-cid-wv7whodv>${renderComponent($$result, "Logout2Icon", Logout2Icon, {
		"size": 18,
		"strokeWidth": 1.8,
		"className": "text-rose-600 transition-transform duration-200 group-hover/logout:translate-x-0.5",
		"data-astro-cid-wv7whodv": true
	})}</div><span class="truncate whitespace-nowrap ml-1.5 transition-all duration-200 lg:group-data-[collapsed=true]/sidebar:opacity-0 lg:group-data-[collapsed=true]/sidebar:w-0 lg:group-data-[collapsed=true]/sidebar:invisible" data-astro-cid-wv7whodv>Cerrar sesión</span></button></div></aside>${renderScript($$result, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/components/Sidebar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/components/Sidebar.astro", "self");
//#endregion
export { $$Sidebar as t };
