import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter } from "./SkyShader_DL8DbueI.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { n as $$ContenidoRedAprendizaje } from "./red-aprendizaje_ClW24Vce.mjs";
//#region src/pages/dashboard/red-aprendizaje.astro
var red_aprendizaje_exports = /* @__PURE__ */ __exportAll({
	default: () => $$RedAprendizaje,
	file: () => $$file,
	url: () => $$url
});
var $$RedAprendizaje = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Gestión y aprobación de solicitudes para la Red de Aprendizaje"><title>Observatorio · Red de Aprendizaje</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral con Usuarios Nuevos activa -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Usuarios Nuevos" })}<!-- Contenido del Módulo --><main class="flex-1 flex flex-col min-w-0">${renderComponent($$result, "ContenidoRedAprendizaje", $$ContenidoRedAprendizaje, {})}</main></div></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/red-aprendizaje.astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/red-aprendizaje.astro";
var $$url = "/dashboard/red-aprendizaje";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/red-aprendizaje@_@astro
var page = () => red_aprendizaje_exports;
//#endregion
export { page };
