import type { APIRoute } from "astro";
import { ServicioRepositorio } from "../../../modules/repositorio/services/repositorio.service";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const documentos = Array.isArray(body) ? body : body.documentos;

    if (!documentos || !Array.isArray(documentos) || documentos.length === 0) {
      return new Response(
        JSON.stringify({ error: "No se proporcionaron registros válidos para cargar." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Mapear y normalizar cada registro antes de la inserción en bloque
    const documentosValidados = documentos
      .filter((d: any) => d && (d.titulo || d["Título"]))
      .map((d: any) => {
        const titulo = String(d.titulo || d["Título"] || "").trim();
        const ano = String(d.ano || d["Año"] || d["Ano"] || new Date().getFullYear()).trim();
        const tipoFuente = String(
          d.tipoFuente || d["Tipo de fuente"] || d["Tipo Fuente"] || d["Fuente"] || "Artículo de Investigación"
        ).trim();
        const tipoDocumento = String(
          d.categoria || d["Tipo de documento"] || d["Tipo Documento"] || d["Categoría"] || ""
        ).trim();
        const lineaInvestigacion = String(
          d.lineaInvestigacion || d["Tema central"] || d["Tema Central"] || d["Línea de investigación"] || d["Línea"] || "General"
        ).trim();
        const pais = String(d.pais || d["País"] || d["Pais"] || "Internacional").trim();
        const resumen = d.resumen || d["Resumen"] ? String(d.resumen || d["Resumen"]).trim() : undefined;
        const referenciaApa = d.referenciaApa || d["Referencia APA"] || d["Referencia apa"] || d["Referencia"]
          ? String(d.referenciaApa || d["Referencia APA"] || d["Referencia apa"] || d["Referencia"]).trim()
          : undefined;

        // Parsear autores: string separado por comas, punto y coma, o array
        let autores: string[] = [];
        const autoresRaw = d.autores || d["Autores"] || d["Autor"];
        if (Array.isArray(autoresRaw)) {
          autores = autoresRaw.map(String).map((s) => s.trim()).filter(Boolean);
        } else if (typeof autoresRaw === "string" && autoresRaw.trim()) {
          // Si tiene punto y coma ";" se divide por ";", de lo contrario por comas o saltos de línea
          if (autoresRaw.includes(";")) {
            autores = autoresRaw.split(";").map((s) => s.trim()).filter(Boolean);
          } else if (autoresRaw.includes("\n")) {
            autores = autoresRaw.split("\n").map((s) => s.trim()).filter(Boolean);
          } else {
            // Manejar autores tipo "Apellido, Nombre, Apellido2, Nombre2" o separados por coma
            autores = autoresRaw.split(",").map((s) => s.trim()).filter(Boolean);
          }
        }

        // Parsear enlace / página web
        const enlaceRaw = String(
          d.enlaceDocumento || d.enlace || d["Enlace de acceso"] || d["Enlace"] || d["URL"] || d["Link"] || ""
        ).trim();
        const paginasWeb = enlaceRaw ? [enlaceRaw] : [];

        return {
          titulo,
          ano,
          tipoFuente,
          categoria: tipoDocumento || undefined,
          lineaInvestigacion,
          pais,
          autores,
          enlaceDocumento: enlaceRaw || undefined,
          paginasWeb,
          resumen,
          referenciaApa,
        };
      });

    if (documentosValidados.length === 0) {
      return new Response(
        JSON.stringify({ error: "Ninguno de los registros tiene un título válido para procesar." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const resultado = await ServicioRepositorio.crearDocumentosMasivo(documentosValidados);

    return new Response(
      JSON.stringify({
        mensaje: `Se procesaron y cargaron exitosamente ${resultado.creados} documentos en el repositorio.`,
        creados: resultado.creados,
        total: resultado.total,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error en carga masiva de repositorio:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Error al procesar la carga masiva" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
