import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
//#region src/modules/repositorio/services/repositorio.service.ts
/**
* Servicio encargado de gestionar los documentos del Repositorio con Supabase
*/
var ServicioRepositorio = class {
	/**
	* Mapea un registro de Supabase al tipo de la aplicación
	*/
	static mapearRegistro(registro) {
		let paginasWeb = [];
		if (Array.isArray(registro.paginas_web) && registro.paginas_web.length > 0) paginasWeb = registro.paginas_web;
		else if (registro.enlace_documento) {
			const raw = registro.enlace_documento.trim();
			if (raw.startsWith("[") && raw.endsWith("]")) try {
				const parsed = JSON.parse(raw);
				if (Array.isArray(parsed)) paginasWeb = parsed.map(String).filter(Boolean);
			} catch {
				paginasWeb = [raw];
			}
			else paginasWeb = [raw];
		}
		const primerEnlace = paginasWeb.length > 0 ? paginasWeb[0] : registro.enlace_documento || void 0;
		return {
			id: registro.id,
			ano: registro.ano,
			lineaInvestigacion: registro.linea_investigacion,
			titulo: registro.titulo,
			tipoFuente: registro.tipo_fuente,
			pais: registro.pais,
			categoria: registro.categoria || void 0,
			autores: Array.isArray(registro.autores) ? registro.autores : [],
			enlaceDocumento: primerEnlace,
			paginasWeb,
			resumen: registro.resumen || void 0,
			referenciaApa: registro.referencia_apa || void 0,
			paginas: registro.paginas || void 0,
			likesCount: Number(registro.likes_count) || 0,
			dislikesCount: Number(registro.dislikes_count) || 0,
			createdAt: registro.created_at
		};
	}
	/**
	* Obtiene todos los documentos reales registrados en Supabase
	*/
	static async obtenerDocumentos() {
		try {
			const registros = await clienteSupabase.consultar("documentos_repositorio", "select=*&order=created_at.desc");
			if (registros && registros.length > 0) return registros.map(this.mapearRegistro);
		} catch (error) {
			console.error("Error al obtener documentos del repositorio desde Supabase:", error);
		}
		return [];
	}
	/**
	* Obtiene un documento por su ID
	*/
	static async obtenerDocumentoPorId(id) {
		try {
			const registros = await clienteSupabase.consultar("documentos_repositorio", `id=eq.${id}&select=*`);
			if (registros && registros.length > 0) return this.mapearRegistro(registros[0]);
		} catch (error) {
			console.error(`Error al obtener documento de repositorio con ID ${id}:`, error);
		}
		return null;
	}
	/**
	* Serializa páginas web para almacenamiento
	*/
	static serializarEnlaces(paginasWeb, enlaceDocumento) {
		if (Array.isArray(paginasWeb) && paginasWeb.length > 0) {
			if (paginasWeb.length === 1) return paginasWeb[0];
			return JSON.stringify(paginasWeb);
		}
		return enlaceDocumento || null;
	}
	/**
	* Crea un nuevo documento en el repositorio
	*/
	static async crearDocumento(datos) {
		const enlaceSerializado = this.serializarEnlaces(datos.paginasWeb, datos.enlaceDocumento);
		const registroInsertado = await clienteSupabase.insertar("documentos_repositorio", {
			ano: datos.ano,
			linea_investigacion: datos.lineaInvestigacion,
			titulo: datos.titulo,
			tipo_fuente: datos.tipoFuente,
			pais: datos.pais,
			categoria: datos.categoria || null,
			autores: datos.autores || [],
			enlace_documento: enlaceSerializado,
			resumen: datos.resumen || null,
			referencia_apa: datos.referenciaApa || null,
			paginas: datos.paginas || null
		});
		return this.mapearRegistro(registroInsertado);
	}
	/**
	* Actualiza un documento del repositorio existente
	*/
	static async actualizarDocumento(id, datos) {
		const cuerpoActualizacion = {};
		if (datos.ano !== void 0) cuerpoActualizacion.ano = datos.ano;
		if (datos.lineaInvestigacion !== void 0) cuerpoActualizacion.linea_investigacion = datos.lineaInvestigacion;
		if (datos.titulo !== void 0) cuerpoActualizacion.titulo = datos.titulo;
		if (datos.tipoFuente !== void 0) cuerpoActualizacion.tipo_fuente = datos.tipoFuente;
		if (datos.pais !== void 0) cuerpoActualizacion.pais = datos.pais;
		if (datos.categoria !== void 0) cuerpoActualizacion.categoria = datos.categoria;
		if (datos.autores !== void 0) cuerpoActualizacion.autores = datos.autores;
		if (datos.paginasWeb !== void 0 || datos.enlaceDocumento !== void 0) cuerpoActualizacion.enlace_documento = this.serializarEnlaces(datos.paginasWeb, datos.enlaceDocumento);
		if (datos.resumen !== void 0) cuerpoActualizacion.resumen = datos.resumen;
		if (datos.referenciaApa !== void 0) cuerpoActualizacion.referencia_apa = datos.referenciaApa;
		if (datos.paginas !== void 0) cuerpoActualizacion.paginas = datos.paginas;
		const registroActualizado = await clienteSupabase.actualizar("documentos_repositorio", id, cuerpoActualizacion);
		if (!registroActualizado) throw new Error(`No se encontró el documento con ID ${id}`);
		return this.mapearRegistro(registroActualizado);
	}
	/**
	* Elimina un documento por su ID
	*/
	static async eliminarDocumento(id) {
		return await clienteSupabase.eliminar("documentos_repositorio", id);
	}
	/**
	* Elimina múltiples documentos por sus IDs
	*/
	static async eliminarDocumentosMasivo(ids) {
		if (ids.length === 0) return true;
		return await clienteSupabase.eliminarMasivo("documentos_repositorio", ids);
	}
};
//#endregion
export { ServicioRepositorio as t };
