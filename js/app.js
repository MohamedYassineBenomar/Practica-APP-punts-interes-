import { LlistaPuntsInteres } from "./models/LlistaPuntsInteres.js";
import { PuntInteres } from "./models/PuntInteres.js";
import { Mapa } from "./services/Mapa.js";
import { PaisService } from "./services/PaisService.js";
import { TempsService } from "./services/TempsService.js";
import { CsvReader } from "./utils/CsvReader.js";
import { Components } from "./utils/Components.js";
import { LAT_DEFECTE, LONG_DEFECTE, MSG_FITXER_NO_CSV, MSG_CONFIRM_ELIMINAR } from "./const/constants.js";

// Global instances (single per page)
const mapa = new Mapa("mapa");
const llista = new LlistaPuntsInteres();
const lectorCsv = new CsvReader();
const paisService = new PaisService();
const tempsService = new TempsService();

// DOM references — variables holding a DOM node carry the "Obj" suffix
const dropZoneObj = document.querySelector(".dropZone");
const dropZoneTextObj = document.querySelector(".dropZone-text");
const llistaObj = document.querySelector(".llista-punts");
const totalObj = document.querySelector(".total-punts");
const selectTipusObj = document.querySelector(".filtre-tipus");
const txbNomObj = document.querySelector(".filtre-nom");
const selectOrdreObj = document.querySelector(".filtre-ordre");
const btnNetejarObj = document.querySelector(".btn-netejar");
const infoPaisObj = document.querySelector(".info-pais-container");
const tempsObj = document.querySelector(".info-temps");
const missatgeObj = document.querySelector(".missatge");

// Bootstrap: geolocation + UI listeners
const inicialitzar = () => {
  obtenirGeolocalitzacio();
  registrarListeners();
};

// Asks for the user's location and drops the "You are here" marker.
// Only this initial bootstrap recenters the map; later re-renders never do.
const obtenirGeolocalitzacio = () => {
  if (!navigator.geolocation) {
    mapa.mostrarEstasAqui(LAT_DEFECTE, LONG_DEFECTE);
    mapa.centrar(LAT_DEFECTE, LONG_DEFECTE);
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (posicio) => {
      const lat = posicio.coords.latitude;
      const long = posicio.coords.longitude;
      mapa.latInit = lat;
      mapa.longInit = long;
      mapa.mostrarEstasAqui(lat, long);
      mapa.centrar(lat, long);
    },
    () => {
      // The user denied geolocation or an error happened: fall back to defaults
      mapa.mostrarEstasAqui(LAT_DEFECTE, LONG_DEFECTE);
      mapa.centrar(LAT_DEFECTE, LONG_DEFECTE);
    }
  );
};

// Registers the drop, filter and "clear" listeners
const registrarListeners = () => {
  // CSV drag & drop zone
  dropZoneObj.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZoneObj.classList.add("dropZone-actiu");
  });
  dropZoneObj.addEventListener("dragleave", () => {
    dropZoneObj.classList.remove("dropZone-actiu");
  });
  dropZoneObj.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZoneObj.classList.remove("dropZone-actiu");
    const fitxers = event.dataTransfer.files;
    if (fitxers.length > 0) {
      gestionarFitxer(fitxers[0]);
    }
  });

  // Filters
  selectTipusObj.addEventListener("change", (event) => {
    llista.filtreTipus = event.target.value;
    renderitzar();
  });
  txbNomObj.addEventListener("input", (event) => {
    llista.filtreNom = event.target.value;
    renderitzar();
  });
  selectOrdreObj.addEventListener("change", (event) => {
    llista.ordre = event.target.value;
    renderitzar();
  });

  // Button that wipes the entire list
  btnNetejarObj.addEventListener("click", () => {
    llista.buidar();
    PuntInteres.totalPuntsInteres = 0;
    renderitzar();
    mapa.borrarPunts();
    mapa.mostrarEstasAqui(mapa.latInit, mapa.longInit);
    netejarMissatge();
    netejarCapcalera();
  });
};

// Validates the file is a CSV and triggers the loading pipeline
const gestionarFitxer = async (fitxer) => {
  if (!fitxer.name.toLowerCase().endsWith(".csv")) {
    mostrarMissatge(MSG_FITXER_NO_CSV, "error");
    return;
  }
  netejarMissatge();
  try {
    const punts = await lectorCsv.carregarPunts(fitxer);
    llista.carregar(punts);
    renderitzar();
    if (punts.length > 0) {
      const primer = punts[0];
      carregarInfoPais(primer.codi, primer.ciutat);
      carregarTemps(primer.latitud, primer.longitud);
      mapa.centrar(primer.latitud, primer.longitud);
    }
  } catch (error) {
    console.error("Error gestionant el fitxer", error);
    mostrarMissatge("Error llegint el fitxer", "error");
  }
};

// Renders the list of points and keeps the map in sync with the active filters
const renderitzar = () => {
  // Clear the current list in the DOM
  while (llistaObj.firstChild) {
    llistaObj.removeChild(llistaObj.firstChild);
  }
  const visibles = llista.obtenirVisibles();
  visibles.forEach((punt) => {
    const targeta = Components.crearTargetaPunt(punt, eliminarPunt);
    llistaObj.appendChild(targeta);
  });
  // Update the total using the full list (not the filtered one)
  totalObj.textContent = `Total punts d'interès: ${llista.total()}`;
  // Refresh the type select in case new types appeared
  Components.omplirSelectTipus(selectTipusObj, llista.obtenirTipusUnics());
  selectTipusObj.value = llista.filtreTipus;
  // Refresh the map with the currently visible points
  mapa.borrarPunts();
  mapa.mostrarEstasAqui(mapa.latInit, mapa.longInit);
  mapa.mostrarPunts(visibles);
};

// Deletes a point after asking for confirmation
const eliminarPunt = (id) => {
  if (confirm(MSG_CONFIRM_ELIMINAR)) {
    llista.eliminarPerId(id);
    renderitzar();
  }
};

// Queries REST Countries and renders flag + city in the header
const carregarInfoPais = async (codi, ciutat) => {
  netejarCapcalera();
  const dades = await paisService.obtenirDadesPais(codi);
  if (dades === null || dades.length === 0) {
    return;
  }
  const pais = dades[0];
  const urlBandera = pais.flags?.png || pais.flags?.svg || "";
  const altBandera = pais.flags?.alt || `Bandera de ${pais.name?.common || codi}`;
  const bloc = Components.crearInfoPais(urlBandera, altBandera, ciutat);
  infoPaisObj.appendChild(bloc);
};

// Queries Open-Meteo and renders the current temperature
const carregarTemps = async (latitud, longitud) => {
  tempsObj.textContent = "";
  const temps = await tempsService.obtenirTempsActual(latitud, longitud);
  if (temps === null) {
    return;
  }
  tempsObj.textContent = `Temperatura actual: ${temps.temperature}°C`;
};

// Shows a message to the user with the matching status class (info / error)
const mostrarMissatge = (text, tipus) => {
  missatgeObj.textContent = text;
  missatgeObj.classList.remove("missatge-info", "missatge-error");
  missatgeObj.classList.add(`missatge-${tipus}`);
};

const netejarMissatge = () => {
  missatgeObj.textContent = "";
  missatgeObj.classList.remove("missatge-info", "missatge-error");
};

const netejarCapcalera = () => {
  while (infoPaisObj.firstChild) {
    infoPaisObj.removeChild(infoPaisObj.firstChild);
  }
  tempsObj.textContent = "";
};

// Boot the app when the DOM is ready
document.addEventListener("DOMContentLoaded", inicialitzar);
