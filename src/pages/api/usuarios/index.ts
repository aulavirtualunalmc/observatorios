import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { clienteSupabase } from "../../../lib/supabase";

export const prerender = false;

const TABLA = "usuarios_estudiantes";

/**
 * GET /api/usuarios
 * Obtiene todos los estudiantes registrados
 */
export const GET: APIRoute = async () => {
  try {
    const usuarios = await clienteSupabase.consultar(
      TABLA,
      "select=*&order=created_at.desc"
    );
    return new Response(JSON.stringify(usuarios), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Error al obtener estudiantes" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

/**
 * POST /api/usuarios
 * Registra un nuevo usuario estudiante hasheando la contraseña (por defecto la cédula)
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const nombres = (body.nombres || "").trim();
    const apellidos = (body.apellidos || "").trim();
    const nombre = (body.nombre || `${nombres} ${apellidos}`).trim();
    const email = (body.email || "").trim().toLowerCase();
    const cedula = (body.cedula || "").trim();
    const telefono = (body.telefono || "").trim();
    const fechaNacimiento = (
      body.rangoEdad ||
      body.rango_edad ||
      body.fechaNacimiento ||
      body.fecha_nacimiento ||
      ""
    ).trim();
    const condicionAcademica = (
      body.condicionAcademica ||
      body.condicion_academica ||
      ""
    ).trim();
    const universidad = (body.universidad || "").trim();
    const carrera = (body.carrera || "").trim();
    const semestreBruto = (body.semestre || "").trim();
    const semestre =
      condicionAcademica === "Graduado" && (!semestreBruto || semestreBruto === "No aplica")
        ? "Graduado"
        : (semestreBruto || "No aplica");
    const estado = body.estado || "Activo";
    const password = body.password;
    const rolAsignado =
      condicionAcademica === "Graduado" || semestre === "Graduado" ? "Graduado" : "Estudiante";

    if (!nombre) {
      return new Response(
        JSON.stringify({ error: "El nombre es obligatorio." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "El correo electrónico no es válido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!cedula) {
      return new Response(
        JSON.stringify({ error: "El número de identificación (cédula) es obligatorio." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verificar si ya existe un estudiante con esa cédula o correo
    const existentes = await clienteSupabase.consultar<any>(
      TABLA,
      `or=(email.eq.${encodeURIComponent(email)},cedula.eq.${encodeURIComponent(cedula)})&select=id`
    );

    if (existentes && existentes.length > 0) {
      return new Response(
        JSON.stringify({ error: "Ya existe un usuario registrado con este correo o número de identificación." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generar hash de contraseña (la contraseña inicial es la cédula si no se especifica otra)
    const claveAHashear = password && password.trim() ? password.trim() : cedula;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(claveAHashear, salt);

    const payload = {
      nombre,
      email,
      cedula,
      telefono,
      fecha_nacimiento: fechaNacimiento,
      universidad,
      carrera,
      semestre,
      password_hash: passwordHash,
      rol: rolAsignado,
      estado,
    };

    const usuarioCreado = await clienteSupabase.insertar(TABLA, payload);

    return new Response(JSON.stringify(usuarioCreado), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Error al crear estudiante." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

/**
 * DELETE /api/usuarios
 * Eliminación masiva de usuarios estudiantes
 */
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return new Response(
        JSON.stringify({ error: "Se requiere un array de IDs para eliminar." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await clienteSupabase.eliminarMasivo(TABLA, ids);

    return new Response(JSON.stringify({ exito: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Error al eliminar estudiantes." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
