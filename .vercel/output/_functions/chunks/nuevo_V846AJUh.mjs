import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter, t as $$SkyShader } from "./SkyShader_DL8DbueI.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { n as FormularioCargarFeed } from "./contenido-feed_BH-g0ss5.mjs";
//#region src/pages/dashboard/contenido-feed/nuevo.astro
var nuevo_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Nuevo,
	file: () => $$file,
	url: () => $$url
});
var $$Nuevo = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Cargar nuevo enlace y publicación al Feed del Observatorio"><title>Cargar Nuevo Enlace · Contenido Feed</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral con Contenido Feed activo -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Contenido Feed" })}<!-- Contenido de Carga con Fondo Dinámico --><main class="relative flex-1 flex flex-col min-w-0"><div class="pointer-events-none absolute inset-0 z-0 h-[22rem] overflow-hidden opacity-35">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><div class="relative z-10 flex-1 flex flex-col px-6 md:px-12 pt-8 md:pt-10 pb-16">${renderComponent($$result, "FormularioCargarFeed", FormularioCargarFeed, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/contenido-feed/index.ts",
		"client:component-export": "FormularioCargarFeed"
	})}</div></main></div></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/contenido-feed/nuevo.astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/contenido-feed/nuevo.astro";
var $$url = "/dashboard/contenido-feed/nuevo";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/contenido-feed/nuevo@_@astro
var page = () => nuevo_exports;
//#endregion
export { page };
