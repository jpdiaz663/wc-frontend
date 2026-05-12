import {
  html,
  nothing,
  TemplateResult,
  unsafeCSS,
  type CSSResultGroup,
} from "lit";
import type { PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { JPBaseElement } from "../../base/jp-base-element";
import "../../base/base-button/base-button";

import cardStyles from "./jp-card-spotlight.css?raw";

export interface JPCardSpotlightItem {
  title: string;
  category: string;
  description: string;
  link: string;
  /** Full-width hero image when this card is selected */
  image?: string;
  /** Thumbnail in the grid; falls back to `image` */
  thumb?: string;
}

/**
 * Spotlight card carousel: hero image + selectable cards.
 * Pass data via `cards` attribute (JSON array) or property.
 *
 * @element jp-card-spotlight
 * @fires card-selected - Fired when selection changes; `detail` is the card or `undefined` when cleared (mobile toggle).
 * @slot eyebrow - Optional kicker above the title in the list header.
 * @slot title - Optional main title in the list header.
 * @slot subtitle - Optional subtitle in the list header.
 * @slot description - Optional description in the list header.
 */
@customElement("jp-card-spotlight")
export class JPCardSpotlight extends JPBaseElement {
  static styles: CSSResultGroup = [
    JPBaseElement.styles,
    unsafeCSS(cardStyles),
  ];

  @property({ type: String, reflect: true, attribute: "button-text" })
  buttonText = "Read more";

  @property({
    type: Array,
    attribute: "cards",
    converter: (value: unknown) => {
      try {
        if (value == null || value === "") return [];
        return typeof value === "string" ? JSON.parse(value) : (value as JPCardSpotlightItem[]);
      } catch (e) {
        console.error("jp-card-spotlight: invalid cards attribute", e);
        return [];
      }
    },
  })
  cards: JPCardSpotlightItem[] = [];

  @property({ type: Boolean, reflect: true, attribute: "reverse-alignment" })
  reverseAlignment = false;

  @property({ type: Boolean, reflect: true, attribute: "reduced" })
  reduced = false;

  @property({ type: Number, reflect: true, attribute: "selected-index" })
  selectedIndex = 0;

  private get _selected(): JPCardSpotlightItem | undefined {
    if (!this.cards.length || this.selectedIndex < 0 || this.selectedIndex >= this.cards.length) {
      return undefined;
    }
    return this.cards[this.selectedIndex];
  }

  private _isNarrowViewport(): boolean {
    return globalThis.matchMedia?.("(max-width: 1023px)")?.matches ?? false;
  }

  connectedCallback(): void {
    super.connectedCallback();
    globalThis.matchMedia?.("(max-width: 1023px)")?.addEventListener("change", this._onViewportChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    globalThis.matchMedia?.("(max-width: 1023px)")?.removeEventListener("change", this._onViewportChange);
  }

  private _onViewportChange = (): void => {
    this.requestUpdate();
  };

  willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);
    if (!changed.has("cards") && !changed.has("selectedIndex")) return;
    const n = this.cards.length;
    if (n === 0) {
      if (this.selectedIndex !== 0) this.selectedIndex = 0;
      return;
    }
    if (this.selectedIndex >= n) this.selectedIndex = n - 1;
    if (this.selectedIndex < -1) this.selectedIndex = 0;
  }

  firstUpdated(): void {
    if (this.cards.length && this.selectedIndex < 0) {
      this.selectedIndex = 0;
    }
  }

  render(): TemplateResult {
    const selected = this._selected;
    const heroSrc = selected?.image ?? selected?.thumb;

    return html`
      <div
        class=${classMap({
          container: true,
          reverse: this.reverseAlignment,
          reduced: this.reduced,
        })}
      >
        <div class="side-description" aria-hidden=${this._isNarrowViewport() ? "true" : "false"}>
          <div class="side-inner">
            ${heroSrc
              ? html`<img src=${heroSrc} alt="" role="presentation" />`
              : html`<div class="placeholder-hero" role="presentation"></div>`}
            <div class="side-overlay"></div>
            <div class="side-content">
              ${selected
                ? html`
                    ${selected.category
                      ? html`<span class="category-pill">${selected.category}</span>`
                      : nothing}
                    <h2 class="side-title">${selected.title}</h2>
                    <p class="side-desc">${selected.description}</p>
                    <jp-button
                      label=${this.buttonText}
                      variant="secondary"
                      size="medium"
                      url=${ifDefined(selected.link || undefined)}
                    >
                      <span>${this.buttonText}</span>
                    </jp-button>
                  `
                : nothing}
            </div>
          </div>
        </div>

        <div class="content-container">
          <div class="content-inner">
            <div class="heading-content">${this._renderSlots()}</div>
            <div class="card-list" role="list">${this._renderCards()}</div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderSlots(): TemplateResult {
    return html`
      <slot name="eyebrow"></slot>
      <slot name="title"></slot>
      <slot name="subtitle"></slot>
      <slot name="description"></slot>
    `;
  }

  private _renderCards(): TemplateResult {
    return html`
      ${this.cards.map((card, index) => {
        const thumb = card.thumb ?? card.image;
        const isSelected = this.selectedIndex === index;
        return html`
          <div class="card-wrapper" role="listitem">
            <div
              class=${classMap({
                card: true,
                selected: isSelected,
              })}
            >
              <button
                type="button"
                class="card-media-btn"
                aria-expanded=${isSelected}
                aria-current=${isSelected ? "true" : "false"}
                @click=${() => this._selectCard(index)}
              >
                ${thumb
                  ? html`<img src=${thumb} alt="" />`
                  : html`<div class="placeholder-hero" role="presentation"></div>`}
                <div class="card-overlay"></div>
                <div class="card-body">
                  <h3 class="card-title">${card.title}</h3>
                  <span class="icon-toggle" aria-hidden="true">${isSelected ? "−" : "+"}</span>
                </div>
              </button>
              <div class="card-detail">
                <p class="cat">${card.category}</p>
                <p class="desc">${card.description}</p>
                <jp-button
                  label=${this.buttonText}
                  variant="primary"
                  size="small"
                  url=${ifDefined(card.link || undefined)}
                >
                  <span>${this.buttonText}</span>
                </jp-button>
              </div>
            </div>
          </div>
        `;
      })}
    `;
  }

  private _selectCard(index: number): void {
    if (this._isNarrowViewport() && this.selectedIndex === index) {
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = index;
    }
    const detail = this._selected;
    this.dispatchEvent(
      new CustomEvent("card-selected", {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "jp-card-spotlight": JPCardSpotlight;
  }
}
