import { PuntInteres } from "./PuntInteres.js";
import { IVA } from "../const/constants.js";

// Edat a partir de la qual el contingut no és apte per a tot el públic
const EDAT_ADULT = 18;

// Atracció (parc, espectacle...) que hereta de PuntInteres
export class Atraccio extends PuntInteres {
  #horaris;
  #preu;
  #edat;
  #moneda;

  constructor(pais, codi, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, horaris, preu, edat, moneda) {
    super(pais, codi, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio);
    this.#horaris = horaris;
    this.#preu = parseFloat(preu);
    this.#edat = parseInt(edat);
    this.#moneda = moneda;
  }

  // Getters
  get horaris() {
    return this.#horaris;
  }

  get preu() {
    return this.#preu;
  }

  get edat() {
    return this.#edat;
  }

  get moneda() {
    return this.#moneda;
  }

  // Calcula el preu amb IVA segons el codi del país
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
    // Si no hi ha IVA definit, retornem el preu sense IVA
    const preuFormat = this.#preu.toFixed(2).replace(".", ",");
    return `${preuFormat}${this.#moneda} (no IVA)`;
  }

  // Indica si el contingut és apte per a tot el públic
  esApteTotPublic() {
    if (Number.isNaN(this.#edat)) {
      return true;
    }
    return this.#edat < EDAT_ADULT;
  }
}
