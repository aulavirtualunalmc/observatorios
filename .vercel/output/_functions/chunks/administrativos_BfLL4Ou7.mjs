import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter } from "./SkyShader_DL8DbueI.mjs";
import { t as $$Sidebar } from "./Sidebar_BiJuojzB.mjs";
import { r as $$ContenidoUsuariosAdmin } from "./usuarios_CMrBAb8j.mjs";
//#region src/pages/dashboard/usuarios/administrativos.astro
var administrativos_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Administrativos,
	file: () => $$file,
	url: () => $$url
});
var $$Administrativos = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Gestión de usuarios administrativos y accesos del Observatorio"><title>Observatorio · Usuarios Administrativos</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><div class="flex min-h-svh w-full"><!-- Barra lateral con Usuarios Administrativos activo -->${renderComponent($$result, "Sidebar", $$Sidebar, { "active": "Usuarios Administrativos" })}<!-- Contenido de Gestión de Usuarios Administrativos --><main class="flex-1 flex flex-col min-w-0">${renderComponent($$result, "ContenidoUsuariosAdmin", $$ContenidoUsuariosAdmin, {})}</main></div></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/usuarios/administrativos.astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/dashboard/usuarios/administrativos.astro";
var $$url = "/dashboard/usuarios/administrativos";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/usuarios/administrativos@_@astro
var page = () => administrativos_exports;
//#endregion
export { page };
