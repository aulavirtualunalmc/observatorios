import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as ServicioRepositorio } from "./repositorio.service_B7J6HIr8.mjs";
//#region src/pages/api/repositorio/index.ts
var repositorio_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async () => {
	try {
		const documentos = await ServicioRepositorio.obtenerDocumentos();
		return new Response(JSON.stringify(documentos), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al obtener los documentos" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async ({ request }) => {
	try {
		const datos = await request.json();
		if (!datos.titulo || !datos.lineaInvestigacion || !datos.ano || !datos.pais || !datos.tipoFuente) return new Response(JSON.stringify({ error: "Título, línea de investigación, año, país y tipo de fuente son obligatorios" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const documentoCreado = await ServicioRepositorio.crearDocumento({
			ano: String(datos.ano).trim(),
			lineaInvestigacion: datos.lineaInvestigacion.trim(),
			titulo: datos.titulo.trim(),
			tipoFuente: datos.tipoFuente.trim(),
			pais: datos.pais.trim(),
			categoria: datos.categoria ? String(datos.categoria).trim() : void 0,
			autores: Array.isArray(datos.autores) ? datos.autores : [],
			paginasWeb: Array.isArray(datos.paginasWeb) ? datos.paginasWeb.map((p) => String(p).trim()).filter(Boolean) : datos.enlaceDocumento ? [String(datos.enlaceDocumento).trim()] : [],
			enlaceDocumento: datos.enlaceDocumento ? datos.enlaceDocumento.trim() : void 0,
			resumen: datos.resumen ? datos.resumen.trim() : void 0,
			referenciaApa: datos.referenciaApa ? datos.referenciaApa.trim() : void 0
		});
		return new Response(JSON.stringify(documentoCreado), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al crear el documento" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var DELETE = async ({ request }) => {
	try {
		const { ids } = await request.json();
		if (!ids || !Array.isArray(ids) || ids.length === 0) return new Response(JSON.stringify({ error: "Se requiere un arreglo de IDs para la eliminación masiva" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (await ServicioRepositorio.eliminarDocumentosMasivo(ids)) return new Response(JSON.stringify({
			mensaje: "Documentos eliminados exitosamente",
			total: ids.length
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		else return new Response(JSON.stringify({ error: "No se pudieron eliminar los documentos" }), {
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
//#region \0virtual:astro:page:src/pages/api/repositorio/index@_@ts
var page = () => repositorio_exports;
//#endregion
export { page };
