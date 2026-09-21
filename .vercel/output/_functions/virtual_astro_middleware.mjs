import { n as defineMiddleware, t as sequence } from "./chunks/sequence_BfnLQ3FV.mjs";
import { n as NOMBRE_COOKIE_SESION, r as ServicioToken } from "./chunks/token.service_Dbuv1We5.mjs";
//#region src/middleware.ts
/**
* Rutas públicas que no requieren autenticación
*/
var RUTAS_PUBLICAS = [
	"/",
	"/red",
	"/api/auth/login",
	"/api/auth/logout",
	"/api/red-aprendizaje/registro",
	"/api/red-aprendizaje/convocatoria"
];
/**
* Extensiones de archivos estáticos que se omiten del middleware
*/
var EXTENSIONES_ESTATICAS = [
	".svg",
	".png",
	".jpg",
	".jpeg",
	".ico",
	".webp",
	".css",
	".js",
	".woff",
	".woff2",
	".ttf"
];
/**
* Middleware central de seguridad y autenticación
* - Valida la vigencia del token de sesión (20 horas)
* - Expulsa al login si el token no existe o ha expirado
* - Controla el acceso a rutas protegidas y privilegios administrativos
*/
var onRequest$1 = defineMiddleware(async (context, next) => {
	const { pathname } = context.url;
	if (pathname.startsWith("/_astro") || pathname.startsWith("/_image") || EXTENSIONES_ESTATICAS.some((ext) => pathname.endsWith(ext))) return next();
	const cookieSesion = context.cookies.get(NOMBRE_COOKIE_SESION)?.value;
	const headerAuth = context.request.headers.get("Authorization");
	const tokenHeader = headerAuth?.startsWith("Bearer ") ? headerAuth.substring(7).trim() : null;
	const token = cookieSesion || tokenHeader;
	const resultado = ServicioToken.verificarToken(token);
	if (resultado.valido && resultado.usuario) context.locals.usuario = resultado.usuario;
	const esRutaPublica = RUTAS_PUBLICAS.includes(pathname) || pathname.startsWith("/api/red-aprendizaje/registro") || pathname.startsWith("/api/red-aprendizaje/convocatoria");
	if (pathname === "/" && resultado.valido) return context.redirect("/dashboard");
	if (esRutaPublica) return next();
	if (!resultado.valido) {
		if (cookieSesion) context.cookies.delete(NOMBRE_COOKIE_SESION, { path: "/" });
		if (pathname.startsWith("/api/")) return new Response(JSON.stringify({
			error: "Sesión expirada o no autorizada. Por favor, inicia sesión nuevamente.",
			expirado: resultado.razon === "expirado"
		}), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const urlRedireccion = resultado.razon === "expirado" ? "/?sesion_expirada=1" : "/";
		return context.redirect(urlRedireccion);
	}
	const usuario = resultado.usuario;
	if (usuario.tipoUsuario === "estudiante" || usuario.rol && String(usuario.rol).toLowerCase() === "estudiante") {
		if ([
			"/dashboard/usuarios",
			"/dashboard/contenido-feed",
			"/dashboard/contenido-repositorio",
			"/dashboard/red-aprendizaje"
		].some((ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`))) {
			if (pathname.startsWith("/api/")) return new Response(JSON.stringify({ error: "No tienes permisos administrativos para realizar esta acción." }), {
				status: 403,
				headers: { "Content-Type": "application/json" }
			});
			return context.redirect("/dashboard");
		}
	}
	return next();
});
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };
