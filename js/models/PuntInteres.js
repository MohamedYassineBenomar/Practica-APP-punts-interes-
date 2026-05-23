// Base class for any point of interest.
// Encapsulates the common attributes: id, location, name, etc.
export class PuntInteres {
  // Private attributes
  #id;
  #pais;
  #codi;
  #ciutat;
  #nom;
  #direccio;
  #tipus;
  #latitud;
  #longitud;
  #puntuacio;

  // Static counter of created instances
  static totalPuntsInteres = 0;

  constructor(pais, codi, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio) {
    // Assign an incremental id from the static counter
    PuntInteres.totalPuntsInteres++;
    this.#id = PuntInteres.totalPuntsInteres;
    this.#pais = pais;
    this.#codi = codi;
    this.#ciutat = ciutat;
    this.#nom = nom;
    this.#direccio = direccio;
    this.#tipus = tipus;
    this.#latitud = parseFloat(latitud);
    this.#longitud = parseFloat(longitud);
    this.#puntuacio = parseFloat(puntuacio);
  }

  // Getters to access the private attributes
  get id() {
    return this.#id;
  }

  get pais() {
    return this.#pais;
  }

  get codi() {
    return this.#codi;
  }

  get ciutat() {
    return this.#ciutat;
  }

  get nom() {
    return this.#nom;
  }

  get direccio() {
    return this.#direccio;
  }

  get tipus() {
    return this.#tipus;
  }

  get latitud() {
    return this.#latitud;
  }

  get longitud() {
    return this.#longitud;
  }

  get puntuacio() {
    return this.#puntuacio;
  }

  // Basic setters
  set id(novId) {
    this.#id = novId;
  }

  set codi(nouCodi) {
    this.#codi = nouCodi;
  }

  set ciutat(novaCiutat) {
    this.#ciutat = novaCiutat;
  }

  // Static helper that returns how many instances have been created
  static obtenirTotalElements() {
    return PuntInteres.totalPuntsInteres;
  }
}
