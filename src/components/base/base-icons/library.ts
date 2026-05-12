import type { IconSvgAttrs } from "./libraryNormalizer";
import { LibraryNormalizer } from "./libraryNormalizer";
import libraryFeather from "./libraries/library.feather";
import libraryJam from "./libraries/library.jam";
import libraryRemix from "./libraries/library.remix";

export type { IconSvgAttrs } from "./libraryNormalizer";

let libraries: LibraryNormalizer[] = [
    libraryFeather,
    libraryJam,
    libraryRemix,
] as const;


export const getIconLibrary = (name?: string) => {
    const key = name ?? "feather";
    return libraries.find((library) => library.name === key);
};

const REMOTE_SVG_URL = /^https?:\/\//i;

/** SVG string for an icon from a registered library (empty if unknown). */
export function resolveIconSvg(
    iconName: string,
    libraryName?: string,
    svgAttrs?: IconSvgAttrs
): string {
    if (!iconName?.trim()) return "";
    const library = getIconLibrary(libraryName);
    if (!library) return "";
    try {
        const svg = library.resolver(iconName, svgAttrs);
        return typeof svg === "string" ? svg : "";
    } catch {
        return "";
    }
}

function applySvgRootAttrs(markup: string, attrs?: IconSvgAttrs): string {
    if (!attrs || !Object.keys(attrs).length) return markup;
    const trimmed = markup.trimStart();
    if (!trimmed.startsWith("<svg")) return markup;
    try {
        const doc = new DOMParser().parseFromString(markup, "image/svg+xml");
        const el = doc.documentElement;
        if (el?.namespaceURI === "http://www.w3.org/2000/svg" && el.localName === "svg") {
            for (const [k, v] of Object.entries(attrs)) {
                el.setAttribute(k, String(v));
            }
            return new XMLSerializer().serializeToString(el);
        }
    } catch {
        /* keep original */
    }
    return markup;
}

/**
 * Like {@link resolveIconSvg}, but if the resolver returns an `http(s)` URL
 * (CDN icon), fetches the file and returns the SVG markup for `unsafeSVG`.
 */
export async function resolveIconSvgContent(
    iconName: string,
    libraryName?: string,
    svgAttrs?: IconSvgAttrs
): Promise<string> {
    const raw = resolveIconSvg(iconName, libraryName, svgAttrs).trim();
    if (!raw) return "";
    if (!REMOTE_SVG_URL.test(raw)) return raw;
    try {
        const res = await fetch(raw, { mode: "cors", cache: "force-cache" });
        if (!res.ok) return "";
        let text = await res.text();
        if (!text.trimStart().startsWith("<svg")) return "";
        text = applySvgRootAttrs(text, svgAttrs);
        return text;
    } catch {
        return "";
    }
}