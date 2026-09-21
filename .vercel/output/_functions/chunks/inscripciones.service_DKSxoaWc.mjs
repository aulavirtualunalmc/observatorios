import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
//#region src/modules/red-aprendizaje/services/inscripciones.service.ts
/**
* Servicio encargado de gestionar las solicitudes de inscripción a la Red de Aprendizaje
*/
var ServicioInscripcionesRed = class {
	static solicitudesPorDefecto = [
		{
			id: "sol-101",
			nombre: "Valentina Gómez Duque",
			email: "valentina.gomez@udea.edu.co",
			cedula: "1094827163",
			telefono: "316 482 9102",
			fechaNacimiento: "14 de Febrero, 2002",
			universidad: "Universidad de Antioquia",
			carrera: "Trabajo Social",
			semestre: "6° Semestre",
			fechaSolicitud: "2026-08-21",
			estado: "Pendiente"
		},
		{
			id: "sol-102",
			nombre: "Mateo Sebastián Bermúdez",
			email: "mateo.bermudez@javeriana.edu.co",
			cedula: "1083928174",
			telefono: "301 928 4710",
			fechaNacimiento: "28 de Mayo, 2001",
			universidad: "Pontificia Universidad Javeriana",
			carrera: "Ecología y Medio Ambiente",
			semestre: "8° Semestre",
			fechaSolicitud: "2026-08-20",
			estado: "Pendiente"
		},
		{
			id: "sol-103",
			nombre: "Camila Andrea Mendoza",
			email: "camila.mendoza@urosario.edu.co",
			cedula: "1072918274",
			telefono: "314 782 9104",
			fechaNacimiento: "10 de Octubre, 2003",
			universidad: "Universidad del Rosario",
			carrera: "Jurisprudencia y Derecho",
			semestre: "4° Semestre",
			fechaSolicitud: "2026-08-20",
			estado: "Pendiente"
		}
	];
	/**
	* Obtiene la lista de solicitudes desde Supabase (o por defecto si aún no hay)
	*/
	static async obtenerSolicitudes() {
		try {
			const registros = await clienteSupabase.consultar("red_aprendizaje_nuevos", "select=*&order=created_at.desc");
			if (registros && registros.length > 0) return registros.map((item) => ({
				id: item.id,
				nombre: item.nombre,
				email: item.email,
				cedula: item.cedula,
				telefono: item.telefono,
				fechaNacimiento: item.fecha_nacimiento,
				universidad: item.universidad,
				carrera: item.carrera,
				semestre: item.semestre,
				fechaSolicitud: item.created_at ? item.created_at.split("T")[0] : "Reciente",
				estado: item.estado || "Pendiente"
			}));
			return this.solicitudesPorDefecto;
		} catch (error) {
			console.error("Error al obtener inscripciones de la red:", error);
			return this.solicitudesPorDefecto;
		}
	}
	/**
	* Procesa la decisión (Aprobado o Rechazado) para una solicitud individual
	*/
	static async procesarDecision(id, accion, motivo) {
		try {
			const respuesta = await fetch("/api/red-aprendizaje/decision", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id,
					accion,
					motivo
				})
			});
			const datos = await respuesta.json();
			if (!respuesta.ok) return {
				exito: false,
				mensaje: datos.error || "No se pudo actualizar la solicitud."
			};
			return {
				exito: true,
				mensaje: datos.mensaje || `Solicitud marcada como ${accion}.`
			};
		} catch (error) {
			console.error("Error al procesar decisión:", error);
			return {
				exito: false,
				mensaje: "Error de conexión al procesar la solicitud."
			};
		}
	}
	/**
	* Procesa la decisión para múltiples solicitudes en bloque
	*/
	static async procesarDecisionMasiva(ids, accion) {
		try {
			const respuesta = await fetch("/api/red-aprendizaje/decision", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					ids,
					accion
				})
			});
			const datos = await respuesta.json();
			if (!respuesta.ok) return {
				exito: false,
				mensaje: datos.error || "No se pudieron actualizar las solicitudes."
			};
			return {
				exito: true,
				mensaje: datos.mensaje || `Solicitudes marcadas como ${accion}.`
			};
		} catch (error) {
			console.error("Error al procesar decisiones masivas:", error);
			return {
				exito: false,
				mensaje: "Error de conexión al procesar las solicitudes."
			};
		}
	}
	/**
	* Obtiene la configuración actual de la convocatoria de la red
	*/
	static async obtenerConfiguracionConvocatoria() {
		const configuracionPorDefecto = {
			activo: true,
			fechaLimite: null,
			mensajeCierre: "El periodo de inscripciones para la Red de Aprendizaje ha finalizado. Las nuevas postulaciones se abrirán en el próximo periodo académico."
		};
		try {
			const registros = await clienteSupabase.consultar("configuracion_convocatoria", "id=eq.red_aprendizaje&select=*");
			if (registros && registros.length > 0) {
				const item = registros[0];
				return {
					activo: Boolean(item.activo),
					fechaLimite: item.fecha_limite || null,
					mensajeCierre: item.mensaje_cierre || configuracionPorDefecto.mensajeCierre,
					updatedAt: item.updated_at
				};
			}
		} catch (error) {
			console.error("Error al obtener configuración de convocatoria:", error);
		}
		return configuracionPorDefecto;
	}
	/**
	* Actualiza o crea la configuración de la convocatoria
	*/
	static async guardarConfiguracionConvocatoria(datos) {
		try {
			const payload = { updated_at: (/* @__PURE__ */ new Date()).toISOString() };
			if (datos.activo !== void 0) payload.activo = datos.activo;
			if (datos.fechaLimite !== void 0) payload.fecha_limite = datos.fechaLimite;
			if (datos.mensajeCierre !== void 0) payload.mensaje_cierre = datos.mensajeCierre;
			const resultado = await clienteSupabase.actualizar("configuracion_convocatoria", "red_aprendizaje", payload);
			return {
				activo: Boolean(resultado.activo),
				fechaLimite: resultado.fecha_limite || null,
				mensajeCierre: resultado.mensaje_cierre,
				updatedAt: resultado.updated_at
			};
		} catch (error) {
			console.error("Error al guardar configuración de convocatoria:", error);
			throw error;
		}
	}
};
//#endregion
export { ServicioInscripcionesRed as t };
