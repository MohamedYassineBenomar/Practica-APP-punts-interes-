import { LAT_DEFECTE, LONG_DEFECTE, ZOOM_INICIAL } from "../const/constants.js";

// Servei que encapsula la gestió del mapa amb Leaflet
export class Mapa {
  #map;
  #latInit;
  #longInit;

  constructor(idContenidor = "mapa") {
    this.#latInit = LAT_DEFECTE;
    this.#longInit = LONG_DEFECTE;
    // Configuració inicial del mapa centrat als valors per defecte
    this.#map = L.map(idContenidor).setView([this.#latInit, this.#longInit], ZOOM_INICIAL);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap"
    }).addTo(this.#map);
  }

  // Getters i setters de les coordenades inicials
  get latInit() {
    return this.#latInit;
  }

  set latInit(novaLat) {
    this.#latInit = novaLat;
  }

  get longInit() {
    return this.#longInit;
  }

  set longInit(novaLong) {
    this.#longInit = novaLong;
  }

  // Centra el mapa a una coordenada concreta amb un zoom donat
  centrar(lat, long, zoom = ZOOM_INICIAL) {
    this.#map.setView([lat, long], zoom);
  }

  // Mostra el marcador "Estàs aquí" amb popup obert
  mostrarEstasAqui(lat, long) {
    const marker = L.marker([lat, long]).addTo(this.#map);
    marker.bindPopup("<b>Estàs aquí</b>").openPopup();
    this.centrar(lat, long);
  }

  // Mostra un punt al mapa amb un popup que conté el nom, l'adreça i la puntuació
  mostrarPunt(punt) {
    const marker = L.marker([punt.latitud, punt.longitud]).addTo(this.#map);
    const contingut = `<b>${punt.nom}</b><br>${punt.direccio}<br>Puntuació: ${punt.puntuacio}`;
    marker.bindPopup(contingut);
  }

  // Pinta una llista sencera de punts al mapa
  mostrarPunts(punts) {
    punts.forEach((punt) => {
      this.mostrarPunt(punt);
    });
  }

  // Esborra tots els marcadors del mapa (manté la capa de tiles)
  borrarPunts() {
    this.#map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.#map.removeLayer(layer);
      }
    });
  }
}
