export interface UsuarioRed {
  id: string;
  nombre: string;
  email: string;
  cedula: string;
  telefono?: string;
  rangoEdad?: string;
  condicionAcademica?: string;
  fechaNacimiento?: string;
  universidad: string;
  carrera: string;
  semestre: string;
  fechaRegistro: string;
  ultimoIngreso?: string;
  estado: "Activo" | "Pendiente" | "Inactivo";
}

export interface FiltrosUsuarios {
  busqueda?: string;
  carrera?: string;
  universidad?: string;
}
