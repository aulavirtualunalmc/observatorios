import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter } from "./SkyShader_DL8DbueI.mjs";
import { t as ServicioRepositorio } from "./repositorio.service_B7J6HIr8.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { i as $$DetalleDocumentoRepositorio } from "./repositorio_BzNoFGnD.mjs";
//#region src/pages/dashboard/repositorio/[id].astro
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
	if (!id) return Astro.redirect("/dashboard/repositorio");
	const docData = await ServicioRepositorio.obtenerDocumentoPorId(id);
	if (!docData) return Astro.redirect("/dashboard/repositorio");
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(`Ficha técnica del documento: ${docData.titulo}`, "content")}><title>${docData.titulo} · Observatorio</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral de navegación con Repositorio activo -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Repositorio" })}<!-- Contenido de la Ficha Técnica del Documento --><main class="flex-1 flex flex-col min-w-0">${renderComponent($$result, "DetalleDocumentoRepositorio", $$DetalleDocumentoRepositorio, { "documento": docData })}</main></div></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/repositorio/[id].astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/repositorio/[id].astro";
var $$url = "/dashboard/repositorio/[id]";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/repositorio/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
