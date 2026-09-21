import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
import bcrypt from "bcryptjs";
//#region src/pages/api/usuarios/index.ts
var usuarios_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var TABLA = "usuarios_estudiantes";
/**
* GET /api/usuarios
* Obtiene todos los estudiantes registrados
*/
var GET = async () => {
	try {
		const usuarios = await clienteSupabase.consultar(TABLA, "select=*&order=created_at.desc");
		return new Response(JSON.stringify(usuarios), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al obtener estudiantes" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
/**
* POST /api/usuarios
* Registra un nuevo usuario estudiante hasheando la contraseña (por defecto la cédula)
*/
var POST = async ({ request }) => {
	try {
		const { nombre, email, cedula, telefono, fechaNacimiento, universidad, carrera, semestre, estado, password } = await request.json();
		if (!nombre || !nombre.trim()) return new Response(JSON.stringify({ error: "El nombre es obligatorio." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (!email || !email.trim() || !email.includes("@")) return new Response(JSON.stringify({ error: "El correo electrónico no es válido." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (!cedula || !cedula.trim()) return new Response(JSON.stringify({ error: "La cédula es obligatoria." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const existentes = await clienteSupabase.consultar(TABLA, `or=(email.eq.${encodeURIComponent(email.trim().toLowerCase())},cedula.eq.${encodeURIComponent(cedula.trim())})&select=id`);
		if (existentes && existentes.length > 0) return new Response(JSON.stringify({ error: "Ya existe un estudiante registrado con este correo o cédula." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const claveAHashear = password && password.trim() ? password.trim() : cedula.trim();
		const salt = bcrypt.genSaltSync(10);
		const passwordHash = bcrypt.hashSync(claveAHashear, salt);
		const payload = {
			nombre: nombre.trim(),
			email: email.trim().toLowerCase(),
			cedula: cedula.trim(),
			telefono: telefono ? telefono.trim() : "",
			fecha_nacimiento: fechaNacimiento || "",
			universidad: universidad ? universidad.trim() : "",
			carrera: carrera ? carrera.trim() : "",
			semestre: semestre ? semestre.trim() : "",
			password_hash: passwordHash,
			rol: "Estudiante",
			estado: estado || "Activo"
		};
		const usuarioCreado = await clienteSupabase.insertar(TABLA, payload);
		return new Response(JSON.stringify(usuarioCreado), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al crear estudiante." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
/**
* DELETE /api/usuarios
* Eliminación masiva de usuarios estudiantes
*/
var DELETE = async ({ request }) => {
	try {
		const { ids } = await request.json();
		if (!Array.isArray(ids) || ids.length === 0) return new Response(JSON.stringify({ error: "Se requiere un array de IDs para eliminar." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		await clienteSupabase.eliminarMasivo(TABLA, ids);
		return new Response(JSON.stringify({ exito: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al eliminar estudiantes." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/usuarios/index@_@ts
var page = () => usuarios_exports;
//#endregion
export { page };
