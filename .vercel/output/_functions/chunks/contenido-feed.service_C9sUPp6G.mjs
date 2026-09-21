import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
//#region src/modules/dashboard/services/metadatos.service.ts
/**
* Servicio encargado de extraer dinámicamente metadatos Open Graph,
* Twitter Cards, oEmbed y etiquetas HTML desde cualquier URL provista (Noticias o YouTube).
*/
var ServicioMetadatos = class {
	/**
	* Extrae metadatos de videos de YouTube usando la API oficial oEmbed y fallback a thumbnails HD
	*/
	static async extraerMetadatosYoutube(url) {
		try {
			const urlObj = new URL(url);
			let videoId = urlObj.searchParams.get("v");
			if (!videoId && urlObj.hostname.includes("youtu.be")) videoId = urlObj.pathname.replace(/^\//, "");
			const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
			const respuesta = await fetch(oembedUrl);
			if (respuesta.ok) {
				const data = await respuesta.json();
				const thumbnail = (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "") || data.thumbnail_url || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "");
				return {
					titulo: data.title || "Video de YouTube",
					canal: data.author_name || "YouTube",
					imagenMiniatura: thumbnail,
					enlace: url
				};
			}
		} catch (error) {
			console.warn(`[ServicioMetadatos] Error al extraer oEmbed de YouTube (${url}):`, error);
		}
		const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
		const id = match ? match[1] : "";
		return {
			titulo: "Video en YouTube",
			canal: "YouTube",
			imagenMiniatura: id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "",
			enlace: url
		};
	}
	/**
	* Extrae metadatos de artículos de noticias y páginas web generales
	*/
	static async extraerMetadatos(url) {
		try {
			const respuesta = await fetch(url, { headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
				Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
				"Accept-Language": "es-ES,es;q=0.9,en;q=0.8"
			} });
			if (!respuesta.ok) throw new Error(`Error HTTP al obtener URL: ${respuesta.status}`);
			const html = await respuesta.text();
			const obtenerMeta = (propiedad) => {
				const regexes = [
					new RegExp(`<meta[^>]*property=["'](?:og:|twitter:)?${propiedad}["'][^>]*content=["']([^"']*)["']`, "i"),
					new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["'](?:og:|twitter:)?${propiedad}["']`, "i"),
					new RegExp(`<meta[^>]*name=["'](?:og:|twitter:)?${propiedad}["'][^>]*content=["']([^"']*)["']`, "i"),
					new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["'](?:og:|twitter:)?${propiedad}["']`, "i")
				];
				for (const regex of regexes) {
					const match = html.match(regex);
					if (match && match[1]) return match[1].trim();
				}
				return "";
			};
			const tituloTag = html.match(/<title[^>]*>([^<]*)<\/title>/i);
			const tituloBruto = obtenerMeta("title") || (tituloTag && tituloTag[1] ? tituloTag[1] : "");
			const descripcionBruto = obtenerMeta("description");
			const imagen = obtenerMeta("image");
			const sitio = obtenerMeta("site_name") || new URL(url).hostname.replace(/^www\./, "");
			const fechaPublicacion = obtenerMeta("article:published_time") || obtenerMeta("published_time") || obtenerMeta("date");
			const decodificar = (texto) => texto.replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
			return {
				titulo: decodificar(tituloBruto),
				descripcion: decodificar(descripcionBruto),
				imagen: imagen || void 0,
				sitio,
				fechaPublicacion: fechaPublicacion ? fechaPublicacion.split("T")[0] : void 0
			};
		} catch (error) {
			console.warn(`[ServicioMetadatos] No se pudieron extraer metadatos de ${url}:`, error);
			return {
				titulo: "Artículo de información y actualidad",
				descripcion: "Haz clic en el enlace para leer los detalles completos de esta publicación.",
				sitio: (() => {
					try {
						return new URL(url).hostname.replace(/^www\./, "");
					} catch {
						return "Enlace";
					}
				})()
			};
		}
	}
};
//#endregion
//#region src/modules/contenido-feed/services/contenido-feed.service.ts
/**
* Servicio encargado de la gestión de contenidos Feed (Noticias y YouTube)
*/
var ServicioContenidoFeed = class {
	/**
	* Mapea un registro de Supabase al formato de la aplicación
	*/
	static mapearRegistro(registro) {
		return {
			id: registro.id,
			tipo: registro.tipo,
			enlace: registro.enlace,
			titulo: registro.titulo,
			descripcion: registro.descripcion || "",
			imagen: registro.imagen || void 0,
			fuenteOCanal: registro.fuente_o_canal || void 0,
			fechaPublicacion: registro.fecha_publicacion || void 0,
			categoria: registro.categoria || void 0,
			duracionOLectura: registro.duracion_o_lectura || void 0,
			estado: registro.estado,
			destacado: Boolean(registro.destacado),
			likesCount: Number(registro.likes_count) || 0,
			dislikesCount: Number(registro.dislikes_count) || 0
		};
	}
	/**
	* Obtiene todos los contenidos de Feed reales registrados en Supabase
	*/
	static async obtenerItems() {
		try {
			const registros = await clienteSupabase.consultar("contenido_feed", "select=*&order=created_at.desc");
			if (registros && registros.length > 0) return registros.map(this.mapearRegistro);
		} catch (error) {
			console.error("Error al obtener items de contenido feed desde Supabase:", error);
		}
		return [];
	}
	/**
	* Obtiene un elemento por ID
	*/
	static async obtenerItemPorId(id) {
		try {
			const registros = await clienteSupabase.consultar("contenido_feed", `id=eq.${id}&select=*`);
			if (registros && registros.length > 0) return this.mapearRegistro(registros[0]);
		} catch (error) {
			console.error(`Error al obtener contenido feed con ID ${id}:`, error);
		}
		return null;
	}
	/**
	* Crea un nuevo contenido feed
	*/
	static async crearItem(datos) {
		const registroInsertado = await clienteSupabase.insertar("contenido_feed", {
			tipo: datos.tipo,
			enlace: datos.enlace,
			titulo: datos.titulo,
			descripcion: datos.descripcion || null,
			imagen: datos.imagen || null,
			fuente_o_canal: datos.fuenteOCanal || null,
			fecha_publicacion: datos.fechaPublicacion || (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", {
				day: "numeric",
				month: "long",
				year: "numeric"
			}),
			categoria: datos.categoria || null,
			duracion_o_lectura: datos.duracionOLectura || null,
			estado: datos.estado || "Publicado",
			destacado: Boolean(datos.destacado)
		});
		return this.mapearRegistro(registroInsertado);
	}
	/**
	* Actualiza un contenido feed existente
	*/
	static async actualizarItem(id, datos) {
		const cuerpoActualizacion = {};
		if (datos.tipo !== void 0) cuerpoActualizacion.tipo = datos.tipo;
		if (datos.enlace !== void 0) cuerpoActualizacion.enlace = datos.enlace;
		if (datos.titulo !== void 0) cuerpoActualizacion.titulo = datos.titulo;
		if (datos.descripcion !== void 0) cuerpoActualizacion.descripcion = datos.descripcion;
		if (datos.imagen !== void 0) cuerpoActualizacion.imagen = datos.imagen;
		if (datos.fuenteOCanal !== void 0) cuerpoActualizacion.fuente_o_canal = datos.fuenteOCanal;
		if (datos.fechaPublicacion !== void 0) cuerpoActualizacion.fecha_publicacion = datos.fechaPublicacion;
		if (datos.categoria !== void 0) cuerpoActualizacion.categoria = datos.categoria;
		if (datos.duracionOLectura !== void 0) cuerpoActualizacion.duracion_o_lectura = datos.duracionOLectura;
		if (datos.estado !== void 0) cuerpoActualizacion.estado = datos.estado;
		if (datos.destacado !== void 0) cuerpoActualizacion.destacado = datos.destacado;
		const registroActualizado = await clienteSupabase.actualizar("contenido_feed", id, cuerpoActualizacion);
		if (!registroActualizado) throw new Error(`No se encontró el contenido feed con ID ${id}`);
		return this.mapearRegistro(registroActualizado);
	}
	/**
	* Establece un contenido como destacado de forma exclusiva para su tipo (noticia o youtube)
	* Garantiza que solo exista máximo 1 destacado por sección.
	*/
	static async establecerDestacado(id, tipo, nuevoDestacado) {
		try {
			if (nuevoDestacado) {
				const destacadosPrevios = await clienteSupabase.consultar("contenido_feed", `tipo=eq.${tipo}&destacado=eq.true&select=id`);
				if (destacadosPrevios && destacadosPrevios.length > 0) {
					for (const prev of destacadosPrevios) if (prev.id !== id) await clienteSupabase.actualizar("contenido_feed", prev.id, { destacado: false });
				}
			}
			await clienteSupabase.actualizar("contenido_feed", id, { destacado: nuevoDestacado });
			clienteSupabase.limpiarCache("contenido_feed");
			return true;
		} catch (error) {
			console.error(`Error al establecer destacado en contenido feed con ID ${id}:`, error);
			return false;
		}
	}
	/**
	* Elimina un contenido feed por ID
	*/
	static async eliminarItem(id) {
		return await clienteSupabase.eliminar("contenido_feed", id);
	}
	/**
	* Elimina múltiples contenidos feed por sus IDs
	*/
	static async eliminarItemsMultiples(ids) {
		if (ids.length === 0) return true;
		return await clienteSupabase.eliminarMasivo("contenido_feed", ids);
	}
	/**
	* Analiza una URL (YouTube o Noticia) extrayendo sus metadatos reales
	*/
	static async analizarUrl(url) {
		if (url.includes("youtube.com") || url.includes("youtu.be")) {
			const meta = await ServicioMetadatos.extraerMetadatosYoutube(url);
			return {
				tipo: "youtube",
				enlace: url,
				titulo: meta.titulo,
				descripcion: `Contenido audiovisual publicado por ${meta.canal}.`,
				imagen: meta.imagenMiniatura,
				fuenteOCanal: meta.canal,
				fechaPublicacion: (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", {
					day: "numeric",
					month: "long",
					year: "numeric"
				}),
				categoria: "Audiovisual",
				duracionOLectura: "Video"
			};
		} else {
			const meta = await ServicioMetadatos.extraerMetadatos(url);
			const palabras = `${meta.titulo} ${meta.descripcion}`.split(/\s+/).length;
			const minutos = Math.max(3, Math.ceil(palabras / 30));
			return {
				tipo: "noticia",
				enlace: url,
				titulo: meta.titulo,
				descripcion: meta.descripcion,
				imagen: meta.imagen,
				fuenteOCanal: meta.sitio,
				fechaPublicacion: meta.fechaPublicacion || (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", {
					day: "numeric",
					month: "long",
					year: "numeric"
				}),
				categoria: "Actualidad",
				duracionOLectura: `${minutos} min de lectura`
			};
		}
	}
};
//#endregion
export { ServicioContenidoFeed as t };
