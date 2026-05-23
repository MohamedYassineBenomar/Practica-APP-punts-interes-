// Base endpoint to fetch country information
export const URL_PAIS = "https://restcountries.com/v3.1/alpha/";

// Base endpoint to fetch the current weather for a location
export const URL_TEMPS = "https://api.open-meteo.com/v1/forecast";

// VAT per country code (only countries listed here apply VAT to the price)
export const IVA = {
  ESP: 0.21
};

// Default latitude / longitude used when the user denies geolocation
export const LAT_DEFECTE = 41.3851;
export const LONG_DEFECTE = 2.1734;

// Initial zoom level of the map
export const ZOOM_INICIAL = 13;

// Message shown when the dropped file is not a CSV
export const MSG_FITXER_NO_CSV = "El fitxer no és csv";

// Confirmation message before deleting a point of interest
export const MSG_CONFIRM_ELIMINAR = "Estàs segur que vols eliminar el punt d'interès?";
