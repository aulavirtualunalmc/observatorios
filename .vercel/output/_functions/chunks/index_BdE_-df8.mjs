import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
//#region src/pages/api/reacciones/index.ts
var reacciones_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var TABLA_REACCIONES = "interacciones_reacciones";
var TABLA_FEED = "contenido_feed";
var TABLA_REPOSITORIO = "documentos_repositorio";
/**
* GET /api/reacciones?tipoContenido=feed&usuarioId=...
* Obtiene las reacciones registradas por un usuario o las cuentas de un item
*/
var GET = async ({ request }) => {
	try {
		const url = new URL(request.url);
		const tipoContenido = url.searchParams.get("tipoContenido");
		const usuarioId = url.searchParams.get("usuarioId");
		const contenidoId = url.searchParams.get("contenidoId");
		let queryParams = "select=*";
		if (tipoContenido) queryParams += `&tipo_contenido=eq.${tipoContenido}`;
		if (contenidoId) queryParams += `&contenido_id=eq.${contenidoId}`;
		if (usuarioId) queryParams += `&usuario_id=eq.${encodeURIComponent(usuarioId)}`;
		const registros = await clienteSupabase.consultar(TABLA_REACCIONES, queryParams);
		return new Response(JSON.stringify({
			exito: true,
			datos: registros || []
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al consultar reacciones:", error);
		return new Response(JSON.stringify({ error: "Error interno al consultar reacciones" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
/**
* POST /api/reacciones
* Registra, actualiza o desmarca un Like/Dislike para un contenido de feed o repositorio
*/
var POST = async ({ request }) => {
	try {
		const { tipoContenido, contenidoId, reaccion, usuarioId, usuarioEmail } = await request.json();
		if (!tipoContenido || !contenidoId || !reaccion) return new Response(JSON.stringify({ error: "Faltan parámetros obligatorios (tipoContenido, contenidoId, reaccion)" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const idUsuarioClave = usuarioId || usuarioEmail || "anonimo";
		const tablaDestino = tipoContenido === "repositorio" ? TABLA_REPOSITORIO : TABLA_FEED;
		const existentes = await clienteSupabase.consultar(TABLA_REACCIONES, `tipo_contenido=eq.${tipoContenido}&contenido_id=eq.${contenidoId}&usuario_id=eq.${encodeURIComponent(idUsuarioClave)}`);
		let reaccionFinal = null;
		let deltaLikes = 0;
		let deltaDislikes = 0;
		if (existentes && existentes.length > 0) {
			const registroActual = existentes[0];
			if (registroActual.reaccion === reaccion) {
				await clienteSupabase.eliminar(TABLA_REACCIONES, registroActual.id);
				reaccionFinal = null;
				if (reaccion === "like") deltaLikes = -1;
				if (reaccion === "dislike") deltaDislikes = -1;
			} else {
				await clienteSupabase.actualizar(TABLA_REACCIONES, registroActual.id, {
					reaccion,
					actualizado_en: (/* @__PURE__ */ new Date()).toISOString()
				});
				reaccionFinal = reaccion;
				if (reaccion === "like") {
					deltaLikes = 1;
					deltaDislikes = -1;
				} else {
					deltaLikes = -1;
					deltaDislikes = 1;
				}
			}
		} else {
			await clienteSupabase.insertar(TABLA_REACCIONES, {
				tipo_contenido: tipoContenido,
				contenido_id: contenidoId,
				usuario_id: idUsuarioClave,
				usuario_email: usuarioEmail || null,
				reaccion
			});
			reaccionFinal = reaccion;
			if (reaccion === "like") deltaLikes = 1;
			if (reaccion === "dislike") deltaDislikes = 1;
		}
		const itemsActuales = await clienteSupabase.consultar(tablaDestino, `id=eq.${contenidoId}&select=*`);
		const itemActual = itemsActuales && itemsActuales.length > 0 ? itemsActuales[0] : null;
		let nuevosLikes = 0;
		let nuevosDislikes = 0;
		if (itemActual) {
			nuevosLikes = Math.max(0, (Number(itemActual.likes_count) || 0) + deltaLikes);
			nuevosDislikes = Math.max(0, (Number(itemActual.dislikes_count) || 0) + deltaDislikes);
			await clienteSupabase.actualizar(tablaDestino, contenidoId, {
				likes_count: nuevosLikes,
				dislikes_count: nuevosDislikes
			});
		}
		return new Response(JSON.stringify({
			exito: true,
			reaccionActual: reaccionFinal,
			likesCount: nuevosLikes,
			dislikesCount: nuevosDislikes
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al procesar reacción:", error);
		return new Response(JSON.stringify({ error: "Error interno al procesar reacción" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/reacciones/index@_@ts
var page = () => reacciones_exports;
//#endregion
export { page };
