# APP Punts de Interés


| ---------- | ------------------------------------------------------------------------------------------------ |
| Demo live  | https://mohamedyassinebenomar.github.io/Practica-APP-punts-interes-/                             |
| Vídeo demo | https://drive.google.com/file/d/1muP_xKJuwan3YOZL4kAVxrgY-f83Oduk/view?usp=sharing               |

Aplicación web (JavaScript vanilla con ES Modules) para listar y mostrar los
puntos de interés de una ciudad sobre un mapa de Leaflet a partir de un fichero CSV.

## Funcionalidades

- Arrastra un fichero `.csv` a la zona de drop y se carga la lista de puntos.
- Muestra la bandera del país (REST Countries) y la temperatura actual (Open-Meteo).
- Pinta todos los puntos en el mapa con popup (nombre, dirección, puntuación).
- Marcador de **Estás aquí** mediante la Geolocation API.
- Filtros por **tipo**, búsqueda por **nombre**, orden **asc/desc** y botón para limpiar.
- Eliminación individual con confirmación; el total y el mapa se actualizan.

## Estructura

```
/
├── index.html
├── style/style.css
├── data/                            // CSVs de muestra (Barcelona y Londres)
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

## Cómo ejecutarlo

Hay que servir la aplicación con un servidor estático (los ES Modules no se pueden
cargar con `file://`).

```bash
# Opción 1: Python 3
python3 -m http.server 8000

# Opción 2: Node (npx)
npx http-server -p 8000

# Opción 3: Live Server (VSCode)
```

Después abre `http://localhost:8000` y arrastra uno de los CSVs de la carpeta `data/`.

## Formato de los CSVs

- Separador: `;`
- Cabeceras: `pais;codi;ciutat;tipus;nom;direcció;latitud;longitud;horaris;preu;descripcio;puntuacio;edat;moneda`
- El campo `edat` puede ser opcional (por ejemplo, en el CSV de Londres).
- El campo `tipus` admite variaciones de mayúsculas/minúsculas (`Atraccio`/`atraccio`).
