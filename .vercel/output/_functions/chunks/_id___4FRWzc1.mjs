import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as ServicioContenidoFeed } from "./contenido-feed.service_C9sUPp6G.mjs";
//#region src/pages/api/contenido-feed/[id].ts
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params }) => {
	const { id } = params;
	if (!id) return new Response(JSON.stringify({ error: "ID no proporcionado" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	try {
		const item = await ServicioContenidoFeed.obtenerItemPorId(id);
		if (!item) return new Response(JSON.stringify({ error: "Contenido feed no encontrado" }), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify(item), {
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
var PUT = async ({ params, request }) => {
	const { id } = params;
	if (!id) return new Response(JSON.stringify({ error: "ID no proporcionado" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	try {
		const datos = await request.json();
		const itemActualizado = await ServicioContenidoFeed.actualizarItem(id, datos);
		return new Response(JSON.stringify(itemActualizado), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al actualizar el contenido feed" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var DELETE = async ({ params }) => {
	const { id } = params;
	if (!id) return new Response(JSON.stringify({ error: "ID no proporcionado" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	try {
		if (await ServicioContenidoFeed.eliminarItem(id)) return new Response(JSON.stringify({ mensaje: "Contenido feed eliminado exitosamente" }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		else return new Response(JSON.stringify({ error: "No se pudo eliminar el contenido feed" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al eliminar el contenido feed" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/contenido-feed/[id]@_@ts
var page = () => _id__exports;
//#endregion
export { page };
