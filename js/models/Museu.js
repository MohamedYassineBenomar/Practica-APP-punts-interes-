import { PuntInteres } from "./PuntInteres.js";
import { IVA } from "../const/constants.js";

// Museu que hereta de PuntInteres, amb descripció i preu
export class Museu extends PuntInteres {
  #horaris;
  #preu;
  #moneda;
  #descripcio;

  constructor(pais, codi, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, horaris, preu, moneda, descripcio) {
    super(pais, codi, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio);
    this.#horaris = horaris;
    this.#preu = parseFloat(preu);
    this.#moneda = moneda;
    this.#descripcio = descripcio;
  }

  // Getters
  get horaris() {
    return this.#horaris;
  }

  get preu() {
    return this.#preu;
  }

  get moneda() {
    return this.#moneda;
  }

  get descripcio() {
    return this.#descripcio;
  }

  // Calcula el preu amb IVA segons el codi del país (mateixa regla que Atraccio)
  preuIva() {
    if (this.#preu === 0) {
      return "Entrada gratuïta";
    }
    const tipusIva = IVA[this.codi];
    if (tipusIva !== undefined) {
      const preuAmbIva = this.#preu * (1 + tipusIva);
      const preuFormat = preuAmbIva.toFixed(2).replace(".", ",");
      return `${preuFormat}${this.#moneda} (IVA)`;
    }
    const preuFormat = this.#preu.toFixed(2).replace(".", ",");
    return `${preuFormat}${this.#moneda} (no IVA)`;
  }
}
