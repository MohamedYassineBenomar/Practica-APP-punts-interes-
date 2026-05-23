import { URL_TEMPS } from "../const/constants.js";

// Service to query the current weather for a location via Open-Meteo
export class TempsService {
  // Returns the current_weather object or null if the request fails
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
