import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { D as renderHead, E as maybeRenderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { n as $$ClientRouter, t as $$SkyShader } from "./SkyShader_DL8DbueI.mjs";
import "./token.service_Dbuv1We5.mjs";
import { t as $$Input } from "./Input_CKRg_GP4.mjs";
import { t as FormToasts } from "./FormToasts_B_uqcMxT.mjs";
import { ArrowRightIcon, LetterIcon, LockIcon } from "@solar-icons/react/outline";
import { Link } from "@heroui/react";
//#region src/modules/auth/components/BrandingAcceso.astro
var $$BrandingAcceso = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-col text-center lg:text-left lg:max-w-[40rem]" aria-labelledby="main-title"><p class="m-0 inline-flex items-center justify-center lg:justify-start gap-2 text-[#0064c1] text-[clamp(0.78rem,1vw,0.95rem)] font-semibold tracking-[0.16em] uppercase animate-rise" style="animation-delay: 0.1s"><span class="h-1.5 w-1.5 rounded-full bg-[#0064c1]" aria-hidden="true"></span>Acceso</p><h1 id="main-title" class="m-0 mt-4 text-[clamp(2.8rem,8vw,7rem)] font-normal leading-[0.95] tracking-[-0.055em] text-[#0a0a0a] mix-blend-multiply opacity-90 animate-rise" style="animation-delay: 0.2s">Observatorio</h1><p class="m-0 mt-3 mx-auto lg:mx-0 max-w-[24ch] lg:max-w-[30ch] text-[#0a0a0a]/85 text-[clamp(1.1rem,2.2vw,1.9rem)] font-[560] leading-[1.1] tracking-[-0.03em] animate-rise" style="animation-delay: 0.3s">Responsabilidad Social &amp; Sostenibilidad</p><div class="mt-8 h-[3px] w-14 mx-auto lg:mx-0 rounded-full bg-gradient-to-r from-[#0064c1] to-[#66b2ff] animate-rise" style="animation-delay: 0.38s" aria-hidden="true"></div><p class="m-0 mt-6 max-w-[50ch] text-[#2f3437] text-[clamp(0.98rem,1.35vw,1.2rem)] leading-[1.65] tracking-[-0.01em] animate-rise" style="animation-delay: 0.46s">El${" "}<strong class="font-semibold text-[#0a0a0a]">Observatorio de Responsabilidad Social y Sostenibilidad</strong>${" "}es una plataforma de conocimiento y aprendizaje sobre temas de responsabilidad social y sostenibilidad.</p></div>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/auth/components/BrandingAcceso.astro", void 0);
//#endregion
//#region src/modules/auth/components/CardAcceso.astro
var $$CardAcceso = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="w-full max-w-[30rem] shrink-0 bg-white/95 border border-white/60 rounded-[24px] md:rounded-[28px] p-7 md:p-10 shadow-[0_30px_70px_-24px_rgba(9,60,120,0.45)] max-h-[calc(100svh-3rem)] overflow-y-auto animate-rise" style="animation-delay: 0.25s"><div class="flex flex-col items-center gap-3 text-center pb-6 mb-6 border-b border-black/5"><img src="/Group 19.svg" alt="Logo Observatorio de Responsabilidad Social y Sostenibilidad" class="h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"><h2 class="m-0 text-[clamp(1.25rem,1.8vw,1.5rem)] font-[600] tracking-[-0.02em] text-[#0a0a0a]">Inicia sesión</h2><p class="m-0 -mt-1 text-[#2f3437] text-sm leading-[1.55] tracking-[-0.01em]">para ver el contenido de la plataforma.</p></div><!-- Formulario de Acceso --><form id="form-login" class="flex flex-col gap-5 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" action="#" method="post"><div class="animate-rise" style="animation-delay: 0.35s">${renderComponent($$result, "Input", $$Input, {
		"name": "email",
		"label": "Correo",
		"type": "email",
		"placeholder": "nombre@ejemplo.com",
		"autocomplete": "email",
		"icon": LetterIcon,
		"required": true
	})}</div><div class="animate-rise" style="animation-delay: 0.42s">${renderComponent($$result, "Input", $$Input, {
		"name": "password",
		"label": "Contraseña",
		"type": "password",
		"placeholder": "••••••••",
		"autocomplete": "current-password",
		"icon": LockIcon,
		"required": true
	})}</div><div class="animate-rise" style="animation-delay: 0.5s"><button type="submit" id="btn-login-submit" class="group relative w-full inline-flex items-center justify-center gap-2 mt-1 px-8 py-4 rounded-full text-white text-base font-semibold tracking-[-0.01em] whitespace-nowrap cursor-pointer overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-[#0064c1] focus-visible:outline-offset-[3px] disabled:opacity-85 disabled:cursor-not-allowed disabled:pointer-events-none" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 8px 22px -6px rgba(58,138,244,0.4), 0 6px 32px -2px rgba(120,185,255,0.58); text-shadow: 0 1px 2px rgba(18,86,175,0.32)"><!-- Estado normal --><span id="btn-login-content" class="relative z-10 flex items-center justify-center gap-2 transition-opacity duration-200"><span>Entrar</span>${renderComponent($$result, "ArrowRightIcon", ArrowRightIcon, {
		"size": 18,
		"strokeWidth": 2,
		"className": "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
	})}</span><!-- Microanimación de loader en estado analizando --><span id="btn-login-loader" class="hidden relative z-10 items-center justify-center gap-2.5 transition-opacity duration-200"><svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-95" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span class="text-sm font-medium">Analizando...</span></span><!-- Estado de espera por rate limit --><span id="btn-login-blocked" class="hidden relative z-10 items-center justify-center gap-2 transition-opacity duration-200"><svg class="h-4 w-4 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg><span id="btn-login-blocked-text" class="text-sm font-semibold">Espera 60s...</span></span></button></div><div class="flex flex-col items-center gap-3 mt-6 pt-5 border-t border-black/5 animate-rise" style="animation-delay: 0.58s">${renderComponent($$result, "Link", Link, {
		"href": "/red",
		"className": "text-sm font-medium text-[#0064c1]"
	}, { "default": ($$result) => renderTemplate`Red de aprendizaje${renderComponent($$result, "Link.Icon", Link.Icon, {})}` })}</div></form></div>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/auth/components/CardAcceso.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Acceso y registro al Observatorio de Responsabilidad Social y Sostenibilidad"><title>Observatorio · Acceso</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-[#fbfbfa] text-[#0a0a0a]"><main class="relative w-full min-h-svh isolate overflow-x-clip">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "full" })}<div class="relative z-10 w-full min-h-svh flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-[clamp(4rem,7vw,8rem)] px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(2rem,5vh,4rem)]"><!-- Branding del Dominio Auth -->${renderComponent($$result, "BrandingAcceso", $$BrandingAcceso, {})}<!-- Tarjeta de Acceso del Dominio Auth -->${renderComponent($$result, "CardAcceso", $$CardAcceso, {})}</div>${renderComponent($$result, "FormToasts", FormToasts, {
		"client:load": true,
		"formId": "form-login",
		"successTitle": "Sesión iniciada",
		"successDescription": "Bienvenido al Observatorio.",
		"redirectUrl": "/dashboard",
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/components/FormToasts.tsx",
		"client:component-export": "default"
	})}</main></body></html>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/index.astro", void 0);
var $$file = "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
