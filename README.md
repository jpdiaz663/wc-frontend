# WC Frontend (Lit + Vite)

A small demo frontend built with [Lit](https://lit.dev/) and [Vite](https://vitejs.dev/).  
It showcases custom web components like alerts and buttons, and a simple `hello-world` component that uses them.

---

## Tech Stack

- **Build tool**: Vite
- **Language**: TypeScript (compiled by Vite)
- **UI library**: Lit (`lit`, `lit/decorators.js`, Lit directives)
- **Target**: Modern browsers (ES2021)

---

## Getting Started

### 1. Install dependencies

From the project root:

```bash
npm install
```

### 2. Start the dev server

```bash
npm run serve
```

Then open the URL that Vite prints in the terminal (for example `http://localhost:5173` or similar).

### 3. Build for production

```bash
npm run build
```

The production build will be output to the `dist/` folder.

---

## Project Structure

Key files:

- `package.json` – dependencies and scripts
- `tsconfig.json` – TypeScript configuration (configured for Lit decorators)
- `src/index.js` – app entry, imports the main component
- `src/components/hello-world.ts` – main sample component
- `src/components/base/jp-base-element.ts` – shared base class for components
- `src/components/base/jp-alert/jp-alert.ts` – alert component
- `src/components/base/jp-alert/jp-alert.css` – (optional) styles for alerts
- `src/components/base/jp-button/jp-button.ts` – button component
- `src/components/base/jp-icons/jp-icons.ts` – icon definitions used by alerts

---

## Components Overview

### `<hello-world>`

Defined in `src/components/hello-world.ts`.

- Extends `JPBaseElement`.
- Reactive property: `name` (string, default `"Juan"`).
- Renders:
  - A greeting: `Hello {name}!`
  - A `<jp-alert>` with `statusType="info"`, `size="small"`, `showIcon`.
  - A `<jp-button>` example.

Usage:

```html
<hello-world name="Alice"></hello-world>
```

---

### `<jp-alert>`

Defined in `src/components/base/jp-alert/jp-alert.ts`.

**Attributes / properties:**

- `statusType`: `"success" | "error" | "warning | "info"`  
  Controls border color and icon.
- `size`: `"small" | "medium" | "large"`  
  Controls padding.
- `showIcon`: `boolean`  
  When `true`, shows an icon based on `statusType`.

**Behavior:**

- Uses `@property` decorators from `lit/decorators.js`.
- Styles are defined via static `styles` using `css`.
- Icons for each status come from `icons` in `jp-icons.ts`.
- For the `"info"` status, an SVG icon is rendered via the `unsafeHTML` directive.

Example:

```html
<jp-alert statusType="success" size="medium" showIcon>
  <span>Success! Your action was successful.</span>
</jp-alert>
```

---

### `<jp-button>`

Defined in `src/components/base/jp-button/jp-button.ts`.

**Attributes / properties:**

- `label`: `string` – accessible label.
- `variant`: `"primary" | "secondary" | "tertiary"` – visual variant.
- `size`: `"small" | "medium" | "large"` – button size.
- `disabled`: `boolean` – when present, marks the button as disabled.
- `url`: `string` – if set, renders an `<a>` instead of `<button>`.
- `target`: `"_self" | "_blank" | "_parent" | "_top"` – link target when `url` is set.

**Behavior:**

- If `url` is provided, renders an anchor (`<a>`) with the button styles.
- Otherwise renders a native `<button>`.
- Uses `ifDefined` directive to omit undefined attributes.
- Keeps `aria-disabled` in sync in `updated()` when `disabled` is set as an attribute.

Example (link-style button):

```html
<jp-button
  label="Go to Google"
  variant="primary"
  size="medium"
  url="https://www.google.com"
  target="_blank"
>
  <span>Click me</span>
</jp-button>
```

Example (regular button):

```html
<jp-button label="Submit" variant="secondary" size="small">
  <span>Submit</span>
</jp-button>
```

---

## Development Notes

- **Decorators**: TypeScript is configured with `"experimentalDecorators": true` and `"useDefineForClassFields": false` to work well with Lit’s `@property` and custom elements.
- **Unsafe HTML**:  
  `unsafeHTML` is imported from `lit/directives/unsafe-html.js` and is used only to render trusted HTML snippets (like the SVG icon string in `jp-icons.ts`). Do not pass untrusted user content into `unsafeHTML`.
- **Custom elements registration**:  
  Components call `customElements.define(...)` only if the tag is not already registered, to avoid duplicate registration errors.

---

## How to Use in HTML

Include your built bundle (from Vite) in an HTML page and register `hello-world` by importing `src/index.js`. Once the script is loaded, you can use:

```html
<hello-world></hello-world>
<jp-alert statusType="error" size="large" showIcon>
  <span>Something went wrong.</span>
</jp-alert>
<jp-button label="Primary" variant="primary" size="medium">
  <span>Primary</span>
</jp-button>
```

The components will be upgraded automatically by the browser’s Custom Elements API.

