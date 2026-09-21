import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter } from "./SkyShader_DL8DbueI.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { n as $$ContenidoNewsFeed } from "./dashboard_dPTpnbJU.mjs";
//#region src/pages/dashboard/news.astro
var news_exports = /* @__PURE__ */ __exportAll({
	default: () => $$News,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$News = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="News Feed y actualidad del Observatorio de Responsabilidad Social y Sostenibilidad"><title>Observatorio · News Feed</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral de navegación con News Feed activo -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "News Feed" })}<!-- Contenido principal de News Feed --><main class="flex-1 flex flex-col min-w-0">${renderComponent($$result, "ContenidoNewsFeed", $$ContenidoNewsFeed, {})}</main></div></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/news.astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/news.astro";
var $$url = "/dashboard/news";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/news@_@astro
var page = () => news_exports;
//#endregion
export { page };
