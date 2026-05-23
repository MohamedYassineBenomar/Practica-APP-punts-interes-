import { PuntInteres } from "./PuntInteres.js";

// Open space (square, park...) — inherits from PuntInteres.
// Has no extra attributes: it is a point of interest without price or schedule.
export class Espai extends PuntInteres {
  constructor(pais, codi, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio) {
    super(pais, codi, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio);
  }
}
