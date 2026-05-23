// Endpoint base per consultar la informació d'un país
export const URL_PAIS = "https://restcountries.com/v3.1/alpha/";

// Endpoint base per consultar el temps actual d'una ubicació
export const URL_TEMPS = "https://api.open-meteo.com/v1/forecast";

// IVA per codi de país (només els països amb IVA definit l'aplicaran)
export const IVA = {
  ESP: 0.21
};

// Latitud i longitud per defecte si l'usuari denega la geolocalització
export const LAT_DEFECTE = 41.3851;
export const LONG_DEFECTE = 2.1734;

// Zoom inicial del mapa
export const ZOOM_INICIAL = 13;

// Missatge a mostrar si el fitxer no és csv
export const MSG_FITXER_NO_CSV = "El fitxer no és csv";

// Missatge de confirmació per eliminar un punt d'interès
export const MSG_CONFIRM_ELIMINAR = "Estàs segur que vols eliminar el punt d'interès?";
