import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { n as NOMBRE_COOKIE_SESION, r as ServicioToken, t as DURACION_TOKEN_SEGUNDOS } from "./token.service_Dbuv1We5.mjs";
import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
import bcrypt from "bcryptjs";
//#region src/modules/auth/services/rate-limit.service.ts
/**
* Servicio de límite de intentos (Rate Limiting) para el backend
* Controla un máximo de 5 intentos fallidos con bloqueo de 1 minuto (60 segundos).
*/
var ServicioLimiteIntentosServidor = class {
	static MAX_INTENTOS = 5;
	static TIEMPO_BLOQUEO_MS = 6e4;
	static registros = /* @__PURE__ */ new Map();
	/**
	* Limpia registros antiguos para evitar fugas de memoria
	*/
	static limpiarExpirados() {
		const ahora = Date.now();
		for (const [clave, registro] of this.registros.entries()) if (registro.bloqueadoHasta && ahora > registro.bloqueadoHasta && ahora - registro.marcaTiempo > this.TIEMPO_BLOQUEO_MS) this.registros.delete(clave);
	}
	/**
	* Verifica si el identificador se encuentra actualmente bloqueado
	*/
	static verificarEstado(identificador) {
		this.limpiarExpirados();
		const registro = this.registros.get(identificador);
		const ahora = Date.now();
		if (!registro) return {
			bloqueado: false,
			segundosRestantes: 0,
			intentosRealizados: 0,
			intentosRestantes: this.MAX_INTENTOS
		};
		if (registro.bloqueadoHasta && ahora < registro.bloqueadoHasta) {
			const msRestantes = registro.bloqueadoHasta - ahora;
			return {
				bloqueado: true,
				segundosRestantes: Math.ceil(msRestantes / 1e3),
				intentosRealizados: registro.intentos,
				intentosRestantes: 0
			};
		}
		if (registro.bloqueadoHasta && ahora >= registro.bloqueadoHasta) {
			this.registros.delete(identificador);
			return {
				bloqueado: false,
				segundosRestantes: 0,
				intentosRealizados: 0,
				intentosRestantes: this.MAX_INTENTOS
			};
		}
		return {
			bloqueado: false,
			segundosRestantes: 0,
			intentosRealizados: registro.intentos,
			intentosRestantes: Math.max(0, this.MAX_INTENTOS - registro.intentos)
		};
	}
	/**
	* Registra un intento fallido y bloquea si llega al límite de 5 intentos
	*/
	static registrarFallo(identificador) {
		this.limpiarExpirados();
		const ahora = Date.now();
		let registro = this.registros.get(identificador);
		if (!registro || registro.bloqueadoHasta && ahora >= registro.bloqueadoHasta) registro = {
			intentos: 1,
			bloqueadoHasta: null,
			marcaTiempo: ahora
		};
		else {
			registro.intentos += 1;
			registro.marcaTiempo = ahora;
		}
		if (registro.intentos >= this.MAX_INTENTOS) {
			registro.bloqueadoHasta = ahora + this.TIEMPO_BLOQUEO_MS;
			this.registros.set(identificador, registro);
			return {
				bloqueado: true,
				segundosRestantes: Math.ceil(this.TIEMPO_BLOQUEO_MS / 1e3),
				intentosRealizados: registro.intentos,
				intentosRestantes: 0
			};
		}
		this.registros.set(identificador, registro);
		return {
			bloqueado: false,
			segundosRestantes: 0,
			intentosRealizados: registro.intentos,
			intentosRestantes: Math.max(0, this.MAX_INTENTOS - registro.intentos)
		};
	}
	/**
	* Limpia los intentos cuando el inicio de sesión es exitoso
	*/
	static limpiar(identificador) {
		this.registros.delete(identificador);
	}
};
//#endregion
//#region src/pages/api/auth/login.ts
var login_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var TABLA_ADMIN = "usuarios_administrativos";
var TABLA_ESTUDIANTES = "usuarios_estudiantes";
var POST = async ({ request, cookies }) => {
	try {
		const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "cliente_local";
		const body = await request.json();
		const email = (body.email || "").trim().toLowerCase();
		const password = (body.password || body.contrasena || "").trim();
		const claveLimite = email ? `${ip}:${email}` : `${ip}:anonimo`;
		const estadoActual = ServicioLimiteIntentosServidor.verificarEstado(claveLimite);
		if (estadoActual.bloqueado) return new Response(JSON.stringify({
			error: `Has superado el límite de 5 intentos. Por favor, espera ${estadoActual.segundosRestantes} segundos para volver a intentar.`,
			bloqueado: true,
			segundosRestantes: estadoActual.segundosRestantes,
			intentosRestantes: 0
		}), {
			status: 429,
			headers: { "Content-Type": "application/json" }
		});
		if (!email || !password) return new Response(JSON.stringify({ error: "Debes ingresar tu correo electrónico y tu contraseña." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		let usuario = null;
		let tablaEncontrada = TABLA_ADMIN;
		let tipoUsuario = "administrativo";
		const admins = await clienteSupabase.consultar(TABLA_ADMIN, `email=eq.${encodeURIComponent(email)}&select=*`);
		if (admins && admins.length > 0) {
			usuario = admins[0];
			tablaEncontrada = TABLA_ADMIN;
			tipoUsuario = "administrativo";
		} else {
			const estudiantes = await clienteSupabase.consultar(TABLA_ESTUDIANTES, `email=eq.${encodeURIComponent(email)}&select=*`);
			if (estudiantes && estudiantes.length > 0) {
				usuario = estudiantes[0];
				tablaEncontrada = TABLA_ESTUDIANTES;
				tipoUsuario = "estudiante";
			}
		}
		if (!usuario) {
			const fallo = ServicioLimiteIntentosServidor.registrarFallo(claveLimite);
			const mensaje = fallo.bloqueado ? `Has superado el límite de intentos. Por favor, espera ${fallo.segundosRestantes} segundos.` : "Credenciales incorrectas. Verifica tu correo y contraseña.";
			return new Response(JSON.stringify({
				error: mensaje,
				bloqueado: fallo.bloqueado,
				segundosRestantes: fallo.segundosRestantes,
				intentosRestantes: fallo.intentosRestantes
			}), {
				status: fallo.bloqueado ? 429 : 401,
				headers: { "Content-Type": "application/json" }
			});
		}
		const estadoUsuario = (usuario.estado || "").toLowerCase().trim();
		if (tipoUsuario === "estudiante") {
			if (estadoUsuario === "inactivo") return new Response(JSON.stringify({ error: "Tu cuenta de estudiante se encuentra inactiva. Contacta al equipo del Observatorio." }), {
				status: 403,
				headers: { "Content-Type": "application/json" }
			});
			if (estadoUsuario === "pendiente" || estadoUsuario !== "activo" && estadoUsuario !== "") return new Response(JSON.stringify({ error: "Tu cuenta de estudiante se encuentra en proceso de validación. Podrás acceder una vez sea aprobada y activada por el Observatorio." }), {
				status: 403,
				headers: { "Content-Type": "application/json" }
			});
		} else if (estadoUsuario === "inactivo") return new Response(JSON.stringify({ error: "Tu cuenta administrativa se encuentra inactiva. Contacta a un administrador principal." }), {
			status: 403,
			headers: { "Content-Type": "application/json" }
		});
		let coincide = false;
		if (usuario.password_hash) {
			if (usuario.password_hash.startsWith("$2a$") || usuario.password_hash.startsWith("$2b$") || usuario.password_hash.startsWith("$2y$")) coincide = bcrypt.compareSync(password, usuario.password_hash);
			else {
				coincide = password === usuario.password_hash;
				if (coincide) {
					const salt = bcrypt.genSaltSync(10);
					const nuevoHash = bcrypt.hashSync(password, salt);
					clienteSupabase.actualizar(tablaEncontrada, usuario.id, { password_hash: nuevoHash }).catch(() => {});
				}
			}
		} else if (usuario.cedula) {
			coincide = password === usuario.cedula.trim();
			if (coincide) {
				const salt = bcrypt.genSaltSync(10);
				const nuevoHash = bcrypt.hashSync(password, salt);
				clienteSupabase.actualizar(tablaEncontrada, usuario.id, { password_hash: nuevoHash }).catch(() => {});
			}
		}
		if (!coincide) {
			const fallo = ServicioLimiteIntentosServidor.registrarFallo(claveLimite);
			const mensaje = fallo.bloqueado ? `Has superado el límite de intentos. Por favor, espera ${fallo.segundosRestantes} segundos.` : "Credenciales incorrectas. Verifica tu correo y contraseña.";
			return new Response(JSON.stringify({
				error: mensaje,
				bloqueado: fallo.bloqueado,
				segundosRestantes: fallo.segundosRestantes,
				intentosRestantes: fallo.intentosRestantes
			}), {
				status: fallo.bloqueado ? 429 : 401,
				headers: { "Content-Type": "application/json" }
			});
		}
		ServicioLimiteIntentosServidor.limpiar(claveLimite);
		clienteSupabase.actualizar(tablaEncontrada, usuario.id, { ultimo_acceso: "Justo ahora" }).catch(() => {});
		const rolFinal = tipoUsuario === "estudiante" ? "Estudiante" : usuario.rol || "Administrador";
		const usuarioAutenticado = {
			id: usuario.id,
			nombre: usuario.nombre,
			email: usuario.email,
			rol: rolFinal,
			tipoUsuario,
			universidad: usuario.universidad || void 0,
			carrera: usuario.carrera || void 0,
			semestre: usuario.semestre || void 0,
			cedula: usuario.cedula || void 0,
			estado: usuario.estado || "Activo"
		};
		const tokenSesion = ServicioToken.generarToken(usuarioAutenticado);
		cookies.set(NOMBRE_COOKIE_SESION, tokenSesion, {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: DURACION_TOKEN_SEGUNDOS
		});
		const mensajeBienvenida = tipoUsuario === "estudiante" ? `¡Bienvenido a la Red de Aprendizaje, ${usuario.nombre}!` : `Bienvenido de nuevo, ${usuario.nombre}.`;
		return new Response(JSON.stringify({
			exito: true,
			mensaje: mensajeBienvenida,
			usuario: usuarioAutenticado,
			token: tokenSesion
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error en endpoint /api/auth/login:", error);
		return new Response(JSON.stringify({ error: "Ocurrió un error inesperado al procesar el inicio de sesión." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/login@_@ts
var page = () => login_exports;
//#endregion
export { page };
