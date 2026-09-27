import type { UsuarioRed } from "./usuarios.types";
import { clienteSupabase } from "../../../lib/supabase";

const TABLA = "usuarios_estudiantes";

/**
 * Servicio encargado de gestionar los usuarios estudiantes registrados en la Red de Aprendizaje
 */
export class ServicioUsuarios {
  /**
   * Obtiene todos los estudiantes registrados desde Supabase
   */
  static async obtenerUsuarios(): Promise<UsuarioRed[]> {
    try {
      const registros = await clienteSupabase.consultar<any>(
        TABLA,
        "select=*&order=created_at.desc"
      );

      if (registros && registros.length > 0) {
        return registros.map((item) => {
          const semestreValor = item.semestre || "";
          let semestreFormateado = "No especificado";
          if (semestreValor) {
            if (semestreValor.includes("Semestre") || semestreValor === "Graduado" || semestreValor === "No aplica") {
              semestreFormateado = semestreValor;
            } else {
              semestreFormateado = `${semestreValor}° Semestre`;
            }
          }

          return {
            id: item.id,
            nombre: item.nombre || "Sin nombre",
            email: item.email || "",
            cedula: item.cedula || "",
            telefono: item.telefono || undefined,
            rangoEdad: item.rango_edad || item.fecha_nacimiento || undefined,
            condicionAcademica: item.condicion_academica || (semestreValor === "Graduado" ? "Graduado" : "Estudiante"),
            fechaNacimiento: item.fecha_nacimiento || item.rango_edad || "",
            universidad: item.universidad || "Sin universidad",
            carrera: item.carrera || "Sin carrera",
            semestre: semestreFormateado,
            fechaRegistro: item.created_at ? item.created_at.split("T")[0] : "Reciente",
            ultimoIngreso: item.ultimo_ingreso || item.last_sign_in_at || (item.updated_at ? item.updated_at.split("T")[0] : (item.created_at ? item.created_at.split("T")[0] : "Sin registro")),
            estado: (item.estado as any) || "Activo",
          };
        });
      }

      return [];
    } catch (error) {
      console.error("Error al obtener usuarios estudiantes:", error);
      return [];
    }
  }

  /**
   * Obtiene un estudiante por su ID
   */
  static async obtenerUsuarioPorId(id: string): Promise<UsuarioRed | undefined> {
    try {
      const registros = await clienteSupabase.consultar<any>(
        TABLA,
        `id=eq.${id}&select=*`
      );

      if (registros && registros.length > 0) {
        const item = registros[0];
        const semestreValor = item.semestre || "";
        let semestreFormateado = "No especificado";
        if (semestreValor) {
          if (semestreValor.includes("Semestre") || semestreValor === "Graduado" || semestreValor === "No aplica") {
            semestreFormateado = semestreValor;
          } else {
            semestreFormateado = `${semestreValor}° Semestre`;
          }
        }

        return {
          id: item.id,
          nombre: item.nombre || "Sin nombre",
          email: item.email || "",
          cedula: item.cedula || "",
          telefono: item.telefono || undefined,
          rangoEdad: item.rango_edad || item.fecha_nacimiento || undefined,
          condicionAcademica: item.condicion_academica || (semestreValor === "Graduado" ? "Graduado" : "Estudiante"),
          fechaNacimiento: item.fecha_nacimiento || item.rango_edad || "",
          universidad: item.universidad || "Sin universidad",
          carrera: item.carrera || "Sin carrera",
          semestre: semestreFormateado,
          fechaRegistro: item.created_at ? item.created_at.split("T")[0] : "Reciente",
          ultimoIngreso: item.ultimo_ingreso || item.last_sign_in_at || (item.updated_at ? item.updated_at.split("T")[0] : (item.created_at ? item.created_at.split("T")[0] : "Sin registro")),
          estado: (item.estado as any) || "Activo",
        };
      }

      return undefined;
    } catch (error) {
      console.error(`Error al obtener usuario ${id}:`, error);
      return undefined;
    }
  }

  /**
   * Elimina un usuario estudiante
   */
  static async eliminarUsuario(id: string): Promise<{ exito: boolean; mensaje?: string }> {
    try {
      const res = await fetch(`/api/usuarios/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      return { exito: res.ok, mensaje: data.error || data.mensaje };
    } catch (error: any) {
      return { exito: false, mensaje: error.message };
    }
  }

  /**
   * Elimina múltiples usuarios estudiantes
   */
  static async eliminarUsuariosMasivo(ids: string[]): Promise<{ exito: boolean; mensaje?: string }> {
    try {
      const res = await fetch("/api/usuarios", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const data = await res.json();
      return { exito: res.ok, mensaje: data.error || data.mensaje };
    } catch (error: any) {
      return { exito: false, mensaje: error.message };
    }
  }
}
