import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter } from "./SkyShader_DL8DbueI.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { i as $$ContenidoUsuarios } from "./usuarios_CMrBAb8j.mjs";
//#region src/pages/dashboard/usuarios/index.astro
var usuarios_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Gestión de usuarios y registros de la Red de Aprendizaje"><title>Observatorio · Usuarios Estudiantes</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral de navegación con Usuarios Estudiantes activo -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Usuarios Estudiantes" })}<!-- Contenido de Gestión de Usuarios --><main class="flex-1 flex flex-col min-w-0">${renderComponent($$result, "ContenidoUsuarios", $$ContenidoUsuarios, {})}</main></div></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/usuarios/index.astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/usuarios/index.astro";
var $$url = "/dashboard/usuarios";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/usuarios/index@_@astro
var page = () => usuarios_exports;
//#endregion
export { page };
