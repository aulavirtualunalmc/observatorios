import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter } from "./SkyShader_DL8DbueI.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { t as FormToasts } from "./FormToasts_B_uqcMxT.mjs";
import { a as ServicioUsuarios, t as $$FormularioEditarUsuario } from "./usuarios_CMrBAb8j.mjs";
//#region src/pages/dashboard/usuarios/editar/[id].astro
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
	if (!id) return Astro.redirect("/dashboard/usuarios");
	const usuarioData = await ServicioUsuarios.obtenerUsuarioPorId(id);
	if (!usuarioData) return Astro.redirect("/dashboard/usuarios");
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(`Editar datos del usuario ${usuarioData.nombre}`, "content")}><title>Editar Usuario · ${usuarioData.nombre}</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral con Usuarios Estudiantes activo -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Usuarios Estudiantes" })}<!-- Contenido de la Página de Edición --><main class="flex-1 flex flex-col min-w-0">${renderComponent($$result, "FormularioEditarUsuario", $$FormularioEditarUsuario, { "usuario": usuarioData })}</main></div><!-- Toast oficial de HeroUI -->${renderComponent($$result, "FormToasts", FormToasts, {
		"client:load": true,
		"formId": "form-editar-usuario",
		"successTitle": "Usuario actualizado",
		"successDescription": "Los cambios del usuario han sido guardados correctamente.",
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/components/FormToasts.tsx",
		"client:component-export": "default"
	})}</body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/usuarios/editar/[id].astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/usuarios/editar/[id].astro";
var $$url = "/dashboard/usuarios/editar/[id]";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/usuarios/editar/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
