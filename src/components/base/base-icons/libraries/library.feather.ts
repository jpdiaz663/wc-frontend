import type { FeatherIcon } from "feather-icons";
import type { IconSvgAttrs } from "../libraryNormalizer";
import { LibraryNormalizer } from "../libraryNormalizer";
// ESM/CJS interop: el API vive en el default export, no en un named export `feather`.
import feather from "feather-icons";

const libraryFeather: LibraryNormalizer = {
    name: "feather",
    resolver: (name: string, svgAttrs?: IconSvgAttrs) => {
        const icon = (feather.icons as Record<string, FeatherIcon | undefined>)[
            name
        ];
        return icon ? icon.toSvg(svgAttrs ?? {}) : "";
    },
    mutator: (name: SVGAElement) => {
        return name.innerHTML;
    },
}

export default libraryFeather;