# APP Punts d'Interès

|            |                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------ |
| Live demo  | https://mohamedyassinebenomar.github.io/Practica-APP-punts-interes-/                             |
| Video demo | https://drive.google.com/file/d/1muP_xKJuwan3YOZL4kAVxrgY-f83Oduk/view?usp=sharing               |

Aplicació web (JavaScript vanilla amb ES Modules) per llistar i mostrar punts
d'interès d'una ciutat sobre un mapa de Leaflet a partir d'un fitxer CSV.

## Funcionalitats

- Arrossega un fitxer `.csv` a la zona de drop i es carrega la llista de punts.
- Mostra la bandera del país (REST Countries) i la temperatura actual (Open-Meteo).
- Pinta tots els punts al mapa amb popup (nom, adreça, puntuació).
- Marcador d'**Estàs aquí** via Geolocation API.
- Filtres per **tipus**, cerca per **nom**, ordre **asc/desc** i botó per netejar.
- Eliminació individual amb confirmació; el total i el mapa s'actualitzen.

## Estructura

```
/
├── index.html
├── style/style.css
├── data/                            // CSVs de mostra (Barcelona i Londres)
└── js/
    ├── app.js
    ├── const/constants.js
    ├── models/
    │   ├── PuntInteres.js
    │   ├── Atraccio.js
    │   ├── Museu.js
    │   ├── Espai.js
    │   └── LlistaPuntsInteres.js
    ├── services/
    │   ├── Mapa.js
    │   ├── PaisService.js
    │   └── TempsService.js
    └── utils/
        ├── CsvReader.js
        └── Components.js
```

## Com executar-ho

Cal servir l'aplicació amb un servidor estàtic (els ES Modules no es poden carregar
amb `file://`).

```bash
# Opció 1: Python 3
python3 -m http.server 8000

# Opció 2: Node (npx)
npx http-server -p 8000

# Opció 3: Live Server (VSCode)
```

Després obre `http://localhost:8000` i arrossega un dels CSVs de la carpeta `data/`.

## Format dels CSVs

- Separador: `;`
- Capçaleres: `pais;codi;ciutat;tipus;nom;direcció;latitud;longitud;horaris;preu;descripcio;puntuacio;edat;moneda`
- El camp `edat` pot ser opcional (per ex. al CSV de Londres).
- El camp `tipus` admet variacions de majúscules/minúscules (`Atraccio`/`atraccio`).
