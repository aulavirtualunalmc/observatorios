import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter } from "./SkyShader_DL8DbueI.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { a as $$ContenidoRepositorio } from "./repositorio_BzNoFGnD.mjs";
//#region src/pages/dashboard/repositorio.astro
var repositorio_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Repositorio,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Repositorio = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Repositorio de documentos y producción científica del Observatorio de Responsabilidad Social"><title>Observatorio · Repositorio</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral de navegación con Repositorio activo -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Repositorio" })}<!-- Contenido principal del Repositorio --><main class="flex-1 flex flex-col min-w-0">${renderComponent($$result, "ContenidoRepositorio", $$ContenidoRepositorio, {})}</main></div></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/repositorio.astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/repositorio.astro";
var $$url = "/dashboard/repositorio";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/repositorio@_@astro
var page = () => repositorio_exports;
//#endregion
export { page };
