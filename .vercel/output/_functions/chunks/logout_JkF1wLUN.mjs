import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { n as NOMBRE_COOKIE_SESION } from "./token.service_Dbuv1We5.mjs";
//#region src/pages/api/auth/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* POST /api/auth/logout
* Elimina la cookie de sesión del servidor
*/
var POST = async ({ cookies }) => {
	cookies.delete(NOMBRE_COOKIE_SESION, { path: "/" });
	return new Response(JSON.stringify({
		exito: true,
		mensaje: "Sesión cerrada correctamente."
	}), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/logout@_@ts
var page = () => logout_exports;
//#endregion
export { page };
