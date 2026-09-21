import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
import bcrypt from "bcryptjs";
//#region src/pages/api/usuarios-admin/index.ts
var usuarios_admin_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var TABLA = "usuarios_administrativos";
/**
* GET /api/usuarios-admin
* Obtiene todos los usuarios administrativos
*/
var GET = async () => {
	try {
		const usuarios = await clienteSupabase.consultar(TABLA, "select=*&order=fecha_creacion.desc");
		return new Response(JSON.stringify(usuarios), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al obtener usuarios" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
/**
* POST /api/usuarios-admin
* Registra un nuevo usuario administrativo hasheando la contraseña con bcrypt en el servidor
*/
var POST = async ({ request }) => {
	try {
		const { nombre, email, password, rol, estado } = await request.json();
		if (!nombre || !nombre.trim()) return new Response(JSON.stringify({ error: "El nombre es obligatorio." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (!email || !email.trim() || !email.includes("@")) return new Response(JSON.stringify({ error: "El correo electrónico no es válido." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (!password || password.trim().length < 4) return new Response(JSON.stringify({ error: "La contraseña debe tener al menos 4 caracteres." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const salt = bcrypt.genSaltSync(10);
		const passwordHash = bcrypt.hashSync(password.trim(), salt);
		if (!passwordHash || !passwordHash.startsWith("$2")) return new Response(JSON.stringify({ error: "Fallo crítico al generar el hash bcrypt de la contraseña." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
		const payload = {
			nombre: nombre.trim(),
			email: email.trim().toLowerCase(),
			password_hash: passwordHash,
			rol: rol || "Administrador",
			estado: estado || "Activo",
			ultimo_acceso: "Justo ahora"
		};
		const usuarioCreado = await clienteSupabase.insertar(TABLA, payload);
		return new Response(JSON.stringify(usuarioCreado), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al crear usuario administrativo." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
/**
* DELETE /api/usuarios-admin
* Eliminación masiva de usuarios administrativos
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
		return new Response(JSON.stringify({ error: error.message || "Error al eliminar usuarios." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/usuarios-admin/index@_@ts
var page = () => usuarios_admin_exports;
//#endregion
export { page };
