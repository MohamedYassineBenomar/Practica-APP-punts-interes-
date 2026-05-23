# Guia d'estil de codi — JavaScript

> Convencions de codi tal com s'han estudiat als materials del mòdul
> *Desenvolupament sostenible d'aplicacions web* / *Desenvolupament entorn client (M06)*.
> Tots els exemples segueixen l'estil exacte vist a classe.

---

## 1. Variables

### `const` / `let` / `var`

| Paraula | Quan s'utilitza | Nomenclatura |
|---------|-----------------|--------------|
| `const` | Quan el valor **no canvia** durant l'execució (any de naixement, PI, …). Sempre que puguem, declarem `const` abans que `let`. S'ha de declarar **sempre amb un valor**. | Si el valor és **primitiu i directe** (no calculat) → **MAJÚSCULES**. En els altres casos → **camelCase**. |
| `let` | Quan el valor **pot canviar** durant l'execució (comptadors, número random, …). | Sempre **camelCase**. |
| `var` | Mateix ús que `let`, però **s'aconsella NO utilitzar-la!!** (problemes de *hoisting* i *block scope*). | — |

```javascript
// Constants:
// Son valors que no canviaran
// Amb majúscula ja que s'assignen valors primitius
const BIRTH_YEAR = 1991;
const CURRENT_YEAR = 2024;

// Let ja que el seu valor pot canviar.
// El let es pot assignar sense valor.
// Es defineix amb camelCase.
let age;

// Constant:
// El seu valor no canvia.
// Al no ser un valor primitiu
// es defineix amb camelCase
const calcYear = function () {
  age = CURRENT_YEAR - BIRTH_YEAR;
  console.log("La teva edat és " + age);
};

calcYear();
```

### Regles de nomenclatura

- Utilitzar els caràcters `0-9`, `a-z`, `A-Z` i el guió baix `_`.
- **No** utilitzar números ni el guió baix `_` a l'inici de la variable.
- Utilitzar la convenció **camelCase**.
- *Case sensitive*: `myage != myAge`.
- **No** utilitzar paraules reservades: `for`, `if`, …

### Per què `const` i `let` i no `var`?

- **TDZ (Temporal Dead Zone):** amb `let` i `const`, si s'utilitza una variable abans de declarar-la, dona un error de compilació.
- **`var`** pateix de *hoisting*, problemes de *block scope* i permet tornar a declarar la mateixa variable → font de bugs.

---

## 2. Tipus de dades i conversions

### Conversió a número

```javascript
Number("123");      // 123    → Estricte, no permet lletres
Number("123abc");   // NaN
parseInt("100px");  // 100    → Tolerant, ignora caràcters. No permet decimal.
parseFloat("1.75m");// 1.75   → Tolerant, ignora caràcters. Permet decimal.
```

### Comprovar si és un número

```javascript
// Input on l'usuari introdueix els números
let txbNumObj = document.querySelector(".guess");

// L'input retorna un value de tipus string (Encara que hi posem un número)
let numString = txbNumObj.value; // String

// Tenim dos opcions: ParseInt
let numNumber = parseInt(numString);

// Per comprovar si el numero és un number o un text
if (Number.isNaN(numNumber)) {
  console.log("NO és un numero");
} else {
  console.log("Si és un numero");
}
```

### Concatenar text

```javascript
// Amb l'operador +
console.log("La teva edat és " + age);

// Template string (forma més moderna)
console.log(`Hola, em dic ${nom} i tinc ${edat} anys.`);
```

---

## 3. Sentències condicionals i bucles

```javascript
// If / else
if (expressio) {
  // instruccions
} else {
  // instruccions
}

// While
let i = 0;
while (i < 10) {
  i += 2;
}

// Do...while
let j = 0;
do {
  j += 2;
} while (j < 10);

// For...of (recorre col·leccions)
const animals = ["gos", "gat", "cavall"];
for (const animal of animals) {
  console.log(animal);
}
```

- `break` → surt del bucle.
- `continue` → salta a la següent iteració (no surt del bucle).

---

## 4. Tipus de funcions

| Tipus | Característiques |
|-------|-----------------|
| **Function declaration** | Té nom. **Es pot cridar abans de declarar-la**. |
| **Function expression** | Es guarda en una variable. Normalment amb funcions anònimes. **No** es pot cridar abans de declarar-la. |
| **Arrow function** | Es guarda en una variable. Funció compactada. **No** es recomana per definir objectes (no té `this` del mateix *scope*). Ideal per a funcions petites, simples i *callbacks*. |

