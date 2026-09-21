import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter, t as $$SkyShader } from "./SkyShader_DL8DbueI.mjs";
import { t as ServicioRepositorio } from "./repositorio.service_B7J6HIr8.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { t as FormularioEditarDocumento } from "./repositorio_BzNoFGnD.mjs";
//#region src/pages/dashboard/contenido-repositorio/editar/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Id = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const { id } = Astro.params;
	if (!id) return Astro.redirect("/dashboard/contenido-repositorio");
	const documentoData = await ServicioRepositorio.obtenerDocumentoPorId(id);
	if (!documentoData) return Astro.redirect("/dashboard/contenido-repositorio");
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(`Editar documento del repositorio: ${documentoData.titulo}`, "content")}><title>Editar Documento · ${documentoData.titulo}</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral con Contenido Repositorios activo -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Contenido Repositorios" })}<!-- Contenido de Edición con Fondo Dinámico --><main class="relative flex-1 flex flex-col min-w-0"><div class="pointer-events-none absolute inset-0 z-0 h-[22rem] overflow-hidden opacity-35">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><div class="relative z-10 flex-1 flex flex-col px-6 md:px-12 pt-8 md:pt-10 pb-16">${renderComponent($$result, "FormularioEditarDocumento", FormularioEditarDocumento, {
		"client:load": true,
		"documento": documentoData,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/repositorio/index.ts",
		"client:component-export": "FormularioEditarDocumento"
	})}</div></main></div></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/contenido-repositorio/editar/[id].astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/contenido-repositorio/editar/[id].astro";
var $$url = "/dashboard/contenido-repositorio/editar/[id]";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/contenido-repositorio/editar/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
