import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, O as addAttribute, T as renderTemplate, b as renderComponent, x as Fragment } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter } from "./SkyShader_DL8DbueI.mjs";
import { t as ServicioInscripcionesRed } from "./inscripciones.service_DKSxoaWc.mjs";
import { i as $$EncabezadoRed, r as $$FormularioRegistroRed } from "./red-aprendizaje_ClW24Vce.mjs";
import { t as FormToasts } from "./FormToasts_B_uqcMxT.mjs";
import { AltArrowLeftIcon, CalendarIcon, LockIcon } from "@solar-icons/react/outline";
//#region src/pages/red.astro
var red_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Red,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Red = createComponent(async ($$result, $$props, $$slots) => {
	const configConvocatoria = await ServicioInscripcionesRed.obtenerConfiguracionConvocatoria();
	const estaCerrada = !configConvocatoria.activo || Boolean(configConvocatoria.fechaLimite);
	if (configConvocatoria.fechaLimite) try {
		const partes = configConvocatoria.fechaLimite.split("-");
		if (partes.length === 3) new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2])).toLocaleDateString("es-ES", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
		else configConvocatoria.fechaLimite;
	} catch {
		configConvocatoria.fechaLimite;
	}
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Únete a la Red de aprendizaje del Observatorio de Responsabilidad Social y Sostenibilidad"><title>Observatorio · Red de aprendizaje</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><main class="w-full min-h-svh flex items-center justify-center px-[clamp(1.25rem,4vw,2rem)] py-[clamp(2rem,5vh,4rem)]"><div class="w-full max-w-[28rem] flex flex-col gap-6">${estaCerrada ? renderTemplate`<div class="flex flex-col items-center gap-6 text-center animate-rise"><a href="/" class="w-fit transition-transform duration-300 hover:scale-[1.02]" aria-label="Volver al acceso"><img src="/Group 19.svg" alt="Logo Observatorio de Responsabilidad Social y Sostenibilidad" class="h-14 w-auto object-contain"></a><div class="w-full flex flex-col items-center gap-5 p-7 md:p-8 rounded-[32px] bg-white/95 border border-white/80 shadow-[0_20px_50px_-20px_rgba(9,60,120,0.15),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md"><div class="grid h-16 w-16 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1] shadow-inner">${renderComponent($$result, "CalendarIcon", CalendarIcon, {
		"size": 32,
		"strokeWidth": 1.8
	})}</div><div class="flex flex-col gap-2"><span class="inline-flex items-center justify-center gap-1.5 self-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 border border-amber-500/20">${renderComponent($$result, "LockIcon", LockIcon, {
		"size": 12,
		"strokeWidth": 2.2
	})}Convocatoria Finalizada</span><h1 class="m-0 text-xl md:text-2xl font-bold text-[#0a0a0a] tracking-tight">Inscripciones no disponibles</h1></div><div class="w-full p-4 rounded-2xl bg-black/[0.02] border border-black/[0.06] text-left"><p class="m-0 text-xs md:text-sm text-[#2f3437] font-medium leading-relaxed whitespace-pre-line">${configConvocatoria.mensajeCierre}</p></div><a href="/" class="group/btn relative w-full inline-flex items-center justify-center gap-2 mt-2 px-8 py-3.5 rounded-full text-white text-sm font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm"${addAttribute({
		backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
		boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 14px -2px rgba(58,138,244,0.4)"
	}, "style")}>${renderComponent($$result, "AltArrowLeftIcon", AltArrowLeftIcon, {
		"size": 16,
		"strokeWidth": 2,
		"className": "relative z-10 transition-transform group-hover/btn:-translate-x-1"
	})}<span class="relative z-10">Volver al acceso</span></a></div></div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "EncabezadoRed", $$EncabezadoRed, {})}${renderComponent($$result, "FormularioRegistroRed", $$FormularioRegistroRed, {})}` })}`}</div>${!estaCerrada && renderTemplate`${renderComponent($$result, "FormToasts", FormToasts, {
		"client:load": true,
		"formId": "form-register",
		"successTitle": "Registro exitoso",
		"successDescription": "Ya haces parte de la red de aprendizaje.",
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/components/FormToasts.tsx",
		"client:component-export": "default"
	})}`}</main></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/red.astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/red.astro";
var $$url = "/red";
//#endregion
//#region \0virtual:astro:page:src/pages/red@_@astro
var page = () => red_exports;
//#endregion
export { page };
