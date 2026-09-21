import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter } from "./SkyShader_DL8DbueI.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { t as $$ContenidoYoutubeFeed } from "./dashboard_dPTpnbJU.mjs";
//#region src/pages/dashboard/youtube.astro
var youtube_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Youtube,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Youtube = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Youtube Feed y recursos audiovisuales del Observatorio de Responsabilidad Social y Sostenibilidad"><title>Observatorio · Youtube Feed</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral de navegación con Youtube Feed activo -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Youtube Feed" })}<!-- Contenido principal de Youtube Feed --><main class="flex-1 flex flex-col min-w-0">${renderComponent($$result, "ContenidoYoutubeFeed", $$ContenidoYoutubeFeed, {})}</main></div></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/youtube.astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/youtube.astro";
var $$url = "/dashboard/youtube";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/youtube@_@astro
var page = () => youtube_exports;
//#endregion
export { page };
