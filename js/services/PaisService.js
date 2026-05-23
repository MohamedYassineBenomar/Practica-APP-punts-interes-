import { URL_PAIS } from "../const/constants.js";

// Servei per consultar informació d'un país a través de REST Countries
export class PaisService {
  // Retorna les dades crues del país segons el codi ISO (ESP, GBR...)
  async obtenirDadesPais(codi) {
    const url = `${URL_PAIS}${codi}`;
    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error durant la consulta del país", error);
      return null;
    }
  }
}
