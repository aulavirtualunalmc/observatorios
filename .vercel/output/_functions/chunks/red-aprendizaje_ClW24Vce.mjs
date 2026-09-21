import { E as maybeRenderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { t as $$SkyShader } from "./SkyShader_DL8DbueI.mjs";
import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
import { t as ServicioInscripcionesRed } from "./inscripciones.service_DKSxoaWc.mjs";
import { t as $$Input } from "./Input_CKRg_GP4.mjs";
import { n as semestresOpciones, r as $$CustomSelect, t as mesesOpciones } from "./opciones-fecha_B6JK4Stb.mjs";
import { useEffect, useMemo, useState } from "react";
import { AltArrowLeftIcon, AltArrowRightIcon, ArrowRightIcon, BookIcon, CalendarIcon, CardIcon, CheckCircleIcon, CloseCircleIcon, DangerTriangleIcon, EyeIcon, LetterIcon, LockIcon, PhoneIcon, RoundedMagnifierZoomInIcon, SendSquareIcon, TrashBinMinimalisticIcon, UserIcon, UsersGroupRoundedIcon } from "@solar-icons/react/outline";
import { Checkbox, Link, Table, Toast, toast } from "@heroui/react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { createPortal } from "react-dom";
//#region src/modules/red-aprendizaje/components/EncabezadoRed.astro
var $$EncabezadoRed = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-col items-center gap-3 text-center animate-rise" style="animation-delay: 0.1s"><a href="/" class="w-fit" aria-label="Volver al acceso"><img src="/Group 19.svg" alt="Logo Observatorio de Responsabilidad Social y Sostenibilidad" class="h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"></a><h1 class="m-0 text-[clamp(1.6rem,3vw,2.2rem)] font-normal leading-[1.05] tracking-[-0.03em]">Red de aprendizaje</h1><p class="m-0 text-[#2f3437] text-sm leading-[1.55] tracking-[-0.01em]">Plataforma de${" "}<span class="font-semibold text-[#0064c1]">conocimiento y aprendizaje</span>${" "}en iniciativas sociales y ambientales.</p></div>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/red-aprendizaje/components/EncabezadoRed.astro", void 0);
//#endregion
//#region src/modules/red-aprendizaje/components/FormularioRegistroRed.astro
var $$FormularioRegistroRed = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<form id="form-register" class="flex flex-col gap-4 w-full animate-rise" style="animation-delay: 0.2s" action="#" method="post">${renderComponent($$result, "Input", $$Input, {
		"name": "nombre",
		"label": "Nombre completo",
		"placeholder": "Tu nombre completo",
		"autocomplete": "name",
		"icon": UserIcon,
		"required": true
	})}${renderComponent($$result, "Input", $$Input, {
		"name": "email",
		"label": "Correo electrónico",
		"type": "email",
		"placeholder": "tu.correo@ejemplo.com",
		"autocomplete": "email",
		"icon": LetterIcon,
		"required": true
	})}<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${renderComponent($$result, "Input", $$Input, {
		"name": "cedula",
		"label": "Cédula",
		"inputmode": "numeric",
		"placeholder": "0000000000",
		"icon": CardIcon,
		"required": true
	})}${renderComponent($$result, "Input", $$Input, {
		"name": "telefono",
		"label": "Teléfono",
		"type": "tel",
		"placeholder": "300 123 4567",
		"autocomplete": "tel",
		"icon": PhoneIcon,
		"required": true
	})}</div><div class="flex flex-col gap-2"><span class="flex items-center gap-2 text-[#0a0a0a] text-sm font-[560] tracking-[-0.01em]">${renderComponent($$result, "CalendarIcon", CalendarIcon, {
		"size": 18,
		"strokeWidth": 1.5,
		"className": "text-[#0064c1]"
	})}Fecha de nacimiento</span><div class="grid grid-cols-[1fr_1.4fr_1fr] gap-3">${renderComponent($$result, "Input", $$Input, {
		"name": "dia",
		"label": "Día",
		"type": "number",
		"placeholder": "Día",
		"min": "1",
		"max": "31",
		"required": true
	})}${renderComponent($$result, "CustomSelect", $$CustomSelect, {
		"name": "mes",
		"label": "Mes",
		"placeholder": "Mes",
		"options": mesesOpciones,
		"required": true
	})}${renderComponent($$result, "Input", $$Input, {
		"name": "anio",
		"label": "Año",
		"type": "number",
		"placeholder": "Año",
		"min": "1950",
		"max": "2010",
		"required": true
	})}</div></div>${renderComponent($$result, "Input", $$Input, {
		"name": "universidad",
		"label": "Universidad",
		"placeholder": "Nombre de tu universidad",
		"icon": BookIcon,
		"required": true
	})}<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${renderComponent($$result, "CustomSelect", $$CustomSelect, {
		"name": "semestre",
		"label": "Semestre",
		"placeholder": "Selecciona",
		"options": semestresOpciones,
		"required": true
	})}${renderComponent($$result, "Input", $$Input, {
		"name": "carrera",
		"label": "Carrera",
		"placeholder": "Tu carrera",
		"required": true
	})}</div><button type="submit" id="btn-register-submit" class="group relative w-full inline-flex items-center justify-center gap-2 mt-2 px-8 py-4 rounded-full text-white text-base font-semibold tracking-[-0.01em] whitespace-nowrap cursor-pointer overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-[#0064c1] focus-visible:outline-offset-[3px] disabled:opacity-85 disabled:cursor-not-allowed disabled:pointer-events-none" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 8px 22px -6px rgba(58,138,244,0.4), 0 6px 32px -2px rgba(120,185,255,0.58); text-shadow: 0 1px 2px rgba(18,86,175,0.32)"><span id="btn-register-content" class="relative z-10 flex items-center justify-center gap-2 transition-opacity duration-200"><span>Unirme a la red</span>${renderComponent($$result, "ArrowRightIcon", ArrowRightIcon, {
		"size": 18,
		"strokeWidth": 2,
		"className": "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
	})}</span><span id="btn-register-loader" class="hidden relative z-10 items-center justify-center gap-2.5 transition-opacity duration-200"><svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-95" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span class="text-sm font-medium">Registrando...</span></span></button><div class="flex justify-center mt-2">${renderComponent($$result, "Link", Link, {
		"href": "/",
		"className": "text-sm font-medium text-[#0064c1]"
	}, { "default": ($$result) => renderTemplate`Volver al acceso${renderComponent($$result, "Link.Icon", Link.Icon, {})}` })}</div></form>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/red-aprendizaje/components/FormularioRegistroRed.astro", void 0);
