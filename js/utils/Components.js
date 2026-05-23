import { Atraccio } from "../models/Atraccio.js";
import { Museu } from "../models/Museu.js";
import { Espai } from "../models/Espai.js";

// DOM fragment factory. innerHTML is never used to build elements:
// everything is created with createElement + textContent.
export class Components {
  // Creates a generic element with optional classes and text content
  static crearElement(tag, classes = [], text = "") {
    const element = document.createElement(tag);
    classes.forEach((cls) => element.classList.add(cls));
    if (text !== "") {
      element.textContent = text;
    }
    return element;
  }

  // Builds the visual card for a single point of interest.
  // callbackEliminar is invoked when the user clicks the delete button.
  static crearTargetaPunt(punt, callbackEliminar) {
    const item = Components.crearElement("article", ["punt-item", punt.tipus]);

    // Header with the name and the delete button
    const capcalera = Components.crearElement("div", ["punt-capcalera"]);
    const titol = Components.crearElement("h3", ["punt-titol"], punt.nom);
    const btnEliminar = Components.crearElement("button", ["btn-eliminar"], "✕");
    btnEliminar.setAttribute("aria-label", "Eliminar punt d'interès");
    btnEliminar.addEventListener("click", () => callbackEliminar(punt.id));
    capcalera.appendChild(titol);
    capcalera.appendChild(btnEliminar);
    item.appendChild(capcalera);

    // Address and rating (shared by every type)
    const direccio = Components.crearElement("p", ["punt-direccio"], punt.direccio);
    item.appendChild(direccio);
    const puntuacio = Components.crearElement("p", ["punt-puntuacio"], `Puntuació: ${punt.puntuacio}`);
    item.appendChild(puntuacio);

    // Info block that depends on the concrete subclass
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

  // Fills a <select> with the given types (a Set) plus the default "Tots" option
  static omplirSelectTipus(selectObj, tipusSet) {
    // Wipe the current options first
    while (selectObj.firstChild) {
      selectObj.removeChild(selectObj.firstChild);
    }
    // Default option: all types
    const opcioTots = Components.crearElement("option", [], "Tots");
    opcioTots.value = "tots";
    selectObj.appendChild(opcioTots);
    // One option per type detected in the CSV
    tipusSet.forEach((tipus) => {
      const opcio = Components.crearElement("option", [], Components.#capitalitzar(tipus));
      opcio.value = tipus;
      selectObj.appendChild(opcio);
    });
  }

  // Builds the header block with the flag and the city name
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

  // Uppercases the first letter (used to display types in the select)
  static #capitalitzar(text) {
    if (text.length === 0) {
      return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
