import { IconSvgAttrs, LibraryNormalizer } from "../libraryNormalizer";


const libraryJam: LibraryNormalizer = {
    name: "jam",
    resolver: (name: string, _svgAttrs?: IconSvgAttrs) => {
        return `https://cdn.jsdelivr.net/npm/jam-icons@2.0.0/svg/${name}.svg`;
    },

    mutator: (el: SVGAElement): void => {
        el.setAttribute("fill", "currentColor");
    },
}   

export default libraryJam;