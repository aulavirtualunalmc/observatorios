import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as ServicioRepositorio } from "./repositorio.service_B7J6HIr8.mjs";
//#region src/pages/api/repositorio/[id].ts
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
		const documento = await ServicioRepositorio.obtenerDocumentoPorId(id);
		if (!documento) return new Response(JSON.stringify({ error: "Documento no encontrado" }), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify(documento), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al obtener el documento" }), {
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
		const documentoActualizado = await ServicioRepositorio.actualizarDocumento(id, datos);
		return new Response(JSON.stringify(documentoActualizado), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al actualizar el documento" }), {
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
		if (await ServicioRepositorio.eliminarDocumento(id)) return new Response(JSON.stringify({ mensaje: "Documento eliminado exitosamente" }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		else return new Response(JSON.stringify({ error: "No se pudo eliminar el documento" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al eliminar el documento" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/repositorio/[id]@_@ts
var page = () => _id__exports;
//#endregion
export { page };
