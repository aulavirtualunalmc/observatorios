export interface SolicitudInscripcionRed {
  id: string;
  nombre: string;
  nombres?: string;
  apellidos?: string;
  email?: string;
  cedula: string;
  telefono?: string;
  fechaNacimiento?: string;
  rangoEdad?: string;
  condicionAcademica?: string;
  universidad: string;
  carrera: string;
  semestre: string;
  fechaSolicitud: string;
  estado: "Pendiente" | "Aprobado" | "Rechazado";
}

export interface ConfiguracionConvocatoria {
  activo: boolean;
  fechaLimite: string | null;
  mensajeCierre: string;
  updatedAt?: string;
}


