/**
 * Utilidades para detección, validación y normalización de Categorías del Repositorio.
 * Categorías oficiales admitidas: "Energía", "Agua", "Biodiversidad", "Prácticas".
 */

export const CATEGORIAS_VALIDAS = [
  "Energía",
  "Agua",
  "Biodiversidad",
  "Prácticas",
] as const;

export type CategoriaValida = (typeof CATEGORIAS_VALIDAS)[number];

// Alias para compatibilidad
export const TEMAS_VALIDOS = CATEGORIAS_VALIDAS;
export type TemaValido = CategoriaValida;

/**
 * Normaliza un texto eliminando tildes, diacríticos y espacios en blanco.
 */
export function normalizarTexto(txt: string): string {
  if (!txt || typeof txt !== "string") return "";
  return txt
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remueve marcas diacríticas
    .toLowerCase()
    .trim();
}

/**
 * Calcula la distancia de Levenshtein entre dos cadenas para tolerancia a erratas tipográficas.
 */
export function distanciaLevenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const costo = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + costo
      );
    }
  }
  return dp[m][n];
}

/**
 * Detecta y homologa inteligentemente si una cadena pertenece a una de las 4 categorías oficiales:
 * "Energía", "Agua", "Biodiversidad", "Prácticas".
 *
 * Tolera:
 * - Mayúsculas / minúsculas ("ENERGIA", "energia", "Energía")
 * - Con o sin tildes ("practicas", "prácticas", "energia", "energía")
 * - Plurales y singulares ("aguas", "practica", "energias")
 * - Derivados y palabras compuestas ("recurso hídrico", "biodiverso", "buenas prácticas", "sector energético")
 * - Erratas tipográficas ("energuia", "biodivercidad")
 */
export function detectarCategoriaValida(input?: string | null): CategoriaValida | string {
  if (!input || typeof input !== "string") return "";
  const texto = normalizarTexto(input);
  if (!texto) return "";

  // 1. Reglas semánticas por raíces morfológicas y palabras clave
  // Categoría: Energía
  if (
    texto.includes("energ") ||
    texto.includes("electric") ||
    texto.includes("fotovolt") ||
    texto.includes("solar") ||
    texto.includes("eolic")
  ) {
    return "Energía";
  }

  // Categoría: Agua
  if (
    texto.includes("agu") ||
    texto.includes("hidric") ||
    texto.includes("hidrolog") ||
    texto.includes("acuif")
  ) {
    return "Agua";
  }

  // Categoría: Biodiversidad
  if (
    texto.includes("biodivers") ||
    texto.includes("biodiverc") ||
    (texto.includes("bio") && texto.includes("divers")) ||
    texto.includes("ecosistem") ||
    texto.includes("fauna") ||
    texto.includes("flora")
  ) {
    return "Biodiversidad";
  }

  // Categoría: Prácticas
  if (
    texto.includes("practic") ||
    texto.includes("praxis")
  ) {
    return "Prácticas";
  }

  // 2. Coincidencia por distancia de edición (Levenshtein) con las categorías canónicas
  const objetivos: { categoria: CategoriaValida; clave: string }[] = [
    { categoria: "Energía", clave: "energia" },
    { categoria: "Agua", clave: "agua" },
    { categoria: "Biodiversidad", clave: "biodiversidad" },
    { categoria: "Prácticas", clave: "practicas" },
  ];

  // Evaluar palabras individuales
  const palabras = texto.split(/[\s,._\-/]+/).filter(Boolean);
  for (const palabra of palabras) {
    for (const obj of objetivos) {
      const dist = distanciaLevenshtein(palabra, obj.clave);
      const maxDist = obj.clave.length <= 4 ? 1 : 2;
      if (dist <= maxDist) {
        return obj.categoria;
      }
    }
  }

  // Evaluar cadena completa contra objetivos
  for (const obj of objetivos) {
    const dist = distanciaLevenshtein(texto, obj.clave);
    const maxDist = obj.clave.length <= 4 ? 1 : 2;
    if (dist <= maxDist) {
      return obj.categoria;
    }
  }

  // Si no coincide con ninguno de los 4, retornamos el texto limpio original
  return input.trim();
}

// Alias de compatibilidad
export const detectarTemaValido = detectarCategoriaValida;
