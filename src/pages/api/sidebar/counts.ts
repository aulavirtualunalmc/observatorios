import type { APIRoute } from "astro";
import { ServicioRepositorio } from "../../../modules/repositorio/services/repositorio.service";
import { ServicioContenidoFeed } from "../../../modules/contenido-feed/services/contenido-feed.service";
import { ServicioInscripcionesRed } from "../../../modules/red-aprendizaje/services/inscripciones.service";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const [documentos, feedItems, solicitudes] = await Promise.all([
      ServicioRepositorio.obtenerDocumentos().catch(() => []),
      ServicioContenidoFeed.obtenerItems().catch(() => []),
      ServicioInscripcionesRed.obtenerSolicitudes().catch(() => []),
    ]);

    const countRepositorio = documentos.length;
    const countNoticias = feedItems.filter(
      (item) => item.tipo === "noticia" && item.estado === "Publicado"
    ).length;
    const countYoutube = feedItems.filter(
      (item) => item.tipo === "youtube" && item.estado === "Publicado"
    ).length;
    const countFeedTotal = feedItems.length;
    const countSolicitudesPendientes = solicitudes.filter(
      (s) => s.estado === "Pendiente"
    ).length;

    return new Response(
      JSON.stringify({
        repositorio: countRepositorio,
        news: countNoticias,
        youtube: countYoutube,
        feed: countFeedTotal,
        solicitudes: countSolicitudesPendientes,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Error al obtener conteos del sidebar" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
