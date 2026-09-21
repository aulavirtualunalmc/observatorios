import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as ServicioContenidoFeed } from "./contenido-feed.service_C9sUPp6G.mjs";
//#region src/pages/api/contenido-feed/index.ts
var contenido_feed_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async () => {
	try {
		const items = await ServicioContenidoFeed.obtenerItems();
		return new Response(JSON.stringify(items), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al obtener el contenido feed" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async ({ request }) => {
	try {
		const datos = await request.json();
		if (!datos.titulo || !datos.enlace || !datos.tipo) return new Response(JSON.stringify({ error: "Título, enlace y tipo son requeridos" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const itemCreado = await ServicioContenidoFeed.crearItem(datos);
		return new Response(JSON.stringify(itemCreado), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al crear el contenido feed" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var DELETE = async ({ request }) => {
	try {
		const { ids } = await request.json();
		if (!ids || !Array.isArray(ids) || ids.length === 0) return new Response(JSON.stringify({ error: "Se requiere un array de IDs para la eliminación masiva" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (await ServicioContenidoFeed.eliminarItemsMultiples(ids)) return new Response(JSON.stringify({
			mensaje: "Contenidos eliminados con éxito",
			total: ids.length
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		else return new Response(JSON.stringify({ error: "No se pudieron eliminar los contenidos" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error en la eliminación masiva" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/contenido-feed/index@_@ts
var page = () => contenido_feed_exports;
//#endregion
export { page };
