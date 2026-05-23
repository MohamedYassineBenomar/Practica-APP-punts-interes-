// Encapsula la col·lecció de punts d'interès i totes les operacions
// (afegir, eliminar, filtrar, ordenar...). Manté la llista original
// i una llista "visible" amb els filtres aplicats.
export class LlistaPuntsInteres {
  #punts;
  #filtreTipus;
  #filtreNom;
  #ordre;

  constructor() {
    this.#punts = [];
    this.#filtreTipus = "tots";
    this.#filtreNom = "";
    this.#ordre = "asc";
  }

  // Getters bàsics
  get punts() {
    return this.#punts;
  }

  get filtreTipus() {
    return this.#filtreTipus;
  }

  get filtreNom() {
    return this.#filtreNom;
  }

  get ordre() {
    return this.#ordre;
  }

  // Setters dels filtres
  set filtreTipus(nouTipus) {
    this.#filtreTipus = nouTipus;
  }

  set filtreNom(nouNom) {
    this.#filtreNom = nouNom.toLowerCase();
  }

  set ordre(nouOrdre) {
    this.#ordre = nouOrdre;
  }

  // Afegeix un punt a la col·lecció
  afegir(punt) {
    this.#punts.push(punt);
  }

  // Substitueix tota la col·lecció per una nova llista
  carregar(nousPunts) {
    this.#punts = nousPunts;
  }

  // Elimina un punt pel seu identificador
  eliminarPerId(id) {
    this.#punts = this.#punts.filter((punt) => punt.id !== id);
  }

  // Buida tota la llista
  buidar() {
    this.#punts = [];
  }

  // Retorna el total d'elements de la llista (sense filtres)
  total() {
    return this.#punts.length;
  }

  // Retorna el conjunt de tipus diferents presents a la llista
  obtenirTipusUnics() {
    const tipusSet = new Set();
    this.#punts.forEach((punt) => {
      tipusSet.add(punt.tipus);
    });
    return tipusSet;
  }

  // Retorna la llista filtrada i ordenada segons els filtres actius
  obtenirVisibles() {
    let resultat = this.#punts.slice();

    // Filtrem per tipus si no és "tots"
    if (this.#filtreTipus !== "tots") {
      resultat = resultat.filter((punt) => punt.tipus === this.#filtreTipus);
    }

    // Filtrem per nom (cerca per contingut, no sensible a majúscules)
    if (this.#filtreNom !== "") {
      resultat = resultat.filter((punt) => {
        return punt.nom.toLowerCase().includes(this.#filtreNom);
      });
    }

    // Ordenem alfabèticament pel nom
    resultat.sort((a, b) => {
      const nomA = a.nom.toLowerCase();
      const nomB = b.nom.toLowerCase();
      if (this.#ordre === "asc") {
        return nomA.localeCompare(nomB);
      }
      return nomB.localeCompare(nomA);
    });

    return resultat;
  }
}
