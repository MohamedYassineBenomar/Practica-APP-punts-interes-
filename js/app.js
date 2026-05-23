import { LlistaPuntsInteres } from "./models/LlistaPuntsInteres.js";
import { PuntInteres } from "./models/PuntInteres.js";
import { Mapa } from "./services/Mapa.js";
import { PaisService } from "./services/PaisService.js";
import { TempsService } from "./services/TempsService.js";
import { CsvReader } from "./utils/CsvReader.js";
import { Components } from "./utils/Components.js";
import { LAT_DEFECTE, LONG_DEFECTE, MSG_FITXER_NO_CSV, MSG_CONFIRM_ELIMINAR } from "./const/constants.js";

// Instàncies globals (una sola per pàgina)
const mapa = new Mapa("mapa");
const llista = new LlistaPuntsInteres();
const lectorCsv = new CsvReader();
const paisService = new PaisService();
const tempsService = new TempsService();

// Referències al DOM amb el sufix Obj segons la convenció
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

// Inicialització: geolocalització + listeners de la interfície
const inicialitzar = () => {
  obtenirGeolocalitzacio();
  registrarListeners();
};

// Demana la posició actual a l'usuari i pinta el marcador "Estàs aquí"
const obtenirGeolocalitzacio = () => {
  if (!navigator.geolocation) {
    mapa.mostrarEstasAqui(LAT_DEFECTE, LONG_DEFECTE);
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (posicio) => {
      const lat = posicio.coords.latitude;
      const long = posicio.coords.longitude;
      mapa.latInit = lat;
      mapa.longInit = long;
      mapa.mostrarEstasAqui(lat, long);
    },
    () => {
      // Si l'usuari denega la geolocalització o hi ha error, valors per defecte
      mapa.mostrarEstasAqui(LAT_DEFECTE, LONG_DEFECTE);
    }
  );
};

// Registra els listeners del drop, dels filtres i del botó de netejar
const registrarListeners = () => {
  // Drag & drop del fitxer CSV
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

  // Filtres
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

  // Botó per buidar tota la llista
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

// Comprova que el fitxer sigui csv i en carrega els punts
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

// Pinta la llista de punts i sincronitza el mapa amb els filtres actius
const renderitzar = () => {
  // Buidem la llista del DOM
  while (llistaObj.firstChild) {
    llistaObj.removeChild(llistaObj.firstChild);
  }
  const visibles = llista.obtenirVisibles();
  visibles.forEach((punt) => {
    const targeta = Components.crearTargetaPunt(punt, eliminarPunt);
    llistaObj.appendChild(targeta);
  });
  // Actualitzem el total (basat en la llista completa, no en la filtrada)
  totalObj.textContent = `Total punts d'interès: ${llista.total()}`;
  // Refresquem el select de tipus per si han aparegut tipus nous
  Components.omplirSelectTipus(selectTipusObj, llista.obtenirTipusUnics());
  selectTipusObj.value = llista.filtreTipus;
  // Refresquem el mapa amb els punts visibles
  mapa.borrarPunts();
  mapa.mostrarEstasAqui(mapa.latInit, mapa.longInit);
  mapa.mostrarPunts(visibles);
};

// Elimina un punt amb confirmació prèvia
const eliminarPunt = (id) => {
  if (confirm(MSG_CONFIRM_ELIMINAR)) {
    llista.eliminarPerId(id);
    renderitzar();
  }
};

// Consulta REST Countries i mostra bandera + ciutat
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

// Consulta Open-Meteo i mostra la temperatura actual
const carregarTemps = async (latitud, longitud) => {
  tempsObj.textContent = "";
  const temps = await tempsService.obtenirTempsActual(latitud, longitud);
  if (temps === null) {
    return;
  }
  tempsObj.textContent = `Temperatura actual: ${temps.temperature}°C`;
};

// Mostra un missatge a l'usuari amb classe d'estat (info/error)
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

// Engeguem l'aplicació quan el DOM estigui llest
document.addEventListener("DOMContentLoaded", inicialitzar);
