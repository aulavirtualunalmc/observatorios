import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as ServicioContenidoFeed } from "./contenido-feed.service_C9sUPp6G.mjs";
//#region src/pages/api/analizar-url.ts
var analizar_url_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ request }) => {
	try {
		const targetUrl = new URL(request.url).searchParams.get("url");
		if (!targetUrl) return new Response(JSON.stringify({ error: "URL no provista" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const resultado = await ServicioContenidoFeed.analizarUrl(targetUrl);
		return new Response(JSON.stringify(resultado), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: "No se pudo analizar la URL" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async ({ request }) => {
	try {
		const targetUrl = (await request.json()).url;
		if (!targetUrl) return new Response(JSON.stringify({ error: "URL no provista" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const resultado = await ServicioContenidoFeed.analizarUrl(targetUrl);
		return new Response(JSON.stringify(resultado), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: "No se pudo analizar la URL" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/analizar-url@_@ts
var page = () => analizar_url_exports;
//#endregion
export { page };
