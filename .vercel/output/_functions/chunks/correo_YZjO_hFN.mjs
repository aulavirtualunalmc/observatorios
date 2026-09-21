import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter } from "./SkyShader_DL8DbueI.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { t as $$ContenidoCorreosRed } from "./red-aprendizaje_ClW24Vce.mjs";
//#region src/pages/dashboard/red-aprendizaje/correo.astro
var correo_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Correo,
	file: () => $$file,
	url: () => $$url
});
var $$Correo = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Gestión de correos, plantillas y comunicaciones de la Red de Aprendizaje"><title>Observatorio · Correos de la Red de Aprendizaje</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral con sub-opción Correo activa -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Correo" })}<!-- Contenido del Módulo de Correos --><main class="flex-1 flex flex-col min-w-0">${renderComponent($$result, "ContenidoCorreosRed", $$ContenidoCorreosRed, {})}</main></div></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/red-aprendizaje/correo.astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/red-aprendizaje/correo.astro";
var $$url = "/dashboard/red-aprendizaje/correo";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/red-aprendizaje/correo@_@astro
var page = () => correo_exports;
//#endregion
export { page };
