import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter, t as $$SkyShader } from "./SkyShader_DL8DbueI.mjs";
import { t as ServicioContenidoFeed } from "./contenido-feed.service_C9sUPp6G.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { t as FormularioEditarFeed } from "./contenido-feed_BH-g0ss5.mjs";
//#region src/pages/dashboard/contenido-feed/editar/[id].astro
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
	if (!id) return Astro.redirect("/dashboard/contenido-feed");
	const itemData = await ServicioContenidoFeed.obtenerItemPorId(id);
	if (!itemData) return Astro.redirect("/dashboard/contenido-feed");
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(`Editar contenido de feed: ${itemData.titulo}`, "content")}><title>Editar Feed · ${itemData.titulo}</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral con Contenido Feed activo -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Contenido Feed" })}<!-- Contenido de Edición con Fondo Dinámico --><main class="relative flex-1 flex flex-col min-w-0"><div class="pointer-events-none absolute inset-0 z-0 h-[22rem] overflow-hidden opacity-35">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><div class="relative z-10 flex-1 flex flex-col px-6 md:px-12 pt-8 md:pt-10 pb-16">${renderComponent($$result, "FormularioEditarFeed", FormularioEditarFeed, {
		"client:load": true,
		"item": itemData,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/contenido-feed/index.ts",
		"client:component-export": "FormularioEditarFeed"
	})}</div></main></div></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/contenido-feed/editar/[id].astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/contenido-feed/editar/[id].astro";
var $$url = "/dashboard/contenido-feed/editar/[id]";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/contenido-feed/editar/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
