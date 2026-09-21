import { E as maybeRenderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { r as renderScript } from "./SkyShader_DL8DbueI.mjs";
import { i as fieldLabel, n as fieldControl, r as fieldControlFocusButton } from "./Input_CKRg_GP4.mjs";
import { DoubleAltArrowDownIcon } from "@solar-icons/react/bold-duotone/double-alt-arrow-down";
import { CheckCircleIcon } from "@solar-icons/react/bold-duotone/check-circle";
//#region src/components/CustomSelect.astro
createAstro("https://astro.build");
var $$CustomSelect = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CustomSelect;
	const { name, label, placeholder = "Selecciona", options, required = false } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="group/field flex flex-col gap-2" data-select${addAttribute(required, "data-required")}><span${addAttribute(fieldLabel, "class")}>${label}</span><div class="relative"><button type="button" data-select-trigger aria-haspopup="listbox" aria-expanded="false"${addAttribute([
		fieldControl,
		fieldControlFocusButton,
		"group/trigger flex items-center justify-between gap-3 px-4 py-3.5 text-left text-base tracking-[-0.01em] outline-none cursor-pointer"
	], "class:list")}><span data-select-value class="text-[#787774] transition-colors duration-300 data-[filled]:text-[#0a0a0a]">${placeholder}</span>${renderComponent($$result, "DoubleAltArrowDownIcon", DoubleAltArrowDownIcon, {
		"size": 18,
		"strokeWidth": 1.5,
		"className": "shrink-0 text-[#787774] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[open]/trigger:rotate-180"
	})}</button><ul role="listbox" data-select-list tabindex="-1" class="absolute z-30 left-0 right-0 mt-2 max-h-60 overflow-auto overscroll-contain p-1.5 rounded-2xl border border-black/10 bg-white shadow-[0_12px_32px_-12px_rgba(10,30,70,0.15)] origin-top opacity-0 scale-[0.97] -translate-y-1 pointer-events-none transition-all duration-200 ease-out data-[open]:opacity-100 data-[open]:scale-100 data-[open]:translate-y-0 data-[open]:pointer-events-auto outline-none">${options.map((opt) => renderTemplate`<li role="option" aria-selected="false"${addAttribute(opt.value, "data-value")} class="group/opt flex items-center justify-between gap-2 px-4 py-2.5 rounded-full cursor-pointer text-[#2f3437] text-[0.95rem] tracking-[-0.01em] transition-colors duration-200 hover:bg-[#f1f0ec] data-[active]:bg-[#f1f0ec] aria-selected:text-[#0064c1] aria-selected:font-medium"><span>${opt.label}</span>${renderComponent($$result, "CheckCircleIcon", CheckCircleIcon, {
		"size": 16,
		"strokeWidth": 1.5,
		"className": "opacity-0 scale-75 transition-all duration-200 text-[#0064c1] group-aria-selected/opt:opacity-100 group-aria-selected/opt:scale-100"
	})}</li>`)}</ul></div><input type="hidden"${addAttribute(name, "name")} data-select-input${addAttribute(required, "required")}></div>${renderScript($$result, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/components/CustomSelect.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/components/CustomSelect.astro", void 0);
//#endregion
//#region src/modules/red-aprendizaje/constants/opciones-fecha.ts
var mesesOpciones = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre"
].map((m, i) => ({
	value: String(i + 1),
	label: m
}));
var semestresOpciones = Array.from({ length: 10 }, (_, i) => ({
	value: String(i + 1),
	label: `${i + 1}° semestre`
}));
//#endregion
export { semestresOpciones as n, $$CustomSelect as r, mesesOpciones as t };
