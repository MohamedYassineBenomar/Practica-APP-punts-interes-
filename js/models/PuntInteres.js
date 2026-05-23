// Classe base per a qualsevol punt d'interès
// Encapsula els atributs comuns: identificador, ubicació, nom, etc.
export class PuntInteres {
  // Atributs privats
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

  // Comptador estàtic d'instàncies creades
  static totalPuntsInteres = 0;

  constructor(pais, codi, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio) {
    // Assignem un id incremental basat en el comptador estàtic
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

  // Getters per accedir als atributs privats
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

  // Setters bàsics
  set id(novId) {
    this.#id = novId;
  }

  set codi(nouCodi) {
    this.#codi = nouCodi;
  }

  set ciutat(novaCiutat) {
    this.#ciutat = novaCiutat;
  }

  // Mètode estàtic per obtenir el total d'instàncies creades
  static obtenirTotalElements() {
    return PuntInteres.totalPuntsInteres;
  }
}
