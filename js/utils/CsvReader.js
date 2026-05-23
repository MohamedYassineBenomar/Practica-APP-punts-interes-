import { Atraccio } from "../models/Atraccio.js";
import { Museu } from "../models/Museu.js";
import { Espai } from "../models/Espai.js";

// Column separator used in the CSV files
const SEPARADOR = ";";

// Helper that reads a CSV file and turns it into PuntInteres instances
export class CsvReader {
  // Reads the File contents as text using FileReader
  llegirFitxer(fitxer) {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.onload = (event) => {
        resolve(event.target.result);
      };
      lector.onerror = () => {
        reject(new Error("No s'ha pogut llegir el fitxer"));
      };
      lector.readAsText(fitxer);
    });
  }

  // Parses the CSV content into a list of plain objects keyed by column name
  parsejar(contingut) {
    const linies = contingut.split("\n");
    if (linies.length < 2) {
      return [];
    }
    // First line: headers normalised to lowercase
    const capcaleres = linies[0].trim().split(SEPARADOR).map((c) => c.trim().toLowerCase());
    const registres = [];
    for (let i = 1; i < linies.length; i++) {
      const linia = linies[i].trim();
      if (linia === "") {
        continue;
      }
      const valors = linia.split(SEPARADOR).map((v) => v.trim());
      const registre = {};
      capcaleres.forEach((nom, index) => {
        registre[nom] = valors[index] !== undefined ? valors[index] : "";
      });
      registres.push(registre);
    }
    return registres;
  }

  // Builds the right subclass instance based on the (normalised) "tipus" field
  crearInstancia(registre) {
    const pais = registre["pais"] || "";
    const codi = registre["codi"] || "";
    const ciutat = registre["ciutat"] || "";
    const nom = registre["nom"] || "";
    // Header may come with or without accent ("direcció" / "direccio")
    const direccio = registre["direccio"] || registre["direcció"] || "";
    const tipusOriginal = (registre["tipus"] || "").toLowerCase();
    const latitud = registre["latitud"] || "0";
    const longitud = registre["longitud"] || "0";
    const puntuacio = registre["puntuacio"] || "0";
    const horaris = registre["horaris"] || "";
    const preu = registre["preu"] || "0";
    const moneda = registre["moneda"] || "";
    const descripcio = registre["descripcio"] || "";
    // The age column may be missing in some CSVs: default to 0 (all audiences)
    const edat = registre["edat"] || "0";

    if (tipusOriginal === "atraccio" || tipusOriginal === "atracció") {
      return new Atraccio(pais, codi, ciutat, nom, direccio, "atraccio", latitud, longitud, puntuacio, horaris, preu, edat, moneda);
    }
    if (tipusOriginal === "museu") {
      return new Museu(pais, codi, ciutat, nom, direccio, "museu", latitud, longitud, puntuacio, horaris, preu, moneda, descripcio);
    }
    if (tipusOriginal === "espai") {
      return new Espai(pais, codi, ciutat, nom, direccio, "espai", latitud, longitud, puntuacio);
    }
    // Unknown type: fall back to a generic Espai so we don't drop the record
    return new Espai(pais, codi, ciutat, nom, direccio, tipusOriginal, latitud, longitud, puntuacio);
  }

  // Full pipeline: read the file, parse it and instantiate the points
  async carregarPunts(fitxer) {
    const contingut = await this.llegirFitxer(fitxer);
    const registres = this.parsejar(contingut);
    const punts = registres.map((registre) => this.crearInstancia(registre));
    return punts;
  }
}
