import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
import bcrypt from "bcryptjs";
//#region src/pages/api/usuarios/[id].ts
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var TABLA = "usuarios_estudiantes";
/**
* GET /api/usuarios/[id]
* Obtiene un estudiante por ID
*/
var GET = async ({ params }) => {
	try {
		const { id } = params;
		if (!id) return new Response(JSON.stringify({ error: "El ID es requerido." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const usuarios = await clienteSupabase.consultar(TABLA, `id=eq.${id}&select=*`);
		if (!usuarios || usuarios.length === 0) return new Response(JSON.stringify({ error: "Estudiante no encontrado." }), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify(usuarios[0]), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al obtener estudiante." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
/**
* PUT /api/usuarios/[id]
* Actualiza la información de un estudiante
*/
var PUT = async ({ params, request }) => {
	try {
		const { id } = params;
		if (!id) return new Response(JSON.stringify({ error: "El ID es requerido." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { nombre, email, cedula, telefono, fechaNacimiento, universidad, carrera, semestre, estado, password } = await request.json();
		const payload = {};
		if (nombre !== void 0) payload.nombre = nombre.trim();
		if (email !== void 0) payload.email = email.trim().toLowerCase();
		if (cedula !== void 0) payload.cedula = cedula.trim();
		if (telefono !== void 0) payload.telefono = telefono.trim();
		if (fechaNacimiento !== void 0) payload.fecha_nacimiento = fechaNacimiento;
		if (universidad !== void 0) payload.universidad = universidad.trim();
		if (carrera !== void 0) payload.carrera = carrera.trim();
		if (semestre !== void 0) payload.semestre = semestre.trim();
		if (estado !== void 0) payload.estado = estado;
		if (password && password.trim().length >= 4) {
			const salt = bcrypt.genSaltSync(10);
			payload.password_hash = bcrypt.hashSync(password.trim(), salt);
		}
		await clienteSupabase.actualizar(TABLA, id, payload);
		return new Response(JSON.stringify({ exito: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al actualizar estudiante." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
/**
* DELETE /api/usuarios/[id]
* Elimina un estudiante por ID
*/
var DELETE = async ({ params }) => {
	try {
		const { id } = params;
		if (!id) return new Response(JSON.stringify({ error: "El ID es requerido." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		await clienteSupabase.eliminar(TABLA, id);
		return new Response(JSON.stringify({ exito: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al eliminar estudiante." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/usuarios/[id]@_@ts
var page = () => _id__exports;
//#endregion
export { page };