```javascript
// Function declaration
function calcularEdat(any) {
  return 2026 - any;
}

// Function expression
const calcularEdat = function (any) {
  return 2026 - any;
};

// Arrow function (bloc)
const calcularEdat = (any) => {
  const edat = 2026 - any;
  return edat;
};

// Arrow function (compactada)
const calcularEdat = (any) => 2026 - any;

// Es criden totes igual:
calcularEdat(1990);
```

### Callbacks

> Són funcions (*expression* o *arrow*) que es passen com a paràmetre d'altres funcions.
> Molt aconsellable utilitzar les **arrow function**. Habituals a `addEventListener`, `setTimeout`, `setInterval`.

```javascript
const funcioPrincipal = function (myCallback) {
  myCallback();
};

const funcioParam = () => {
  console.log("Executo la funció per paràmetre");
};

funcioPrincipal(funcioParam);
```

---

## 5. DOM

### Seleccionar elements

```javascript
// querySelector → un únic element per selector
const element3 = document.querySelector("header .main-tittle");

// querySelectorAll → tots els elements (retorna NodeList)
const element4 = document.querySelectorAll("header .main-tittle");

// Per id
const element = document.getElementById("tittle-id");

// Per classe (retorna HTMLCollection)
const element2 = document.getElementsByClassName("main-tittle");
```

> **Convenció important:** les variables que guarden un element del DOM porten el sufix **`Obj`**.

### Events + crear elements

```javascript
const btnAddItemObj = document.querySelector(".add-item");
const divContainerObj = document.querySelector(".container");

btnAddItemObj.addEventListener("click", function () {
  afegirItem();
});

function afegirItem() {
  // Creem un element html de tipus paràgraf.
  const item = document.createElement("p");

  // Li afegim un text
  item.textContent = "Títol de l'ítem.";

  // Li afegim estils a través d'una classe.
  // Recorda que la classe ha d'estar creada.
  item.classList.add("text");

  // Afegirem el nou element creat a l'html.
  divContainerObj.insertAdjacentElement("beforeend", item);
}
```

### Modificar classes i estils

```javascript
const NUM_CLASSES = 4;
const caixaCanvi = document.getElementById("caixa-canvi-estat");
const infoEstat = document.getElementById("info-ciclic");
let comptador = 1;

function canviaCSS() {
  caixaCanvi.classList.remove("estat-1", "estat-2", "estat-3", "estat-4");
  let estat = (comptador % NUM_CLASSES) + 1;
  let nomClass = `estat-${estat}`;
  caixaCanvi.classList.add(nomClass);
  infoEstat.textContent = estat;
  comptador++;
}
```

- `display: none;` → l'element existeix però no es renderitza (no ocupa espai).
- `visibility: hidden;` → existeix i ocupa espai, però és invisible.

---

## 6. Objectes i classes (OOP)

### Objecte simple

```javascript
const objSimple = {
  raca: "Border collie",
  vacunat: true
};
```

### Classe

```javascript
class Persona {
  // Li definim un constructor
  constructor(nom, edat) {
    // Atributs de la classe
    this.nom = nom;
    this.edat = edat;
  }

  // Mètode de la classe
  presentar() {
    console.log(`Hola, em dic ${this.nom} i tinc ${this.edat} anys.`);
  }
}

// Cridem una instància amb el new
const persona1 = new Persona("Anna", 30);
console.log(persona1);
persona1.presentar();
```

### Getters i setters

```javascript
class Persona {
  #edat;

  constructor(nom, edat) {
    this.nom = nom;
    this.#edat = edat;
  }

  get edat() {
    return this.#edat;
  }

  set edat(novaEdat) {
    this.#edat = novaEdat;
  }
}
```

### Propietats i mètodes privats

```javascript
class Client {
  #nif; // Propietat privada

  constructor(nom, nif) {
    this.nom = nom;
    this.#nif = nif;
  }

  mostrarInfo() {
    console.log(`El nom de l'usuari és ${this.nom} amb NIF ${this.#getNifProtegit()}.`);
  }

  // Mètode privat
  #getNifProtegit() {
    return "*****" + this.#nif.slice(5);
  }
}
```

### Herència

```javascript
// Classe Pare
class Animal {
  constructor(nom, tipus) {
    this.nom = nom;
    this.tipus = tipus;
  }

  getSoroll() {
    console.log("Els animals fan sorolls...");
  }
}

