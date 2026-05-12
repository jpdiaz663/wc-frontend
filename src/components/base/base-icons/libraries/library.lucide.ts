import { IconSvgAttrs, LibraryNormalizer } from "../libraryNormalizer";

const libraryLucide: LibraryNormalizer = {
    name: "lucide",
    resolver: (name: string, svgAttrs?: IconSvgAttrs) => {
        return `https://lucide.dev/icons/${name}.svg`;
    },
    mutator: (name: SVGAElement) => {
       name.innerHTML;
    },
}

export default libraryLucide;