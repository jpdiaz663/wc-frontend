import type { IconSvgAttrs } from "../libraryNormalizer";
import { LibraryNormalizer } from "../libraryNormalizer";

/** Same major line as remixicon on npm (icons live under `/icons/{Category}/{name}.svg`). */
const REMIX_VERSION = "4.9.1";
const REMIX_ICONS_BASE = `https://cdn.jsdelivr.net/npm/remixicon@${REMIX_VERSION}/icons`;

/**
 * `name` siempre llega como `Categoria-nombre-del-icono` (ej. `Food-beer-fill`,
 * `Weather-blaze-fill`). La primera palabra (hasta el primer `-`) es la carpeta
 * de categoría en el paquete; el resto es el nombre del fichero sin `.svg`.
 */
function remixFlatNameToIconPath(flatName: string): string {
    const trimmed = flatName.trim();
    if (!trimmed || trimmed.includes("..") || trimmed.includes("/")) {
        return "";
    }
    const dash = trimmed.indexOf("-");
    if (dash <= 0 || dash === trimmed.length - 1) {
        return "";
    }
    const category = trimmed.slice(0, dash);
    const iconFile = trimmed.slice(dash + 1);
    if (!category || !iconFile) return "";
    return `${category}/${iconFile}`;
}

const libraryRemix: LibraryNormalizer = {
    name: "remix",
    resolver: (name: string, _svgAttrs?: IconSvgAttrs) => {
        const path = remixFlatNameToIconPath(name);
        if (!path) return "";
        return `${REMIX_ICONS_BASE}/${path}.svg`;
    },
    mutator: (el: SVGAElement): void => {
        el.setAttribute("fill", "currentColor");
    },
};

export default libraryRemix;
