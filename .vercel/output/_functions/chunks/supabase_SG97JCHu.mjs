//#region src/lib/supabase.ts
var SUPABASE_URL = "https://gazmrklvrqajobxkblqz.supabase.co";
var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhem1ya2x2cnFham9ieGtibHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MDEzNDQsImV4cCI6MjA3ODI3NzM0NH0.zTlOuL3078OEUnUF_wn58Hilmjn1VpS82a7gU15hjFE";
var cabecerasBase = {
	apikey: SUPABASE_ANON_KEY,
	Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
	"Content-Type": "application/json"
};
var cacheMemoria = /* @__PURE__ */ new Map();
var TTL_CACHE_MS = 2e4;
var clienteSupabase = {
	/**
	* Limpia la caché en memoria para una tabla específica o todo
	*/
	limpiarCache(tabla) {
		if (tabla) {
			for (const clave of cacheMemoria.keys()) if (clave.startsWith(`${tabla}:`)) cacheMemoria.delete(clave);
		} else cacheMemoria.clear();
	},
	/**
	* Realiza una consulta GET a una tabla de Supabase con aceleración por caché
	*/
	async consultar(tabla, queryParams = "", forzarFresco = false) {
		const claveCache = `${tabla}:${queryParams}`;
		const ahora = Date.now();
		if (!forzarFresco && cacheMemoria.has(claveCache)) {
			const entrada = cacheMemoria.get(claveCache);
			if (ahora < entrada.expiraEn) return structuredClone(entrada.datos);
			cacheMemoria.delete(claveCache);
		}
		const url = `${SUPABASE_URL}/rest/v1/${tabla}${queryParams ? `?${queryParams}` : ""}`;
		const respuesta = await fetch(url, {
			method: "GET",
			headers: cabecerasBase
		});
		if (!respuesta.ok) {
			const errorDetalle = await respuesta.text();
			throw new Error(`Error al consultar ${tabla}: ${respuesta.status} - ${errorDetalle}`);
		}
		const datos = await respuesta.json();
		cacheMemoria.set(claveCache, {
			datos,
			expiraEn: ahora + TTL_CACHE_MS
		});
		return datos;
	},
	/**
	* Inserta un nuevo registro en una tabla
	*/
	async insertar(tabla, datos) {
		this.limpiarCache(tabla);
		const url = `${SUPABASE_URL}/rest/v1/${tabla}`;
		const respuesta = await fetch(url, {
			method: "POST",
			headers: {
				...cabecerasBase,
				Prefer: "return=representation"
			},
			body: JSON.stringify(datos)
		});
		if (!respuesta.ok) {
			const errorDetalle = await respuesta.text();
			throw new Error(`Error al insertar en ${tabla}: ${respuesta.status} - ${errorDetalle}`);
		}
		const resultado = await respuesta.json();
		return Array.isArray(resultado) ? resultado[0] : resultado;
	},
	/**
	* Actualiza un registro por ID
	*/
	async actualizar(tabla, id, datos) {
		this.limpiarCache(tabla);
		const url = `${SUPABASE_URL}/rest/v1/${tabla}?id=eq.${id}`;
		const respuesta = await fetch(url, {
			method: "PATCH",
			headers: {
				...cabecerasBase,
				Prefer: "return=representation"
			},
			body: JSON.stringify(datos)
		});
		if (!respuesta.ok) {
			const errorDetalle = await respuesta.text();
			throw new Error(`Error al actualizar en ${tabla}: ${respuesta.status} - ${errorDetalle}`);
		}
		const resultado = await respuesta.json();
		return Array.isArray(resultado) ? resultado[0] : resultado;
	},
	/**
	* Elimina un registro por ID
	*/
	async eliminar(tabla, id) {
		this.limpiarCache(tabla);
		const url = `${SUPABASE_URL}/rest/v1/${tabla}?id=eq.${id}`;
		const respuesta = await fetch(url, {
			method: "DELETE",
			headers: cabecerasBase
		});
		if (!respuesta.ok) {
			const errorDetalle = await respuesta.text();
			throw new Error(`Error al eliminar de ${tabla}: ${respuesta.status} - ${errorDetalle}`);
		}
		return true;
	},
	/**
	* Elimina múltiples registros por IDs
	*/
	async eliminarMasivo(tabla, ids) {
		if (ids.length === 0) return true;
		this.limpiarCache(tabla);
		const url = `${SUPABASE_URL}/rest/v1/${tabla}?id=in.(${ids.map((id) => `"${id}"`).join(",")})`;
		const respuesta = await fetch(url, {
			method: "DELETE",
			headers: cabecerasBase
		});
		if (!respuesta.ok) {
			const errorDetalle = await respuesta.text();
			throw new Error(`Error en eliminación masiva de ${tabla}: ${respuesta.status} - ${errorDetalle}`);
		}
		return true;
	}
};
//#endregion
export { clienteSupabase as t };
