import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
import { t as ServicioInscripcionesRed } from "./inscripciones.service_DKSxoaWc.mjs";
//#region src/pages/api/red-aprendizaje/registro.ts
var registro_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var TABLA = "red_aprendizaje_nuevos";
/**
* POST /api/red-aprendizaje/registro
* Endpoint para registrar postulaciones de nuevos aspirantes a la red de aprendizaje
*/
var POST = async ({ request }) => {
	try {
		const configConvocatoria = await ServicioInscripcionesRed.obtenerConfiguracionConvocatoria();
		if (!configConvocatoria.activo || configConvocatoria.fechaLimite) return new Response(JSON.stringify({ error: configConvocatoria.mensajeCierre || "El periodo de inscripciones se encuentra cerrado." }), {
			status: 403,
			headers: { "Content-Type": "application/json" }
		});
		const body = await request.json();
		const nombre = (body.nombre || "").trim();
		const email = (body.email || "").trim().toLowerCase();
		const cedula = (body.cedula || "").trim();
		const telefono = (body.telefono || "").trim();
		const universidad = (body.universidad || "").trim();
		const carrera = (body.carrera || "").trim();
		const semestre = (body.semestre || "").trim();
		const dia = body.dia;
		const mes = (body.mes || "").trim();
		const anio = body.anio;
		if (!nombre || !email || !cedula || !telefono || !universidad || !carrera || !semestre || !dia || !mes || !anio) return new Response(JSON.stringify({ error: "Todos los campos son obligatorios para unirse a la red." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const fechaNacimiento = `${dia} de ${mes}, ${anio}`;
		const existentes = await clienteSupabase.consultar(TABLA, `or=(email.eq.${encodeURIComponent(email)},cedula.eq.${encodeURIComponent(cedula)})&select=id,email,cedula`);
		if (existentes && existentes.length > 0) {
			const motivo = existentes[0].email === email ? "Ya existe una solicitud registrada con este correo electrónico." : "Ya existe una solicitud registrada con este número de cédula.";
			return new Response(JSON.stringify({ error: motivo }), {
				status: 409,
				headers: { "Content-Type": "application/json" }
			});
		}
		const nuevoRegistro = {
			nombre,
			email,
			cedula,
			telefono,
			fecha_nacimiento: fechaNacimiento,
			universidad,
			carrera,
			semestre,
			estado: "Pendiente"
		};
		const resultado = await clienteSupabase.insertar(TABLA, nuevoRegistro);
		return new Response(JSON.stringify({
			exito: true,
			mensaje: "Tu solicitud para unirte a la red ha sido enviada con éxito.",
			registro: resultado
		}), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al registrar participante en la red:", error);
		return new Response(JSON.stringify({ error: "Ocurrió un error inesperado al procesar tu solicitud." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/red-aprendizaje/registro@_@ts
var page = () => registro_exports;
//#endregion
export { page };
