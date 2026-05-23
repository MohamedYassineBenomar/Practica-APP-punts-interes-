import { PuntInteres } from "./PuntInteres.js";
import { IVA } from "../const/constants.js";

// Minimum age above which the content is considered adults-only
const EDAT_ADULT = 18;

// Attraction (theme park, show...) — inherits from PuntInteres
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

  // Returns the price applying VAT (if defined for the country)
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
    // No VAT defined for this country: return the raw price
    const preuFormat = this.#preu.toFixed(2).replace(".", ",");
    return `${preuFormat}${this.#moneda} (no IVA)`;
  }

  // Indicates whether the attraction is suitable for all audiences
  esApteTotPublic() {
    if (Number.isNaN(this.#edat)) {
      return true;
    }
    return this.#edat < EDAT_ADULT;
  }
}
