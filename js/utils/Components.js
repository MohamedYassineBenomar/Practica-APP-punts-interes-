import { Atraccio } from "../models/Atraccio.js";
import { Museu } from "../models/Museu.js";
import { Espai } from "../models/Espai.js";

// Generador de fragments del DOM. Mai no fem servir innerHTML per
// construir elements: tot es crea amb createElement i textContent.
export class Components {
  // Crea un element genèric amb classes i text opcional
  static crearElement(tag, classes = [], text = "") {
    const element = document.createElement(tag);
    classes.forEach((cls) => element.classList.add(cls));
    if (text !== "") {
      element.textContent = text;
    }
    return element;
  }

  // Crea la targeta visual per a un punt d'interès
  // callbackEliminar es crida quan l'usuari prem el botó de suprimir
  static crearTargetaPunt(punt, callbackEliminar) {
    const item = Components.crearElement("article", ["punt-item", punt.tipus]);

    // Capçalera amb el nom i el botó d'eliminar
    const capcalera = Components.crearElement("div", ["punt-capcalera"]);
    const titol = Components.crearElement("h3", ["punt-titol"], punt.nom);
    const btnEliminar = Components.crearElement("button", ["btn-eliminar"], "✕");
    btnEliminar.setAttribute("aria-label", "Eliminar punt d'interès");
    btnEliminar.addEventListener("click", () => callbackEliminar(punt.id));
    capcalera.appendChild(titol);
    capcalera.appendChild(btnEliminar);
    item.appendChild(capcalera);

    // Direcció i puntuació (comuns a tots els tipus)
    const direccio = Components.crearElement("p", ["punt-direccio"], punt.direccio);
    item.appendChild(direccio);
    const puntuacio = Components.crearElement("p", ["punt-puntuacio"], `Puntuació: ${punt.puntuacio}`);
    item.appendChild(puntuacio);

    // Bloc d'informació depenent del tipus concret de punt
    const info = Components.crearElement("div", ["punt-info"]);
    if (punt instanceof Atraccio) {
      info.appendChild(Components.crearElement("span", ["info-tag", "tag-tipus"], "Atracció"));
      info.appendChild(Components.crearElement("span", ["info-tag"], `Horaris: ${punt.horaris}`));
      info.appendChild(Components.crearElement("span", ["info-tag"], `Preu: ${punt.preuIva()}`));
      const apte = punt.esApteTotPublic() ? "Tot públic" : "Adults";
      info.appendChild(Components.crearElement("span", ["info-tag"], `Públic: ${apte}`));
    } else if (punt instanceof Museu) {
      info.appendChild(Components.crearElement("span", ["info-tag", "tag-tipus"], "Museu"));
      info.appendChild(Components.crearElement("span", ["info-tag"], `Horaris: ${punt.horaris}`));
      info.appendChild(Components.crearElement("span", ["info-tag"], `Preu: ${punt.preuIva()}`));
      info.appendChild(Components.crearElement("span", ["info-tag"], `Descripció: ${punt.descripcio}`));
    } else if (punt instanceof Espai) {
      info.appendChild(Components.crearElement("span", ["info-tag", "tag-tipus"], "Espai"));
    }
    item.appendChild(info);

    return item;
  }

  // Omple un select amb els tipus rebuts (un Set) més l'opció "Tots"
  static omplirSelectTipus(selectObj, tipusSet) {
    // Buidem totes les opcions actuals
    while (selectObj.firstChild) {
      selectObj.removeChild(selectObj.firstChild);
    }
    // Opció per defecte: tots
    const opcioTots = Components.crearElement("option", [], "Tots");
    opcioTots.value = "tots";
    selectObj.appendChild(opcioTots);
    // Una opció per cada tipus detectat al CSV
    tipusSet.forEach((tipus) => {
      const opcio = Components.crearElement("option", [], Components.#capitalitzar(tipus));
      opcio.value = tipus;
      selectObj.appendChild(opcio);
    });
  }

  // Crea el bloc de la capçalera amb la bandera i la ciutat
  static crearInfoPais(urlBandera, alt, ciutat) {
    const contenidor = Components.crearElement("div", ["info-pais"]);
    if (urlBandera !== "") {
      const bandera = document.createElement("img");
      bandera.src = urlBandera;
      bandera.alt = alt;
      bandera.classList.add("bandera");
      contenidor.appendChild(bandera);
    }
    contenidor.appendChild(Components.crearElement("span", ["nom-ciutat"], ciutat));
    return contenidor;
  }

  // Posa la primera lletra en majúscula (per mostrar el tipus al select)
  static #capitalitzar(text) {
    if (text.length === 0) {
      return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
