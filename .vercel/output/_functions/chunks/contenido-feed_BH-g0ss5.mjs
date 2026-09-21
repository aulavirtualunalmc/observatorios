import { E as maybeRenderHead, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { t as $$SkyShader } from "./SkyShader_DL8DbueI.mjs";
import { t as ServicioContenidoFeed } from "./contenido-feed.service_C9sUPp6G.mjs";
import { useEffect, useMemo, useState } from "react";
import { AddCircleIcon, AltArrowLeftIcon, AltArrowRightIcon, ArrowRightIcon, CheckCircleIcon, ClockCircleIcon, CloseCircleIcon, DangerTriangleIcon, GalleryIcon, InboxIcon, LikeIcon, LinkRoundIcon, NotesIcon, Pen2Icon, PlayIcon, RefreshIcon, RoundedMagnifierZoomInIcon, StarsMinimalisticIcon, TrashBinMinimalisticIcon, VideocameraIcon } from "@solar-icons/react/outline";
import { Checkbox, Table, Tabs, Toast, toast } from "@heroui/react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region src/modules/contenido-feed/components/TablaContenidoFeed.tsx
var FILAS_POR_PAGINA = 8;
var TablaContenidoFeed = ({ items: itemsIniciales = [] }) => {
	const [lista, setLista] = useState(itemsIniciales || []);
	const [tabActiva, setTabActiva] = useState("noticia");
	const [selectedKeys, setSelectedKeys] = useState(/* @__PURE__ */ new Set());
	const [busqueda, setBusqueda] = useState("");
	const [pagina, setPagina] = useState(1);
	const [cargando, setCargando] = useState(false);
	const [itemAEliminar, setItemAEliminar] = useState(null);
	const [modalMasivoEliminar, setModalMasivoEliminar] = useState(false);
	const [eliminando, setEliminando] = useState(false);
	const [actualizandoDestacadoId, setActualizandoDestacadoId] = useState(null);
	const toggleDestacado = async (item) => {
		const nuevoDestacado = !item.destacado;
		const itemTipo = item.tipo;
		const listaAnterior = [...lista];
		setLista((prev) => prev.map((i) => {
			if (i.id === item.id) return {
				...i,
				destacado: nuevoDestacado
			};
			if (nuevoDestacado && i.tipo === itemTipo) return {
				...i,
				destacado: false
			};
			return i;
		}));
		setActualizandoDestacadoId(item.id);
		try {
			const resp = await fetch("/api/contenido-feed/destacar", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: item.id,
					tipo: item.tipo,
					destacado: nuevoDestacado
				})
			});
			if (!resp.ok) {
				const errData = await resp.json().catch(() => ({}));
				throw new Error(errData.error || "No se pudo actualizar el estado de destacado.");
			}
			if (nuevoDestacado) toast.success("Contenido Destacado", { description: `"${item.titulo}" es ahora el contenido destacado de ${item.tipo === "noticia" ? "Noticias" : "YouTube"}.` });
			else toast.info("Destacado removido", { description: `"${item.titulo}" ya no está marcado como destacado.` });
		} catch (err) {
			setLista(listaAnterior);
			toast.danger("Error al cambiar destacado", { description: err.message || "Ocurrió un problema de conexión." });
		} finally {
			setActualizandoDestacadoId(null);
		}
	};
	const recargarDatos = async () => {
		setCargando(true);
		try {
			const resp = await fetch("/api/contenido-feed");
			if (resp.ok) {
				const data = await resp.json();
				setLista(Array.isArray(data) ? data : []);
			}
		} catch (err) {
			console.error("Error al recargar contenido feed:", err);
		} finally {
			setCargando(false);
		}
	};
	useEffect(() => {
		if (!itemsIniciales || itemsIniciales.length === 0) recargarDatos();
	}, []);
	const itemsFiltrados = useMemo(() => {
		let resultado = (Array.isArray(lista) ? lista : []).filter((item) => item.tipo === tabActiva);
		const termino = busqueda.toLowerCase().trim();
		if (termino) resultado = resultado.filter((item) => item.titulo && item.titulo.toLowerCase().includes(termino) || item.descripcion && item.descripcion.toLowerCase().includes(termino) || item.fuenteOCanal && item.fuenteOCanal.toLowerCase().includes(termino) || item.enlace && item.enlace.toLowerCase().includes(termino));
		return resultado;
	}, [
		lista,
		tabActiva,
		busqueda
	]);
	const totalRegistros = itemsFiltrados.length;
	const totalPaginas = Math.max(1, Math.ceil(totalRegistros / FILAS_POR_PAGINA));
	const itemsPaginados = useMemo(() => {
		const inicio = (pagina - 1) * FILAS_POR_PAGINA;
		return itemsFiltrados.slice(inicio, inicio + FILAS_POR_PAGINA);
	}, [itemsFiltrados, pagina]);
	const inicioRango = totalRegistros === 0 ? 0 : (pagina - 1) * FILAS_POR_PAGINA + 1;
	const finRango = Math.min(pagina * FILAS_POR_PAGINA, totalRegistros);
	const idsSeleccionados = useMemo(() => {
		if (selectedKeys === "all") return itemsFiltrados.map((item) => item.id);
		return Array.from(selectedKeys);
	}, [selectedKeys, itemsFiltrados]);
	const totalSeleccionados = idsSeleccionados.length;
	const confirmarEliminacion = async () => {
		if (!itemAEliminar) return;
		const idParaEliminar = itemAEliminar.id;
		const tituloEliminado = itemAEliminar.titulo;
		setEliminando(true);
		try {
			const resp = await fetch(`/api/contenido-feed/${idParaEliminar}`, { method: "DELETE" });
			if (!resp.ok) {
				const errorData = await resp.json().catch(() => ({}));
				throw new Error(errorData.error || "No se pudo eliminar el elemento.");
			}
			setLista((prev) => prev.filter((i) => i.id !== idParaEliminar));
			setItemAEliminar(null);
			toast.success("Enlace eliminado", { description: `Se eliminó "${tituloEliminado}" del feed.` });
		} catch (err) {
			toast.danger("Error al eliminar", { description: err.message || "No fue posible eliminar el registro." });
		} finally {
			setEliminando(false);
		}
	};
	const confirmarEliminacionMasiva = async () => {
		if (idsSeleccionados.length === 0) return;
		const totalAfectados = idsSeleccionados.length;
		setEliminando(true);
		try {
			const resp = await fetch("/api/contenido-feed", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ids: idsSeleccionados })
			});
			if (!resp.ok) {
				const errorData = await resp.json().catch(() => ({}));
				throw new Error(errorData.error || "No se pudieron eliminar los elementos.");
			}
			setLista((prev) => prev.filter((i) => !idsSeleccionados.includes(i.id)));
			setSelectedKeys(/* @__PURE__ */ new Set());
			setModalMasivoEliminar(false);
			toast.success("Enlaces eliminados", { description: `Se eliminaron ${totalAfectados} elementos del feed exitosamente.` });
		} catch (err) {
			toast.danger("Error en eliminación masiva", { description: err.message || "No fue posible eliminar los registros seleccionados." });
		} finally {
			setEliminando(false);
		}
	};
	const conteoNoticias = Array.isArray(lista) ? lista.filter((i) => i.tipo === "noticia").length : 0;
	const conteoYoutube = Array.isArray(lista) ? lista.filter((i) => i.tipo === "youtube").length : 0;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-6 w-full relative",
		children: [
			/* @__PURE__ */ jsx(Toast.Provider, { placement: "top" }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ jsx(Tabs, {
					className: "w-full sm:w-auto",
					selectedKey: tabActiva,
					onSelectionChange: (key) => {
						setTabActiva(key);
						setSelectedKeys(/* @__PURE__ */ new Set());
						setPagina(1);
					},
					children: /* @__PURE__ */ jsx(Tabs.ListContainer, { children: /* @__PURE__ */ jsxs(Tabs.List, {
						"aria-label": "Tipos de Feed",
						children: [/* @__PURE__ */ jsxs(Tabs.Tab, {
							id: "noticia",
							className: "flex items-center gap-2 px-4 py-2 cursor-pointer",
							children: [
								/* @__PURE__ */ jsx(NotesIcon, {
									size: 16,
									strokeWidth: 1.8
								}),
								/* @__PURE__ */ jsx("span", { children: "News Feed" }),
								/* @__PURE__ */ jsx("span", {
									className: "text-[0.68rem] px-2 py-0.5 rounded-full bg-[#0064c1]/10 text-[#0064c1] font-bold font-mono",
									children: conteoNoticias
								}),
								/* @__PURE__ */ jsx(Tabs.Indicator, {})
							]
						}), /* @__PURE__ */ jsxs(Tabs.Tab, {
							id: "youtube",
							className: "flex items-center gap-2 px-4 py-2 cursor-pointer",
							children: [
								/* @__PURE__ */ jsx(VideocameraIcon, {
									size: 16,
									strokeWidth: 1.8
								}),
								/* @__PURE__ */ jsx("span", { children: "YouTube Feed" }),
								/* @__PURE__ */ jsx("span", {
									className: "text-[0.68rem] px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 font-bold font-mono",
									children: conteoYoutube
								}),
								/* @__PURE__ */ jsx(Tabs.Indicator, {})
							]
						})]
					}) })
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 self-start sm:self-auto shrink-0",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: recargarDatos,
						disabled: cargando,
						title: "Sincronizar con Supabase",
						className: "grid h-9 w-9 place-items-center rounded-full bg-white border border-black/10 text-[#787774] hover:text-[#0064c1] hover:border-[#0064c1]/40 transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50",
						children: /* @__PURE__ */ jsx(RefreshIcon, {
							size: 16,
							className: cargando ? "animate-spin text-[#0064c1]" : ""
						})
					}), /* @__PURE__ */ jsxs("a", {
						href: "/dashboard/contenido-feed/nuevo",
						className: "group/btn relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm",
						style: {
							backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
							boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
						},
						children: [/* @__PURE__ */ jsx(AddCircleIcon, {
							size: 16,
							strokeWidth: 2,
							className: "relative z-10"
						}), /* @__PURE__ */ jsx("span", {
							className: "relative z-10",
							children: "Cargar nuevo enlace"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/80 shadow-[0_4px_16px_-4px_rgba(9,60,120,0.1)] w-full sm:w-80",
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
							placeholder: `Buscar en ${tabActiva === "noticia" ? "Noticias" : "Videos YouTube"}...`,
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
					className: "flex items-center gap-2",
					children: totalSeleccionados > 0 ? /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 p-1.5 px-3 rounded-full bg-red-500/10 border border-red-500/20 animate-rise",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "text-xs font-bold text-red-700 font-mono",
								children: [totalSeleccionados, " seleccionados"]
							}),
							/* @__PURE__ */ jsx("div", { className: "h-3.5 w-px bg-red-500/30 mx-1" }),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setModalMasivoEliminar(true),
								className: "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-xs cursor-pointer",
								children: [/* @__PURE__ */ jsx(TrashBinMinimalisticIcon, {
									size: 14,
									strokeWidth: 2
								}), "Eliminar seleccionados"]
							})
						]
					}) : /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold text-[#787774]",
							children: "Total registrados:"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-mono text-xs font-bold text-[#0064c1] bg-[#0064c1]/10 px-3 py-1 rounded-full",
							children: totalRegistros
						})]
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "overflow-hidden rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md",
				children: [/* @__PURE__ */ jsx(Table, { children: /* @__PURE__ */ jsx(Table.ScrollContainer, {
					className: "custom-scrollbar",
					children: /* @__PURE__ */ jsxs(Table.Content, {
						"aria-label": `Tabla de ${tabActiva === "noticia" ? "Noticias" : "Videos de YouTube"}`,
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
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1]",
								children: "Contenido / Portada"
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1]",
								children: "Fuente / Canal"
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1]",
								children: "Enlace Original"
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] text-center",
								children: "Estado"
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-amber-600 text-center",
								children: "Destacado"
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] text-center",
								children: "Likes"
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] text-right",
								children: "Acciones"
							})
						] }), /* @__PURE__ */ jsx(Table.Body, { children: itemsPaginados.length === 0 ? /* @__PURE__ */ jsx(Table.Row, {
							id: "fila-vacia",
							children: /* @__PURE__ */ jsx(Table.Cell, {
								className: "py-16 text-center",
								colSpan: 8,
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center justify-center gap-3 max-w-sm mx-auto",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "grid h-14 w-14 place-items-center rounded-2xl bg-[#0064c1]/10 text-[#0064c1]",
											children: /* @__PURE__ */ jsx(InboxIcon, {
												size: 28,
												strokeWidth: 1.5
											})
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-col gap-1 text-center",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "text-sm font-bold text-[#0a0a0a]",
												children: [
													"No hay ",
													tabActiva === "noticia" ? "noticias" : "videos de YouTube",
													" registrados"
												]
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-[#787774] m-0 leading-relaxed",
												children: busqueda ? "No se encontraron coincidencias para tu búsqueda actual." : "Carga un nuevo enlace para que aparezca en el feed del Observatorio."
											})]
										}),
										!busqueda && /* @__PURE__ */ jsxs("a", {
											href: "/dashboard/contenido-feed/nuevo",
											className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#0064c1] bg-[#0064c1]/10 hover:bg-[#0064c1]/15 transition-all mt-1 cursor-pointer",
											children: [/* @__PURE__ */ jsx(AddCircleIcon, {
												size: 14,
												strokeWidth: 2
											}), /* @__PURE__ */ jsx("span", { children: "Cargar primer enlace" })]
										})
									]
								})
							})
						}) : itemsPaginados.map((item) => /* @__PURE__ */ jsxs(Table.Row, {
							id: item.id,
							className: "transition-colors hover:bg-black/[0.02] group/row",
							children: [
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4 pe-0",
									children: /* @__PURE__ */ jsx(Checkbox, {
										"aria-label": `Seleccionar ${item.titulo}`,
										slot: "selection",
										variant: "secondary",
										children: /* @__PURE__ */ jsx(Checkbox.Content, { children: /* @__PURE__ */ jsx(Checkbox.Control, { children: /* @__PURE__ */ jsx(Checkbox.Indicator, {}) }) })
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3.5 max-w-md",
										children: [item.imagen ? /* @__PURE__ */ jsx("img", {
											src: item.imagen,
											alt: item.titulo,
											className: "h-12 w-18 shrink-0 rounded-xl object-cover border border-black/10 shadow-xs"
										}) : /* @__PURE__ */ jsx("div", {
											className: "h-12 w-18 shrink-0 rounded-xl bg-black/[0.05] grid place-items-center text-[#787774] text-xs font-bold",
											children: "Sin foto"
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col gap-0.5 min-w-0",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-bold text-[#0a0a0a] group-hover/row:text-[#0064c1] transition-colors line-clamp-2 leading-tight",
													children: item.titulo
												}), item.destacado && /* @__PURE__ */ jsxs("span", {
													className: "inline-flex items-center gap-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-amber-800 bg-amber-500/20 px-1.5 py-0.5 rounded-md shrink-0 border border-amber-500/30",
													children: [/* @__PURE__ */ jsx(StarsMinimalisticIcon, {
														size: 10,
														strokeWidth: 2.5,
														className: "text-amber-600"
													}), "Top"]
												})]
											}), /* @__PURE__ */ jsx("span", {
												className: "text-[0.7rem] text-[#787774] line-clamp-1",
												children: item.descripcion
											})]
										})]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-semibold text-[#0a0a0a] text-xs",
											children: item.fuenteOCanal || "Web"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[0.7rem] text-[#787774]",
											children: item.duracionOLectura
										})]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsxs("a", {
										href: item.enlace,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-flex items-center gap-1.5 text-xs text-[#0064c1] hover:underline font-mono max-w-[200px] truncate",
										title: item.enlace,
										children: [/* @__PURE__ */ jsx(LinkRoundIcon, {
											size: 14,
											className: "shrink-0"
										}), /* @__PURE__ */ jsx("span", {
											className: "truncate",
											children: item.enlace
										})]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4 text-center",
									children: /* @__PURE__ */ jsxs("span", {
										className: `inline-flex items-center gap-1 text-[0.7rem] font-bold px-2.5 py-1 rounded-full ${item.estado === "Publicado" ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20" : "bg-black/[0.06] text-[#787774] border border-black/[0.08]"}`,
										children: [/* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full ${item.estado === "Publicado" ? "bg-emerald-500" : "bg-zinc-400"}` }), item.estado]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4 text-center",
									children: /* @__PURE__ */ jsxs("button", {
										type: "button",
										disabled: actualizandoDestacadoId === item.id,
										onClick: () => toggleDestacado(item),
										title: item.destacado ? "Destacado activo. Haz clic para desmarcar." : `Haz clic para marcar como el único destacado de ${item.tipo === "noticia" ? "Noticias" : "YouTube"}.`,
										className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer select-none active:scale-95 ${item.destacado ? "bg-amber-500/15 text-amber-800 border border-amber-500/35 shadow-[0_2px_10px_-2px_rgba(245,158,11,0.35)]" : "bg-black/[0.03] text-[#787774] border border-black/[0.08] hover:text-amber-800 hover:border-amber-500/30 hover:bg-amber-500/10"} ${actualizandoDestacadoId === item.id ? "opacity-50 pointer-events-none" : ""}`,
										children: [item.destacado ? /* @__PURE__ */ jsx(StarsMinimalisticIcon, {
											size: 14,
											strokeWidth: 2.5,
											className: "text-amber-500 animate-pulse"
										}) : /* @__PURE__ */ jsx(StarsMinimalisticIcon, {
											size: 14,
											className: "text-[#787774]"
										}), /* @__PURE__ */ jsx("span", { children: item.destacado ? "Destacado" : "Normal" })]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4 text-center",
									children: /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0064c1]/[0.06] border border-[#0064c1]/15 text-[#0064c1]",
										title: `${item.likesCount || 0} me gusta acumulados`,
										children: [/* @__PURE__ */ jsx(LikeIcon, {
											size: 14,
											strokeWidth: 1.8
										}), /* @__PURE__ */ jsx("span", {
											className: "font-mono text-xs font-bold select-none",
											children: item.likesCount || 0
										})]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-5 text-right relative",
									children: /* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-center gap-1.5 relative",
										children: [/* @__PURE__ */ jsx("a", {
											href: `/dashboard/contenido-feed/editar/${item.id}`,
											className: "grid h-8 w-8 place-items-center rounded-lg text-[#787774] hover:text-[#0064c1] hover:bg-[#0064c1]/10 transition-colors cursor-pointer",
											title: "Editar enlace",
											children: /* @__PURE__ */ jsx(Pen2Icon, {
												size: 16,
												strokeWidth: 1.8
											})
										}), /* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setItemAEliminar(itemAEliminar?.id === item.id ? null : item),
												className: `grid h-8 w-8 place-items-center rounded-lg transition-colors cursor-pointer ${itemAEliminar?.id === item.id ? "bg-red-600 text-white shadow-xs" : "text-[#787774] hover:text-red-600 hover:bg-red-50"}`,
												title: "Eliminar del feed",
												children: /* @__PURE__ */ jsx(TrashBinMinimalisticIcon, {
													size: 16,
													strokeWidth: 1.8
												})
											}), itemAEliminar?.id === item.id && /* @__PURE__ */ jsxs("div", {
												className: "absolute right-0 top-10 z-50 flex flex-col gap-2.5 w-64 p-3.5 rounded-2xl bg-white border border-black/10 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.2)] text-left animate-rise",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ jsx("span", {
															className: "grid h-7 w-7 place-items-center rounded-lg bg-red-50 text-red-600 shrink-0",
															children: /* @__PURE__ */ jsx(DangerTriangleIcon, {
																size: 16,
																strokeWidth: 2
															})
														}), /* @__PURE__ */ jsxs("div", {
															className: "flex flex-col min-w-0",
															children: [/* @__PURE__ */ jsx("span", {
																className: "text-xs font-bold text-[#0a0a0a] truncate leading-tight",
																children: "¿Eliminar del Feed?"
															}), /* @__PURE__ */ jsx("span", {
																className: "text-[0.66rem] text-[#787774] truncate",
																children: item.titulo
															})]
														})]
													}),
													/* @__PURE__ */ jsx("p", {
														className: "m-0 text-[0.72rem] text-[#2f3437] leading-tight",
														children: "Se despublicará del carrusel y de la base de datos."
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-end gap-1.5 pt-2 border-t border-black/[0.06]",
														children: [/* @__PURE__ */ jsx("button", {
															type: "button",
															disabled: eliminando,
															onClick: () => setItemAEliminar(null),
															className: "px-2.5 py-1 rounded-lg text-[0.72rem] font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
															children: "Cancelar"
														}), /* @__PURE__ */ jsx("button", {
															type: "button",
															disabled: eliminando,
															onClick: confirmarEliminacion,
															className: "px-3 py-1 rounded-lg text-[0.72rem] font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-xs cursor-pointer flex items-center gap-1",
															children: eliminando ? "Borrando..." : "Sí, borrar"
														})]
													})
												]
											})]
										})]
									})
								})
							]
						}, item.id)) })]
					})
				}) }), totalRegistros > 0 && /* @__PURE__ */ jsxs("div", {
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
			modalMasivoEliminar && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-rise",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 w-full max-w-md p-6 rounded-[28px] bg-white border border-black/10 shadow-2xl",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("span", {
							className: "grid h-10 w-10 place-items-center rounded-2xl bg-red-50 text-red-600 shrink-0",
							children: /* @__PURE__ */ jsx(DangerTriangleIcon, {
								size: 22,
								strokeWidth: 2
							})
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h3", {
							className: "m-0 text-base font-bold text-[#0a0a0a]",
							children: [
								"¿Eliminar ",
								totalSeleccionados,
								" contenidos seleccionados?"
							]
						}), /* @__PURE__ */ jsx("p", {
							className: "m-0 text-xs text-[#787774]",
							children: "Esta acción no se puede deshacer y borrará permanentemente los enlaces del feed."
						})] })]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-end gap-2 pt-4 border-t border-black/[0.06]",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							disabled: eliminando,
							onClick: () => setModalMasivoEliminar(false),
							className: "px-4 py-2 rounded-xl text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
							children: "Cancelar"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							disabled: eliminando,
							onClick: confirmarEliminacionMasiva,
							className: "px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-xs cursor-pointer flex items-center gap-1.5",
							children: eliminando ? "Eliminando..." : "Sí, eliminar todos"
						})]
					})]
				})
			})
		]
	});
};
//#endregion
//#region src/modules/contenido-feed/components/ContenidoAdminFeed.astro
var $$ContenidoAdminFeed = createComponent(async ($$result, $$props, $$slots) => {
	const items = await ServicioContenidoFeed.obtenerItems();
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise"><div class="pointer-events-none absolute inset-0 z-0 h-[22rem] overflow-hidden opacity-35">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><div class="flex-1 flex flex-col px-6 md:px-12 pt-10 md:pt-14 pb-16 max-w-7xl w-full mx-auto gap-8"><!-- Encabezado --><header class="relative z-10 flex flex-col gap-2 pb-6 border-b border-black/[0.06]"><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]"><span class="h-2 w-2 rounded-full bg-[#0064c1]"></span>Publicación &amp; Medios</div><h1 class="m-0 text-[clamp(2rem,3.4vw,2.8rem)] font-bold text-[#0a0a0a] tracking-[-0.035em] leading-[1.08] mix-blend-multiply opacity-95">Contenido Feed</h1><p class="m-0 text-sm text-[#787774] font-medium tracking-tight">Administra las publicaciones de noticias y videos de YouTube. Carga nuevos enlaces con análisis automático de metadatos o edita los contenidos existentes.</p></header><!-- Tabla con Tabs HeroUI --><div class="relative z-10 w-full">${renderComponent($$result, "TablaContenidoFeed", TablaContenidoFeed, {
		"client:load": true,
		"items": items,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/contenido-feed/components/TablaContenidoFeed.tsx",
		"client:component-export": "default"
	})}</div></div></div>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/contenido-feed/components/ContenidoAdminFeed.astro", void 0);
//#endregion
//#region src/modules/contenido-feed/components/FormularioCargarFeed.tsx
var FormularioCargarFeed = () => {
	const [url, setUrl] = useState("");
	const [analizando, setAnalizando] = useState(false);
	const [guardando, setGuardando] = useState(false);
	const [pasoAnalisis, setPasoAnalisis] = useState("");
	const [datosAnalizados, setDatosAnalizados] = useState(null);
	const [tipo, setTipo] = useState("noticia");
	const [titulo, setTitulo] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [imagen, setImagen] = useState("");
	const [fuenteOCanal, setFuenteOCanal] = useState("");
	const [categoria, setCategoria] = useState("Actualidad");
	const [duracionOLectura, setDuracionOLectura] = useState("");
	const [estado, setEstado] = useState("Publicado");
	const analizarEnlace = async (urlAAnalizar) => {
		const enlaceLimpio = urlAAnalizar.trim();
		if (!enlaceLimpio) return;
		try {
			new URL(enlaceLimpio);
		} catch {
			toast.danger("URL inválida", { description: "Ingresa una dirección web válida comenzando por http:// o https://" });
			return;
		}
		setAnalizando(true);
		setPasoAnalisis("Conectando con el enlace...");
		setDatosAnalizados(null);
		try {
			setTimeout(() => setPasoAnalisis("Extrayendo etiquetas OpenGraph y oEmbed..."), 300);
			setTimeout(() => setPasoAnalisis("Generando previsualización HD de la portada..."), 650);
			const resp = await fetch(`/api/analizar-url?url=${encodeURIComponent(enlaceLimpio)}`);
			let resultado;
			if (resp.ok) resultado = await resp.json();
			else {
				const esYoutube = enlaceLimpio.includes("youtube.com") || enlaceLimpio.includes("youtu.be");
				const match = enlaceLimpio.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
				const id = match ? match[1] : "";
				resultado = {
					tipo: esYoutube ? "youtube" : "noticia",
					enlace: enlaceLimpio,
					titulo: esYoutube ? "Video de YouTube" : "Artículo de Información",
					descripcion: "Contenido audiovisual y de actualidad vinculado al Observatorio.",
					imagen: id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=1200&q=80",
					fuenteOCanal: new URL(enlaceLimpio).hostname.replace(/^www\./, ""),
					categoria: esYoutube ? "Audiovisual" : "Actualidad",
					duracionOLectura: esYoutube ? "Video HD" : "4 min de lectura"
				};
			}
			setDatosAnalizados(resultado);
			setTipo(resultado.tipo);
			setTitulo(resultado.titulo);
			setDescripcion(resultado.descripcion);
			setImagen(resultado.imagen || "");
			setFuenteOCanal(resultado.fuenteOCanal || "");
			setCategoria(resultado.categoria || "Actualidad");
			setDuracionOLectura(resultado.duracionOLectura || (resultado.tipo === "youtube" ? "Video HD" : "4 min de lectura"));
			toast.success("Enlace analizado exitosamente", { description: `Se obtuvieron los metadatos de ${resultado.fuenteOCanal || "la web"}.` });
		} catch {
			toast.danger("Error de análisis", { description: "No se pudieron obtener automáticamente los metadatos. Puedes completarlos en el formulario." });
		} finally {
			setAnalizando(false);
			setPasoAnalisis("");
		}
	};
	const manejarSubmit = async (e) => {
		e.preventDefault();
		if (!titulo.trim() || !url.trim()) {
			toast.danger("Campos requeridos", { description: "Por favor ingresa la URL y el título del contenido." });
			return;
		}
		setGuardando(true);
		try {
			const resp = await fetch("/api/contenido-feed", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					tipo,
					enlace: url.trim(),
					titulo: titulo.trim(),
					descripcion: descripcion.trim(),
					imagen: imagen.trim() || null,
					fuenteOCanal: fuenteOCanal.trim() || null,
					categoria: categoria.trim() || null,
					duracionOLectura: duracionOLectura.trim() || null,
					estado
				})
			});
			if (!resp.ok) {
				const errorData = await resp.json().catch(() => ({}));
				throw new Error(errorData.error || "No se pudo guardar el contenido.");
			}
			toast.success("Contenido publicado con éxito", { description: `"${titulo}" ha sido guardado y publicado en el feed.` });
			setTimeout(() => {
				window.location.href = "/dashboard/contenido-feed";
			}, 1e3);
		} catch (err) {
			toast.danger("Error al guardar", { description: err.message || "Ocurrió un error inesperado al guardar." });
			setGuardando(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col w-full gap-8 max-w-6xl mx-auto",
		children: [
			/* @__PURE__ */ jsx(Toast.Provider, { placement: "top" }),
			/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("a", {
				href: "/dashboard/contenido-feed",
				className: "group inline-flex items-center gap-1.5 text-xs font-semibold text-[#787774] hover:text-[#0064c1] transition-colors cursor-pointer",
				children: [/* @__PURE__ */ jsx(AltArrowLeftIcon, {
					size: 16,
					strokeWidth: 2,
					className: "transition-transform duration-200 group-hover:-translate-x-1"
				}), /* @__PURE__ */ jsx("span", { children: "Volver a Contenido Feed" })]
			}) }),
			/* @__PURE__ */ jsxs("header", {
				className: "flex flex-col gap-2 pb-6 border-b border-black/[0.06]",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]",
						children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-[#0064c1]" }), "Carga Inteligente"]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "m-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-tight mix-blend-multiply opacity-95",
						children: "Cargar Nuevo Enlace al Feed"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "m-0 text-sm text-[#787774] font-medium tracking-tight",
						children: "Ingresa el link de una noticia o video de YouTube. Nuestro motor extraerá automáticamente la portada, título, descripción y fuente para previsualizarlo al instante."
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "p-6 md:p-8 rounded-[32px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md flex flex-col gap-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "text-xs font-bold uppercase tracking-wider text-[#0064c1] flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(LinkRoundIcon, {
								size: 16,
								strokeWidth: 2
							}), "URL de la Noticia o Video de YouTube"]
						}), datosAnalizados && /* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 animate-rise",
							children: [/* @__PURE__ */ jsx(CheckCircleIcon, {
								size: 14,
								strokeWidth: 2
							}), "Metadatos listos"]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "relative flex-1 w-full",
							children: /* @__PURE__ */ jsx("input", {
								type: "url",
								value: url,
								onChange: (e) => setUrl(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										analizarEnlace(url);
									}
								},
								placeholder: "Pega aquí la URL (ej: https://www.eltiempo.com/... o https://youtube.com/...)",
								className: "w-full px-4 py-3 rounded-2xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] transition-all font-mono"
							})
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							disabled: analizando || !url.trim() || guardando,
							onClick: () => analizarEnlace(url),
							className: `group/btn relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-semibold tracking-[-0.01em] transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap ${analizando || !url.trim() || guardando ? "bg-black/10 text-black/30 cursor-not-allowed" : "text-white active:scale-95"}`,
							style: !analizando && url.trim() && !guardando ? {
								backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
								boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
							} : {},
							children: analizando ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", { className: "h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" }), /* @__PURE__ */ jsx("span", { children: "Analizando enlace..." })] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(StarsMinimalisticIcon, {
								size: 16,
								strokeWidth: 2
							}), /* @__PURE__ */ jsx("span", { children: "Analizar metadatos" })] })
						})]
					}),
					analizando && /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-xs font-semibold text-[#0064c1] bg-[#0064c1]/[0.08] px-3.5 py-2 rounded-xl border border-[#0064c1]/15 animate-pulse",
						children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-[#0064c1]" }), /* @__PURE__ */ jsx("span", { children: pasoAnalisis || "Analizando el enlace..." })]
					})
				]
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: manejarSubmit,
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-7 flex flex-col gap-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 pb-2 border-b border-black/[0.05]",
								children: [/* @__PURE__ */ jsx("span", {
									className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
									children: "1"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
									children: "Tipo y Clasificación"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-3 text-xs",
								children: [/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => setTipo("noticia"),
									className: `flex items-center justify-center gap-2.5 py-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${tipo === "noticia" ? "bg-[#0064c1]/10 border-[#0064c1] text-[#0064c1] shadow-xs" : "border-black/10 bg-black/[0.02] text-[#787774] hover:bg-black/[0.04]"}`,
									children: [/* @__PURE__ */ jsx(NotesIcon, {
										size: 18,
										strokeWidth: 2
									}), /* @__PURE__ */ jsx("span", { children: "Noticia / Artículo" })]
								}), /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => setTipo("youtube"),
									className: `flex items-center justify-center gap-2.5 py-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${tipo === "youtube" ? "bg-red-500/10 border-red-500 text-red-600 shadow-xs" : "border-black/10 bg-black/[0.02] text-[#787774] hover:bg-black/[0.04]"}`,
									children: [/* @__PURE__ */ jsx(VideocameraIcon, {
										size: 18,
										strokeWidth: 2
									}), /* @__PURE__ */ jsx("span", { children: "Video de YouTube" })]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4 pt-2",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 pb-2 border-b border-black/[0.05]",
									children: [/* @__PURE__ */ jsx("span", {
										className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
										children: "2"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
										children: "Detalles del Contenido"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["Título de la publicación:", /* @__PURE__ */ jsx("input", {
										type: "text",
										value: titulo,
										onChange: (e) => setTitulo(e.target.value),
										placeholder: "Título extraído automáticamente...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]",
										required: true
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["Descripción o resumen del contenido:", /* @__PURE__ */ jsx("textarea", {
										rows: 3,
										value: descripcion,
										onChange: (e) => setDescripcion(e.target.value),
										placeholder: "Resumen o bajada de la publicación...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] resize-none leading-relaxed"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1.5 font-semibold text-[#0a0a0a]",
										children: ["Fuente o Canal:", /* @__PURE__ */ jsx("input", {
											type: "text",
											value: fuenteOCanal,
											onChange: (e) => setFuenteOCanal(e.target.value),
											placeholder: "Ej. El Tiempo / Canal Oficial",
											className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]"
										})]
									}), /* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1.5 font-semibold text-[#0a0a0a]",
										children: ["Categoría temática:", /* @__PURE__ */ jsx("input", {
											type: "text",
											value: categoria,
											onChange: (e) => setCategoria(e.target.value),
											placeholder: "Ej. Actualidad, Sostenibilidad...",
											className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]"
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4 pt-2",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 pb-2 border-b border-black/[0.05]",
									children: [/* @__PURE__ */ jsx("span", {
										className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
										children: "3"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
										children: "Multimedia y Publicación"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["URL de imagen de portada / miniatura HD:", /* @__PURE__ */ jsx("input", {
										type: "url",
										value: imagen,
										onChange: (e) => setImagen(e.target.value),
										placeholder: "https://...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] font-mono text-[0.75rem]"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between p-4 rounded-2xl bg-black/[0.02] border border-black/[0.06]",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold text-[#0a0a0a]",
											children: "Estado del contenido"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[0.72rem] text-[#787774]",
											children: estado === "Publicado" ? "Se visualizará inmediatamente en el carrusel del Dashboard" : "Permanecerá como borrador interno"
										})]
									}), /* @__PURE__ */ jsxs("select", {
										value: estado,
										onChange: (e) => setEstado(e.target.value),
										className: "px-3.5 py-2 rounded-xl border border-black/10 bg-white text-xs font-bold text-[#0a0a0a] outline-none focus:border-[#0064c1] cursor-pointer",
										children: [/* @__PURE__ */ jsx("option", {
											value: "Publicado",
											children: "Publicado"
										}), /* @__PURE__ */ jsx("option", {
											value: "Borrador",
											children: "Borrador"
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-3 pt-6 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("a", {
								href: "/dashboard/contenido-feed",
								className: "px-5 py-2.5 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: guardando,
								className: `group/btn relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-white text-xs font-semibold tracking-[-0.01em] transition-all duration-300 active:scale-[0.985] shadow-sm ${guardando ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`,
								style: {
									backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
									boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
								},
								children: guardando ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", { className: "h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" }), /* @__PURE__ */ jsx("span", {
									className: "relative z-10",
									children: "Guardando en base de datos..."
								})] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
									className: "relative z-10",
									children: "Guardar y publicar en Feed"
								}), /* @__PURE__ */ jsx(ArrowRightIcon, {
									size: 14,
									strokeWidth: 2,
									className: "relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5"
								})] })
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-5 flex flex-col gap-4 sticky top-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-between pb-2 border-b border-black/[0.05]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
								children: "✓"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
								children: "Previsualización Contenido"
							})]
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative flex flex-col justify-between rounded-[32px] p-6 bg-white/95 border border-white/80 shadow-[0_24px_50px_-18px_rgba(9,60,120,0.18),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md overflow-hidden group/card",
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute inset-x-8 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0064c1]/50 to-transparent pointer-events-none" }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between pb-3 border-b border-black/[0.06]",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ jsx("span", {
												className: "grid h-9 w-9 place-items-center rounded-xl text-white shadow-xs",
												style: {
													backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
													boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6)"
												},
												children: tipo === "noticia" ? /* @__PURE__ */ jsx(NotesIcon, {
													size: 18,
													strokeWidth: 1.8
												}) : /* @__PURE__ */ jsx(VideocameraIcon, {
													size: 18,
													strokeWidth: 1.8
												})
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#0064c1]",
													children: tipo === "noticia" ? "Novedades" : "Para ver y aprender"
												}), /* @__PURE__ */ jsx("h4", {
													className: "m-0 text-sm font-bold text-[#0a0a0a] tracking-tight",
													children: tipo === "noticia" ? "News Feed" : "YouTube Feed"
												})]
											})]
										}), /* @__PURE__ */ jsx("span", {
											className: "font-mono text-[0.7rem] font-semibold text-[#787774] bg-black/[0.04] px-2.5 py-0.5 rounded-full",
											children: "01 / 01"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-black/10 group/img",
										children: [
											imagen ? /* @__PURE__ */ jsx("img", {
												src: imagen,
												alt: titulo || "Portada",
												className: "w-full h-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-105"
											}) : /* @__PURE__ */ jsxs("div", {
												className: "w-full h-full flex flex-col items-center justify-center gap-2 text-white/40",
												children: [/* @__PURE__ */ jsx(GalleryIcon, {
													size: 32,
													strokeWidth: 1.5
												}), /* @__PURE__ */ jsx("span", {
													className: "text-xs font-medium",
													children: "Ingresa un enlace para cargar foto"
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[0.7rem] font-bold shadow-xs",
												children: [tipo === "noticia" ? /* @__PURE__ */ jsx(NotesIcon, {
													size: 12,
													strokeWidth: 2
												}) : /* @__PURE__ */ jsx(PlayIcon, {
													size: 12,
													strokeWidth: 2
												}), /* @__PURE__ */ jsx("span", { children: fuenteOCanal || (tipo === "noticia" ? "Sitio Web" : "Canal YouTube") })]
											}),
											/* @__PURE__ */ jsx("div", {
												className: "absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#0064c1] text-white text-[0.65rem] font-bold shadow-xs",
												children: categoria || "Actualidad"
											}),
											tipo === "youtube" && /* @__PURE__ */ jsx("div", {
												className: "absolute inset-0 flex items-center justify-center pointer-events-none",
												children: /* @__PURE__ */ jsx("div", {
													className: "grid h-12 w-12 place-items-center rounded-full bg-red-600/90 text-white shadow-lg backdrop-blur-xs",
													children: /* @__PURE__ */ jsx(PlayIcon, {
														size: 20,
														strokeWidth: 2
													})
												})
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "m-0 text-base font-bold text-[#0a0a0a] tracking-tight line-clamp-2 leading-snug",
											children: titulo || "El título del artículo o video aparecerá en este espacio"
										}), /* @__PURE__ */ jsx("p", {
											className: "m-0 text-xs text-[#787774] font-medium line-clamp-3 leading-relaxed",
											children: descripcion || "La descripción y resumen extraídos se visualizarán de forma atractiva en esta sección de la tarjeta."
										})]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "pt-4 border-t border-black/[0.06] flex items-center justify-between gap-3 mt-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5 text-xs text-[#787774] font-medium",
									children: [/* @__PURE__ */ jsx(ClockCircleIcon, {
										size: 14,
										strokeWidth: 1.8,
										className: "text-[#0064c1]"
									}), /* @__PURE__ */ jsx("span", {
										className: "font-mono text-[0.72rem]",
										children: duracionOLectura
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "group/btn relative inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs font-semibold tracking-[-0.01em] shadow-sm pointer-events-none",
									style: {
										backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
										boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
									},
									children: [/* @__PURE__ */ jsx("span", {
										className: "relative z-10",
										children: tipo === "noticia" ? "Leer noticia completa" : "Ver video en YouTube"
									}), /* @__PURE__ */ jsx(ArrowRightIcon, {
										size: 12,
										strokeWidth: 2,
										className: "relative z-10"
									})]
								})]
							})
						]
					})]
				})]
			})
		]
	});
};
//#endregion
//#region src/modules/contenido-feed/components/FormularioEditarFeed.tsx
var FormularioEditarFeed = ({ item }) => {
	const [tipo, setTipo] = useState(item.tipo);
	const [titulo, setTitulo] = useState(item.titulo);
	const [descripcion, setDescripcion] = useState(item.descripcion);
	const [imagen, setImagen] = useState(item.imagen || "");
	const [fuenteOCanal, setFuenteOCanal] = useState(item.fuenteOCanal || "");
	const [categoria, setCategoria] = useState(item.categoria || "Actualidad");
	const [enlace, setEnlace] = useState(item.enlace);
	const [duracionOLectura, setDuracionOLectura] = useState(item.duracionOLectura || (item.tipo === "youtube" ? "Video HD" : "4 min de lectura"));
	const [estado, setEstado] = useState(item.estado);
	const [guardando, setGuardando] = useState(false);
	const manejarSubmit = async (e) => {
		e.preventDefault();
		if (!titulo.trim() || !enlace.trim()) {
			toast.danger("Campos requeridos", { description: "Por favor completa el título y enlace del contenido." });
			return;
		}
		setGuardando(true);
		try {
			const resp = await fetch(`/api/contenido-feed/${item.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					tipo,
					enlace: enlace.trim(),
					titulo: titulo.trim(),
					descripcion: descripcion.trim(),
					imagen: imagen.trim() || null,
					fuenteOCanal: fuenteOCanal.trim() || null,
					categoria: categoria.trim() || null,
					duracionOLectura: duracionOLectura.trim() || null,
					estado
				})
			});
			if (!resp.ok) {
				const errorData = await resp.json().catch(() => ({}));
				throw new Error(errorData.error || "No se pudo actualizar el contenido.");
			}
			toast.success("Feed actualizado exitosamente", { description: `Los cambios en "${titulo}" se han guardado correctamente.` });
			setTimeout(() => {
				window.location.href = "/dashboard/contenido-feed";
			}, 1e3);
		} catch (err) {
			toast.danger("Error al actualizar", { description: err.message || "Ocurrió un error inesperado al actualizar." });
			setGuardando(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col w-full gap-8 max-w-6xl mx-auto",
		children: [
			/* @__PURE__ */ jsx(Toast.Provider, { placement: "top" }),
			/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("a", {
				href: "/dashboard/contenido-feed",
				className: "group inline-flex items-center gap-1.5 text-xs font-semibold text-[#787774] hover:text-[#0064c1] transition-colors cursor-pointer",
				children: [/* @__PURE__ */ jsx(AltArrowLeftIcon, {
					size: 16,
					strokeWidth: 2,
					className: "transition-transform duration-200 group-hover:-translate-x-1"
				}), /* @__PURE__ */ jsx("span", { children: "Volver a Contenido Feed" })]
			}) }),
			/* @__PURE__ */ jsxs("header", {
				className: "flex flex-col gap-2 pb-6 border-b border-black/[0.06]",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]",
						children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-[#0064c1]" }), "Edición de Publicación"]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "m-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-tight mix-blend-multiply opacity-95",
						children: "Editar Contenido del Feed"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "m-0 text-sm text-[#787774] font-medium tracking-tight",
						children: "Actualiza los datos, portada o estado de visibilidad. Los cambios se reflejarán inmediatamente en la vista pública."
					})
				]
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: manejarSubmit,
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-7 flex flex-col gap-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 pb-2 border-b border-black/[0.05]",
									children: [/* @__PURE__ */ jsx("span", {
										className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
										children: "1"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
										children: "Tipo y Enlace Web"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-2 gap-3 text-xs",
									children: [/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => setTipo("noticia"),
										className: `flex items-center justify-center gap-2.5 py-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${tipo === "noticia" ? "bg-[#0064c1]/10 border-[#0064c1] text-[#0064c1] shadow-xs" : "border-black/10 bg-black/[0.02] text-[#787774] hover:bg-black/[0.04]"}`,
										children: [/* @__PURE__ */ jsx(NotesIcon, {
											size: 18,
											strokeWidth: 2
										}), /* @__PURE__ */ jsx("span", { children: "Noticia / Artículo" })]
									}), /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => setTipo("youtube"),
										className: `flex items-center justify-center gap-2.5 py-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${tipo === "youtube" ? "bg-red-500/10 border-red-500 text-red-600 shadow-xs" : "border-black/10 bg-black/[0.02] text-[#787774] hover:bg-black/[0.04]"}`,
										children: [/* @__PURE__ */ jsx(VideocameraIcon, {
											size: 18,
											strokeWidth: 2
										}), /* @__PURE__ */ jsx("span", { children: "Video de YouTube" })]
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx(LinkRoundIcon, {
											size: 14,
											className: "text-[#0064c1]"
										}), "URL del enlace:"]
									}), /* @__PURE__ */ jsx("input", {
										type: "url",
										value: enlace,
										onChange: (e) => setEnlace(e.target.value),
										placeholder: "https://...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] font-mono",
										required: true
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4 pt-2",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 pb-2 border-b border-black/[0.05]",
									children: [/* @__PURE__ */ jsx("span", {
										className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
										children: "2"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
										children: "Detalles de Publicación"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["Título de la publicación:", /* @__PURE__ */ jsx("input", {
										type: "text",
										value: titulo,
										onChange: (e) => setTitulo(e.target.value),
										placeholder: "Título del contenido...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]",
										required: true
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["Descripción o resumen:", /* @__PURE__ */ jsx("textarea", {
										rows: 3,
										value: descripcion,
										onChange: (e) => setDescripcion(e.target.value),
										placeholder: "Resumen del contenido...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] resize-none leading-relaxed"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1.5 font-semibold text-[#0a0a0a]",
										children: ["Fuente o Canal:", /* @__PURE__ */ jsx("input", {
											type: "text",
											value: fuenteOCanal,
											onChange: (e) => setFuenteOCanal(e.target.value),
											placeholder: "Ej. El Tiempo / Canal Institucional",
											className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]"
										})]
									}), /* @__PURE__ */ jsxs("label", {
										className: "flex flex-col gap-1.5 font-semibold text-[#0a0a0a]",
										children: ["Categoría temática:", /* @__PURE__ */ jsx("input", {
											type: "text",
											value: categoria,
											onChange: (e) => setCategoria(e.target.value),
											placeholder: "Ej. Actualidad, Sostenibilidad...",
											className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1]"
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4 pt-2",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 pb-2 border-b border-black/[0.05]",
									children: [/* @__PURE__ */ jsx("span", {
										className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
										children: "3"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
										children: "Portada y Visibilidad"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex flex-col gap-1.5 text-xs font-semibold text-[#0a0a0a]",
									children: ["URL de imagen de portada / miniatura:", /* @__PURE__ */ jsx("input", {
										type: "url",
										value: imagen,
										onChange: (e) => setImagen(e.target.value),
										placeholder: "https://...",
										className: "px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-xs font-medium text-[#0a0a0a] outline-none focus:border-[#0064c1] font-mono text-[0.75rem]"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between p-4 rounded-2xl bg-black/[0.02] border border-black/[0.06]",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-xs font-bold text-[#0a0a0a]",
											children: "Estado del contenido"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[0.72rem] text-[#787774]",
											children: estado === "Publicado" ? "Se visualiza en el carrusel del Dashboard" : "Oculto como borrador interno"
										})]
									}), /* @__PURE__ */ jsxs("select", {
										value: estado,
										onChange: (e) => setEstado(e.target.value),
										className: "px-3.5 py-2 rounded-xl border border-black/10 bg-white text-xs font-bold text-[#0a0a0a] outline-none focus:border-[#0064c1] cursor-pointer",
										children: [/* @__PURE__ */ jsx("option", {
											value: "Publicado",
											children: "Publicado"
										}), /* @__PURE__ */ jsx("option", {
											value: "Borrador",
											children: "Borrador"
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-3 pt-6 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("a", {
								href: "/dashboard/contenido-feed",
								className: "px-5 py-2.5 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: guardando,
								className: `group/btn relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-white text-xs font-semibold tracking-[-0.01em] transition-all duration-300 active:scale-[0.985] shadow-sm ${guardando ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`,
								style: {
									backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
									boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
								},
								children: guardando ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", { className: "h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" }), /* @__PURE__ */ jsx("span", {
									className: "relative z-10",
									children: "Guardando cambios..."
								})] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
									className: "relative z-10",
									children: "Guardar cambios"
								}), /* @__PURE__ */ jsx(ArrowRightIcon, {
									size: 14,
									strokeWidth: 2,
									className: "relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5"
								})] })
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-5 flex flex-col gap-4 sticky top-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-between pb-2 border-b border-black/[0.05]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold",
								children: "✓"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xs font-bold text-[#0a0a0a] uppercase tracking-wider",
								children: "Previsualización Actualizada"
							})]
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative flex flex-col justify-between rounded-[32px] p-6 bg-white/95 border border-white/80 shadow-[0_24px_50px_-18px_rgba(9,60,120,0.18),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md overflow-hidden group/card",
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute inset-x-8 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0064c1]/50 to-transparent pointer-events-none" }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between pb-3 border-b border-black/[0.06]",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ jsx("span", {
												className: "grid h-9 w-9 place-items-center rounded-xl text-white shadow-xs",
												style: {
													backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
													boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6)"
												},
												children: tipo === "noticia" ? /* @__PURE__ */ jsx(NotesIcon, {
													size: 18,
													strokeWidth: 1.8
												}) : /* @__PURE__ */ jsx(VideocameraIcon, {
													size: 18,
													strokeWidth: 1.8
												})
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#0064c1]",
													children: tipo === "noticia" ? "Novedades" : "Para ver y aprender"
												}), /* @__PURE__ */ jsx("h4", {
													className: "m-0 text-sm font-bold text-[#0a0a0a] tracking-tight",
													children: tipo === "noticia" ? "News Feed" : "YouTube Feed"
												})]
											})]
										}), /* @__PURE__ */ jsx("span", {
											className: "font-mono text-[0.7rem] font-semibold text-[#787774] bg-black/[0.04] px-2.5 py-0.5 rounded-full",
											children: "01 / 01"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-black/10 group/img",
										children: [
											imagen ? /* @__PURE__ */ jsx("img", {
												src: imagen,
												alt: titulo || "Portada",
												className: "w-full h-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-105"
											}) : /* @__PURE__ */ jsxs("div", {
												className: "w-full h-full flex flex-col items-center justify-center gap-2 text-white/40",
												children: [/* @__PURE__ */ jsx(GalleryIcon, {
													size: 32,
													strokeWidth: 1.5
												}), /* @__PURE__ */ jsx("span", {
													className: "text-xs font-medium",
													children: "Sin imagen"
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[0.7rem] font-bold shadow-xs",
												children: [tipo === "noticia" ? /* @__PURE__ */ jsx(NotesIcon, {
													size: 12,
													strokeWidth: 2
												}) : /* @__PURE__ */ jsx(PlayIcon, {
													size: 12,
													strokeWidth: 2
												}), /* @__PURE__ */ jsx("span", { children: fuenteOCanal || (tipo === "noticia" ? "Sitio Web" : "Canal YouTube") })]
											}),
											/* @__PURE__ */ jsx("div", {
												className: "absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#0064c1] text-white text-[0.65rem] font-bold shadow-xs",
												children: categoria || "Actualidad"
											}),
											tipo === "youtube" && /* @__PURE__ */ jsx("div", {
												className: "absolute inset-0 flex items-center justify-center pointer-events-none",
												children: /* @__PURE__ */ jsx("div", {
													className: "grid h-12 w-12 place-items-center rounded-full bg-red-600/90 text-white shadow-lg backdrop-blur-xs",
													children: /* @__PURE__ */ jsx(PlayIcon, {
														size: 20,
														strokeWidth: 2
													})
												})
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "m-0 text-base font-bold text-[#0a0a0a] tracking-tight line-clamp-2 leading-snug",
											children: titulo || "Título del contenido"
										}), /* @__PURE__ */ jsx("p", {
											className: "m-0 text-xs text-[#787774] font-medium line-clamp-3 leading-relaxed",
											children: descripcion || "Descripción del contenido..."
										})]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "pt-4 border-t border-black/[0.06] flex items-center justify-between gap-3 mt-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5 text-xs text-[#787774] font-medium",
									children: [/* @__PURE__ */ jsx(ClockCircleIcon, {
										size: 14,
										strokeWidth: 1.8,
										className: "text-[#0064c1]"
									}), /* @__PURE__ */ jsx("span", {
										className: "font-mono text-[0.72rem]",
										children: duracionOLectura
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "group/btn relative inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs font-semibold tracking-[-0.01em] shadow-sm pointer-events-none",
									style: {
										backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
										boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
									},
									children: [/* @__PURE__ */ jsx("span", {
										className: "relative z-10",
										children: tipo === "noticia" ? "Leer noticia completa" : "Ver video en YouTube"
									}), /* @__PURE__ */ jsx(ArrowRightIcon, {
										size: 12,
										strokeWidth: 2,
										className: "relative z-10"
									})]
								})]
							})
						]
					})]
				})]
			})
		]
	});
};
//#endregion
export { FormularioCargarFeed as n, $$ContenidoAdminFeed as r, FormularioEditarFeed as t };
