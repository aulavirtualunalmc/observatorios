export const rangosEdadOpciones = [
  { value: "Entre 18 y 22 años", label: "Entre 18 y 22 años" },
  { value: "Entre 23 y 26 años", label: "Entre 23 y 26 años" },
  { value: "Entre 27 y 30 años", label: "Entre 27 y 30 años" },
  { value: "Más de 30 años", label: "Más de 30 años" },
];

export const condicionAcademicaOpciones = [
  { value: "Estudiante", label: "Estudiante" },
  { value: "Graduado", label: "Graduado" },
];

export const semestresOpciones = [
  ...Array.from({ length: 10 }, (_, i) => ({
    value: `${i + 1}° Semestre`,
    label: `${i + 1}° Semestre`,
  })),
  { value: "No aplica", label: "No aplica (Egresado / Graduado)" },
];

export const mesesOpciones = [
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
  "Diciembre",
].map((m, i) => ({ value: String(i + 1), label: m }));

