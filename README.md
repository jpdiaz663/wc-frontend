# WC Frontend

Biblioteca de **Web Components** con [Lit](https://lit.dev/), empaquetada con [Vite](https://vitejs.dev/). Incluye componentes base reutilizables, bloques de producto (`jp-*`), **tokens de diseño** (CSS), **Tailwind** como capa de utilidades y **Storybook** para documentación y desarrollo aislado.

---

## Requisitos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- npm (incluido con Node)

---

## Puesta en marcha

```bash
npm install
```

### Desarrollo (app demo con Vite)

```bash
npm run serve
```

Abre la URL que indique la consola (por defecto suele ser `http://localhost:5173`). La página de entrada carga `index.html` y el bundle definido en `src/index.js`.

### Build de producción

```bash
npm run build
```

Salida en la carpeta `dist/`.

### Storybook

```bash
npm run storybook
```

Por defecto en `http://localhost:6006`. Las historias viven junto a cada componente: `src/components/**/*.stories.ts`.

```bash
npm run build-storybook
```

Genera el sitio estático de Storybook (por defecto en `storybook-static/`).

---

## Stack

| Área | Tecnología |
|------|------------|
| Componentes | Lit 3 |
| Lenguaje | TypeScript |
| Bundler / dev server | Vite 7 |
| Estilos globales / utilidades | Tailwind CSS 3 + PostCSS + Autoprefixer |
| Diseño | Tokens en `tokens/` importados desde `src/styles/main.css` |
| Documentación UI | Storybook 10 (`@storybook/web-components-vite`, addons a11y y docs) |
| Carrusel | [@splidejs/splide](https://splidejs.com/) en `jp-content-slider` |
| Iconos | Feather por defecto en alertas; `base-icons` con varias librerías (Feather, Jam, Lucide, Remix, etc.) |

---

## Estructura del repositorio

```
wc-frontend/
├── index.html              # Punto de entrada HTML (demo)
├── vite.config.ts          # Configuración de Vite
├── tsconfig.json           # TypeScript (decoradores Lit)
├── tailwind.config.js      # Tailwind (preset en tailwind.preset.js)
├── tokens/
│   ├── tokens.json         # Fuente de tokens (referencia / tooling)
│   └── tokens.css          # Variables CSS consumidas por la app
├── .storybook/             # Configuración de Storybook
├── src/
│   ├── index.js            # Entrada: estilos + registro de componentes demo
│   ├── styles/
│   │   └── main.css        # tokens + @tailwind base/components/utilities
│   ├── components/
│   │   ├── hello-world.ts  # Pantalla de demostración
│   │   ├── base/           # Primitivos compartidos
│   │   │   ├── jp-base-element.ts
│   │   │   ├── base-alert/
│   │   │   ├── base-button/
│   │   │   └── base-icons/  # + libraries/ (feather, jam, lucide, remix, …)
│   │   └── jp/             # Componentes de producto / bloques
│   │       ├── jp-card-spotlight/
│   │       └── jp-content-slider/
│   └── stories/            # Ejemplos por defecto de Storybook (plantilla)
└── dist/                   # Salida de `npm run build` (no versionar como fuente)
```

---

## Componentes y etiquetas custom

Los nombres de archivo usan **kebab-case**; el **tag** HTML es el que define cada clase (`@customElement` o `customElements.define`).

| Tag | Origen (ruta principal) | Rol |
|-----|------------------------|-----|
| `<hello-world>` | `src/components/hello-world.ts` | Demo que compone alerta, botón, spotlight e iconos |
| `<base-alert>` | `src/components/base/base-alert/base-alert.ts` | Alerta con `statusType`, `size`, `showIcon`, `icon` (Feather) |
| `<jp-button>` | `src/components/base/base-button/base-button.ts` | Botón o enlace estilizado (`label`, `variant`, `size`, `url`, `target`, …) |
| `<base-icons>` | `src/components/base/base-icons/base-icons.ts` | Icono SVG según `name`, `library`, `size` |
| `<jp-card-spotlight>` | `src/components/jp/jp-card-spotlight/jp-card-spotlight.ts` | Grid + panel tipo spotlight; prop `cards`, slots de cabecera |
| `<jp-content-slider>` | `src/components/jp/jp-content-slider/jp-content-slider.ts` | Carrusel Splide; hijos como slides |

Ejemplo mínimo tras importar el módulo que registra los componentes:

```html
<base-alert statusType="info" size="medium" showIcon>
  <span>Mensaje en el slot por defecto.</span>
</base-alert>

<jp-button label="Acción" variant="primary" size="medium">
  <span>Texto visible</span>
</jp-button>

<base-icons name="heart" library="feather" size="32"></base-icons>
```

---

## Notas de desarrollo

- **Decoradores**: `tsconfig.json` usa `experimentalDecorators: true` y `useDefineForClassFields: false` para compatibilidad con Lit.
- **SVG no confiable**: `base-alert` usa `unsafeSVG` de Lit solo con SVG generado internamente (iconos). No alimentar estas APIs con contenido de usuario sin sanitizar.
- **Registro de custom elements**: donde aplica, se evita doble registro comprobando `customElements.get(...)` antes de `define`.
- **Tokens**: variables como `--color-text-primary` o `--font-family-sans` viven en `tokens/tokens.css`; Tailwind y los componentes pueden apoyarse en ellas vía `var(...)`.
