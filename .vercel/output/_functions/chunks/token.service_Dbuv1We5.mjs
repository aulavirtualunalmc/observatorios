import crypto from "node:crypto";
import { Buffer } from "node:buffer";
//#region src/modules/auth/services/token.service.ts
var NOMBRE_COOKIE_SESION = "observatorio_token_sesion";
var DURACION_TOKEN_MS = 72e6;
var DURACION_TOKEN_SEGUNDOS = 72e3;
var CLAVE_SECRETA = typeof process !== "undefined" && process.env?.AUTH_SECRET || "observatorio_rs_clave_secreta_segura_firmada_2026_jwt_token";
/**
* Servicio de Tokens de Sesión
* Responsable de la emisión, firma y verificación de tokens con duración de 20 horas.
*/
var ServicioToken = class {
	/**
	* Genera un token firmado con exactamente 20 horas de vigencia
	*/
	static generarToken(usuario) {
		const ahora = Date.now();
		const expiraEn = ahora + DURACION_TOKEN_MS;
		const encabezado = {
			alg: "HS256",
			typ: "JWT"
		};
		const cargaUtil = {
			...usuario,
			iat: ahora,
			exp: expiraEn
		};
		const datosAFirmar = `${Buffer.from(JSON.stringify(encabezado)).toString("base64url")}.${Buffer.from(JSON.stringify(cargaUtil)).toString("base64url")}`;
		return `${datosAFirmar}.${crypto.createHmac("sha256", CLAVE_SECRETA).update(datosAFirmar).digest("base64url")}`;
	}
	/**
	* Verifica la firma y comprueba si el token ha expirado (más de 20 horas)
	*/
	static verificarToken(token) {
		if (!token || typeof token !== "string" || !token.includes(".")) return {
			valido: false,
			razon: "sin_token"
		};
		const partes = token.split(".");
		if (partes.length !== 3) return {
			valido: false,
			razon: "invalido"
		};
		const [encabezadoB64, cargaUtilB64, firmaOriginal] = partes;
		const datosAFirmar = `${encabezadoB64}.${cargaUtilB64}`;
		const firmaEsperada = crypto.createHmac("sha256", CLAVE_SECRETA).update(datosAFirmar).digest("base64url");
		const bufferEsperado = Buffer.from(firmaEsperada);
		const bufferRecibido = Buffer.from(firmaOriginal);
		if (bufferEsperado.length !== bufferRecibido.length || !crypto.timingSafeEqual(bufferEsperado, bufferRecibido)) return {
			valido: false,
			razon: "invalido"
		};
		try {
			const cargaUtilJSON = Buffer.from(cargaUtilB64, "base64url").toString("utf-8");
			const cargaUtil = JSON.parse(cargaUtilJSON);
			if (Date.now() > cargaUtil.exp) return {
				valido: false,
				razon: "expirado"
			};
			return {
				valido: true,
				usuario: {
					id: cargaUtil.id,
					nombre: cargaUtil.nombre,
					email: cargaUtil.email,
					rol: cargaUtil.rol,
					tipoUsuario: cargaUtil.tipoUsuario,
					universidad: cargaUtil.universidad,
					carrera: cargaUtil.carrera,
					semestre: cargaUtil.semestre,
					cedula: cargaUtil.cedula,
					estado: cargaUtil.estado
				}
			};
		} catch {
			return {
				valido: false,
				razon: "invalido"
			};
		}
	}
};
//#endregion
export { NOMBRE_COOKIE_SESION as n, ServicioToken as r, DURACION_TOKEN_SEGUNDOS as t };
