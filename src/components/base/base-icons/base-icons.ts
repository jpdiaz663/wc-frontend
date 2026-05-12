import { property, state } from "lit/decorators.js";
import { JPBaseElement } from "../jp-base-element";
import { html, TemplateResult } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import type { IconSvgAttrs } from "./libraryNormalizer";
import { resolveIconSvgContent } from "./library";

export { resolveIconSvg, resolveIconSvgContent } from "./library";

export default class BaseIcons extends JPBaseElement {
    @state() private svg = "";

    /** Cancels stale in-flight CDN fetches when `name` / `library` / `size` changes. */
    private iconLoadGeneration = 0;

    @property({ type: String, reflect: true, attribute: "name" })
    name = "";

    @property({ type: String, reflect: true, attribute: "library" })
    library = "feather";

    /**
     * Same value for SVG `width` and `height` (Feather `toSvg({ width, height })`).
     * Examples: `24`, `32px`, `1.5rem`. Empty keeps library default (24 for Feather).
     */
    @property({ type: String, reflect: true, attribute: "size" })
    size = "";

    private svgDimensionAttrs(): IconSvgAttrs | undefined {
        const value = this.size.trim();
        if (!value) return undefined;
        return { width: value, height: value };
    }

    private async refreshSvg(): Promise<void> {
        const generation = ++this.iconLoadGeneration;
        const next = await resolveIconSvgContent(
            this.name,
            this.library,
            this.svgDimensionAttrs()
        );
        if (generation !== this.iconLoadGeneration) return;
        this.svg = next;
    }

    protected firstUpdated(): void {
        void this.refreshSvg();
    }

    protected updated(changed: Map<PropertyKey, unknown>): void {
        if (changed.has("name") || changed.has("library") || changed.has("size")) {
            void this.refreshSvg();
        }
    }

    render(): TemplateResult {
        return html`
            <span 
            class="jp-icons-root"
            aria-label=${this.name}
            role="img"
            aria-hidden="true"
            >
            ${unsafeSVG(this.svg)}
            </span>
        `;
    }
}

customElements.get("base-icons") ||
    customElements.define("base-icons", BaseIcons as any);