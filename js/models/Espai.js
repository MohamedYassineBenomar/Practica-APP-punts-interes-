import { PuntInteres } from "./PuntInteres.js";

// Espai obert (plaça, parc...) que hereta de PuntInteres
// No té atributs propis: és un punt d'interès sense preu ni horari
export class Espai extends PuntInteres {
  constructor(pais, codi, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio) {
    super(pais, codi, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio);
  }
}
