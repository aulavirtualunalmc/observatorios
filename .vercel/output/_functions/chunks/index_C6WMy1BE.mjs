import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter } from "./SkyShader_DL8DbueI.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { r as $$ContenidoAdminFeed } from "./contenido-feed_BH-g0ss5.mjs";
//#region src/pages/dashboard/contenido-feed/index.astro
var contenido_feed_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Administración y gestión de contenidos Feed (Noticias y YouTube)"><title>Observatorio · Contenido Feed</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral con Contenido Feed activo -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Contenido Feed" })}<!-- Contenido del Módulo --><main class="flex-1 flex flex-col min-w-0">${renderComponent($$result, "ContenidoAdminFeed", $$ContenidoAdminFeed, {})}</main></div></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/contenido-feed/index.astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/contenido-feed/index.astro";
var $$url = "/dashboard/contenido-feed";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/contenido-feed/index@_@astro
var page = () => contenido_feed_exports;
//#endregion
export { page };
