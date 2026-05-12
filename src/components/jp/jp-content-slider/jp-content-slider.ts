import {
  html,
  TemplateResult,
  unsafeCSS,
  type CSSResultGroup,
} from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import Splide from "@splidejs/splide";
import type { Options } from "@splidejs/splide";
import { JPBaseElement } from "../../base/jp-base-element";

/** CSS oficial de Splide (igual patrón que jp-card-spotlight + archivo local ?raw) */
import splideCss from "@splidejs/splide/dist/css/splide.min.css?raw";
import componentCss from "./jp-content-slider.css?raw";

/**
 * Carrusel de contenido (Splide). Los hijos en light DOM se mueven al track en el primer render.
 *
 * @element jp-content-slider
 * @slot - slides (cualquier elemento hijo directo)
 */
@customElement("jp-content-slider")
export class JpContentSlider extends JPBaseElement {
  static styles: CSSResultGroup = [
    JPBaseElement.styles,
    unsafeCSS(splideCss),
    unsafeCSS(componentCss),
  ];

  private readonly _trackId = `jp-slider-track-${Math.random().toString(36).slice(2, 9)}`;

  @property({ type: String, reflect: true, attribute: "previous-label" })
  previousLabel = "Diapositiva anterior";

  @property({ type: String, reflect: true, attribute: "next-label" })
  nextLabel = "Diapositiva siguiente";

  /** Clase aplicada al track: `default`, `white`, `transparent`, `brand-subtle`, `brand-muted`, `surface`, etc. */
  @property({ type: String, reflect: true, attribute: "track-color" })
  trackColor = "default";

  /**
   * Cuántas diapositivas visibles a la vez (por defecto 1).
   * Con pocas slides, valores >1 suelen hacer que todo “quepa” en el carril y Splide **oculte la paginación** (clase `is-overflow`).
   */
  @property({ type: Number, attribute: "slides-per-view" })
  slidesPerView = 1;

  @query(".splide__arrow--prev")
  prevBtn!: HTMLButtonElement;

  @query(".splide__arrow--next")
  nextBtn!: HTMLButtonElement;

  private _splide?: Splide;

  async firstUpdated(): Promise<void> {
    await this.updateComplete;

    const root = this.shadowRoot?.querySelector(".splide") as HTMLElement | null;
    const splideTrack = this.shadowRoot?.querySelector(".splide__track") as HTMLElement | null;
    if (!splideTrack || !root) return;

    const items = Array.from(this.children);
    if (items.length === 0) return;

    const splideList = document.createElement("ul");
    splideList.classList.add("splide__list");

    items.forEach((item, idx) => {
      const li = document.createElement("li");
      li.classList.add("splide__slide", "splide__slide__container");
      li.setAttribute("aria-label", `Slide ${idx + 1} de ${items.length}`);
      li.appendChild(item);
      splideList.appendChild(li);
    });

    splideTrack.appendChild(splideList);

    const count = items.length;
    /**
     * `loop` con muy pocos slides suele dejar el carrusel vacío o sin dimensiones.
     * Usamos `slide` + `rewind` cuando hay pocas diapositivas.
     */
    const useLoop = count >= 4;
    const perView = Math.min(Math.max(1, this.slidesPerView), count);

    const splideConfig: Options = {
      label: "Content Slider",
      keyboard: true,
      pagination: count > 1,
      perPage: perView,
      padding: { left: "20%", right: "20%" },
      focusableNodes:
        "a, button, textarea, input, select, iframe, jp-button, jp-button a, base-button, base-button a",
      rewindByDrag: true,
      drag: count > 1,
      updateOnMove: true,
      snap: true,
      type: useLoop ? "loop" : "slide",
      rewind: !useLoop,
      gap: "2rem",
      arrows: false,
      breakpoints: {
        1024: {
          pagination: count > 1,
          perPage: 1,
          padding: { left: "20%", right: "20%" },
          drag: count > 1,
          updateOnMove: true,
        },
        768: {
          perPage: 1,
          pagination: count > 1,
          padding: { left: "10%", right: "10%" },
          drag: count > 1,
          updateOnMove: true,
        },
        640: {
          perPage: 1,
          padding: { left: "2%", right: "2%" },
          pagination: count > 1,
          rewindByDrag: true,
          drag: count > 1,
          updateOnMove: true,
        },
      },
    };

    this._splide = new Splide(root, splideConfig).mount();

    if (count > 1) {
      root.classList.add("has-multiple-slides");
    }

    globalThis.requestAnimationFrame(() => {
      this._splide?.refresh();
    });


    if (this.previousLabel) {
      this.prevBtn?.setAttribute("aria-label", this.previousLabel);
    }
    if (this.nextLabel) {
      this.nextBtn?.setAttribute("aria-label", this.nextLabel);
    }
    this.prevBtn?.setAttribute("aria-controls", this._trackId);
    this.nextBtn?.setAttribute("aria-controls", this._trackId);
  }

  disconnectedCallback(): void {
    this._splide?.destroy();
    this._splide = undefined;
    super.disconnectedCallback();
  }

  updated(): void {
    if (this._splide) {
      globalThis.requestAnimationFrame(() => this._setHiddenAttrOnSlides());
    }
  }

  nextSlide(): void {
    this._splide?.go(">");
  }

  prevSlide(): void {
    this._splide?.go("<");
  }

  render(): TemplateResult {
    const splideTrackClasses: Record<string, boolean> = {
      splide__track: true,
      [this.trackColor]: Boolean(this.trackColor),
    };

    return html`
      <div class="splide splide--ltr" role="region" aria-roledescription="carrusel">
        <div id=${this._trackId} class=${classMap(splideTrackClasses)}></div>
        <div class="splide__arrow-container--prev">
          <button
            class="splide__arrow splide__arrow--prev"
            type="button"
            aria-label=${this.previousLabel}
            @click=${this.prevSlide}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                class="circle"
                d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
              />
              <path d="M27 20H13" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M20 27L13 20L20 13" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
        <div class="splide__arrow-container--next">
          <button
            class="splide__arrow splide__arrow--next"
            type="button"
            aria-label=${this.nextLabel}
            @click=${this.nextSlide}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                class="circle"
                d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
              />
              <path d="M13 20H27" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M20 13L27 20L20 27" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  /** Ajusta tabindex en enlaces de slides no visibles (mejor con shadow anidados). */
  private _setHiddenAttrOnSlides = (): void => {
    const hiddenSlides = this.shadowRoot?.querySelectorAll<HTMLElement>(
      '.splide__slide[aria-hidden="true"]',
    );
    hiddenSlides?.forEach((slide) => {
      const host = slide.querySelector("[slide-content]");
      if (!host || !("shadowRoot" in host) || !host.shadowRoot) return;
      host.shadowRoot.querySelectorAll("a").forEach((a) => a.setAttribute("tabindex", "-1"));
    });
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "jp-content-slider": JpContentSlider;
  }
}
