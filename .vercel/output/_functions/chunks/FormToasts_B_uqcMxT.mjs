import { useEffect, useRef } from "react";
import { Toast, toast } from "@heroui/react";
import { jsx } from "react/jsx-runtime";
//#region src/modules/red-aprendizaje/services/red.service.ts
/**
* Servicio de Red de Aprendizaje
* Responsable de gestionar el registro e información de participantes de la red.
*/
var ServicioRedAprendizaje = class {
	/**
	* Envía los datos de postulación al endpoint de registro
	*/
	static async registrarParticipante(datos) {
		try {
			if (!datos.nombre || !datos.email || !datos.cedula || !datos.telefono || !datos.universidad || !datos.carrera || !datos.semestre || !datos.dia || !datos.mes || !datos.anio) return {
				exito: false,
				mensaje: "Por favor completa todos los campos obligatorios."
			};
			const respuesta = await fetch("/api/red-aprendizaje/registro", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(datos)
			});
			const resultado = await respuesta.json();
			if (!respuesta.ok) return {
				exito: false,
				mensaje: resultado.error || "No se pudo completar el registro a la red."
			};
			return {
				exito: true,
				mensaje: resultado.mensaje || "Tu solicitud ha sido enviada con éxito.",
				registro: resultado.registro
			};
		} catch (error) {
			console.error("Error en ServicioRedAprendizaje:", error);
			return {
				exito: false,
				mensaje: "Error de conexión al enviar el registro."
			};
		}
	}
};
//#endregion
//#region src/modules/auth/services/rate-limit-client.service.ts
/**
* Servicio de límite de intentos (Rate Limiting) para el cliente / navegador
* Persiste los intentos y el tiempo de bloqueo en localStorage.
*/
var ServicioLimiteIntentosCliente = class {
	static CLAVE_STORAGE = "observatorio_rate_limit_cliente";
	static MAX_INTENTOS = 5;
	static TIEMPO_BLOQUEO_MS = 6e4;
	static obtenerDatos() {
		if (typeof window === "undefined") return {
			intentos: 0,
			bloqueadoHasta: null
		};
		try {
			const serializado = localStorage.getItem(this.CLAVE_STORAGE);
			if (!serializado) return {
				intentos: 0,
				bloqueadoHasta: null
			};
			return JSON.parse(serializado);
		} catch {
			return {
				intentos: 0,
				bloqueadoHasta: null
			};
		}
	}
	static guardarDatos(datos) {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(this.CLAVE_STORAGE, JSON.stringify(datos));
		} catch {}
	}
	/**
	* Consulta el estado de bloqueo actual en el cliente
	*/
	static verificarEstado() {
		const datos = this.obtenerDatos();
		const ahora = Date.now();
		if (datos.bloqueadoHasta && ahora < datos.bloqueadoHasta) return {
			bloqueado: true,
			segundosRestantes: Math.ceil((datos.bloqueadoHasta - ahora) / 1e3),
			intentosRealizados: datos.intentos,
			intentosRestantes: 0
		};
		if (datos.bloqueadoHasta && ahora >= datos.bloqueadoHasta) {
			this.reiniciar();
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
			intentosRealizados: datos.intentos,
			intentosRestantes: Math.max(0, this.MAX_INTENTOS - datos.intentos)
		};
	}
	/**
	* Registra un fallo en el cliente y activa el bloqueo de 60s si llega a 5 intentos
	*/
	static registrarFallo() {
		const datos = this.obtenerDatos();
		const ahora = Date.now();
		if (datos.bloqueadoHasta && ahora >= datos.bloqueadoHasta) {
			datos.intentos = 0;
			datos.bloqueadoHasta = null;
		}
		datos.intentos += 1;
		if (datos.intentos >= this.MAX_INTENTOS) {
			datos.bloqueadoHasta = ahora + this.TIEMPO_BLOQUEO_MS;
			this.guardarDatos(datos);
			return {
				bloqueado: true,
				segundosRestantes: Math.ceil(this.TIEMPO_BLOQUEO_MS / 1e3),
				intentosRealizados: datos.intentos,
				intentosRestantes: 0
			};
		}
		this.guardarDatos(datos);
		return {
			bloqueado: false,
			segundosRestantes: 0,
			intentosRealizados: datos.intentos,
			intentosRestantes: Math.max(0, this.MAX_INTENTOS - datos.intentos)
		};
	}
	/**
	* Sincroniza un bloqueo dictado por el backend
	*/
	static forzarBloqueo(segundos) {
		const ahora = Date.now();
		const datos = {
			intentos: this.MAX_INTENTOS,
			bloqueadoHasta: ahora + segundos * 1e3
		};
		this.guardarDatos(datos);
		return {
			bloqueado: true,
			segundosRestantes: segundos,
			intentosRealizados: this.MAX_INTENTOS,
			intentosRestantes: 0
		};
	}
	/**
	* Limpia el registro de intentos fallidos
	*/
	static reiniciar() {
		if (typeof window !== "undefined") localStorage.removeItem(this.CLAVE_STORAGE);
	}
};
//#endregion
//#region src/modules/auth/services/auth.service.ts
/**
* Servicio de Autenticación
* Responsable de la lógica de acceso y validación de usuarios administrativos en Supabase.
*/
var ServicioAutenticacion = class {
	static CLAVE_SESION = "observatorio_usuario_sesion";
	/**
	* Valida las credenciales contra el endpoint /api/auth/login con control de intentos
	*/
	static async iniciarSesion(credenciales) {
		try {
			const estadoLimite = ServicioLimiteIntentosCliente.verificarEstado();
			if (estadoLimite.bloqueado) return {
				exito: false,
				bloqueado: true,
				segundosRestantes: estadoLimite.segundosRestantes,
				intentosRestantes: 0,
				mensaje: `Has superado el límite de 5 intentos. Por favor, espera ${estadoLimite.segundosRestantes} segundos.`
			};
			if (!credenciales.email || !credenciales.contrasena) return {
				exito: false,
				mensaje: "Debes ingresar tu correo y tu contraseña."
			};
			const respuesta = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: credenciales.email.trim(),
					password: credenciales.contrasena
				})
			});
			const datos = await respuesta.json();
			if (!respuesta.ok) {
				let estadoActualizado = estadoLimite;
				if (datos.bloqueado && datos.segundosRestantes) estadoActualizado = ServicioLimiteIntentosCliente.forzarBloqueo(datos.segundosRestantes);
				else estadoActualizado = ServicioLimiteIntentosCliente.registrarFallo();
				return {
					exito: false,
					bloqueado: datos.bloqueado || estadoActualizado.bloqueado,
					segundosRestantes: datos.segundosRestantes || estadoActualizado.segundosRestantes,
					intentosRestantes: datos.intentosRestantes ?? estadoActualizado.intentosRestantes,
					mensaje: datos.error || "Credenciales incorrectas. Verifica tus datos."
				};
			}
			ServicioLimiteIntentosCliente.reiniciar();
			if (typeof window !== "undefined" && datos.usuario) localStorage.setItem(this.CLAVE_SESION, JSON.stringify(datos.usuario));
			return {
				exito: true,
				mensaje: datos.mensaje || "Sesión iniciada correctamente.",
				usuario: datos.usuario
			};
		} catch (error) {
			console.error("Error al iniciar sesión:", error);
			return {
				exito: false,
				mensaje: "No se pudo conectar con el servidor de autenticación."
			};
		}
	}
	/**
	* Obtiene el usuario en sesión actual
	*/
	static obtenerUsuarioActual() {
		if (typeof window === "undefined") return null;
		try {
			const sesion = localStorage.getItem(this.CLAVE_SESION);
			return sesion ? JSON.parse(sesion) : null;
		} catch {
			return null;
		}
	}
	/**
	* Cierra la sesión activa en el servidor y navegador
	*/
	static async cerrarSesion() {
		try {
			await fetch("/api/auth/logout", { method: "POST" });
		} catch {}
		if (typeof window !== "undefined") localStorage.removeItem(this.CLAVE_SESION);
	}
};
//#endregion
//#region src/components/FormToasts.tsx
function FormToasts({ formId, successTitle, successDescription, redirectUrl }) {
	const intervaloRef = useRef(null);
	useEffect(() => {
		const form = document.getElementById(formId);
		if (!form) return;
		form.setAttribute("novalidate", "");
		const submitBtn = form.querySelector("button[type=\"submit\"]");
		const btnContent = form.querySelector("#btn-login-content, #btn-register-content");
		const btnLoader = form.querySelector("#btn-login-loader, #btn-register-loader");
		const btnBlocked = form.querySelector("#btn-login-blocked");
		const btnBlockedText = form.querySelector("#btn-login-blocked-text");
		const inputs = form.querySelectorAll("input, button:not([type='submit']), select");
		const restaurarFormulario = () => {
			inputs.forEach((input) => {
				input.disabled = false;
			});
			if (submitBtn) submitBtn.disabled = false;
			if (btnContent) {
				btnContent.classList.remove("hidden");
				btnContent.classList.add("flex");
			}
			if (btnLoader) {
				btnLoader.classList.add("hidden");
				btnLoader.classList.remove("flex");
			}
			if (btnBlocked) {
				btnBlocked.classList.add("hidden");
				btnBlocked.classList.remove("flex");
			}
		};
		const iniciarCuentaRegresivaBloqueo = (segundosIniciales) => {
			if (intervaloRef.current) clearInterval(intervaloRef.current);
			inputs.forEach((input) => {
				input.disabled = true;
			});
			if (submitBtn) submitBtn.disabled = true;
			if (btnContent) {
				btnContent.classList.add("hidden");
				btnContent.classList.remove("flex");
			}
			if (btnLoader) {
				btnLoader.classList.add("hidden");
				btnLoader.classList.remove("flex");
			}
			if (btnBlocked) {
				btnBlocked.classList.remove("hidden");
				btnBlocked.classList.add("flex");
			}
			let segundos = segundosIniciales;
			if (btnBlockedText) btnBlockedText.textContent = `Espera ${segundos}s...`;
			intervaloRef.current = setInterval(() => {
				segundos -= 1;
				if (segundos <= 0) {
					if (intervaloRef.current) {
						clearInterval(intervaloRef.current);
						intervaloRef.current = null;
					}
					ServicioLimiteIntentosCliente.reiniciar();
					restaurarFormulario();
					toast.info("Límite restablecido", { description: "Puedes volver a intentar iniciar sesión." });
				} else if (btnBlockedText) btnBlockedText.textContent = `Espera ${segundos}s...`;
			}, 1e3);
		};
		if (formId === "form-login") {
			if (typeof window !== "undefined" && window.location.search.includes("sesion_expirada=1")) {
				localStorage.removeItem("observatorio_usuario_sesion");
				window.history.replaceState({}, document.title, window.location.pathname);
				setTimeout(() => {
					toast.warning("Sesión Expirada", { description: "Tu sesión de 20 horas ha finalizado. Inicia sesión nuevamente para continuar." });
				}, 150);
			}
			const estado = ServicioLimiteIntentosCliente.verificarEstado();
			if (estado.bloqueado && estado.segundosRestantes > 0) {
				iniciarCuentaRegresivaBloqueo(estado.segundosRestantes);
				toast.danger("Acceso bloqueado", { description: `Has superado el límite de intentos. Espera ${estado.segundosRestantes} segundos.` });
			}
		}
		const onSubmit = async (e) => {
			e.preventDefault();
			if (formId === "form-login") {
				const estado = ServicioLimiteIntentosCliente.verificarEstado();
				if (estado.bloqueado) {
					toast.danger("Espera un momento", { description: `Debes esperar ${estado.segundosRestantes} segundos antes de reintentar.` });
					return;
				}
			}
			if (!form.checkValidity()) {
				toast.danger("Campos incompletos", { description: "Completa todos los campos para continuar." });
				return;
			}
			const formData = new FormData(form);
			inputs.forEach((input) => {
				input.disabled = true;
			});
			if (submitBtn) submitBtn.disabled = true;
			if (btnContent && btnLoader) {
				btnContent.classList.add("hidden");
				btnContent.classList.remove("flex");
				btnLoader.classList.remove("hidden");
				btnLoader.classList.add("flex");
			}
			try {
				if (formId === "form-login") {
					const email = String(formData.get("email") || "");
					const password = String(formData.get("password") || "");
					const respuesta = await ServicioAutenticacion.iniciarSesion({
						email,
						contrasena: password
					});
					if (!respuesta.exito) {
						toast.danger("Acceso Denegado", { description: respuesta.mensaje || "Credenciales incorrectas." });
						if (respuesta.bloqueado && respuesta.segundosRestantes) iniciarCuentaRegresivaBloqueo(respuesta.segundosRestantes);
						else restaurarFormulario();
						return;
					}
					let tituloNotificacion = successTitle;
					let descripcionNotificacion = successDescription;
					if (respuesta.usuario) {
						const esEstudiante = respuesta.usuario.tipoUsuario === "estudiante";
						tituloNotificacion = `¡Hola, ${respuesta.usuario.nombre}!`;
						descripcionNotificacion = esEstudiante ? "Accediendo al Observatorio..." : "Accediendo al Observatorio...";
					}
					toast.success(tituloNotificacion, { description: descripcionNotificacion });
				} else if (formId === "form-register") {
					const nombre = String(formData.get("nombre") || "");
					const email = String(formData.get("email") || "");
					const cedula = String(formData.get("cedula") || "");
					const telefono = String(formData.get("telefono") || "");
					const dia = Number(formData.get("dia") || 0);
					const mes = String(formData.get("mes") || "");
					const anio = Number(formData.get("anio") || 0);
					const universidad = String(formData.get("universidad") || "");
					const semestre = String(formData.get("semestre") || "");
					const carrera = String(formData.get("carrera") || "");
					const respuesta = await ServicioRedAprendizaje.registrarParticipante({
						nombre,
						email,
						cedula,
						telefono,
						dia,
						mes,
						anio,
						universidad,
						semestre,
						carrera
					});
					if (!respuesta.exito) {
						toast.danger("No se pudo completar el registro", { description: respuesta.mensaje || "Verifica los datos ingresados." });
						restaurarFormulario();
						return;
					}
					form.reset();
					toast.success(successTitle, { description: successDescription });
				} else {
					await new Promise((resolve) => setTimeout(resolve, 800));
					toast.success(successTitle, { description: successDescription });
				}
				if (redirectUrl) setTimeout(() => {
					window.location.href = redirectUrl;
				}, 600);
				else restaurarFormulario();
			} catch (error) {
				toast.danger("Error de conexión", { description: "Ocurrió un error inesperado al procesar la solicitud." });
				restaurarFormulario();
			}
		};
		form.addEventListener("submit", onSubmit);
		return () => {
			form.removeEventListener("submit", onSubmit);
			if (intervaloRef.current) clearInterval(intervaloRef.current);
		};
	}, [
		formId,
		successTitle,
		successDescription,
		redirectUrl
	]);
	return /* @__PURE__ */ jsx(Toast.Provider, { placement: "top" });
}
//#endregion
export { FormToasts as t };
