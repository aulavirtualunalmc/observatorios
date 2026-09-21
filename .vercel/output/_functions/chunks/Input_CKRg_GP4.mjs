import { E as maybeRenderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { r as renderScript } from "./SkyShader_DL8DbueI.mjs";
import { EyeClosedIcon, EyeIcon } from "@solar-icons/react/outline";
//#region src/components/fieldClasses.ts
/**
* Clases compartidas para todos los controles de formulario.
* Garantiza que inputs, selects y cualquier otro campo se vean idénticos.
*/
var fieldControl = [
	"w-full rounded-2xl border border-black/10 bg-white",
	"transition-colors duration-200 ease-out",
	"hover:border-black/20"
].join(" ");
var fieldControlFocusWithin = ["focus-within:border-[#259ce6]", "focus-within:ring-4 focus-within:ring-[#259ce6]/10"].join(" ");
var fieldControlFocusButton = [
	"focus-visible:border-[#259ce6]",
	"focus-visible:ring-4 focus-visible:ring-[#259ce6]/10",
	"data-[open]:border-[#259ce6]",
	"data-[open]:ring-4 data-[open]:ring-[#259ce6]/10"
].join(" ");
var fieldLabel = "flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]";
//#endregion
//#region src/components/Input.astro
createAstro("https://astro.build");
var $$Input = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Input;
	const { name, label, type = "text", value, placeholder, autocomplete, inputmode, min, max, required = false, icon: Icon } = Astro.props;
	const esContrasena = type === "password";
	return renderTemplate`${maybeRenderHead($$result)}<div class="group/field flex flex-col gap-2"${addAttribute(esContrasena ? "true" : void 0, "data-password-field")}>${(label || Icon) && renderTemplate`<label${addAttribute(name, "for")}${addAttribute("flex items-center gap-2 text-[#0a0a0a] text-sm font-medium tracking-[-0.01em]", "class")}>${Icon && renderTemplate`${renderComponent($$result, "Icon", Icon, {
		"size": 18,
		"strokeWidth": 1.5,
		"className": "text-[#787774]"
	})}`}${label}</label>`}<div${addAttribute([
		fieldControl,
		fieldControlFocusWithin,
		esContrasena ? "flex items-center" : "",
		"has-[:disabled]:bg-black/[0.03] has-[:disabled]:opacity-60 has-[:disabled]:cursor-not-allowed transition-opacity duration-300"
	], "class:list")}><input${addAttribute(name, "id")}${addAttribute(name, "name")}${addAttribute(type, "type")}${addAttribute(value, "value")}${addAttribute(placeholder, "placeholder")}${addAttribute(autocomplete, "autocomplete")}${addAttribute(inputmode, "inputmode")}${addAttribute(min, "min")}${addAttribute(max, "max")}${addAttribute(required, "required")} class="w-full bg-transparent px-4 py-3.5 text-base text-[#0a0a0a] outline-none placeholder:text-[#787774]/70 [appearance:textfield] [&amp;::-webkit-outer-spin-button]:appearance-none [&amp;::-webkit-inner-spin-button]:appearance-none disabled:cursor-not-allowed">${esContrasena && renderTemplate`<button type="button" class="toggle-password-btn mr-3 p-1.5 rounded-lg text-[#787774] transition-all hover:text-[#0064c1] hover:bg-black/5 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#0064c1] cursor-pointer" aria-label="Mostrar u ocultar contraseña" title="Mostrar u ocultar contraseña"><span class="icon-show block">${renderComponent($$result, "EyeIcon", EyeIcon, {
		"size": 20,
		"strokeWidth": 1.5
	})}</span><span class="icon-hide hidden">${renderComponent($$result, "EyeClosedIcon", EyeClosedIcon, {
		"size": 20,
		"strokeWidth": 1.5
	})}</span></button>`}</div></div>${esContrasena && renderTemplate`${renderScript($$result, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/components/Input.astro?astro&type=script&index=0&lang.ts")}`}`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/components/Input.astro", void 0);
//#endregion
export { fieldLabel as i, fieldControl as n, fieldControlFocusButton as r, $$Input as t };
