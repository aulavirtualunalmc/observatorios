import { E as maybeRenderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent } from "./sequence_BfnLQ3FV.mjs";
import { t as createComponent } from "./compiler_DBHiCWwt.mjs";
import { r as renderScript, t as $$SkyShader } from "./SkyShader_DL8DbueI.mjs";
import { t as clienteSupabase } from "./supabase_SG97JCHu.mjs";
import { t as $$Input } from "./Input_CKRg_GP4.mjs";
import { n as semestresOpciones, r as $$CustomSelect, t as mesesOpciones } from "./opciones-fecha_B6JK4Stb.mjs";
import { useEffect, useMemo, useState } from "react";
import bcrypt from "bcryptjs";
import { AltArrowLeftIcon, AltArrowRightIcon, ArrowRightIcon, BookIcon, CalendarIcon, CalendarMinimalisticIcon, CardIcon, CloseCircleIcon, DangerTriangleIcon, EyeClosedIcon, EyeIcon, LetterIcon, LockPasswordIcon, Pen2Icon, PhoneIcon, RefreshIcon, RoundedMagnifierZoomInIcon, ShieldUserIcon, TrashBinMinimalisticIcon, UserIcon, UserPlusIcon, UsersGroupRoundedIcon } from "@solar-icons/react/outline";
import { Checkbox, Table, Toast, toast } from "@heroui/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { createPortal } from "react-dom";
//#region src/modules/usuarios/services/usuarios.service.ts
var TABLA = "usuarios_estudiantes";
/**
* Servicio encargado de gestionar los usuarios estudiantes registrados en la Red de Aprendizaje
*/
var ServicioUsuarios = class {
	/**
	* Obtiene todos los estudiantes registrados desde Supabase
	*/
	static async obtenerUsuarios() {
		try {
			const registros = await clienteSupabase.consultar(TABLA, "select=*&order=created_at.desc");
			if (registros && registros.length > 0) return registros.map((item) => ({
				id: item.id,
				nombre: item.nombre || "Sin nombre",
				email: item.email || "",
				cedula: item.cedula || "",
				telefono: item.telefono || "",
				fechaNacimiento: item.fecha_nacimiento || "",
				universidad: item.universidad || "Sin universidad",
				carrera: item.carrera || "Sin carrera",
				semestre: item.semestre ? `${item.semestre}° Semestre` : "No especificado",
				fechaRegistro: item.created_at ? item.created_at.split("T")[0] : "Reciente",
				estado: item.estado || "Activo"
			}));
			return [];
		} catch (error) {
			console.error("Error al obtener usuarios estudiantes:", error);
			return [];
		}
	}
	/**
	* Obtiene un estudiante por su ID
	*/
	static async obtenerUsuarioPorId(id) {
		try {
			const registros = await clienteSupabase.consultar(TABLA, `id=eq.${id}&select=*`);
			if (registros && registros.length > 0) {
				const item = registros[0];
				return {
					id: item.id,
					nombre: item.nombre || "Sin nombre",
					email: item.email || "",
					cedula: item.cedula || "",
					telefono: item.telefono || "",
					fechaNacimiento: item.fecha_nacimiento || "",
					universidad: item.universidad || "Sin universidad",
					carrera: item.carrera || "Sin carrera",
					semestre: item.semestre || "",
					fechaRegistro: item.created_at ? item.created_at.split("T")[0] : "Reciente",
					estado: item.estado || "Activo"
				};
			}
			return;
		} catch (error) {
			console.error(`Error al obtener usuario ${id}:`, error);
			return;
		}
	}
	/**
	* Elimina un usuario estudiante
	*/
	static async eliminarUsuario(id) {
		try {
			const res = await fetch(`/api/usuarios/${id}`, { method: "DELETE" });
			const data = await res.json();
			return {
				exito: res.ok,
				mensaje: data.error || data.mensaje
			};
		} catch (error) {
			return {
				exito: false,
				mensaje: error.message
			};
		}
	}
	/**
	* Elimina múltiples usuarios estudiantes
	*/
	static async eliminarUsuariosMasivo(ids) {
		try {
			const res = await fetch("/api/usuarios", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ids })
			});
			const data = await res.json();
			return {
				exito: res.ok,
				mensaje: data.error || data.mensaje
			};
		} catch (error) {
			return {
				exito: false,
				mensaje: error.message
			};
		}
	}
};
//#endregion
//#region src/modules/usuarios/components/TablaUsuarios.tsx
var FILAS_POR_PAGINA$1 = 10;
var TablaUsuarios = ({ usuarios: usuariosIniciales }) => {
	const [montado, setMontado] = useState(false);
	const [listaUsuarios, setListaUsuarios] = useState(usuariosIniciales);
	const [selectedKeys, setSelectedKeys] = useState(/* @__PURE__ */ new Set());
	const [busqueda, setBusqueda] = useState("");
	const [filtroEstado, setFiltroEstado] = useState("Todos");
	const [pagina, setPagina] = useState(1);
	const [columnaOrden, setColumnaOrden] = useState("nombre");
	const [direccionOrden, setDireccionOrden] = useState("asc");
	useEffect(() => {
		setMontado(true);
	}, []);
	const [modalMasivoEliminar, setModalMasivoEliminar] = useState(false);
	const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
	const manejarOrden = (campo) => {
		if (columnaOrden === campo) setDireccionOrden(direccionOrden === "asc" ? "desc" : "asc");
		else {
			setColumnaOrden(campo);
			setDireccionOrden("asc");
		}
	};
	const usuariosProcesados = useMemo(() => {
		let resultado = listaUsuarios.filter((u) => {
			if (filtroEstado !== "Todos" && u.estado !== filtroEstado) return false;
			const termino = busqueda.toLowerCase().trim();
			if (!termino) return true;
			return u.nombre.toLowerCase().includes(termino) || u.cedula.includes(termino) || u.carrera.toLowerCase().includes(termino) || u.universidad.toLowerCase().includes(termino) || u.telefono.includes(termino);
		});
		resultado.sort((a, b) => {
			const valorA = a[columnaOrden] || "";
			const valorB = b[columnaOrden] || "";
			const comparacion = valorA.localeCompare(valorB, "es", { numeric: true });
			return direccionOrden === "asc" ? comparacion : -comparacion;
		});
		return resultado;
	}, [
		listaUsuarios,
		busqueda,
		filtroEstado,
		columnaOrden,
		direccionOrden
	]);
	const totalRegistros = usuariosProcesados.length;
	const totalPaginas = Math.max(1, Math.ceil(totalRegistros / FILAS_POR_PAGINA$1));
	const usuariosPaginados = useMemo(() => {
		const inicio = (pagina - 1) * FILAS_POR_PAGINA$1;
		return usuariosProcesados.slice(inicio, inicio + FILAS_POR_PAGINA$1);
	}, [usuariosProcesados, pagina]);
	const inicioRango = totalRegistros === 0 ? 0 : (pagina - 1) * FILAS_POR_PAGINA$1 + 1;
	const finRango = Math.min(pagina * FILAS_POR_PAGINA$1, totalRegistros);
	const idsSeleccionados = useMemo(() => {
		if (selectedKeys === "all") return usuariosProcesados.map((u) => u.id);
		return Array.from(selectedKeys);
	}, [selectedKeys, usuariosProcesados]);
	const totalSeleccionados = idsSeleccionados.length;
	const confirmarEliminacion = async () => {
		if (!usuarioAEliminar) return;
		const idEliminado = usuarioAEliminar.id;
		const nombreEliminado = usuarioAEliminar.nombre;
		setListaUsuarios((prev) => prev.filter((u) => u.id !== idEliminado));
		setUsuarioAEliminar(null);
		const res = await ServicioUsuarios.eliminarUsuario(idEliminado);
		if (res.exito) toast.success("Usuario eliminado", { description: `Se eliminó a "${nombreEliminado}" correctamente.` });
		else toast.danger("Error al eliminar", { description: res.mensaje || "No se pudo eliminar el estudiante." });
	};
	const confirmarEliminacionMasiva = async () => {
		if (idsSeleccionados.length === 0) return;
		const totalAfectados = idsSeleccionados.length;
		const idsCopia = [...idsSeleccionados];
		setListaUsuarios((prev) => prev.filter((u) => !idsSeleccionados.includes(u.id)));
		setSelectedKeys(/* @__PURE__ */ new Set());
		setModalMasivoEliminar(false);
		const res = await ServicioUsuarios.eliminarUsuariosMasivo(idsCopia);
		if (res.exito) toast.success("Usuarios eliminados", { description: `Se eliminaron ${totalAfectados} usuarios exitosamente.` });
		else toast.danger("Error al eliminar", { description: res.mensaje || "No se pudieron eliminar los estudiantes seleccionados." });
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
								placeholder: "Buscar por nombre, cédula, carrera...",
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
						className: "inline-flex p-1 rounded-full bg-black/[0.04] border border-black/[0.04]",
						children: [
							"Todos",
							"Activo",
							"Pendiente",
							"Inactivo"
						].map((tab) => /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => {
								setFiltroEstado(tab);
								setPagina(1);
							},
							className: `px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${filtroEstado === tab ? "bg-white text-[#0a0a0a] shadow-xs" : "text-[#787774] hover:text-[#0a0a0a]"}`,
							children: tab
						}, tab))
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex items-center gap-2",
					children: totalSeleccionados > 0 ? /* @__PURE__ */ jsxs("div", {
						className: "inline-flex items-center gap-1.5 p-1 rounded-full bg-black/[0.04] backdrop-blur-md animate-rise",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-xs font-medium text-[#787774] px-2.5",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-semibold font-mono text-[#0a0a0a]",
									children: totalSeleccionados
								}),
								" ",
								totalSeleccionados === 1 ? "seleccionado" : "seleccionados"
							]
						}), /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => setModalMasivoEliminar(true),
							className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-red-700 bg-white hover:bg-red-600 hover:text-white shadow-xs active:scale-95 transition-all cursor-pointer",
							children: [/* @__PURE__ */ jsx(TrashBinMinimalisticIcon, {
								size: 14,
								strokeWidth: 2
							}), "Eliminar seleccionados"]
						})]
					}) : /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold text-[#787774]",
							children: "Registros totales:"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-mono text-xs font-bold text-[#0064c1] bg-[#0064c1]/10 px-3 py-1 rounded-full",
							children: totalRegistros
						})]
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "overflow-hidden rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md",
				children: [usuariosProcesados.length === 0 ? /* @__PURE__ */ jsxs("div", {
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
							children: ["No hay usuarios registrados ", filtroEstado !== "Todos" ? `en "${filtroEstado.toLowerCase()}"` : ""]
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-[#787774] m-0 max-w-sm",
							children: busqueda ? "No se encontraron usuarios que coincidan con los términos de búsqueda." : `Actualmente no hay usuarios registrados con el estado "${filtroEstado}".`
						})]
					})]
				}) : /* @__PURE__ */ jsx(Table, { children: /* @__PURE__ */ jsx(Table.ScrollContainer, {
					className: "custom-scrollbar",
					children: /* @__PURE__ */ jsxs(Table.Content, {
						"aria-label": "Tabla de usuarios registrados",
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
									children: [/* @__PURE__ */ jsx("span", { children: "Estudiante / Usuario" }), /* @__PURE__ */ jsx("span", {
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
									children: [/* @__PURE__ */ jsx("span", { children: "Programa Académico" }), /* @__PURE__ */ jsx("span", {
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
								children: "Acciones"
							})
						] }), /* @__PURE__ */ jsx(Table.Body, { children: usuariosPaginados.map((user) => /* @__PURE__ */ jsxs(Table.Row, {
							id: user.id,
							className: "transition-colors hover:bg-black/[0.02] group/row",
							children: [
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4 pe-0",
									children: /* @__PURE__ */ jsx(Checkbox, {
										"aria-label": `Seleccionar a ${user.nombre}`,
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
											children: user.nombre.charAt(0).toUpperCase()
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-bold text-[#0a0a0a] group-hover/row:text-[#0064c1] transition-colors",
												children: user.nombre
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-[0.7rem] text-[#787774]",
												children: ["Registro: ", user.fechaRegistro]
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
												children: ["CC: ", user.cedula]
											}),
											user.email && /* @__PURE__ */ jsx("span", {
												className: "text-[0.72rem] text-[#0064c1] font-medium truncate max-w-[190px]",
												title: user.email,
												children: user.email
											}),
											/* @__PURE__ */ jsxs("span", {
												className: "text-[0.72rem] text-[#787774]",
												children: ["Tel: ", user.telefono]
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
											children: user.carrera
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[0.7rem] font-medium text-[#0064c1] bg-[#0064c1]/[0.08] px-2 py-0.5 rounded-md w-fit",
											children: user.semestre
										})]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4",
									children: /* @__PURE__ */ jsx("span", {
										className: "text-[#2f3437] font-medium",
										children: user.universidad
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-4 text-center",
									children: /* @__PURE__ */ jsxs("span", {
										className: `inline-flex items-center gap-1 text-[0.7rem] font-bold px-2.5 py-1 rounded-full ${user.estado === "Activo" ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20" : user.estado === "Pendiente" ? "bg-amber-500/10 text-amber-700 border border-amber-500/20" : "bg-black/[0.06] text-[#787774] border border-black/[0.08]"}`,
										children: [/* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full ${user.estado === "Activo" ? "bg-emerald-500" : user.estado === "Pendiente" ? "bg-amber-500" : "bg-[#787774]"}` }), user.estado]
									})
								}),
								/* @__PURE__ */ jsx(Table.Cell, {
									className: "py-4 px-5 text-right relative",
									children: /* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-center gap-1.5 relative",
										children: [/* @__PURE__ */ jsx("a", {
											href: `/dashboard/usuarios/editar/${user.id}`,
											className: "grid h-8 w-8 place-items-center rounded-lg text-[#787774] hover:text-[#0064c1] hover:bg-[#0064c1]/10 transition-colors cursor-pointer",
											title: "Editar usuario en página",
											children: /* @__PURE__ */ jsx(Pen2Icon, {
												size: 16,
												strokeWidth: 1.8
											})
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setUsuarioAEliminar(user),
											className: "grid h-8 w-8 place-items-center rounded-lg text-[#787774] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer",
											title: "Eliminar usuario",
											children: /* @__PURE__ */ jsx(TrashBinMinimalisticIcon, {
												size: 16,
												strokeWidth: 1.8
											})
										})]
									})
								})
							]
						}, user.id)) })]
					})
				}) }), usuariosProcesados.length > 0 && /* @__PURE__ */ jsxs("div", {
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
			usuarioAEliminar && montado && typeof document !== "undefined" && createPortal(/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 animate-rise",
				onClick: (e) => {
					if (e.target === e.currentTarget) setUsuarioAEliminar(null);
				},
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 max-w-sm w-full p-6 rounded-[28px] bg-white border border-black/[0.08] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600 font-bold",
								children: /* @__PURE__ */ jsx(DangerTriangleIcon, {
									size: 22,
									strokeWidth: 2
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col min-w-0",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "m-0 text-base font-bold text-[#0a0a0a]",
									children: "¿Eliminar usuario?"
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-xs text-[#787774] truncate",
									children: [
										usuarioAEliminar.nombre,
										" ",
										usuarioAEliminar.email ? `(${usuarioAEliminar.email})` : `(CC: ${usuarioAEliminar.cedula})`
									]
								})]
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "m-0 text-xs text-[#2f3437] leading-relaxed",
							children: "Esta acción removerá permanentemente al estudiante y sus accesos de la plataforma."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setUsuarioAEliminar(null),
								className: "px-4 py-2 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: confirmarEliminacion,
								className: "px-4 py-2 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-sm cursor-pointer",
								children: "Sí, eliminar"
							})]
						})
					]
				})
			}), document.body),
			modalMasivoEliminar && montado && typeof document !== "undefined" && createPortal(/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-rise",
				onClick: (e) => {
					if (e.target === e.currentTarget) setModalMasivoEliminar(false);
				},
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 max-w-sm w-full p-6 rounded-[28px] bg-white border border-black/[0.08] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600 font-bold",
								children: /* @__PURE__ */ jsx(DangerTriangleIcon, {
									size: 22,
									strokeWidth: 2
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "m-0 text-base font-bold text-[#0a0a0a]",
									children: "¿Eliminar seleccionados?"
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-xs text-[#787774]",
									children: [totalSeleccionados, " usuarios marcados"]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "m-0 text-xs text-[#2f3437] leading-relaxed",
							children: [
								"¿Deseas eliminar permanentemente a los ",
								/* @__PURE__ */ jsxs("strong", { children: [totalSeleccionados, " usuarios seleccionados"] }),
								" del sistema? Esta acción no se puede deshacer."
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setModalMasivoEliminar(false),
								className: "px-4 py-2 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: confirmarEliminacionMasiva,
								className: "px-4 py-2 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-sm cursor-pointer",
								children: "Sí, eliminar grupo"
							})]
						})
					]
				})
			}), document.body)
		]
	});
};
//#endregion
//#region src/modules/usuarios/components/ContenidoUsuarios.astro
var $$ContenidoUsuarios = createComponent(async ($$result, $$props, $$slots) => {
	const usuarios = await ServicioUsuarios.obtenerUsuarios();
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise isolate overflow-x-clip"><!-- Atmósfera superior con SkyShader --><div class="absolute inset-x-0 top-0 h-[360px] -z-10 overflow-hidden pointer-events-none" style="mask-image: linear-gradient(180deg, black 0%, black 45%, transparent 100%); -webkit-mask-image: linear-gradient(180deg, black 0%, black 45%, transparent 100%);">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><div class="flex-1 flex flex-col px-6 md:px-12 pt-10 md:pt-14 pb-16 max-w-7xl w-full mx-auto gap-8"><!-- Encabezado de Gestión de Usuarios --><header class="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]"><div class="flex flex-col gap-2 max-w-2xl"><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]"><span class="h-2 w-2 rounded-full bg-[#0064c1]"></span>Administración &amp; Control</div><h1 class="m-0 text-[clamp(2rem,3.4vw,2.8rem)] font-bold text-[#0a0a0a] tracking-[-0.035em] leading-[1.08] mix-blend-multiply opacity-95">Usuarios Registrados</h1><p class="m-0 text-sm text-[#787774] font-medium tracking-tight">Listado de estudiantes, docentes e investigadores vinculados a la Red de Aprendizaje.</p></div><!-- Botón Registrar Nuevo Usuario --><a href="/dashboard/usuarios/nuevo" class="group/btn relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);">${renderComponent($$result, "UserPlusIcon", UserPlusIcon, {
		"size": 16,
		"strokeWidth": 2,
		"className": "relative z-10"
	})}<span class="relative z-10">Nuevo usuario</span></a></header><!-- Componente Interactivo de Tabla de Usuarios -->${renderComponent($$result, "TablaUsuarios", TablaUsuarios, {
		"client:load": true,
		"usuarios": usuarios,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/usuarios/components/TablaUsuarios.tsx",
		"client:component-export": "default"
	})}</div></div>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/usuarios/components/ContenidoUsuarios.astro", void 0);
//#endregion
//#region src/modules/usuarios/services/usuarios-admin.service.ts
/**
* Servicio para la gestión de usuarios administrativos.
* En el cliente consume los endpoints /api/usuarios-admin (hashing en servidor).
* En el servidor (SSR) interactúa directamente con Supabase y bcryptjs.
*/
var ServicioUsuariosAdmin = class {
	static TABLA = "usuarios_administrativos";
	/**
	* Obtiene todos los usuarios administrativos
	*/
	static async obtenerUsuarios() {
		if (typeof window !== "undefined") try {
			const respuesta = await fetch("/api/usuarios-admin");
			if (!respuesta.ok) throw new Error("Error al obtener usuarios del servidor");
			return await respuesta.json();
		} catch (error) {
			console.error("Error en petición cliente /api/usuarios-admin:", error);
		}
		try {
			return await clienteSupabase.consultar(this.TABLA, "select=*&order=fecha_creacion.desc");
		} catch (error) {
			console.error("Error en SSR al consultar Supabase:", error);
			return [];
		}
	}
	/**
	* Registra un nuevo usuario administrativo con hashing bcrypt garantizado
	*/
	static async crearUsuario(datos) {
		if (typeof window !== "undefined") {
			const respuesta = await fetch("/api/usuarios-admin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(datos)
			});
			if (!respuesta.ok) {
				const errJson = await respuesta.json().catch(() => ({}));
				throw new Error(errJson.error || "No se pudo crear el usuario en el servidor.");
			}
			return await respuesta.json();
		}
		const salt = bcrypt.genSaltSync(10);
		const passwordHash = bcrypt.hashSync(datos.password.trim(), salt);
		const payload = {
			nombre: datos.nombre.trim(),
			email: datos.email.trim().toLowerCase(),
			password_hash: passwordHash,
			rol: datos.rol,
			estado: datos.estado || "Activo",
			ultimo_acceso: "Justo ahora"
		};
		return await clienteSupabase.insertar(this.TABLA, payload);
	}
	/**
	* Actualiza un usuario administrativo
	*/
	static async actualizarUsuario(id, datos) {
		if (typeof window !== "undefined") {
			const respuesta = await fetch(`/api/usuarios-admin/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(datos)
			});
			if (!respuesta.ok) {
				const errJson = await respuesta.json().catch(() => ({}));
				throw new Error(errJson.error || "No se pudo actualizar el usuario en el servidor.");
			}
			return await respuesta.json();
		}
		const payload = {};
		if (datos.nombre !== void 0) payload.nombre = datos.nombre.trim();
		if (datos.email !== void 0) payload.email = datos.email.trim().toLowerCase();
		if (datos.rol !== void 0) payload.rol = datos.rol;
		if (datos.estado !== void 0) payload.estado = datos.estado;
		if (datos.password && datos.password.trim().length > 0) {
			const salt = bcrypt.genSaltSync(10);
			payload.password_hash = bcrypt.hashSync(datos.password.trim(), salt);
		}
		return await clienteSupabase.actualizar(this.TABLA, id, payload);
	}
	/**
	* Elimina un usuario administrativo por ID
	*/
	static async eliminarUsuario(id) {
		if (typeof window !== "undefined") {
			if (!(await fetch(`/api/usuarios-admin/${id}`, { method: "DELETE" })).ok) throw new Error("Error al eliminar usuario del servidor.");
			return true;
		}
		return await clienteSupabase.eliminar(this.TABLA, id);
	}
	/**
	* Elimina un conjunto de usuarios administrativos por IDs
	*/
	static async eliminarUsuariosMasivo(ids) {
		if (typeof window !== "undefined") {
			if (!(await fetch("/api/usuarios-admin", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ids })
			})).ok) throw new Error("Error en eliminación masiva en el servidor.");
			return true;
		}
		return await clienteSupabase.eliminarMasivo(this.TABLA, ids);
	}
};
//#endregion
//#region src/modules/usuarios/components/TablaUsuariosAdmin.tsx
var FILAS_POR_PAGINA = 10;
var TablaUsuariosAdmin = ({ usuarios: usuariosIniciales }) => {
	const [montado, setMontado] = useState(false);
	const [listaUsuarios, setListaUsuarios] = useState(usuariosIniciales);
	const [cargando, setCargando] = useState(false);
	const [guardando, setGuardando] = useState(false);
	useEffect(() => {
		setMontado(true);
		recargarUsuarios();
	}, []);
	const [selectedKeys, setSelectedKeys] = useState(/* @__PURE__ */ new Set());
	const [busqueda, setBusqueda] = useState("");
	const [filtroRol, setFiltroRol] = useState("Todos");
	const [pagina, setPagina] = useState(1);
	const [columnaOrden, setColumnaOrden] = useState("fecha_creacion");
	const [direccionOrden, setDireccionOrden] = useState("desc");
	const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
	const [nuevoNombre, setNuevoNombre] = useState("");
	const [nuevoEmail, setNuevoEmail] = useState("");
	const [nuevoPassword, setNuevoPassword] = useState("");
	const [mostrarPassword, setMostrarPassword] = useState(false);
	const [nuevoRol, setNuevoRol] = useState("Administrador");
	const [errorFormulario, setErrorFormulario] = useState("");
	const [usuarioAEditar, setUsuarioAEditar] = useState(null);
	const [editNombre, setEditNombre] = useState("");
	const [editEmail, setEditEmail] = useState("");
	const [editRol, setEditRol] = useState("Administrador");
	const [editEstado, setEditEstado] = useState("Activo");
	const [editPassword, setEditPassword] = useState("");
	const [mostrarEditPassword, setMostrarEditPassword] = useState(false);
	const [errorEdicion, setErrorEdicion] = useState("");
	const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
	const [modalMasivoEliminar, setModalMasivoEliminar] = useState(false);
	const recargarUsuarios = async () => {
		setCargando(true);
		try {
			const datos = await ServicioUsuariosAdmin.obtenerUsuarios();
			setListaUsuarios(datos);
		} catch (error) {
			console.error("Error al cargar usuarios de Supabase:", error);
		} finally {
			setCargando(false);
		}
	};
	const manejarOrden = (campo) => {
		if (columnaOrden === campo) setDireccionOrden(direccionOrden === "asc" ? "desc" : "asc");
		else {
			setColumnaOrden(campo);
			setDireccionOrden("asc");
		}
	};
	const usuariosProcesados = useMemo(() => {
		let resultado = listaUsuarios.filter((item) => {
			if (filtroRol !== "Todos" && item.rol !== filtroRol) return false;
			const termino = busqueda.toLowerCase().trim();
			if (!termino) return true;
			return item.nombre.toLowerCase().includes(termino) || item.email.toLowerCase().includes(termino) || item.rol.toLowerCase().includes(termino) || item.fecha_creacion?.includes(termino);
		});
		resultado.sort((a, b) => {
			const valorA = a[columnaOrden] || "";
			const valorB = b[columnaOrden] || "";
			const comparacion = valorA.localeCompare(valorB, "es", { numeric: true });
			return direccionOrden === "asc" ? comparacion : -comparacion;
		});
		return resultado;
	}, [
		listaUsuarios,
		busqueda,
		filtroRol,
		columnaOrden,
		direccionOrden
	]);
	const totalRegistros = usuariosProcesados.length;
	const totalPaginas = Math.max(1, Math.ceil(totalRegistros / FILAS_POR_PAGINA));
	const usuariosPaginados = useMemo(() => {
		const inicio = (pagina - 1) * FILAS_POR_PAGINA;
		return usuariosProcesados.slice(inicio, inicio + FILAS_POR_PAGINA);
	}, [usuariosProcesados, pagina]);
	const inicioRango = totalRegistros === 0 ? 0 : (pagina - 1) * FILAS_POR_PAGINA + 1;
	const finRango = Math.min(pagina * FILAS_POR_PAGINA, totalRegistros);
	const idsSeleccionados = useMemo(() => {
		if (selectedKeys === "all") return usuariosProcesados.map((u) => u.id);
		return Array.from(selectedKeys);
	}, [selectedKeys, usuariosProcesados]);
	const totalSeleccionados = idsSeleccionados.length;
	const manejarCrearUsuario = async (e) => {
		e.preventDefault();
		if (!nuevoNombre.trim()) {
			setErrorFormulario("Por favor ingresa un nombre para el usuario.");
			return;
		}
		if (!nuevoEmail.trim() || !nuevoEmail.includes("@")) {
			setErrorFormulario("Por favor ingresa un correo electrónico válido.");
			return;
		}
		if (!nuevoPassword.trim() || nuevoPassword.length < 4) {
			setErrorFormulario("La contraseña debe tener al menos 4 caracteres.");
			return;
		}
		setGuardando(true);
		setErrorFormulario("");
		try {
			const usuarioCreado = await ServicioUsuariosAdmin.crearUsuario({
				nombre: nuevoNombre,
				email: nuevoEmail,
				password: nuevoPassword,
				rol: nuevoRol,
				estado: "Activo"
			});
			setListaUsuarios((prev) => [usuarioCreado, ...prev]);
			setNuevoNombre("");
			setNuevoEmail("");
			setNuevoPassword("");
			setNuevoRol("Administrador");
			setModalCrearAbierto(false);
			toast.success("Usuario registrado en Supabase", { description: `Se creó exitosamente a "${usuarioCreado.nombre}" con rol de ${usuarioCreado.rol}.` });
		} catch (error) {
			console.error("Error al crear usuario:", error);
			setErrorFormulario(error.message || "Error al crear el usuario en Supabase.");
		} finally {
			setGuardando(false);
		}
	};
	const abrirModalEditar = (usuario) => {
		setUsuarioAEditar(usuario);
		setEditNombre(usuario.nombre);
		setEditEmail(usuario.email);
		setEditRol(usuario.rol);
		setEditEstado(usuario.estado);
		setEditPassword("");
		setErrorEdicion("");
	};
	const manejarGuardarEdicion = async (e) => {
		e.preventDefault();
		if (!usuarioAEditar) return;
		if (!editNombre.trim()) {
			setErrorEdicion("El nombre no puede estar vacío.");
			return;
		}
		if (!editEmail.trim() || !editEmail.includes("@")) {
			setErrorEdicion("El correo electrónico no es válido.");
			return;
		}
		setGuardando(true);
		setErrorEdicion("");
		try {
			const usuarioActualizado = await ServicioUsuariosAdmin.actualizarUsuario(usuarioAEditar.id, {
				nombre: editNombre,
				email: editEmail,
				rol: editRol,
				estado: editEstado,
				password: editPassword.trim() ? editPassword : void 0
			});
			setListaUsuarios((prev) => prev.map((u) => u.id === usuarioAEditar.id ? usuarioActualizado : u));
			setUsuarioAEditar(null);
			toast.success("Usuario actualizado", { description: `Los datos de "${usuarioActualizado.nombre}" han sido guardados en Supabase.` });
		} catch (error) {
			console.error("Error al actualizar usuario:", error);
			setErrorEdicion(error.message || "Error al actualizar en Supabase.");
		} finally {
			setGuardando(false);
		}
	};
	const confirmarEliminacion = async () => {
		if (!usuarioAEliminar) return;
		const nombreEliminado = usuarioAEliminar.nombre;
		const idEliminado = usuarioAEliminar.id;
		setGuardando(true);
		try {
			await ServicioUsuariosAdmin.eliminarUsuario(idEliminado);
			setListaUsuarios((prev) => prev.filter((u) => u.id !== idEliminado));
			setUsuarioAEliminar(null);
			toast.success("Usuario eliminado", { description: `Se eliminó a "${nombreEliminado}" de Supabase.` });
		} catch (error) {
			console.error("Error al eliminar usuario:", error);
			toast.danger("Error al eliminar", { description: "No se pudo eliminar el usuario de Supabase." });
		} finally {
			setGuardando(false);
		}
	};
	const confirmarEliminacionMasiva = async () => {
		if (idsSeleccionados.length === 0) return;
		const totalAfectados = idsSeleccionados.length;
		setGuardando(true);
		try {
			await ServicioUsuariosAdmin.eliminarUsuariosMasivo(idsSeleccionados);
			setListaUsuarios((prev) => prev.filter((u) => !idsSeleccionados.includes(u.id)));
			setSelectedKeys(/* @__PURE__ */ new Set());
			setModalMasivoEliminar(false);
			toast.success("Usuarios eliminados", { description: `Se eliminaron ${totalAfectados} usuarios de Supabase correctamente.` });
		} catch (error) {
			console.error("Error en eliminación masiva:", error);
			toast.danger("Error en eliminación masiva", { description: "Ocurrió un error al eliminar los usuarios en Supabase." });
		} finally {
			setGuardando(false);
		}
	};
	const formatearFecha = (fechaStr) => {
		if (!fechaStr) return "-";
		try {
			return new Date(fechaStr).toLocaleDateString("es-CO", {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		} catch {
			return fechaStr;
		}
	};
	const obtenerBadgeRol = (rol) => {
		switch (rol) {
			default: return {
				clase: "bg-[#0064c1]/10 text-[#0064c1] border-[#0064c1]/20",
				punto: "bg-[#0064c1]"
			};
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
					children: [
						/* @__PURE__ */ jsxs("div", {
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
									placeholder: "Buscar por nombre, correo o rol...",
									className: "bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-full"
								}),
								busqueda && /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => {
										setBusqueda("");
										setPagina(1);
									},
									className: "text-[#787774] hover:text-[#0a0a0a] cursor-pointer",
									children: /* @__PURE__ */ jsx(CloseCircleIcon, { size: 14 })
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "inline-flex p-1 rounded-full bg-black/[0.04] border border-black/[0.04]",
							children: ["Todos", "Administrador"].map((tab) => /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => {
									setFiltroRol(tab);
									setPagina(1);
								},
								className: `px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${filtroRol === tab ? "bg-white text-[#0a0a0a] shadow-xs" : "text-[#787774] hover:text-[#0a0a0a]"}`,
								children: tab
							}, tab))
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: recargarUsuarios,
							disabled: cargando,
							title: "Sincronizar con Supabase",
							className: "grid h-9 w-9 place-items-center rounded-full bg-white border border-black/10 text-[#787774] hover:text-[#0064c1] hover:border-[#0064c1]/40 transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50",
							children: /* @__PURE__ */ jsx(RefreshIcon, {
								size: 16,
								className: cargando ? "animate-spin text-[#0064c1]" : ""
							})
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [totalSeleccionados > 0 ? /* @__PURE__ */ jsxs("div", {
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
					}), /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => {
							setErrorFormulario("");
							setModalCrearAbierto(true);
						},
						className: "group/btn relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm shrink-0",
						style: {
							backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
							boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
						},
						children: [/* @__PURE__ */ jsx(UserPlusIcon, {
							size: 16,
							strokeWidth: 2,
							className: "relative z-10"
						}), /* @__PURE__ */ jsx("span", {
							className: "relative z-10",
							children: "Crear administrativo"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "overflow-hidden rounded-[28px] bg-white/95 border border-white/80 shadow-[0_20px_45px_-18px_rgba(9,60,120,0.14),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md",
				children: [/* @__PURE__ */ jsx(Table, { children: /* @__PURE__ */ jsx(Table.ScrollContainer, {
					className: "custom-scrollbar",
					children: /* @__PURE__ */ jsxs(Table.Content, {
						"aria-label": "Tabla de usuarios administrativos",
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
									children: [/* @__PURE__ */ jsx("span", { children: "Usuario" }), /* @__PURE__ */ jsx("span", {
										className: "text-[0.65rem] text-[#787774]",
										children: columnaOrden === "nombre" ? direccionOrden === "asc" ? "▲" : "▼" : "↕"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								onClick: () => manejarOrden("email"),
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] cursor-pointer hover:bg-black/[0.03] select-none",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", { children: "Correo Electrónico" }), /* @__PURE__ */ jsx("span", {
										className: "text-[0.65rem] text-[#787774]",
										children: columnaOrden === "email" ? direccionOrden === "asc" ? "▲" : "▼" : "↕"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								onClick: () => manejarOrden("rol"),
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] cursor-pointer hover:bg-black/[0.03] select-none",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", { children: "Rol" }), /* @__PURE__ */ jsx("span", {
										className: "text-[0.65rem] text-[#787774]",
										children: columnaOrden === "rol" ? direccionOrden === "asc" ? "▲" : "▼" : "↕"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								onClick: () => manejarOrden("fecha_creacion"),
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] cursor-pointer hover:bg-black/[0.03] select-none",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", { children: "Fecha de Creación" }), /* @__PURE__ */ jsx("span", {
										className: "text-[0.65rem] text-[#787774]",
										children: columnaOrden === "fecha_creacion" ? direccionOrden === "asc" ? "▲" : "▼" : "↕"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								onClick: () => manejarOrden("estado"),
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0064c1] cursor-pointer hover:bg-black/[0.03] select-none",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", { children: "Estado" }), /* @__PURE__ */ jsx("span", {
										className: "text-[0.65rem] text-[#787774]",
										children: columnaOrden === "estado" ? direccionOrden === "asc" ? "▲" : "▼" : "↕"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Table.Column, {
								className: "py-4 px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#787774] text-right",
								children: "Acciones"
							})
						] }), /* @__PURE__ */ jsx(Table.Body, { children: usuariosPaginados.length === 0 ? /* @__PURE__ */ jsx(Table.Row, { children: /* @__PURE__ */ jsx(Table.Cell, {
							className: "py-12 text-center text-[#787774]",
							colSpan: 7,
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center justify-center gap-2",
								children: [
									/* @__PURE__ */ jsx(ShieldUserIcon, {
										size: 32,
										className: "text-black/20"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-sm font-medium",
										children: "No se encontraron usuarios administrativos"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-xs text-[#787774]",
										children: cargando ? "Sincronizando con Supabase..." : "Intenta ajustar los términos de búsqueda o filtros"
									})
								]
							})
						}) }) : usuariosPaginados.map((item) => {
							const badgeRol = obtenerBadgeRol(item.rol);
							const iniciales = (item.nombre || "AD").slice(0, 2).toUpperCase();
							return /* @__PURE__ */ jsxs(Table.Row, {
								className: "border-t border-black/[0.04] transition-colors hover:bg-slate-50/60",
								children: [
									/* @__PURE__ */ jsx(Table.Cell, {
										className: "py-3.5 px-4 w-10 pe-0",
										children: /* @__PURE__ */ jsx(Checkbox, {
											"aria-label": `Seleccionar ${item.nombre}`,
											slot: "selection",
											children: /* @__PURE__ */ jsx(Checkbox.Content, { children: /* @__PURE__ */ jsx(Checkbox.Control, { children: /* @__PURE__ */ jsx(Checkbox.Indicator, {}) }) })
										})
									}),
									/* @__PURE__ */ jsx(Table.Cell, {
										className: "py-3.5 px-4",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx("div", {
												className: "grid h-9 w-9 shrink-0 place-items-center rounded-2xl text-white text-xs font-bold shadow-xs",
												style: { backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)" },
												children: iniciales
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-xs font-bold text-[#0a0a0a] tracking-tight",
													children: item.nombre
												}), /* @__PURE__ */ jsxs("span", {
													className: "text-[0.68rem] text-[#787774] font-mono truncate max-w-[140px]",
													title: item.id,
													children: [
														"ID: ",
														item.id.slice(0, 8),
														"..."
													]
												})]
											})]
										})
									}),
									/* @__PURE__ */ jsx(Table.Cell, {
										className: "py-3.5 px-4",
										children: /* @__PURE__ */ jsxs("div", {
											className: "inline-flex items-center gap-1.5 text-xs text-[#2f3437] font-medium",
											children: [/* @__PURE__ */ jsx(LetterIcon, {
												size: 14,
												className: "text-[#787774] shrink-0"
											}), /* @__PURE__ */ jsx("span", {
												className: "truncate max-w-[200px]",
												title: item.email,
												children: item.email
											})]
										})
									}),
									/* @__PURE__ */ jsx(Table.Cell, {
										className: "py-3.5 px-4",
										children: /* @__PURE__ */ jsxs("span", {
											className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeRol.clase}`,
											children: [/* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full ${badgeRol.punto}` }), item.rol]
										})
									}),
									/* @__PURE__ */ jsx(Table.Cell, {
										className: "py-3.5 px-4",
										children: /* @__PURE__ */ jsxs("div", {
											className: "inline-flex items-center gap-1.5 text-xs text-[#2f3437] font-medium",
											children: [/* @__PURE__ */ jsx(CalendarMinimalisticIcon, {
												size: 14,
												className: "text-[#787774] shrink-0"
											}), /* @__PURE__ */ jsx("span", { children: formatearFecha(item.fecha_creacion) })]
										})
									}),
									/* @__PURE__ */ jsx(Table.Cell, {
										className: "py-3.5 px-4",
										children: /* @__PURE__ */ jsxs("span", {
											className: `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.68rem] font-bold ${item.estado === "Activo" ? "bg-emerald-500/10 text-emerald-700" : "bg-zinc-500/10 text-zinc-600"}`,
											children: [/* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full ${item.estado === "Activo" ? "bg-emerald-500" : "bg-zinc-400"}` }), item.estado]
										})
									}),
									/* @__PURE__ */ jsx(Table.Cell, {
										className: "py-3.5 px-4 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "inline-flex items-center justify-end gap-1",
											children: [/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => abrirModalEditar(item),
												className: "grid h-8 w-8 place-items-center rounded-xl text-[#787774] hover:text-[#0064c1] hover:bg-[#0064c1]/10 transition-colors cursor-pointer",
												title: "Editar usuario",
												"aria-label": `Editar ${item.nombre}`,
												children: /* @__PURE__ */ jsx(Pen2Icon, { size: 15 })
											}), /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setUsuarioAEliminar(item),
												className: "grid h-8 w-8 place-items-center rounded-xl text-[#787774] hover:text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer",
												title: "Eliminar usuario",
												"aria-label": `Eliminar ${item.nombre}`,
												children: /* @__PURE__ */ jsx(TrashBinMinimalisticIcon, { size: 15 })
											})]
										})
									})
								]
							}, item.id);
						}) })]
					})
				}) }), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-t border-black/[0.06] bg-black/[0.01]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-xs font-semibold text-[#787774] font-mono",
							children: [
								inicioRango,
								" a ",
								finRango,
								" de ",
								totalRegistros,
								" resultados"
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
			modalCrearAbierto && montado && typeof document !== "undefined" && createPortal(/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-rise",
				onClick: (e) => {
					if (e.target === e.currentTarget && !guardando) setModalCrearAbierto(false);
				},
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-5 max-w-md w-full p-6 sm:p-7 rounded-[28px] bg-white border border-black/[0.08] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between pb-3 border-b border-black/[0.06]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-white shadow-xs",
									style: { backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)" },
									children: /* @__PURE__ */ jsx(ShieldUserIcon, {
										size: 20,
										strokeWidth: 2
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "m-0 text-base font-bold text-[#0a0a0a]",
										children: "Nuevo Usuario Administrativo"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-[#787774]",
										children: "Se guardará directamente en Supabase"
									})]
								})]
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: guardando,
								onClick: () => setModalCrearAbierto(false),
								className: "grid h-8 w-8 place-items-center rounded-full text-[#787774] hover:text-[#0a0a0a] hover:bg-black/[0.05] transition-colors cursor-pointer disabled:opacity-40",
								children: /* @__PURE__ */ jsx(CloseCircleIcon, { size: 18 })
							})]
						}),
						errorFormulario && /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-700",
							children: [/* @__PURE__ */ jsx(DangerTriangleIcon, {
								size: 16,
								className: "shrink-0"
							}), /* @__PURE__ */ jsx("span", { children: errorFormulario })]
						}),
						/* @__PURE__ */ jsxs("form", {
							onSubmit: manejarCrearUsuario,
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold uppercase tracking-[0.08em] text-[#0064c1]",
										children: "Nombre Completo"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#fbfbfa] focus-within:bg-white focus-within:border-[#0064c1] focus-within:ring-2 focus-within:ring-[#0064c1]/10 transition-all",
										children: [/* @__PURE__ */ jsx(UserIcon, {
											size: 16,
											className: "text-[#787774] shrink-0"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											required: true,
											value: nuevoNombre,
											onChange: (e) => setNuevoNombre(e.target.value),
											placeholder: "Ej. Carolina Morales",
											className: "bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-full"
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold uppercase tracking-[0.08em] text-[#0064c1]",
										children: "Correo Electrónico"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#fbfbfa] focus-within:bg-white focus-within:border-[#0064c1] focus-within:ring-2 focus-within:ring-[#0064c1]/10 transition-all",
										children: [/* @__PURE__ */ jsx(LetterIcon, {
											size: 16,
											className: "text-[#787774] shrink-0"
										}), /* @__PURE__ */ jsx("input", {
											type: "email",
											required: true,
											value: nuevoEmail,
											onChange: (e) => setNuevoEmail(e.target.value),
											placeholder: "correo@observatorio.edu",
											className: "bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-full"
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold uppercase tracking-[0.08em] text-[#0064c1]",
										children: "Contraseña"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#fbfbfa] focus-within:bg-white focus-within:border-[#0064c1] focus-within:ring-2 focus-within:ring-[#0064c1]/10 transition-all",
										children: [
											/* @__PURE__ */ jsx(LockPasswordIcon, {
												size: 16,
												className: "text-[#787774] shrink-0"
											}),
											/* @__PURE__ */ jsx("input", {
												type: mostrarPassword ? "text" : "password",
												required: true,
												value: nuevoPassword,
												onChange: (e) => setNuevoPassword(e.target.value),
												placeholder: "Contraseña segura",
												className: "bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-full"
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setMostrarPassword(!mostrarPassword),
												className: "text-[#787774] hover:text-[#0a0a0a] cursor-pointer",
												title: mostrarPassword ? "Ocultar contraseña" : "Ver contraseña",
												children: mostrarPassword ? /* @__PURE__ */ jsx(EyeClosedIcon, { size: 16 }) : /* @__PURE__ */ jsx(EyeIcon, { size: 16 })
											})
										]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold uppercase tracking-[0.08em] text-[#0064c1]",
										children: "Rol Asignado"
									}), /* @__PURE__ */ jsx("select", {
										value: nuevoRol,
										onChange: (e) => setNuevoRol(e.target.value),
										className: "w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#fbfbfa] text-xs font-semibold text-[#0a0a0a] focus:bg-white focus:border-[#0064c1] focus:ring-2 focus:ring-[#0064c1]/10 outline-none transition-all cursor-pointer",
										children: /* @__PURE__ */ jsx("option", {
											value: "Administrador",
											children: "Administrador"
										})
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-end gap-2.5 pt-3 mt-1 border-t border-black/[0.06]",
									children: [/* @__PURE__ */ jsx("button", {
										type: "button",
										disabled: guardando,
										onClick: () => setModalCrearAbierto(false),
										className: "px-4 py-2 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer disabled:opacity-40",
										children: "Cancelar"
									}), /* @__PURE__ */ jsxs("button", {
										type: "submit",
										disabled: guardando,
										className: "relative inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm disabled:opacity-60",
										style: {
											backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
											boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
										},
										children: [/* @__PURE__ */ jsx(UserPlusIcon, {
											size: 15,
											strokeWidth: 2
										}), /* @__PURE__ */ jsx("span", { children: guardando ? "Guardando..." : "Guardar" })]
									})]
								})
							]
						})
					]
				})
			}), document.body),
			usuarioAEditar && montado && typeof document !== "undefined" && createPortal(/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-rise",
				onClick: (e) => {
					if (e.target === e.currentTarget && !guardando) setUsuarioAEditar(null);
				},
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-5 max-w-md w-full p-6 sm:p-7 rounded-[28px] bg-white border border-black/[0.08] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between pb-3 border-b border-black/[0.06]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-white shadow-xs",
									style: { backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)" },
									children: /* @__PURE__ */ jsx(Pen2Icon, {
										size: 18,
										strokeWidth: 2
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "m-0 text-base font-bold text-[#0a0a0a]",
										children: "Editar Usuario Administrativo"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-[#787774]",
										children: "Actualiza los datos en la base de datos"
									})]
								})]
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: guardando,
								onClick: () => setUsuarioAEditar(null),
								className: "grid h-8 w-8 place-items-center rounded-full text-[#787774] hover:text-[#0a0a0a] hover:bg-black/[0.05] transition-colors cursor-pointer disabled:opacity-40",
								children: /* @__PURE__ */ jsx(CloseCircleIcon, { size: 18 })
							})]
						}),
						errorEdicion && /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-700",
							children: [/* @__PURE__ */ jsx(DangerTriangleIcon, {
								size: 16,
								className: "shrink-0"
							}), /* @__PURE__ */ jsx("span", { children: errorEdicion })]
						}),
						/* @__PURE__ */ jsxs("form", {
							onSubmit: manejarGuardarEdicion,
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold uppercase tracking-[0.08em] text-[#0064c1]",
										children: "Nombre Completo"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#fbfbfa] focus-within:bg-white focus-within:border-[#0064c1] focus-within:ring-2 focus-within:ring-[#0064c1]/10 transition-all",
										children: [/* @__PURE__ */ jsx(UserIcon, {
											size: 16,
											className: "text-[#787774] shrink-0"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											required: true,
											value: editNombre,
											onChange: (e) => setEditNombre(e.target.value),
											className: "bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-full"
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold uppercase tracking-[0.08em] text-[#0064c1]",
										children: "Correo Electrónico"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#fbfbfa] focus-within:bg-white focus-within:border-[#0064c1] focus-within:ring-2 focus-within:ring-[#0064c1]/10 transition-all",
										children: [/* @__PURE__ */ jsx(LetterIcon, {
											size: 16,
											className: "text-[#787774] shrink-0"
										}), /* @__PURE__ */ jsx("input", {
											type: "email",
											required: true,
											value: editEmail,
											onChange: (e) => setEditEmail(e.target.value),
											className: "bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-full"
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold uppercase tracking-[0.08em] text-[#0064c1]",
											children: "Rol"
										}), /* @__PURE__ */ jsx("select", {
											value: editRol,
											onChange: (e) => setEditRol(e.target.value),
											className: "w-full px-3 py-2 rounded-xl border border-black/10 bg-[#fbfbfa] text-xs font-semibold text-[#0a0a0a] focus:bg-white focus:border-[#0064c1] focus:ring-2 focus:ring-[#0064c1]/10 outline-none transition-all cursor-pointer",
											children: /* @__PURE__ */ jsx("option", {
												value: "Administrador",
												children: "Administrador"
											})
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold uppercase tracking-[0.08em] text-[#0064c1]",
											children: "Estado"
										}), /* @__PURE__ */ jsxs("select", {
											value: editEstado,
											onChange: (e) => setEditEstado(e.target.value),
											className: "w-full px-3 py-2 rounded-xl border border-black/10 bg-[#fbfbfa] text-xs font-semibold text-[#0a0a0a] focus:bg-white focus:border-[#0064c1] focus:ring-2 focus:ring-[#0064c1]/10 outline-none transition-all cursor-pointer",
											children: [/* @__PURE__ */ jsx("option", {
												value: "Activo",
												children: "Activo"
											}), /* @__PURE__ */ jsx("option", {
												value: "Inactivo",
												children: "Inactivo"
											})]
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold uppercase tracking-[0.08em] text-[#787774]",
										children: "Nueva Contraseña (Opcional)"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#fbfbfa] focus-within:bg-white focus-within:border-[#0064c1] focus-within:ring-2 focus-within:ring-[#0064c1]/10 transition-all",
										children: [
											/* @__PURE__ */ jsx(LockPasswordIcon, {
												size: 16,
												className: "text-[#787774] shrink-0"
											}),
											/* @__PURE__ */ jsx("input", {
												type: mostrarEditPassword ? "text" : "password",
												value: editPassword,
												onChange: (e) => setEditPassword(e.target.value),
												placeholder: "Dejar en blanco para conservar actual",
												className: "bg-transparent border-none outline-none text-xs font-medium text-[#0a0a0a] placeholder:text-[#787774] w-full"
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setMostrarEditPassword(!mostrarEditPassword),
												className: "text-[#787774] hover:text-[#0a0a0a] cursor-pointer",
												children: mostrarEditPassword ? /* @__PURE__ */ jsx(EyeClosedIcon, { size: 16 }) : /* @__PURE__ */ jsx(EyeIcon, { size: 16 })
											})
										]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-end gap-2.5 pt-3 mt-1 border-t border-black/[0.06]",
									children: [/* @__PURE__ */ jsx("button", {
										type: "button",
										disabled: guardando,
										onClick: () => setUsuarioAEditar(null),
										className: "px-4 py-2 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer disabled:opacity-40",
										children: "Cancelar"
									}), /* @__PURE__ */ jsxs("button", {
										type: "submit",
										disabled: guardando,
										className: "relative inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm disabled:opacity-60",
										style: {
											backgroundImage: "radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb)",
											boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4)"
										},
										children: [/* @__PURE__ */ jsx(Pen2Icon, {
											size: 15,
											strokeWidth: 2
										}), /* @__PURE__ */ jsx("span", { children: guardando ? "Actualizando..." : "Actualizar usuario" })]
									})]
								})
							]
						})
					]
				})
			}), document.body),
			usuarioAEliminar && montado && typeof document !== "undefined" && createPortal(/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-rise",
				onClick: (e) => {
					if (e.target === e.currentTarget && !guardando) setUsuarioAEliminar(null);
				},
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 max-w-sm w-full p-6 rounded-[28px] bg-white border border-black/[0.08] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600 font-bold",
								children: /* @__PURE__ */ jsx(DangerTriangleIcon, {
									size: 22,
									strokeWidth: 2
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col min-w-0",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "m-0 text-base font-bold text-[#0a0a0a]",
									children: "¿Eliminar administrativo?"
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-xs text-[#787774] truncate",
									children: [
										usuarioAEliminar.nombre,
										" (",
										usuarioAEliminar.email,
										")"
									]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "m-0 text-xs text-[#2f3437] leading-relaxed",
							children: [
								"Esta acción removerá permanentemente al usuario y sus accesos de la base de datos de ",
								/* @__PURE__ */ jsx("strong", { children: "Supabase" }),
								"."
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: guardando,
								onClick: () => setUsuarioAEliminar(null),
								className: "px-4 py-2 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer disabled:opacity-40",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: guardando,
								onClick: confirmarEliminacion,
								className: "px-4 py-2 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-sm cursor-pointer disabled:opacity-60",
								children: guardando ? "Eliminando..." : "Sí, eliminar de Supabase"
							})]
						})
					]
				})
			}), document.body),
			modalMasivoEliminar && montado && typeof document !== "undefined" && createPortal(/* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-rise",
				onClick: (e) => {
					if (e.target === e.currentTarget && !guardando) setModalMasivoEliminar(false);
				},
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 max-w-sm w-full p-6 rounded-[28px] bg-white border border-black/[0.08] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600 font-bold",
								children: /* @__PURE__ */ jsx(DangerTriangleIcon, {
									size: 22,
									strokeWidth: 2
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "m-0 text-base font-bold text-[#0a0a0a]",
									children: "¿Eliminar seleccionados?"
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-xs text-[#787774]",
									children: [totalSeleccionados, " usuarios administrativos marcados"]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "m-0 text-xs text-[#2f3437] leading-relaxed",
							children: [
								"¿Deseas eliminar permanentemente a los ",
								/* @__PURE__ */ jsxs("strong", { children: [totalSeleccionados, " usuarios seleccionados"] }),
								" de Supabase? Esta acción no se puede deshacer."
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06]",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: guardando,
								onClick: () => setModalMasivoEliminar(false),
								className: "px-4 py-2 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer disabled:opacity-40",
								children: "Cancelar"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: guardando,
								onClick: confirmarEliminacionMasiva,
								className: "px-4 py-2 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-sm cursor-pointer disabled:opacity-60",
								children: guardando ? "Eliminando..." : "Sí, eliminar grupo"
							})]
						})
					]
				})
			}), document.body)
		]
	});
};
//#endregion
//#region src/modules/usuarios/components/ContenidoUsuariosAdmin.astro
var $$ContenidoUsuariosAdmin = createComponent(async ($$result, $$props, $$slots) => {
	const usuarios = await ServicioUsuariosAdmin.obtenerUsuarios();
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise isolate overflow-x-clip"><!-- Atmósfera superior con SkyShader --><div class="absolute inset-x-0 top-0 h-[360px] -z-10 overflow-hidden pointer-events-none" style="mask-image: linear-gradient(180deg, black 0%, black 45%, transparent 100%); -webkit-mask-image: linear-gradient(180deg, black 0%, black 45%, transparent 100%);">${renderComponent($$result, "SkyShader", $$SkyShader, { "intensity": "soft" })}</div><div class="flex-1 flex flex-col px-6 md:px-12 pt-10 md:pt-14 pb-16 max-w-7xl w-full mx-auto gap-8"><!-- Encabezado de Gestión de Usuarios Administrativos --><header class="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]"><div class="flex flex-col gap-2 max-w-2xl"><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]"><span class="h-2 w-2 rounded-full bg-[#0064c1]"></span>Administración &amp; Control</div><h1 class="m-0 text-[clamp(2rem,3.4vw,2.8rem)] font-bold text-[#0a0a0a] tracking-[-0.035em] leading-[1.08] mix-blend-multiply opacity-95">Usuarios Administrativos</h1><p class="m-0 text-sm text-[#787774] font-medium tracking-tight">Gestión de accesos, roles y credenciales de los administradores del sistema del Observatorio.</p></div></header><!-- Componente Interactivo de Tabla de Usuarios Administrativos -->${renderComponent($$result, "TablaUsuariosAdmin", TablaUsuariosAdmin, {
		"client:load": true,
		"usuarios": usuarios,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/usuarios/components/TablaUsuariosAdmin.tsx",
		"client:component-export": "default"
	})}</div></div>`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/usuarios/components/ContenidoUsuariosAdmin.astro", void 0);
//#endregion
//#region src/modules/usuarios/components/FormularioCrearUsuario.astro
var $$FormularioCrearUsuario = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise isolate overflow-x-clip"><div class="flex-1 flex flex-col px-6 md:px-12 pt-8 md:pt-10 pb-16 max-w-4xl w-full mx-auto gap-8"><!-- Botón Volver a Usuarios --><div><a href="/dashboard/usuarios" class="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#787774] hover:text-[#0064c1] transition-colors cursor-pointer">${renderComponent($$result, "AltArrowLeftIcon", AltArrowLeftIcon, {
		"size": 16,
		"strokeWidth": 2,
		"className": "transition-transform duration-200 group-hover:-translate-x-1"
	})}<span>Volver a la lista de usuarios</span></a></div><!-- Encabezado de la Página de Creación --><header class="flex flex-col gap-2 pb-6 border-b border-black/[0.06]"><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]"><span class="h-2 w-2 rounded-full bg-[#0064c1]"></span>Formulario de Registro</div><h1 class="m-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-tight mix-blend-multiply opacity-95">Crear Nuevo Usuario Estudiante</h1><p class="m-0 text-sm text-[#787774] font-medium tracking-tight">Ingresa los datos del estudiante para vincularlo directamente a la Red de Aprendizaje.</p></header><!-- Formulario Completo --><div class="w-full"><form id="form-crear-usuario" class="flex flex-col gap-6" method="post"><!-- Sección 1: Información Personal --><div class="flex flex-col gap-4"><div class="flex items-center gap-2 pb-2 border-b border-black/[0.05]"><span class="grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold">1</span><span class="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">Información Personal</span></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${renderComponent($$result, "Input", $$Input, {
		"name": "nombre",
		"label": "Nombre completo",
		"placeholder": "Ej. Alejandro Fernando Haro",
		"autocomplete": "name",
		"icon": UserIcon,
		"required": true
	})}${renderComponent($$result, "Input", $$Input, {
		"name": "email",
		"label": "Correo electrónico",
		"type": "email",
		"placeholder": "estudiante@universidad.edu.co",
		"autocomplete": "email",
		"icon": LetterIcon,
		"required": true
	})}</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${renderComponent($$result, "Input", $$Input, {
		"name": "cedula",
		"label": "Cédula de ciudadanía (Contraseña inicial)",
		"inputmode": "numeric",
		"placeholder": "0000000000",
		"icon": CardIcon,
		"required": true
	})}${renderComponent($$result, "Input", $$Input, {
		"name": "telefono",
		"label": "Número de teléfono",
		"type": "tel",
		"placeholder": "300 123 4567",
		"autocomplete": "tel",
		"icon": PhoneIcon,
		"required": true
	})}</div><!-- Fecha de nacimiento --><div class="flex flex-col gap-2"><span class="flex items-center gap-2 text-[#0a0a0a] text-sm font-[560] tracking-[-0.01em]">${renderComponent($$result, "CalendarIcon", CalendarIcon, {
		"size": 18,
		"strokeWidth": 1.5,
		"className": "text-[#0064c1]"
	})}Fecha de nacimiento</span><div class="grid grid-cols-3 gap-3">${renderComponent($$result, "Input", $$Input, {
		"name": "dia",
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
		"type": "number",
		"placeholder": "Año",
		"min": "1900",
		"max": (/* @__PURE__ */ new Date()).getFullYear(),
		"required": true
	})}</div></div></div><!-- Sección 2: Información Académica & Estado --><div class="flex flex-col gap-4 pt-4"><div class="flex items-center gap-2 pb-2 border-b border-black/[0.05]"><span class="grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold">2</span><span class="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">Información Académica y Estado</span></div>${renderComponent($$result, "Input", $$Input, {
		"name": "universidad",
		"label": "Universidad / Institución",
		"placeholder": "Ej. Universidad Nacional de Colombia",
		"icon": BookIcon,
		"required": true
	})}<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${renderComponent($$result, "Input", $$Input, {
		"name": "carrera",
		"label": "Programa académico / Carrera",
		"placeholder": "Ej. Ingeniería de Software",
		"icon": BookIcon,
		"required": true
	})}${renderComponent($$result, "CustomSelect", $$CustomSelect, {
		"name": "semestre",
		"label": "Semestre actual",
		"placeholder": "Seleccionar semestre",
		"options": semestresOpciones,
		"required": true
	})}</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${renderComponent($$result, "CustomSelect", $$CustomSelect, {
		"name": "estado",
		"label": "Estado inicial de la cuenta",
		"placeholder": "Activo",
		"options": [
			{
				value: "Activo",
				label: "Activo (Permite ingreso inmediato)"
			},
			{
				value: "Pendiente",
				label: "Pendiente"
			},
			{
				value: "Inactivo",
				label: "Inactivo"
			}
		],
		"required": true
	})}</div></div><!-- Mensaje de error si ocurre --><div id="mensaje-error" class="hidden p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium"></div><!-- Botones de Acción --><div class="flex items-center justify-end gap-3 pt-6 border-t border-black/[0.06] mt-4"><a href="/dashboard/usuarios" class="px-5 py-2.5 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer">Cancelar</a><button type="submit" id="btn-guardar" class="group/btn relative inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);"><span class="relative z-10">Guardar y registrar estudiante</span>${renderComponent($$result, "ArrowRightIcon", ArrowRightIcon, {
		"size": 14,
		"strokeWidth": 2,
		"className": "relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5"
	})}</button></div></form></div></div></div>${renderScript($$result, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/usuarios/components/FormularioCrearUsuario.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/usuarios/components/FormularioCrearUsuario.astro", void 0);
//#endregion
//#region src/modules/usuarios/components/FormularioEditarUsuario.astro
createAstro("https://astro.build");
var $$FormularioEditarUsuario = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FormularioEditarUsuario;
	const { usuario } = Astro.props;
	const partesFecha = usuario.fechaNacimiento ? usuario.fechaNacimiento.split(" de ") : [];
	const diaDefecto = partesFecha[0] ? parseInt(partesFecha[0], 10) : "";
	const restoFecha = partesFecha[1] ? partesFecha[1].split(", ") : [];
	const mesDefecto = restoFecha[0] ? restoFecha[0].toLowerCase() : "";
	const anioDefecto = restoFecha[1] ? parseInt(restoFecha[1], 10) : "";
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative flex-1 flex flex-col w-full animate-rise isolate overflow-x-clip"><div class="flex-1 flex flex-col px-6 md:px-12 pt-8 md:pt-10 pb-16 max-w-4xl w-full mx-auto gap-8"><!-- Botón Volver a Usuarios --><div><a href="/dashboard/usuarios" class="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#787774] hover:text-[#0064c1] transition-colors cursor-pointer">${renderComponent($$result, "AltArrowLeftIcon", AltArrowLeftIcon, {
		"size": 16,
		"strokeWidth": 2,
		"className": "transition-transform duration-200 group-hover:-translate-x-1"
	})}<span>Volver a la lista de usuarios</span></a></div><!-- Encabezado de la Página de Edición --><header class="flex flex-col gap-2 pb-6 border-b border-black/[0.06]"><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0064c1]"><span class="h-2 w-2 rounded-full bg-[#0064c1]"></span>Edición de Registro</div><h1 class="m-0 text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-tight mix-blend-multiply opacity-95">Editar Usuario: ${usuario.nombre}</h1><p class="m-0 text-sm text-[#787774] font-medium tracking-tight">Modifica la información personal, académica y el estado del estudiante registrado.</p></header><!-- Formulario Completo --><div class="w-full"><form id="form-editar-usuario" class="flex flex-col gap-6" method="post"><input type="hidden" name="id"${addAttribute(usuario.id, "value")}><!-- Sección 1: Información Personal --><div class="flex flex-col gap-4"><div class="flex items-center gap-2 pb-2 border-b border-black/[0.05]"><span class="grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold">1</span><span class="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">Información Personal</span></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${renderComponent($$result, "Input", $$Input, {
		"name": "nombre",
		"label": "Nombre completo",
		"value": usuario.nombre,
		"placeholder": "Nombre del usuario",
		"autocomplete": "name",
		"icon": UserIcon,
		"required": true
	})}${renderComponent($$result, "Input", $$Input, {
		"name": "email",
		"label": "Correo electrónico",
		"type": "email",
		"value": usuario.email,
		"placeholder": "correo@universidad.edu.co",
		"autocomplete": "email",
		"icon": LetterIcon,
		"required": true
	})}</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${renderComponent($$result, "Input", $$Input, {
		"name": "cedula",
		"label": "Cédula de ciudadanía",
		"inputmode": "numeric",
		"value": usuario.cedula,
		"placeholder": "0000000000",
		"icon": CardIcon,
		"required": true
	})}${renderComponent($$result, "Input", $$Input, {
		"name": "telefono",
		"label": "Número de teléfono",
		"type": "tel",
		"value": usuario.telefono,
		"placeholder": "300 123 4567",
		"autocomplete": "tel",
		"icon": PhoneIcon,
		"required": true
	})}</div><!-- Fecha de nacimiento --><div class="flex flex-col gap-2"><span class="flex items-center gap-2 text-[#0a0a0a] text-sm font-[560] tracking-[-0.01em]">${renderComponent($$result, "CalendarIcon", CalendarIcon, {
		"size": 18,
		"strokeWidth": 1.5,
		"className": "text-[#0064c1]"
	})}Fecha de nacimiento</span><div class="grid grid-cols-3 gap-3">${renderComponent($$result, "Input", $$Input, {
		"name": "dia",
		"type": "number",
		"value": diaDefecto,
		"placeholder": "Día",
		"min": "1",
		"max": "31",
		"required": true
	})}${renderComponent($$result, "CustomSelect", $$CustomSelect, {
		"name": "mes",
		"label": "Mes",
		"placeholder": mesDefecto || "Mes",
		"options": mesesOpciones,
		"required": true
	})}${renderComponent($$result, "Input", $$Input, {
		"name": "anio",
		"type": "number",
		"value": anioDefecto,
		"placeholder": "Año",
		"min": "1900",
		"max": (/* @__PURE__ */ new Date()).getFullYear(),
		"required": true
	})}</div></div></div><!-- Sección 2: Información Académica & Estado --><div class="flex flex-col gap-4 pt-4"><div class="flex items-center gap-2 pb-2 border-b border-black/[0.05]"><span class="grid h-6 w-6 place-items-center rounded-lg bg-[#0064c1]/10 text-[#0064c1] text-xs font-bold">2</span><span class="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">Información Académica y Estado</span></div>${renderComponent($$result, "Input", $$Input, {
		"name": "universidad",
		"label": "Universidad / Institución",
		"value": usuario.universidad,
		"placeholder": "Universidad",
		"icon": BookIcon,
		"required": true
	})}<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${renderComponent($$result, "Input", $$Input, {
		"name": "carrera",
		"label": "Programa académico / Carrera",
		"value": usuario.carrera,
		"placeholder": "Carrera",
		"icon": BookIcon,
		"required": true
	})}${renderComponent($$result, "CustomSelect", $$CustomSelect, {
		"name": "semestre",
		"label": "Semestre actual",
		"placeholder": usuario.semestre || "Seleccionar semestre",
		"options": semestresOpciones,
		"required": true
	})}</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${renderComponent($$result, "CustomSelect", $$CustomSelect, {
		"name": "estado",
		"label": "Estado de la cuenta",
		"placeholder": usuario.estado || "Activo",
		"options": [
			{
				value: "Activo",
				label: "Activo (Permite ingreso)"
			},
			{
				value: "Pendiente",
				label: "Pendiente"
			},
			{
				value: "Inactivo",
				label: "Inactivo"
			}
		],
		"required": true
	})}</div></div><!-- Mensaje de error si ocurre --><div id="mensaje-error-editar" class="hidden p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium"></div><!-- Botones de Acción --><div class="flex items-center justify-end gap-3 pt-6 border-t border-black/[0.06] mt-4"><a href="/dashboard/usuarios" class="px-5 py-2.5 rounded-full text-xs font-semibold text-[#787774] hover:bg-black/[0.05] transition-colors cursor-pointer">Cancelar</a><button type="submit" id="btn-guardar-editar" class="group/btn relative inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-full text-white text-xs font-semibold tracking-[-0.01em] cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.985] shadow-sm" style="background-image: radial-gradient(120% 80% at 50% 0%, #ffffff42, #ffffff0a 36%, #ffffff00 54%), linear-gradient(#66b2ff, #4fa3ff 56%, #4a9ffb); box-shadow: inset 0 1.5px 1px rgba(255,255,255,0.5), inset 0 9px 16px -10px rgba(255,255,255,0.3), inset 0 -14px 22px -10px rgba(26,106,202,0.5), 0 4px 12px -2px rgba(58,138,244,0.4);"><span class="relative z-10">Guardar cambios</span>${renderComponent($$result, "ArrowRightIcon", ArrowRightIcon, {
		"size": 14,
		"strokeWidth": 2,
		"className": "relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5"
	})}</button></div></form></div></div></div>${renderScript($$result, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/usuarios/components/FormularioEditarUsuario.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/daniel.ochoa/Downloads/ObservatoriosTalvez (2)/ObservatoriosTalvez/src/modules/usuarios/components/FormularioEditarUsuario.astro", void 0);
//#endregion
export { ServicioUsuarios as a, $$ContenidoUsuarios as i, $$FormularioCrearUsuario as n, $$ContenidoUsuariosAdmin as r, $$FormularioEditarUsuario as t };
