import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
import bcrypt from "bcryptjs";
//#region src/pages/api/usuarios-admin/[id].ts
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PATCH: () => PATCH,
	prerender: () => false
});
var TABLA = "usuarios_administrativos";
/**
* PATCH /api/usuarios-admin/[id]
* Actualiza un usuario administrativo hasheando la nueva contraseña en el servidor si se proporciona
*/
var PATCH = async ({ params, request }) => {
	try {
		const { id } = params;
		if (!id) return new Response(JSON.stringify({ error: "ID no provisto" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const body = await request.json();
		const payload = {};
		if (body.nombre !== void 0) payload.nombre = body.nombre.trim();
		if (body.email !== void 0) payload.email = body.email.trim().toLowerCase();
		if (body.rol !== void 0) payload.rol = body.rol;
		if (body.estado !== void 0) payload.estado = body.estado;
		if (body.password && body.password.trim().length > 0) {
			const salt = bcrypt.genSaltSync(10);
			payload.password_hash = bcrypt.hashSync(body.password.trim(), salt);
		}
		const usuarioActualizado = await clienteSupabase.actualizar(TABLA, id, payload);
		return new Response(JSON.stringify(usuarioActualizado), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al actualizar usuario" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
/**
* DELETE /api/usuarios-admin/[id]
* Elimina un usuario administrativo por ID
*/
var DELETE = async ({ params }) => {
	try {
		const { id } = params;
		if (!id) return new Response(JSON.stringify({ error: "ID no provisto" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		await clienteSupabase.eliminar(TABLA, id);
		return new Response(JSON.stringify({ exito: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Error al eliminar usuario" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/usuarios-admin/[id]@_@ts
var page = () => _id__exports;
//#endregion
export { page };
