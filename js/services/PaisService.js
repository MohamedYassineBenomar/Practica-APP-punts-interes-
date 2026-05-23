import { URL_PAIS } from "../const/constants.js";

// Service to query country information from the REST Countries API
export class PaisService {
  // Returns the raw country data for a given ISO code (ESP, GBR...)
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
