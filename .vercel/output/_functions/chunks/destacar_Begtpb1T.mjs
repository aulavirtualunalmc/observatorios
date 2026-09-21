import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as ServicioContenidoFeed } from "./contenido-feed.service_C9sUPp6G.mjs";
//#region src/pages/api/contenido-feed/destacar.ts
var destacar_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	try {
		const { id, tipo, destacado } = await request.json();
		if (!id || !tipo) return new Response(JSON.stringify({ error: "Faltan parámetros requeridos (id, tipo)." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (!await ServicioContenidoFeed.establecerDestacado(id, tipo, Boolean(destacado))) return new Response(JSON.stringify({ error: "No se pudo actualizar el estado de destacado." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify({
			exito: true,
			id,
			tipo,
			destacado: Boolean(destacado),
			mensaje: Boolean(destacado) ? `Contenido establecido como destacado exclusivo para ${tipo === "noticia" ? "Noticias" : "YouTube"}.` : `Contenido desmarcado de destacados.`
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error en endpoint /api/contenido-feed/destacar:", error);
		return new Response(JSON.stringify({ error: error.message || "Error interno al procesar destacado." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/contenido-feed/destacar@_@ts
var page = () => destacar_exports;
//#endregion
export { page };