//#endregion
//#region src/modules/red-aprendizaje/components/TablaInscripcionesRed.tsx
var FILAS_POR_PAGINA = 10;
var TablaInscripcionesRed = ({ solicitudes: solicitudesIniciales }) => {
	const [lista, setLista] = useState(solicitudesIniciales);
	const [selectedKeys, setSelectedKeys] = useState(/* @__PURE__ */ new Set());
	const [busqueda, setBusqueda] = useState("");
	const [filtroEstado, setFiltroEstado] = useState("Pendiente");
	const [pagina, setPagina] = useState(1);
	const [columnaOrden, setColumnaOrden] = useState("fechaSolicitud");
	const [direccionOrden, setDireccionOrden] = useState("desc");
	const [montado, setMontado] = useState(false);
	useEffect(() => {
		setMontado(true);
		const cargarConfiguracion = async () => {
			try {
				const resp = await fetch("/api/red-aprendizaje/convocatoria");
				if (resp.ok) {
					const data = await resp.json();
					setFechaLimite(data.fechaLimite || null);
					if (data.mensajeCierre) setMensajeCierre(data.mensajeCierre);
					setPostulacionesActivas(Boolean(data.activo) && !data.fechaLimite);
				}
			} catch (err) {
				console.error("Error al cargar configuración de convocatoria:", err);
			}
		};
		cargarConfiguracion();
	}, []);
	const [modalPostulacionesAbierto, setModalPostulacionesAbierto] = useState(false);
	const [fechaLimite, setFechaLimite] = useState(null);
	const [mensajeCierre, setMensajeCierre] = useState("El periodo de inscripciones para la Red de Aprendizaje ha finalizado. Las nuevas postulaciones se abrirán en el próximo periodo académico.");
	const [postulacionesActivas, setPostulacionesActivas] = useState(true);
	const [guardandoAjustes, setGuardandoAjustes] = useState(false);
	const [solicitudAProcesar, setSolicitudAProcesar] = useState(null);
	const [modalMasivo, setModalMasivo] = useState(null);
	const manejarOrden = (campo) => {
		if (columnaOrden === campo) setDireccionOrden(direccionOrden === "asc" ? "desc" : "asc");
		else {
			setColumnaOrden(campo);
			setDireccionOrden("asc");
		}
	};
	const solicitudesProcesadas = useMemo(() => {
		let resultado = lista.filter((sol) => {
			if (filtroEstado !== "Todos" && sol.estado !== filtroEstado) return false;
			const termino = busqueda.toLowerCase().trim();
			if (!termino) return true;
			return sol.nombre.toLowerCase().includes(termino) || sol.cedula.includes(termino) || sol.carrera.toLowerCase().includes(termino) || sol.universidad.toLowerCase().includes(termino) || sol.telefono.includes(termino);
		});
		resultado.sort((a, b) => {
			const valorA = a[columnaOrden] || "";
			const valorB = b[columnaOrden] || "";
			const comparacion = valorA.localeCompare(valorB, "es", { numeric: true });
			return direccionOrden === "asc" ? comparacion : -comparacion;
		});
		return resultado;
	}, [
		lista,
		busqueda,
		filtroEstado,
		columnaOrden,
		direccionOrden
	]);
	const totalRegistros = solicitudesProcesadas.length;
	const totalPaginas = Math.max(1, Math.ceil(totalRegistros / FILAS_POR_PAGINA));
	const solicitudesPaginadas = useMemo(() => {
		const inicio = (pagina - 1) * FILAS_POR_PAGINA;
		return solicitudesProcesadas.slice(inicio, inicio + FILAS_POR_PAGINA);
	}, [solicitudesProcesadas, pagina]);
	const inicioRango = totalRegistros === 0 ? 0 : (pagina - 1) * FILAS_POR_PAGINA + 1;
	const finRango = Math.min(pagina * FILAS_POR_PAGINA, totalRegistros);
	const idsSeleccionados = useMemo(() => {
		if (selectedKeys === "all") return solicitudesProcesadas.map((s) => s.id);
		return Array.from(selectedKeys);
	}, [selectedKeys, solicitudesProcesadas]);
	const totalSeleccionados = idsSeleccionados.length;
	const ejecutarAccionUnitaria = async (id, nuevoEstado, nombre) => {
		setLista((prev) => prev.map((s) => s.id === id ? {
			...s,
			estado: nuevoEstado
		} : s));
		setSelectedKeys((prev) => {
			if (prev === "all") return /* @__PURE__ */ new Set();
			const nuevo = new Set(prev);
			nuevo.delete(id);
			return nuevo;
		});
		setSolicitudAProcesar(null);
		const respuesta = await ServicioInscripcionesRed.procesarDecision(id, nuevoEstado);
		if (respuesta.exito) {
			if (nuevoEstado === "Aprobado") toast.success("Solicitud aprobada y correo enviado", { description: `Se aceptó a "${nombre}" y se enviaron sus credenciales de acceso vía correo electrónico.` });
			else toast.danger("Solicitud rechazada", { description: `Se rechazó la solicitud de "${nombre}".` });
		} else toast.danger("Error al actualizar", { description: respuesta.mensaje });
	};
	const ejecutarAccionMasiva = async (nuevoEstado) => {
		if (idsSeleccionados.length === 0) return;
		const totalAfectados = idsSeleccionados.length;
		const idsCopia = [...idsSeleccionados];
		setLista((prev) => prev.map((s) => idsSeleccionados.includes(s.id) ? {
			...s,
			estado: nuevoEstado
		} : s));
		setSelectedKeys(/* @__PURE__ */ new Set());
		setModalMasivo(null);
		const respuesta = await ServicioInscripcionesRed.procesarDecisionMasiva(idsCopia, nuevoEstado);
		if (respuesta.exito) {
			if (nuevoEstado === "Aprobado") toast.success("Inscripciones aprobadas", { description: `Se aceptaron ${totalAfectados} solicitudes y se enviaron los correos de bienvenida con credenciales.` });
			else toast.danger("Inscripciones rechazadas", { description: `Se rechazaron ${totalAfectados} solicitudes seleccionadas.` });
		} else toast.danger("Error al procesar", { description: respuesta.mensaje });
	};
	const guardarAjustesPostulacion = async () => {
		setGuardandoAjustes(true);
		try {
			const fechaLimpia = fechaLimite && fechaLimite.trim() !== "" ? fechaLimite.trim() : null;
			const resp = await fetch("/api/red-aprendizaje/convocatoria", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fechaLimite: fechaLimpia,
					mensajeCierre: mensajeCierre.trim(),
					activo: !fechaLimpia
				})
			});
			if (!resp.ok) {
				const errorData = await resp.json().catch(() => ({}));
				throw new Error(errorData.error || "No se pudo guardar la configuración.");
			}
			const data = await resp.json();
			setFechaLimite(data.fechaLimite || null);
			setPostulacionesActivas(!data.fechaLimite);
			setModalPostulacionesAbierto(false);
			if (data.fechaLimite) toast.info("Convocatoria Cerrada", { description: `El formulario /red ahora muestra el anuncio con fecha límite: ${data.fechaLimite}.` });
			else toast.success("Convocatoria Abierta", { description: "Se ha removido la fecha límite. El formulario de registro está habilitado en /red." });
		} catch (err) {
			toast.danger("Error al guardar", { description: err.message || "Ocurrió un problema de conexión al guardar los ajustes." });
		} finally {
			setGuardandoAjustes(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-5 w-full relative",
		children: [
			/* @__PURE__ */ jsx(Toast.Provider, { placement: "top" }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/80 shadow-[0_4px_16px_-4px_rgba(9,60,120,0.1)] w-full sm:w-72",
						children: [
							/* @__PURE__ */ jsx(RoundedMagnifierZoomInIcon, {
								size: 16,
								className: "text-[#787774] shrink-0"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "text",
								value: busqueda,
								onChange: (e) => {
									setBusqueda(e.target.value);
									setPagina(1);
								},
								placeholder: "Buscar por nombre, cédula, universidad...",
								className: "bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-full"
							}),
							busqueda && /* @__PURE__ */ jsx("button", {
								onClick: () => {
									setBusqueda("");
									setPagina(1);
								},
								className: "text-[#787774] hover:text-[#0a0a0a] cursor-pointer",
								children: /* @__PURE__ */ jsx(CloseCircleIcon, { size: 14 })
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "inline-flex p-1 rounded-full bg-black/[0.04]",
						children: [
							"Pendiente",
							"Aprobado",
							"Rechazado",
							"Todos"
						].map((tab) => {
							const conteo = tab === "Todos" ? lista.length : lista.filter((s) => s.estado === tab).length;
							return /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => {
									setFiltroEstado(tab);
									setPagina(1);
									setSelectedKeys(/* @__PURE__ */ new Set());
								},
								className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${filtroEstado === tab ? "bg-white text-[#0a0a0a] shadow-xs" : "text-[#787774] hover:text-[#0a0a0a]"}`,
								children: [/* @__PURE__ */ jsx("span", { children: tab }), /* @__PURE__ */ jsx("span", {
									className: `text-[0.68rem] px-1.5 py-0.2 rounded-full font-mono font-medium ${filtroEstado === tab ? "bg-black/[0.06] text-[#0a0a0a]" : "bg-black/[0.03] text-[#787774]"}`,
									children: conteo
								})]
							}, tab);
						})
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex items-center gap-3",
					children: totalSeleccionados > 0 ? /* @__PURE__ */ jsxs("div", {
						className: "inline-flex items-center gap-1.5 p-1 rounded-full bg-black/[0.04] backdrop-blur-md animate-rise",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "text-xs font-medium text-[#787774] px-2.5",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "font-semibold font-mono text-[#0a0a0a]",
										children: totalSeleccionados
									}),
									" ",
									totalSeleccionados === 1 ? "seleccionado" : "seleccionados"
								]
							}),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setModalMasivo("Aprobado"),
								className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-700 bg-white hover:bg-emerald-600 hover:text-white shadow-xs active:scale-95 transition-all cursor-pointer",
								children: [/* @__PURE__ */ jsx(CheckCircleIcon, {
									size: 14,
									strokeWidth: 2
								}), "Aprobar grupo"]
							}),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setModalMasivo("Rechazado"),
								className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-red-700 bg-white hover:bg-red-600 hover:text-white shadow-xs active:scale-95 transition-all cursor-pointer",
								children: [/* @__PURE__ */ jsx(CloseCircleIcon, {
									size: 14,
									strokeWidth: 2
								}), "Rechazar grupo"]
							})
						]
					}) : /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setModalPostulacionesAbierto(true),
						className: `group/btn relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm ${fechaLimite ? "bg-amber-500/15 text-amber-800 border border-amber-500/35 hover:bg-amber-500/20" : "text-white"}`,
						style: fechaLimite ? {} : {
							backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
							boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
						},
						children: [/* @__PURE__ */ jsx(CalendarIcon, {
							size: 16,
							strokeWidth: 2,
							className: "relative z-10"
						}), /* @__PURE__ */ jsx("span", {
							className: "relative z-10",
							children: fechaLimite ? `Cerrada (Límite: ${fechaLimite})` : "Convocatoria y Cierre"
						})]
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "overflow-hidden rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md",
				children: [solicitudesProcesadas.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center justify-center gap-3 py-16 px-6 text-center",
					children: [/* @__PURE__ */ jsx("div", {
						className: "grid h-12 w-12 place-items-center rounded-2xl bg-black/[0.04] text-[#787774]",
						children: /* @__PURE__ */ jsx(UsersGroupRoundedIcon, {
							size: 24,
							strokeWidth: 1.5
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-sm font-bold text-[#0a0a0a]",
							children: ["No hay solicitudes ", filtroEstado !== "Todos" ? `en "${filtroEstado.toLowerCase()}"` : ""]
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-[#787774] m-0 max-w-sm",
							children: busqueda ? "No se encontraron aspirantes que coincidan con los términos de búsqueda." : `Actualmente no hay aspirantes en el estado "${filtroEstado}".`
						})]
					})]
				}) : /* @__PURE__ */ jsx(Table, { children: /* @__PURE__ */ jsx(Table.ScrollContainer, {
					className: "custom-scrollbar",
					children: /* @__PURE__ */ jsxs(Table.Content, {
						"aria-label": "Tabla de solicitudes de la Red de Aprendizaje",
						className: "w-full text-left",
						selectedKeys,
						selectionMode: "multiple",
						onSelectionChange: setSelectedKeys,
						children: [/* @__PURE__ */ jsxs(Table.Header, { children: [
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 w-10 pe-0",
								children: /* @__PURE__ */ jsx(Checkbox, {
									"aria-label": "Seleccionar todos",
									slot: "selection",
									children: /* @__PURE__ */ jsx(Checkbox.Content, { children: /* @__PURE__ */ jsx(Checkbox.Control, { children: /* @__PURE__ */ jsx(Checkbox.Indicator, {}) }) })
								})
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								onClick: () => manejarOrden("nombre"),
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] cursor-pointer hover:bg-black/[0.03] select-none",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", { children: "Aspirante" }), /* @__PURE__ */ jsx("span", {
										className: "text-[0.65rem] text-[#787774]",
										children: columnaOrden === "nombre" ? direccionOrden === "asc" ? "▲" : "▼" : "↕"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								onClick: () => manejarOrden("cedula"),
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] cursor-pointer hover:bg-black/[0.03] select-none",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", { children: "Identificación & Contacto" }), /* @__PURE__ */ jsx("span", {
										className: "text-[0.65rem] text-[#787774]",
										children: columnaOrden === "cedula" ? direccionOrden === "asc" ? "▲" : "▼" : "↕"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								onClick: () => manejarOrden("carrera"),
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] cursor-pointer hover:bg-black/[0.03] select-none",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", { children: "Programa & Semestre" }), /* @__PURE__ */ jsx("span", {
										className: "text-[0.65rem] text-[#787774]",
										children: columnaOrden === "carrera" ? direccionOrden === "asc" ? "▲" : "▼" : "↕"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								onClick: () => manejarOrden("universidad"),
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] cursor-pointer hover:bg-black/[0.03] select-none",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", { children: "Universidad" }), /* @__PURE__ */ jsx("span", {
										className: "text-[0.65rem] text-[#787774]",
										children: columnaOrden === "universidad" ? direccionOrden === "asc" ? "▲" : "▼" : "↕"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								onClick: () => manejarOrden("estado"),
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] text-center cursor-pointer hover:bg-black/[0.03] select-none",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", { children: "Estado" }), /* @__PURE__ */ jsx("span", {
										className: "text-[0.65rem] text-[#787774]",
										children: columnaOrden === "estado" ? direccionOrden === "asc" ? "▲" : "▼" : "↕"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] text-right",
								children: "Decisión"
							})
						] }), /* @__PURE__ */ jsx(Table.Body, { children: solicitudesPaginadas.map((sol) => /* @__PURE__ */ jsxs(Table.Row, {
							id: sol.id,
							className: "transition-colors hover:bg-black/[0.02] group/row",
							children: [
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4 pe-0",
									children: /* @__PURE__ */ jsx(Checkbox, {
										"aria-label": `Seleccionar a ${sol.nombre}`,
										slot: "selection",
										variant: "secondary",
										children: /* @__PURE__ */ jsx(Checkbox.Content, { children: /* @__PURE__ */ jsx(Checkbox.Control, { children: /* @__PURE__ */ jsx(Checkbox.Indicator, {}) }) })
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("div", {
											className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white text-xs font-bold shadow-xs",
											style: {
												backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
												boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6), 0 2px 8px -2px rgba(58,138,244,0.4)"
											},
											children: sol.nombre.charAt(0).toUpperCase()
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-bold text-[#0a0a0a] group-hover/row:text-[#0064c1] transition-colors",
												children: sol.nombre
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-[0.7rem] text-[#787774]",
												children: ["Solicitud: ", sol.fechaSolicitud]
											})]
										})]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-0.5",
										children: [
											/* @__PURE__ */ jsxs("span", {
												className: "font-mono font-semibold text-[#0a0a0a]",
												children: ["CC: ", sol.cedula]
											}),
											sol.email && /* @__PURE__ */ jsx("span", {
												className: "text-[0.72rem] text-[#0064c1] font-medium truncate max-w-[190px]",
												title: sol.email,
												children: sol.email
											}),
											/* @__PURE__ */ jsxs("span", {
												className: "text-[0.72rem] text-[#787774]",
												children: ["Tel: ", sol.telefono]
											})
										]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-semibold text-[#0a0a0a]",
											children: sol.carrera
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[0.7rem] font-medium text-[#0064c1] bg-[#0064c1]/[0.08] px-2 py-0.5 rounded-md w-fit",
											children: sol.semestre
										})]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsx("span", {
										className: "text-[#2f3437] font-medium",
										children: sol.universidad
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4 text-center",
									children: /* @__PURE__ */ jsxs("span", {
										className: `inline-flex items-center gap-1 text-[0.7rem] font-bold px-2.5 py-1 rounded-full ${sol.estado === "Aprobado" ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20" : sol.estado === "Rechazado" ? "bg-red-500/10 text-red-700 border border-red-500/20" : "bg-amber-500/10 text-amber-700 border border-amber-500/20"}`,
										children: [/* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full ${sol.estado === "Aprobado" ? "bg-emerald-500" : sol.estado === "Rechazado" ? "bg-red-500" : "bg-amber-500"}` }), sol.estado]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-5 text-right",
									children: sol.estado === "Pendiente" ? /* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-center gap-1.5 justify-end",
										children: [/* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => setSolicitudAProcesar({
												id: sol.id,
												nombre: sol.nombre,
												accion: "Aprobado"
											}),
											className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-500/10 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer active:scale-95 shadow-2xs",
											title: "Aprobar solicitud",
											children: [/* @__PURE__ */ jsx(CheckCircleIcon, {
												size: 14,
												strokeWidth: 2.2
											}), /* @__PURE__ */ jsx("span", { children: "Aprobar" })]
										}), /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => setSolicitudAProcesar({
												id: sol.id,
												nombre: sol.nombre,
												accion: "Rechazado"
											}),
											className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-red-700 bg-red-500/10 hover:bg-red-600 hover:text-white transition-all cursor-pointer active:scale-95 shadow-2xs",
											title: "Rechazar solicitud",
											children: [/* @__PURE__ */ jsx(CloseCircleIcon, {
												size: 14,
												strokeWidth: 2.2
											}), /* @__PURE__ */ jsx("span", { children: "Rechazar" })]
										})]
									}) : sol.estado === "Aprobado" ? /* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-center gap-2 justify-end",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 text-[0.72rem] font-semibold text-emerald-700 bg-emerald-500/10 px-2.5 py-1 rounded-full",
											children: [/* @__PURE__ */ jsx(CheckCircleIcon, {
												size: 13,
												strokeWidth: 2.5
											}), "Admitido"]
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setSolicitudAProcesar({
												id: sol.id,
												nombre: sol.nombre,
												accion: "Rechazado"
											}),
											className: "grid h-7 w-7 place-items-center rounded-lg text-[#787774] hover:text-red-600 hover:bg-red-500/10 transition-all cursor-pointer",
											title: "Cambiar a Rechazado",
											children: /* @__PURE__ */ jsx(CloseCircleIcon, {
												size: 15,
												strokeWidth: 2
											})
										})]
									}) : /* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-center gap-2 justify-end",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 text-[0.72rem] font-semibold text-red-700 bg-red-500/10 px-2.5 py-1 rounded-full",
											children: [/* @__PURE__ */ jsx(CloseCircleIcon, {
												size: 13,
												strokeWidth: 2.5
											}), "Rechazado"]
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setSolicitudAProcesar({
												id: sol.id,
												nombre: sol.nombre,
												accion: "Aprobado"
											}),
											className: "grid h-7 w-7 place-items-center rounded-lg text-[#787774] hover:text-emerald-600 hover:bg-emerald-500/10 transition-all cursor-pointer",
											title: "Cambiar a Aprobado",
											children: /* @__PURE__ */ jsx(CheckCircleIcon, {
												size: 15,
												strokeWidth: 2
											})
										})]
									})
								})
							]
						}, sol.id)) })]
					})
				}) }), solicitudesProcesadas.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-t border-black/[0.06] bg-black/[0.01]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-xs font-semibold text-[#787774] font-mono",
							children: [
								inicioRango,
								" to ",
								finRango,
								" of ",
								totalRegistros,
								" results"
							]
						}), /* @__PURE__ */ jsxs("span", {
							className: "text-xs text-[#787774]",
							children: [
								"Seleccionados:",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "font-semibold text-[#0a0a0a]",
									children: selectedKeys === "all" ? "Todos" : totalSeleccionados > 0 ? totalSeleccionados : "Ninguno"
								})
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1.5 self-end sm:self-auto",
						children: [
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								disabled: pagina === 1,
								onClick: () => setPagina((p) => Math.max(1, p - 1)),
								className: `inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${pagina === 1 ? "text-black/30 bg-transparent cursor-not-allowed" : "text-[#0a0a0a] bg-white border border-black/10 hover:bg-[#0064c1] hover:text-white hover:border-[#0064c1] shadow-xs cursor-pointer active:scale-95"}`,
								children: [/* @__PURE__ */ jsx(AltArrowLeftIcon, {
									size: 12,
									strokeWidth: 2.2
								}), "Prev"]
							}),
							Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setPagina(p),
								className: `grid h-8 w-8 place-items-center rounded-lg text-xs font-bold transition-all ${p === pagina ? "bg-[#0064c1] text-white shadow-xs" : "text-[#787774] hover:bg-black/[0.05] hover:text-[#0a0a0a] cursor-pointer"}`,
								children: p
							}, p)),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								disabled: pagina === totalPaginas,
								onClick: () => setPagina((p) => Math.min(totalPaginas, p + 1)),
								className: `inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${pagina === totalPaginas ? "text-black/30 bg-transparent cursor-not-allowed" : "text-[#0a0a0a] bg-white border border-black/10 hover:bg-[#0064c1] hover:text-white hover:border-[#0064c1] shadow-xs cursor-pointer active:scale-95"}`,
								children: ["Next", /* @__PURE__ */ jsx(AltArrowRightIcon, {
									size: 12,
									strokeWidth: 2.2
								})]
							})
						]
					})]
				})]
			}),
			montado && modalPostulacionesAbierto && createPortal(/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-5 max-w-xl w-full p-6 md:p-8 rounded-[32px] bg-white shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar animate-rise",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between pb-4 border-b border-black/[0.06]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("span", {
									className: "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1]",
									children: /* @__PURE__ */ jsx(CalendarIcon, {
										size: 22,
										strokeWidth: 2
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "m-0 text-base font-bold text-[#0a0a0a]",
										children: "Gestión de Convocatoria y Cierre"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-[#787774]",
										children: "Configura la fecha límite y el anuncio visible en /red"
									})]
								})]
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setModalPostulacionesAbierto(false),
								className: "grid h-8 w-8 place-items-center rounded-full text-[#787774] hover:text-[#0a0a0a] hover:bg-black/[0.04] transition-colors cursor-pointer",
								children: /* @__PURE__ */ jsx(CloseCircleIcon, { size: 20 })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: `flex items-start gap-3 p-4 rounded-2xl border transition-all ${fechaLimite ? "bg-amber-500/[0.08] border-amber-500/25 text-amber-900" : "bg-emerald-500/[0.08] border-emerald-500/25 text-emerald-900"}`,
							children: [/* @__PURE__ */ jsx("span", {
								className: "mt-0.5 shrink-0",
								children: fechaLimite ? /* @__PURE__ */ jsx(LockIcon, {
									size: 18,
									strokeWidth: 2,
									className: "text-amber-600"
								}) : /* @__PURE__ */ jsx(CheckCircleIcon, {
									size: 18,
									strokeWidth: 2,
									className: "text-emerald-600"
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-0.5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold",
									children: fechaLimite ? "Convocatoria Cerrada (Anuncio Activo)" : "Convocatoria Abierta (Formulario Habilitado)"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[0.73rem] leading-relaxed opacity-90",
									children: fechaLimite ? "Al tener fecha límite establecida, los usuarios en /red verán únicamente tu anuncio de cierre." : "Al no tener fecha límite, los aspirantes pueden postularse normalmente a través del formulario."
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-2 p-4 rounded-2xl bg-black/[0.02] border border-black/[0.06]",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ jsx("label", {
										htmlFor: "fecha-limite-input",
										className: "text-xs font-bold uppercase tracking-wider text-[#0064c1]",
										children: "Fecha Límite de Inscripciones"
									}), fechaLimite && /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => setFechaLimite(null),
										className: "inline-flex items-center gap-1 text-[0.72rem] font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer",
										children: [/* @__PURE__ */ jsx(TrashBinMinimalisticIcon, {
											size: 13,
											strokeWidth: 2
										}), "Quitar fecha (Reabrir convocatoria)"]
									})]
								}),
								/* @__PURE__ */ jsx("input", {
									id: "fecha-limite-input",
									type: "date",
									value: fechaLimite || "",
									onChange: (e) => setFechaLimite(e.target.value || null),
									className: "w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-xs font-semibold text-[#0a0a0a] outline-none focus:border-[#0064c1] shadow-xs cursor-pointer"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-[0.7rem] text-[#787774] leading-relaxed",
									children: fechaLimite ? `Fecha configurada: ${fechaLimite}. Para reabrir el formulario, haz clic en "Quitar fecha" y luego guarda los ajustes.` : "Sin fecha asignada. Si seleccionas una fecha y guardas, el formulario en /red se cerrará mostrando tu anuncio."
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold uppercase tracking-wider text-[#0064c1]",
								children: "Anuncio / Mensaje de Cierre"
							}), /* @__PURE__ */ jsx("textarea", {
								rows: 4,
								value: mensajeCierre,
								onChange: (e) => setMensajeCierre(e.target.value),
								placeholder: "Escribe el mensaje que verán los usuarios cuando la convocatoria esté cerrada...",
								className: "w-full p-3.5 rounded-2xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] resize-none leading-relaxed"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-2.5 pt-4 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setModalPostulacionesAbierto(false),
								disabled: guardandoAjustes,
								className: "px-5 py-2.5 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer disabled:opacity-50",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: guardarAjustesPostulacion,
								disabled: guardandoAjustes,
								className: "inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#0064c1] hover:bg-[#0052a3] active:scale-95 transition-all shadow-sm cursor-pointer disabled:opacity-60",
								children: guardandoAjustes ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", { className: "animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" }), /* @__PURE__ */ jsx("span", { children: "Guardando..." })] }) : /* @__PURE__ */ jsx("span", { children: "Guardar ajustes" })
							})]
						})
					]
				})
			}), document.body),
			montado && modalMasivo && createPortal(/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 max-w-sm w-full p-6 rounded-[28px] bg-white shadow-2xl",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: `grid h-10 w-10 shrink-0 place-items-center rounded-2xl font-bold ${modalMasivo === "Aprobado" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`,
								children: modalMasivo === "Aprobado" ? /* @__PURE__ */ jsx(CheckCircleIcon, {
									size: 22,
									strokeWidth: 2
								}) : /* @__PURE__ */ jsx(DangerTriangleIcon, {
									size: 22,
									strokeWidth: 2
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "m-0 text-base font-bold text-[#0a0a0a]",
									children: modalMasivo === "Aprobado" ? "¿Aprobar grupo?" : "¿Rechazar grupo?"
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-xs text-[#787774]",
									children: [totalSeleccionados, " aspirantes seleccionados"]
								})]
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "m-0 text-xs text-[#2f3437] leading-relaxed",
							children: modalMasivo === "Aprobado" ? `¿Deseas autorizar formalmente la inscripción de los ${totalSeleccionados} aspirantes marcados en la Red de Aprendizaje?` : `¿Deseas rechazar las ${totalSeleccionados} solicitudes marcadas?`
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setModalMasivo(null),
								className: "px-4 py-2 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => ejecutarAccionMasiva(modalMasivo),
								className: `px-4 py-2 rounded-full text-xs font-semibold text-white active:scale-95 transition-all shadow-sm cursor-pointer ${modalMasivo === "Aprobado" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"}`,
								children: modalMasivo === "Aprobado" ? "Sí, aprobar grupo" : "Sí, rechazar grupo"
							})]
						})
					]
				})
			}), document.body),
			montado && solicitudAProcesar && createPortal(/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 max-w-sm w-full p-6 rounded-[28px] bg-white shadow-2xl animate-rise",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: `grid h-10 w-10 shrink-0 place-items-center rounded-2xl font-bold ${solicitudAProcesar.accion === "Aprobado" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`,
								children: solicitudAProcesar.accion === "Aprobado" ? /* @__PURE__ */ jsx(CheckCircleIcon, {
									size: 22,
									strokeWidth: 2
								}) : /* @__PURE__ */ jsx(CloseCircleIcon, {
									size: 22,
									strokeWidth: 2
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col min-w-0",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "m-0 text-base font-bold text-[#0a0a0a] truncate",
									children: solicitudAProcesar.accion === "Aprobado" ? "¿Aprobar aspirante?" : "¿Rechazar aspirante?"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs text-[#787774] truncate font-medium",
									children: solicitudAProcesar.nombre
								})]
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "m-0 text-xs text-[#2f3437] leading-relaxed",
							children: solicitudAProcesar.accion === "Aprobado" ? `Se habilitará el acceso a la plataforma y se le enviará un correo con sus credenciales de ingreso.` : `La solicitud de "${solicitudAProcesar.nombre}" quedará denegada en el sistema.`
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setSolicitudAProcesar(null),
								className: "px-4 py-2 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => ejecutarAccionUnitaria(solicitudAProcesar.id, solicitudAProcesar.accion, solicitudAProcesar.nombre),
								className: `px-4 py-2 rounded-full text-xs font-semibold text-white active:scale-95 transition-all shadow-sm cursor-pointer ${solicitudAProcesar.accion === "Aprobado" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"}`,
								children: solicitudAProcesar.accion === "Aprobado" ? "Sí, aprobar y notificar" : "Sí, rechazar"
							})]
						})
					]
				})
			}), document.body)
		]
	});
};
//#endregion
//#region src/modules/red-aprendizaje/components/ContenidoRedAprendizaje.astro
var $$ContenidoRedAprendizaje = createComponent(async ($$result, $$props, $$slots) => {
	const solicitudes = await ServicioInscripcionesRed.obtenerSolicitudes();
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise"><div class="pointer-events-none absolute inset-0 z-0 h-[22rem] overflow-hidden opacity-35">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><div class="flex-1 flex flex-col px-6 md:px-12 pt-10 md:pt-14 pb-16 max-w-7xl w-full mx-auto gap-8"><!-- Encabezado de la Red de Aprendizaje --><header class="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]"><div class="flex flex-col gap-2 max-w-2xl"><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]"><span class="h-2 w-2 rounded-full bg-[#0064c1]"></span>Solicitudes &amp; Aspirantes</div><h1 class="m-0 text-[clamp(2rem,3.4vw,2.8rem)] font-bold text-[#0a0a0a] tracking-[-0.035em] leading-[1.08] mix-blend-multiply opacity-95">Red de Aprendizaje</h1><p class="m-0 text-sm text-[#787774] font-medium tracking-tight">Revisa y gestiona las solicitudes de aspirantes a la red. Aprueba o niega inscripciones de forma individual o por grupos.</p></div></header><!-- Tabla React Interactiva con Modal de Convocatoria --><div class="relative z-10 w-full">${renderComponent($$result, "TablaInscripcionesRed", TablaInscripcionesRed, {
		"client:load": true,
		"solicitudes": solicitudes,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/red-aprendizaje/components/TablaInscripcionesRed.tsx",
		"client:component-export": "default"
	})}</div></div></div>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/red-aprendizaje/components/ContenidoRedAprendizaje.astro", void 0);
//#endregion
//#region src/modules/red-aprendizaje/services/correos.service.ts
var ServicioCorreosRed = class {
	static plantillaUnica = {
		id: "plantilla-oficial-red",
		nombre: "Notificación de Admisión Institucional",
		asunto: "Notificación de Admisión - Red de Aprendizaje",
		encabezadoTitulo: "Notificación de Admisión",
		encabezadoSubtitulo: "Observatorio de Responsabilidad Social y Sostenibilidad",
		contenidoMarkdown: `Estimado(a) **{{nombre}}**,

Nos complace informarte que tu postulación para integrarte a la **Red de Aprendizaje** del Observatorio ha sido evaluada y **aprobada formalmente**.

Tus credenciales de acceso institucional:
- **Usuario / Correo:** {{email}}
- **Contraseña inicial:** Tu número de identificación (cédula)

A través de la plataforma podrás acceder a los módulos de investigación, proyectos colaborativos y convocatorias activas de la red.`,
		textoBotonCta: "Ingresar a la Plataforma",
		enlaceBotonCta: "https://observatorio.org/login",
		mensajePie: "Observatorio de Responsabilidad Social y Sostenibilidad · 2026",
		variables: [
			"{{nombre}}",
			"{{carrera}}",
			"{{universidad}}",
			"{{email}}",
			"{{cedula}}"
		]
	};
	/**
	* Obtiene los correos enviados consultando la tabla registro_correos_red en Supabase
	*/
	static async obtenerCorreosEnviados() {
		try {
			const registros = await clienteSupabase.consultar("registro_correos_red", "order=fecha_envio.desc&select=*");
			if (registros && registros.length > 0) return registros.map((r) => {
				const fecha = r.fecha_envio ? new Date(r.fecha_envio) : /* @__PURE__ */ new Date();
				return {
					id: r.id,
					destinatarioNombre: r.nombre_destinatario || "Aspirante",
					destinatarioEmail: r.email_destinatario || "",
					asunto: r.asunto || "Notificación de Admisión",
					plantilla: r.tipo || "Notificación de Admisión",
					contenidoHtml: r.contenido_html || "",
					fechaEnvio: fecha.toLocaleDateString("es-CO", {
						day: "2-digit",
						month: "short",
						year: "numeric"
					}),
					horaEnvio: fecha.toLocaleTimeString("es-CO", {
						hour: "2-digit",
						minute: "2-digit"
					}),
					estado: r.estado_envio || "Enviado"
				};
			});
			return [];
		} catch (error) {
			console.error("Error al obtener historial de correos enviados:", error);
			return [];
		}
	}
	static async obtenerPlantilla() {
		return this.plantillaUnica;
	}
	static async guardarPlantilla(plantilla) {
		this.plantillaUnica = { ...plantilla };
	}
	static async enviarCorreoPrueba(emailDestino, asuntoPersonalizado) {
		try {
			if (!(await fetch(`https://gazmrklvrqajobxkblqz.supabase.co/functions/v1/enviar-correo-bienvenida`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhem1ya2x2cnFham9ieGtibHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MDEzNDQsImV4cCI6MjA3ODI3NzM0NH0.zTlOuL3078OEUnUF_wn58Hilmjn1VpS82a7gU15hjFE`
				},
				body: JSON.stringify({
					nombre: "Usuario de Prueba",
					email: emailDestino,
					cedula: "1000000000",
					universidad: "Universidad de Prueba",
					carrera: "Ingeniería de Software"
				})
			})).ok) throw new Error("No se pudo despachar el correo de prueba");
			return {
				exito: true,
				mensaje: `Correo de prueba enviado satisfactoriamente a ${emailDestino}`
			};
		} catch {
			return {
				exito: false,
				mensaje: `No se pudo enviar el correo de prueba a ${emailDestino}.`
			};
		}
	}
};
//#endregion
//#region src/modules/red-aprendizaje/components/GestionCorreosRed.tsx
var GestionCorreosRed = ({ correosIniciales, plantillaInicial }) => {
	const [montado, setMontado] = useState(false);
	const [tabActiva, setTabActiva] = useState("historial");
	const [correos, setCorreos] = useState(correosIniciales);
	const [busqueda, setBusqueda] = useState("");
	const [pagina, setPagina] = useState(1);
	const filasPorPagina = 8;
	const [correoSeleccionado, setCorreoSeleccionado] = useState(null);
	const [plantilla, setPlantilla] = useState(plantillaInicial);
	const [emailPrueba, setEmailPrueba] = useState("usuario.prueba@observatorio.edu.co");
	const [asuntoPrueba, setAsuntoPrueba] = useState(plantillaInicial.asunto);
	const [enviandoPrueba, setEnviandoPrueba] = useState(false);
	useEffect(() => {
		setMontado(true);
	}, []);
	const correosFiltrados = useMemo(() => {
		const termino = busqueda.toLowerCase().trim();
		if (!termino) return correos;
		return correos.filter((c) => c.destinatarioNombre.toLowerCase().includes(termino) || c.destinatarioEmail.toLowerCase().includes(termino) || c.asunto.toLowerCase().includes(termino));
	}, [correos, busqueda]);
	const totalRegistros = correosFiltrados.length;
	const totalPaginas = Math.max(1, Math.ceil(totalRegistros / filasPorPagina));
	const correosPaginados = correosFiltrados.slice((pagina - 1) * filasPorPagina, pagina * filasPorPagina);
	const inicioRango = totalRegistros === 0 ? 0 : (pagina - 1) * filasPorPagina + 1;
	const finRango = Math.min(pagina * filasPorPagina, totalRegistros);
	const ejecutarEnvioPrueba = async (e) => {
		e.preventDefault();
		if (!emailPrueba || !emailPrueba.includes("@")) {
			toast.danger("Correo inválido", { description: "Por favor ingresa una dirección de correo válida para la prueba." });
			return;
		}
		setEnviandoPrueba(true);
		try {
			const res = await ServicioCorreosRed.enviarCorreoPrueba(emailPrueba, asuntoPrueba);
			if (res.exito) {
				const actualizados = await ServicioCorreosRed.obtenerCorreosEnviados();
				setCorreos([...actualizados]);
				toast.success("Correo enviado", { description: res.mensaje });
				setTabActiva("historial");
			} else toast.danger("Error al enviar", { description: res.mensaje });
		} catch {
			toast.danger("Error en el envío", { description: "No se pudo despachar el correo de prueba." });
		} finally {
			setEnviandoPrueba(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-6 w-full relative",
		children: [
			/* @__PURE__ */ jsx(Toast.Provider, { placement: "top" }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ jsx("div", {
					className: "inline-flex p-1 rounded-full bg-black/[0.04]",
					children: [{
						id: "historial",
						label: "Historial de envíos",
						count: correos.length
					}, {
						id: "prueba",
						label: "Enviar prueba"
					}].map((tab) => /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => {
							setTabActiva(tab.id);
							setPagina(1);
						},
						className: `inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${tabActiva === tab.id ? "bg-white text-[#0a0a0a] shadow-xs" : "text-[#787774] hover:text-[#0a0a0a]"}`,
						children: [/* @__PURE__ */ jsx("span", { children: tab.label }), typeof tab.count === "number" && /* @__PURE__ */ jsx("span", {
							className: `text-[0.68rem] px-1.5 py-0.2 rounded-full font-mono font-medium ${tabActiva === tab.id ? "bg-black/[0.06] text-[#0a0a0a]" : "bg-black/[0.03] text-[#787774]"}`,
							children: tab.count
						})]
					}, tab.id))
				}), tabActiva !== "prueba" && /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setTabActiva("prueba"),
					className: "group/btn relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm self-start md:self-auto shrink-0",
					style: {
						backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
						boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
					},
					children: [/* @__PURE__ */ jsx(SendSquareIcon, {
						size: 16,
						strokeWidth: 2,
						className: "relative z-10"
					}), /* @__PURE__ */ jsx("span", {
						className: "relative z-10",
						children: "Enviar correo de prueba"
					})]
				})]
			}),
			tabActiva === "historial" && /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-5 animate-rise",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/80 shadow-[0_4px_16px_-4px_rgba(9,60,120,0.1)] w-full sm:w-80",
						children: [
							/* @__PURE__ */ jsx(RoundedMagnifierZoomInIcon, {
								size: 16,
								className: "text-[#787774] shrink-0"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "text",
								value: busqueda,
								onChange: (e) => {
									setBusqueda(e.target.value);
									setPagina(1);
								},
								placeholder: "Buscar por destinatario, correo o asunto...",
								className: "bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-full"
							}),
							busqueda && /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setBusqueda(""),
								className: "text-[#787774] hover:text-[#0a0a0a] cursor-pointer",
								children: /* @__PURE__ */ jsx(CloseCircleIcon, { size: 14 })
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-medium text-[#787774]",
							children: "Correos despachados:"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-mono text-xs font-bold text-[#0064c1] bg-[#0064c1]/10 px-3 py-1 rounded-full",
							children: correos.length
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "overflow-hidden rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md",
					children: [correosProcesadosLength(correosFiltrados) === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center justify-center gap-3 py-16 px-6 text-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "grid h-12 w-12 place-items-center rounded-2xl bg-black/[0.04] text-[#787774]",
							children: /* @__PURE__ */ jsx(LetterIcon, {
								size: 24,
								strokeWidth: 1.5
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-sm font-bold text-[#0a0a0a]",
								children: "No hay registros de correo"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-[#787774] m-0 max-w-sm",
								children: busqueda ? "No se encontraron envíos que coincidan con los términos de búsqueda." : "Aún no se han despachado correos a los aspirantes."
							})]
						})]
					}) : /* @__PURE__ */ jsx(Table, { children: /* @__PURE__ */ jsx(Table.ScrollContainer, {
						className: "custom-scrollbar",
						children: /* @__PURE__ */ jsxs(Table.Content, {
							"aria-label": "Tabla de correos enviados de la Red de Aprendizaje",
							className: "w-full text-left",
							children: [/* @__PURE__ */ jsxs(Table.Header, { children: [
								/* @__PURE__ */ jsx(Table.Column, {
									className: "py-4 px-5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1]",
									children: "Destinatario / Aspirante"
								}),
								/* @__PURE__ */ jsx(Table.Column, {
									className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1]",
									children: "Asunto"
								}),
								/* @__PURE__ */ jsx(Table.Column, {
									className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1]",
									children: "Fecha y Hora"
								}),
								/* @__PURE__ */ jsx(Table.Column, {
									className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] text-center",
									children: "Estado"
								}),
								/* @__PURE__ */ jsx(Table.Column, {
									className: "py-4 px-5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] text-right",
									children: "Detalle"
								})
							] }), /* @__PURE__ */ jsx(Table.Body, { children: correosPaginados.map((correo) => /* @__PURE__ */ jsxs(Table.Row, {
								id: correo.id,
								className: "transition-colors hover:bg-black/[0.02] group/row",
								children: [
									/* @__PURE__ */ jsx(Table.Cell, {
										className: "py-4 px-5",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx("div", {
												className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white text-xs font-bold shadow-xs",
												style: { backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)" },
												children: correo.destinatarioNombre.charAt(0).toUpperCase()
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col min-w-0",
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-bold text-[#0a0a0a] group-hover/row:text-[#0064c1] transition-colors truncate",
													children: correo.destinatarioNombre
												}), /* @__PURE__ */ jsx("span", {
													className: "text-[0.72rem] text-[#787774] font-mono truncate",
													children: correo.destinatarioEmail
												})]
											})]
										})
									}),
									/* @__PURE__ */ jsx(Table.Cell, {
										className: "py-4 px-4",
										children: /* @__PURE__ */ jsx("span", {
											className: "font-semibold text-xs text-[#0a0a0a] line-clamp-1",
											children: correo.asunto
										})
									}),
									/* @__PURE__ */ jsx(Table.Cell, {
										className: "py-4 px-4",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col gap-0.5",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-xs font-medium text-[#0a0a0a]",
												children: correo.fechaEnvio
											}), /* @__PURE__ */ jsx("span", {
												className: "text-[0.7rem] text-[#787774] font-mono",
												children: correo.horaEnvio
											})]
										})
									}),
									/* @__PURE__ */ jsx(Table.Cell, {
										className: "py-4 px-4 text-center",
										children: /* @__PURE__ */ jsxs("span", {
											className: `inline-flex items-center gap-1.5 text-[0.7rem] font-bold px-2.5 py-1 rounded-full ${correo.estado === "Abierto" ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20" : correo.estado === "Entregado" || correo.estado === "Enviado" ? "bg-blue-500/10 text-blue-700 border border-blue-500/20" : "bg-red-500/10 text-red-700 border border-red-500/20"}`,
											children: [/* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full ${correo.estado === "Abierto" ? "bg-emerald-500" : correo.estado === "Entregado" || correo.estado === "Enviado" ? "bg-blue-500" : "bg-red-500"}` }), correo.estado]
										})
									}),
									/* @__PURE__ */ jsx(Table.Cell, {
										className: "py-4 px-5 text-right",
										children: /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => setCorreoSeleccionado(correo),
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#0064c1] bg-[#0064c1]/10 hover:bg-[#0064c1] hover:text-white transition-all cursor-pointer active:scale-95 shadow-2xs",
											children: [/* @__PURE__ */ jsx(EyeIcon, {
												size: 14,
												strokeWidth: 2
											}), /* @__PURE__ */ jsx("span", { children: "Ver correo" })]
										})
									})
								]
							}, correo.id)) })]
						})
					}) }), correosFiltrados.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-t border-black/[0.06] bg-black/[0.01]",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-xs font-semibold text-[#787774] font-mono",
							children: [
								inicioRango,
								" to ",
								finRango,
								" of ",
								totalRegistros,
								" results"
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									disabled: pagina === 1,
									onClick: () => setPagina((p) => Math.max(1, p - 1)),
									className: `inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${pagina === 1 ? "text-black/30 bg-transparent cursor-not-allowed" : "text-[#0a0a0a] bg-white border border-black/10 hover:bg-[#0064c1] hover:text-white shadow-xs cursor-pointer active:scale-95"}`,
									children: [/* @__PURE__ */ jsx(AltArrowLeftIcon, {
										size: 12,
										strokeWidth: 2.2
									}), "Prev"]
								}),
								Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setPagina(p),
									className: `grid h-8 w-8 place-items-center rounded-lg text-xs font-bold transition-all ${p === pagina ? "bg-[#0064c1] text-white shadow-xs" : "text-[#787774] hover:bg-black/[0.05] cursor-pointer"}`,
									children: p
								}, p)),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									disabled: pagina === totalPaginas,
									onClick: () => setPagina((p) => Math.min(totalPaginas, p + 1)),
									className: `inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${pagina === totalPaginas ? "text-black/30 bg-transparent cursor-not-allowed" : "text-[#0a0a0a] bg-white border border-black/10 hover:bg-[#0064c1] hover:text-white shadow-xs cursor-pointer active:scale-95"}`,
									children: ["Next", /* @__PURE__ */ jsx(AltArrowRightIcon, {
										size: 12,
										strokeWidth: 2.2
									})]
								})
							]
						})]
					})]
				})]
			}),
			tabActiva === "prueba" && /* @__PURE__ */ jsx("form", {
				onSubmit: ejecutarEnvioPrueba,
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-rise max-w-2xl mx-auto w-full",
				children: /* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-12 flex flex-col gap-6 p-6 md:p-8 rounded-[32px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14)] backdrop-blur-md",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 pb-3 border-b border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-10 w-10 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1]",
								children: /* @__PURE__ */ jsx(SendSquareIcon, {
									size: 20,
									strokeWidth: 2
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "m-0 text-base font-bold text-[#0a0a0a]",
									children: "Enviar Correo de Prueba"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs text-[#787774]",
									children: "Despacha la plantilla oficial a cualquier dirección de prueba"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
								children: ["Correo destinatario:", /* @__PURE__ */ jsx("input", {
									type: "email",
									value: emailPrueba,
									onChange: (e) => setEmailPrueba(e.target.value),
									placeholder: "ejemplo@observatorio.edu.co",
									className: "px-4 py-2.5 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] font-mono",
									required: true
								})]
							}), /* @__PURE__ */ jsxs("label", {
								className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
								children: ["Asunto del correo:", /* @__PURE__ */ jsx("input", {
									type: "text",
									value: asuntoPrueba,
									onChange: (e) => setAsuntoPrueba(e.target.value),
									className: "px-4 py-2.5 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]",
									required: true
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-3 pt-4 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setTabActiva("historial"),
								className: "px-5 py-2.5 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: enviandoPrueba,
								className: "group/btn relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm",
								style: {
									backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
									boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
								},
								children: enviandoPrueba ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", { className: "h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ jsx("span", { children: "Enviando..." })] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(SendSquareIcon, {
									size: 16,
									strokeWidth: 2,
									className: "relative z-10"
								}), /* @__PURE__ */ jsx("span", {
									className: "relative z-10",
									children: "Despachar prueba"
								})] })
							})]
						})
					]
				})
			}),
			montado && correoSeleccionado && createPortal(/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 animate-fade-in",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 max-w-2xl w-full p-6 rounded-[28px] bg-white shadow-2xl max-h-[90vh] overflow-hidden animate-rise",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between pb-3 border-b border-black/[0.06]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white text-xs font-bold shadow-xs",
									style: { backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)" },
									children: correoSeleccionado.destinatarioNombre.charAt(0).toUpperCase()
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "m-0 text-base font-bold text-[#0a0a0a]",
										children: correoSeleccionado.destinatarioNombre
									}), /* @__PURE__ */ jsxs("span", {
										className: "text-xs text-[#787774] font-mono",
										children: [
											correoSeleccionado.destinatarioEmail,
											" · ",
											correoSeleccionado.fechaEnvio,
											" (",
											correoSeleccionado.horaEnvio,
											")"
										]
									})]
								})]
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setCorreoSeleccionado(null),
								className: "text-[#787774] hover:text-[#0a0a0a] cursor-pointer p-1",
								children: /* @__PURE__ */ jsx(CloseCircleIcon, { size: 20 })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "p-3 rounded-xl bg-black/[0.02] border border-black/[0.05] flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "text-xs font-bold text-[#0a0a0a] truncate",
								children: ["Asunto: ", correoSeleccionado.asunto]
							}), /* @__PURE__ */ jsx("span", {
								className: "text-[0.68rem] font-bold text-emerald-700 bg-emerald-500/10 px-2.5 py-0.5 rounded-full shrink-0",
								children: correoSeleccionado.estado
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex-1 overflow-y-auto custom-scrollbar border border-black/[0.08] rounded-2xl p-4 bg-[#fbfbfa]",
							children: correoSeleccionado.contenidoHtml ? /* @__PURE__ */ jsx("div", {
								className: "bg-white rounded-xl shadow-xs overflow-hidden max-w-[540px] mx-auto",
								dangerouslySetInnerHTML: { __html: correoSeleccionado.contenidoHtml }
							}) : /* @__PURE__ */ jsxs("div", {
								className: "max-w-[480px] mx-auto rounded-xl bg-white p-6 shadow-xs border border-black/[0.06] text-xs text-[#222222] leading-relaxed flex flex-col gap-3",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "text-center pb-3 border-b border-black/[0.06]",
										children: [
											/* @__PURE__ */ jsx("img", {
												src: "https://cdn.phototourl.com/free/2026-09-17-2fa4f239-5e78-4849-8777-4768e6560c67.png",
												alt: "Logo",
												className: "h-10 mx-auto object-contain mb-2"
											}),
											/* @__PURE__ */ jsx("h4", {
												className: "m-0 text-sm font-bold text-[#0a0a0a]",
												children: "Notificación de Admisión"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "m-0 text-[0.7rem] text-[#787774]",
												children: "Observatorio de Responsabilidad Social"
											})
										]
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "m-0",
										children: [
											"Estimado(a) ",
											/* @__PURE__ */ jsx("strong", { children: correoSeleccionado.destinatarioNombre }),
											","
										]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "m-0",
										children: "Tu postulación a la Red de Aprendizaje ha sido aprobada formalmente."
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "p-3 rounded-lg bg-black/[0.03] border border-black/[0.05] text-[0.72rem] font-mono",
										children: [/* @__PURE__ */ jsxs("div", { children: ["Usuario: ", correoSeleccionado.destinatarioEmail] }), /* @__PURE__ */ jsx("div", {
											className: "text-[#787774]",
											children: "Contraseña: Número de cédula"
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-end pt-2 border-t border-black/[0.06]",
							children: /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setCorreoSeleccionado(null),
								className: "px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#0064c1] hover:bg-[#0f2fe8] active:scale-95 transition-all shadow-xs cursor-pointer",
								children: "Cerrar"
							})
						})
					]
				})
			}), document.body)
		]
	});
};
function correosProcesadosLength(lista) {
	return lista.length;
}
//#endregion
//#region src/modules/red-aprendizaje/components/ContenidoCorreosRed.astro
var $$ContenidoCorreosRed = createComponent(async ($$result, $$props, $$slots) => {
	const correos = await ServicioCorreosRed.obtenerCorreosEnviados();
	const plantilla = await ServicioCorreosRed.obtenerPlantilla();
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise"><div class="pointer-events-none absolute inset-0 z-0 h-[22rem] overflow-hidden opacity-35">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><div class="flex-1 flex flex-col px-6 md:px-12 pt-10 md:pt-14 pb-16 max-w-7xl w-full mx-auto gap-8"><!-- Encabezado de Correos --><header class="relative z-10 flex flex-col gap-2 pb-6 border-b border-black/[0.06]"><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]"><span class="h-2 w-2 rounded-full bg-[#0064c1]"></span>Comunicaciones &amp; Notificaciones</div><h1 class="m-0 text-[clamp(2rem,3.4vw,2.8rem)] font-bold text-[#0a0a0a] tracking-[-0.035em] leading-[1.08] mix-blend-multiply opacity-95">Correos de la Red de Aprendizaje</h1><p class="m-0 text-sm text-[#787774] font-medium tracking-tight">Consulta el historial de correos enviados a los aspirantes y despacha correos de prueba.</p></header><!-- Componente Interactivo --><div class="relative z-10 w-full">${renderComponent($$result, "GestionCorreosRed", GestionCorreosRed, {
		"client:load": true,
		"correosIniciales": correos,
		"plantillaInicial": plantilla,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/red-aprendizaje/components/GestionCorreosRed.tsx",
		"client:component-export": "default"
	})}</div></div></div>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/red-aprendizaje/components/ContenidoCorreosRed.astro", void 0);
//#endregion
export { $$EncabezadoRed as i, $$ContenidoRedAprendizaje as n, $$FormularioRegistroRed as r, $$ContenidoCorreosRed as t };
