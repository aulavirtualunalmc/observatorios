export interface DatosRegistroRed {
  nombre?: string;
  nombres?: string;
  apellidos?: string;
  email: string;
  cedula: string;
  rangoEdad: string;
  condicionAcademica: string;
  universidad: string;
  carrera: string;
  semestre?: string;
  telefono?: string;
  aceptaTratamientoDatos: boolean;
}

export interface RegistroRedNuevo {
  id: string;
  nombre: string;
  email: string;
  cedula: string;
  telefono: string;
  fecha_nacimiento: string;
  universidad: string;
  carrera: string;
  semestre: string;
  estado: "Pendiente" | "Aprobado" | "Rechazado";
  created_at: string;
}

export interface RespuestaRegistroRed {
  exito: boolean;
  mensaje?: string;
  registro?: RegistroRedNuevo;
}

