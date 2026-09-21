import { E as maybeRenderHead, I as createAstro, O as addAttribute, T as renderTemplate, k as createRenderInstruction } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1._15e035042fc32a5f7aa0473e56a6646a/node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1._15e035042fc32a5f7aa0473e56a6646a/node_modules/astro/components/ClientRouter.astro
createAstro("https://astro.build");
var $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ClientRouter;
	const { fallback = "animate" } = Astro.props;
	return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/node_modules/.pnpm/astro@7.2.4_@emnapi+core@1._15e035042fc32a5f7aa0473e56a6646a/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/node_modules/.pnpm/astro@7.2.4_@emnapi+core@1._15e035042fc32a5f7aa0473e56a6646a/node_modules/astro/components/ClientRouter.astro", void 0);
//#endregion
//#region src/components/SkyShader.astro
createAstro("https://astro.build");
var $$SkyShader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SkyShader;
	const { intensity = "full" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="absolute inset-0 overflow-hidden" data-shader${addAttribute(intensity, "data-intensity")}><div class="absolute inset-0" style="background: radial-gradient(90% 70% at 78% 12%, #6cb6f5 0%, transparent 55%), radial-gradient(70% 48% at 20% 7%, rgba(255,255,255,0.38), transparent 58%), linear-gradient(180deg, #2e90e8 0%, #74b8f2 42%, #d8ecfb 74%, #fbfbfa 100%)"></div><canvas class="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] data-[ready]:opacity-100" data-canvas aria-hidden="true"></canvas><div class="absolute inset-0 opacity-50 mix-blend-overlay bg-[length:180px_180px] animate-grain pointer-events-none" style="background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;)"></div></div>${renderScript($$result, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/components/SkyShader.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/components/SkyShader.astro", void 0);
//#endregion
export { $$ClientRouter as n, renderScript as r, $$SkyShader as t };
