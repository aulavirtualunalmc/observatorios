import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter } from "./SkyShader_DL8DbueI.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { t as FormToasts } from "./FormToasts_B_uqcMxT.mjs";
import { n as $$FormularioCrearUsuario } from "./usuarios_CMrBAb8j.mjs";
//#region src/pages/dashboard/usuarios/nuevo.astro
var nuevo_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Nuevo,
	file: () => $$file,
	url: () => $$url
});
var $$Nuevo = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Crear nuevo usuario para la Red de Aprendizaje del Observatorio"><title>Nuevo Usuario · Observatorio</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral con Usuarios Estudiantes activo -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Usuarios Estudiantes" })}<!-- Contenido de la Página de Creación --><main class="flex-1 flex flex-col min-w-0">${renderComponent($$result, "FormularioCrearUsuario", $$FormularioCrearUsuario, {})}</main></div><!-- Toast oficial de HeroUI con redirección opcional o feedback -->${renderComponent($$result, "FormToasts", FormToasts, {
		"client:load": true,
		"formId": "form-crear-usuario",
		"successTitle": "Usuario registrado",
		"successDescription": "El usuario ha sido registrado exitosamente en la Red de Aprendizaje.",
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/components/FormToasts.tsx",
		"client:component-export": "default"
	})}</body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/usuarios/nuevo.astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/usuarios/nuevo.astro";
var $$url = "/dashboard/usuarios/nuevo";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/usuarios/nuevo@_@astro
var page = () => nuevo_exports;
//#endregion
export { page };
