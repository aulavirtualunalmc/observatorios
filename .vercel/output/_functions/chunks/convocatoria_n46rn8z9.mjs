import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as ServicioInscripcionesRed } from "./inscripciones.service_DKSxoaWc.mjs";
//#region src/pages/api/red-aprendizaje/convocatoria.ts
var convocatoria_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* GET /api/red-aprendizaje/convocatoria
* Retorna la configuración actual del estado de la convocatoria
*/
var GET = async () => {
	try {
		const config = await ServicioInscripcionesRed.obtenerConfiguracionConvocatoria();
		return new Response(JSON.stringify(config), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al obtener la configuración" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
/**
* POST /api/red-aprendizaje/convocatoria
* Actualiza la fecha límite, estado activo y mensaje de cierre
*/
var POST = async ({ request }) => {
	try {
		const { fechaLimite, mensajeCierre, activo } = await request.json();
		const configActualizada = await ServicioInscripcionesRed.guardarConfiguracionConvocatoria({
			fechaLimite: fechaLimite !== void 0 ? fechaLimite : null,
			mensajeCierre: mensajeCierre || "El periodo de inscripciones para la Red de Aprendizaje ha finalizado.",
			activo: activo !== void 0 ? Boolean(activo) : fechaLimite ? false : true
		});
		return new Response(JSON.stringify(configActualizada), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al guardar la configuración" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/red-aprendizaje/convocatoria@_@ts
var page = () => convocatoria_exports;
//#endregion
export { page };
