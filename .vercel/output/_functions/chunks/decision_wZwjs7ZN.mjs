import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
import bcrypt from "bcryptjs";
//#region src/pages/api/red-aprendizaje/decision.ts
var decision_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var TABLA_SOLICITUDES = "red_aprendizaje_nuevos";
var TABLA_ESTUDIANTES = "usuarios_estudiantes";
async function invocarEdgeFunctionBienvenida(datos) {
	try {
		const res = await fetch(`https://gazmrklvrqajobxkblqz.supabase.co/functions/v1/enviar-correo-bienvenida`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhem1ya2x2cnFham9ieGtibHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MDEzNDQsImV4cCI6MjA3ODI3NzM0NH0.zTlOuL3078OEUnUF_wn58Hilmjn1VpS82a7gU15hjFE`
			},
			body: JSON.stringify(datos)
		});
		if (!res.ok) console.warn("Respuesta no OK de Edge Function:", await res.text());
	} catch (error) {
		console.error("Error al invocar Edge Function de correo de bienvenida:", error);
	}
}
var POST = async ({ request }) => {
	try {
		const body = await request.json();
		const accion = body.accion;
		if (accion !== "Aprobado" && accion !== "Rechazado") return new Response(JSON.stringify({ error: "Acción inválida. Debe ser 'Aprobado' o 'Rechazado'." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const ids = Array.isArray(body.ids) ? body.ids : body.id ? [body.id] : [];
		if (ids.length === 0) return new Response(JSON.stringify({ error: "Debes especificar al menos un ID de solicitud." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const procesados = [];
		for (const id of ids) {
			const solicitudes = await clienteSupabase.consultar(TABLA_SOLICITUDES, `id=eq.${id}&select=*`);
			if (!solicitudes || solicitudes.length === 0) continue;
			const solicitud = solicitudes[0];
			await clienteSupabase.actualizar(TABLA_SOLICITUDES, id, { estado: accion });
			if (accion === "Aprobado") {
				const passwordHash = bcrypt.hashSync(solicitud.cedula, 10);
				const existentes = await clienteSupabase.consultar(TABLA_ESTUDIANTES, `or=(email.eq.${encodeURIComponent(solicitud.email)},cedula.eq.${encodeURIComponent(solicitud.cedula)})&select=id`);
				if (existentes && existentes.length > 0) await clienteSupabase.actualizar(TABLA_ESTUDIANTES, existentes[0].id, {
					solicitud_id: solicitud.id,
					estado: "Activo",
					password_hash: passwordHash
				});
				else await clienteSupabase.insertar(TABLA_ESTUDIANTES, {
					solicitud_id: solicitud.id,
					nombre: solicitud.nombre,
					email: solicitud.email,
					cedula: solicitud.cedula,
					telefono: solicitud.telefono,
					fecha_nacimiento: solicitud.fecha_nacimiento,
					universidad: solicitud.universidad,
					carrera: solicitud.carrera,
					semestre: solicitud.semestre,
					password_hash: passwordHash,
					rol: "Estudiante",
					estado: "Activo"
				});
				await invocarEdgeFunctionBienvenida({
					nombre: solicitud.nombre,
					email: solicitud.email,
					cedula: solicitud.cedula,
					universidad: solicitud.universidad,
					carrera: solicitud.carrera
				});
			}
			procesados.push(id);
		}
		const mensaje = accion === "Aprobado" ? `Se ha aprobado y enviado el correo con credenciales a ${procesados.length} aspirante(s).` : `Se ha rechazado la solicitud de ${procesados.length} aspirante(s).`;
		return new Response(JSON.stringify({
			exito: true,
			mensaje,
			procesados,
			nuevoEstado: accion
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al procesar decisión de solicitud:", error);
		return new Response(JSON.stringify({ error: "Ocurrió un error inesperado al procesar la solicitud." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/red-aprendizaje/decision@_@ts
var page = () => decision_exports;
//#endregion
export { page };
