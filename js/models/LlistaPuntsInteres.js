// Encapsulates the collection of points of interest and all the operations
// (add, remove, filter, sort...). It keeps the original list and exposes a
// "visible" view that reflects the active filters and the sort order.
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

  // Basic getters
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

  // Filter setters
  set filtreTipus(nouTipus) {
    this.#filtreTipus = nouTipus;
  }

  set filtreNom(nouNom) {
    this.#filtreNom = nouNom.toLowerCase();
  }

  set ordre(nouOrdre) {
    this.#ordre = nouOrdre;
  }

  // Adds a point to the collection
  afegir(punt) {
    this.#punts.push(punt);
  }

  // Replaces the whole collection with a new list
  carregar(nousPunts) {
    this.#punts = nousPunts;
  }

  // Removes the point with the given id
  eliminarPerId(id) {
    this.#punts = this.#punts.filter((punt) => punt.id !== id);
  }

  // Empties the list
  buidar() {
    this.#punts = [];
  }

  // Returns the total number of elements (ignoring filters)
  total() {
    return this.#punts.length;
  }

  // Returns the set of distinct types present in the list
  obtenirTipusUnics() {
    const tipusSet = new Set();
    this.#punts.forEach((punt) => {
      tipusSet.add(punt.tipus);
    });
    return tipusSet;
  }

  // Returns the list filtered + sorted according to the current settings
  obtenirVisibles() {
    let resultat = this.#punts.slice();

    // Filter by type when it is not "tots"
    if (this.#filtreTipus !== "tots") {
      resultat = resultat.filter((punt) => punt.tipus === this.#filtreTipus);
    }

    // Filter by name (substring search, case-insensitive)
    if (this.#filtreNom !== "") {
      resultat = resultat.filter((punt) => {
        return punt.nom.toLowerCase().includes(this.#filtreNom);
      });
    }

    // Sort alphabetically by name (asc / desc)
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