// Classe Filla
class Gos extends Animal {
  constructor(nom, tipus, raca) {
    super(nom, tipus);
    this.raca = raca;
  }

  // Sobreescriure el mètode getSoroll
  getSoroll() {
    console.log("Els gossos lladren!");
  }
}

const gos1 = new Gos("Jackie", "Gos", "Border collie");
```

---

## 7. Arrays

```javascript
const array = ["a", "b", "c"];
```

### Mètodes que retornen un nou array (no modifiquen l'original)

```javascript
const newArray = array.map((x) => x * 2);     // [1,2,3,4] → [2,4,6,8]
const newArray = array.filter((x) => x > 2);  // [1,2,3,4] → [3,4]
const newArray = array.slice(1, 3);           // [1,2,3,4] → [2,3]
const newArray = array.concat([5, 6]);        // → [1,2,3,4,5,6]
```

### Mètodes que modifiquen l'array original

```javascript
array.push(5);     // afegeix al final
array.unshift(0);  // afegeix al principi
array.pop();       // elimina l'últim
array.shift();     // elimina el primer
array.splice(2, 1);// elimina des de la posició 2, 1 element
array.reverse();   // inverteix l'ordre
```

### Mètodes de cerca

```javascript
array.find((n) => n > 2);      // primer element que compleix → 3
array.findIndex((n) => n > 2); // posició → 2
array.some((n) => n > 3);      // true si almenys un compleix
array.every((n) => n > 0);     // true si tots compleixen
array.includes(3);             // true / false
```

### Array vs Set

```javascript
const array = ["a", "b", "c"];          // permet duplicats i ordre, accés per índex
const setObj = new Set(["a", "b", "c"]); // NO permet duplicats, molt eficient
```

---

## 8. Peticions asíncrones (fetch)

### Amb `.then()` / `.catch()` (errors controlats amb `status`)

```javascript
fetch("http://127.0.0.1:5501/alfabet.json")
  .then(function (resposta) {
    // Resposta del fetch
    console.log(resposta.ok, resposta.status);
    if (!resposta.ok) {
      throw new Error(`Error inesperat: ${resposta.status}`);
    } else {
      console.log("La consulta és correcte");
    }
    // Sempre ha de tenir un return...
    return resposta.json();
  })
  .then(function (dades) {
    // Dada que obtenim de la resposta. Es retorna amb format Json.
    console.log(dades);
  })
  .catch(function (error) {
    // Per controlar que no hi hagi errors durant el procés de la consulta
    console.error(error);
  });
```

### Amb `async` / `await` (forma recomanada)

```javascript
// Hem de definir la funció com async
async function getAlfabet() {
  const url = "http://127.0.0.1:5502/alfabet.json";
  try {
    // Fem la consulta del fetch amb await.
    const response = await fetch(url, { method: "GET" });

    // Validem que la consulta hagi anat bé.
    if (response.ok) {
      console.log("La consulta ha anat bé");
    } else {
      console.log("La consulta ha tingut algun error");
      // Llancem una excepció que controlarà el catch
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Obtenim la informació del resultat a través del json();
    const data = await response.json();
    if (data) {
      console.log("Hi ha informació");
    } else {
      console.log("No hi ha informació.");
    }
  } catch (error) {
    console.log("Error durant la consulta de la informació", error);
  } finally {
    console.log("Informació final de la consulta");
  }
}
```

**Recordatori sobre promeses:** `fetch` retorna una promesa (amb `state` i `value`). El `value` no es recupera directament → cal un `then` (o `await`). Cada `then` retorna una nova promesa.

---

## 9. Resum de l'estil

- **Indentació:** 2 espais.
- **Claus `{`** a la **mateixa línia** (`if (...) {`, `function nom() {`, `class X {`).
- **`else`, `catch`, `finally`** a la mateixa línia que la clau de tancament: `} else {`.
- **Punt i coma `;`** al final de cada sentència.
- **Cometes dobles** `"..."` per a strings; **template strings** `` `...` `` quan hi ha variables.
- **Comentaris en català**, amb `//`, breus i explicant la intenció del codi.
- **Variables del DOM** amb sufix **`Obj`** (`btnAddItemObj`, `divContainerObj`).
- **Constants primitives directes** en MAJÚSCULES (`NUM_CLASSES`, `BIRTH_YEAR`).
- **camelCase** per a la resta de variables, funcions i mètodes.
- Preferir **arrow functions** per a *callbacks*; **mai** `var`.
