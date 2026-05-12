/** Root `<svg>` attributes for resolvers (Feather: `icons[name].toSvg(attrs)`). */
export type IconSvgAttrs = Record<string, string | number>;

export type Resolver = (name: string, svgAttrs?: IconSvgAttrs) => string;
export type Mutator = (name: SVGAElement) => void;
export interface LibraryNormalizer {
    name: string;
    resolver: Resolver;
    mutator: Mutator;
}
