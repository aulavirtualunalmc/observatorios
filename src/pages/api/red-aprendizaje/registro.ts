import type { APIRoute } from "astro";
import { clienteSupabase } from "../../../lib/supabase";
import { ServicioInscripcionesRed } from "../../../modules/red-aprendizaje/services/inscripciones.service";

export const prerender = false;

const TABLA = "red_aprendizaje_nuevos";

/**
 * POST /api/red-aprendizaje/registro
 * Endpoint para registrar postulaciones de nuevos aspirantes a la red de aprendizaje
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    // Validar estado de la convocatoria
    const configConvocatoria = await ServicioInscripcionesRed.obtenerConfiguracionConvocatoria();
    if (!configConvocatoria.activo || configConvocatoria.fechaLimite) {
      return new Response(
        JSON.stringify({
          error: configConvocatoria.mensajeCierre || "El periodo de inscripciones se encuentra cerrado.",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await request.json();

    const nombres = (body.nombres || "").trim();
    const apellidos = (body.apellidos || "").trim();
    const nombre = (body.nombre || `${nombres} ${apellidos}`).trim();
    const email = (body.email || "").trim().toLowerCase();
    const cedula = (body.cedula || "").trim();
    const rangoEdad = (body.rangoEdad || body.rango_edad || body.fechaNacimiento || "").trim();
    const condicionAcademica = (body.condicionAcademica || body.condicion_academica || "").trim();
    const universidad = (body.universidad || "").trim();
    const carrera = (body.carrera || "").trim();
    const semestreBruto = (body.semestre || "").trim();
    const semestre = condicionAcademica === "Graduado" && (!semestreBruto || semestreBruto === "No aplica")
      ? "Graduado"
      : (semestreBruto || "No aplica");
    const telefono = (body.telefono || "").trim();

    const aceptaTratamientoDatos =
      body.aceptaTratamientoDatos === true ||
      body.aceptaTratamientoDatos === "on" ||
      body.aceptaTratamientoDatos === "true" ||
      body.tratamientoDatos === true;

    if (!aceptaTratamientoDatos) {
      return new Response(
        JSON.stringify({
          error: "Debes autorizar la Política de Privacidad y Tratamiento de Datos Personales para registrarte.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validación de campos obligatorios
    if (!nombre) {
      return new Response(
        JSON.stringify({ error: "Los nombres y apellidos son obligatorios." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Ingresa un correo electrónico institucional o personal válido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!cedula) {
      return new Response(
        JSON.stringify({ error: "El número de identificación es obligatorio." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!rangoEdad) {
      return new Response(
        JSON.stringify({ error: "Debes seleccionar tu rango de edad (solo mayores de edad)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!condicionAcademica) {
      return new Response(
        JSON.stringify({ error: "Mencione si es actualmente estudiante o graduado." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!universidad) {
      return new Response(
        JSON.stringify({ error: "El nombre de la universidad es obligatorio." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!carrera) {
      return new Response(
        JSON.stringify({ error: "Menciona la carrera que estudias o en la que te graduaste." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validar si ya existe un registro con la misma cédula o correo
    const existentes = await clienteSupabase.consultar<any>(
      TABLA,
      `or=(email.eq.${encodeURIComponent(email)},cedula.eq.${encodeURIComponent(cedula)})&select=id,email,cedula`
    );

    if (existentes && existentes.length > 0) {
      const duplicado = existentes[0];
      const motivo =
        duplicado.email === email
          ? "Ya existe una solicitud registrada con este correo electrónico."
          : "Ya existe una solicitud registrada con este número de identificación.";

      return new Response(
        JSON.stringify({
          error: motivo,
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Insertar registro en Supabase
    const nuevoRegistro = {
      nombre,
      email,
      cedula,
      telefono,
      fecha_nacimiento: rangoEdad,
      universidad,
      carrera,
      semestre,
      estado: "Pendiente",
    };

    const resultado = await clienteSupabase.insertar(TABLA, nuevoRegistro);

    return new Response(
      JSON.stringify({
        exito: true,
        mensaje: "Tu solicitud para unirte a la red ha sido enviada con éxito.",
        registro: resultado,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error al registrar participante en la red:", error);
    return new Response(
      JSON.stringify({
        error: "Ocurrió un error inesperado al procesar tu solicitud.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
