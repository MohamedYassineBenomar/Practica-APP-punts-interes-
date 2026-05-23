import { LAT_DEFECTE, LONG_DEFECTE, ZOOM_INICIAL } from "../const/constants.js";

// Service that wraps the Leaflet map (creation, markers, cleanup)
export class Mapa {
  #map;
  #latInit;
  #longInit;

  constructor(idContenidor = "mapa") {
    this.#latInit = LAT_DEFECTE;
    this.#longInit = LONG_DEFECTE;
    // Initial map setup, centred on the default coordinates
    this.#map = L.map(idContenidor).setView([this.#latInit, this.#longInit], ZOOM_INICIAL);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap"
    }).addTo(this.#map);
  }

  // Getters and setters for the initial coordinates
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

  // Centres the map on the given coordinates with the requested zoom
  centrar(lat, long, zoom = ZOOM_INICIAL) {
    this.#map.setView([lat, long], zoom);
  }

  // Shows the "You are here" marker with an open popup
  mostrarEstasAqui(lat, long) {
    const marker = L.marker([lat, long]).addTo(this.#map);
    marker.bindPopup("<b>Estàs aquí</b>").openPopup();
    this.centrar(lat, long);
  }

  // Shows a single point on the map with a popup (name, address, rating)
  mostrarPunt(punt) {
    const marker = L.marker([punt.latitud, punt.longitud]).addTo(this.#map);
    const contingut = `<b>${punt.nom}</b><br>${punt.direccio}<br>Puntuació: ${punt.puntuacio}`;
    marker.bindPopup(contingut);
  }

  // Paints an entire list of points on the map
  mostrarPunts(punts) {
    punts.forEach((punt) => {
      this.mostrarPunt(punt);
    });
  }

  // Removes every marker from the map (keeps the tile layer)
  borrarPunts() {
    this.#map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.#map.removeLayer(layer);
      }
    });
  }
}
