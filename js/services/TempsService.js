import { URL_TEMPS } from "../const/constants.js";

// Servei per consultar la temperatura actual d'una ubicació via Open-Meteo
export class TempsService {
  // Retorna l'objecte current_weather o null si la consulta falla
  async obtenirTempsActual(latitud, longitud) {
    const url = `${URL_TEMPS}?latitude=${latitud}&longitude=${longitud}&current_weather=true`;
    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      return data.current_weather;
    } catch (error) {
      console.error("Error durant la consulta del temps", error);
      return null;
    }
  }
}
