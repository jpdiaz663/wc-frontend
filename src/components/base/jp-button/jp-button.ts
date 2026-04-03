import { customElement, property } from "lit/decorators.js";
import { JPBaseElement } from "../jp-base-element";
import { css, html, TemplateResult } from "lit";
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('jp-button')
export class JPButton extends JPBaseElement {


    static styles = css`
      :host {
        display: inline-flex;
        vertical-align: middle;
        box-sizing: border-box;
        /* Override JPBaseElement frame so the control looks like a button */
        border: none;
        padding: 0;
        margin: 0;
        background: transparent;
      }

      .btn {
        box-sizing: border-box;
        display: inline-flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        width: 100%;
        margin: 0;
        border: 2px solid transparent;
        border-radius: var(--spacing-2, 0.5rem);
        font-family: var(--ff-body, system-ui, -apple-system, "Segoe UI", sans-serif);
        font-weight: var(--outline-btn-weight, 600);
        line-height: 1.35;
        text-align: center;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        appearance: none;
        transition:
          color 0.2s ease,
          background-color 0.2s ease,
          border-color 0.2s ease,
          box-shadow 0.2s ease,
          transform 0.12s ease;
      }

      .btn:focus {
        outline: none;
      }

      .btn:focus-visible {
        outline: 2px solid var(--jp-focus, #2563eb);
        outline-offset: 2px;
      }

      .btn:active:not(:disabled):not([aria-disabled="true"]) {
        transform: scale(0.98);
      }

      :host([disabled]) .btn,
      :host([aria-disabled="true"]) .btn,
      .btn:disabled,
      .btn[aria-disabled="true"] {
        opacity: 0.55;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Sizes */
      .btn.small {
        padding: 0.375rem 0.75rem;
        font-size: 0.8125rem;
        min-height: 2rem;
        border-radius: 0.375rem;
      }

      .btn.medium {
        padding: 0.5rem 1rem;
        font-size: 0.9375rem;
        min-height: 2.5rem;
      }

      .btn.large {
        padding: 0.625rem 1.25rem;
        font-size: 1.0625rem;
        min-height: 2.875rem;
      }

      /* Variants */
      .btn.primary {
        color: #fff;
        background: var(--jp-primary, #2563eb);
        border-color: var(--jp-primary, #2563eb);
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.06);
      }

      .btn.primary:hover:not(:disabled):not([aria-disabled="true"]) {
        background: var(--jp-primary-hover, #1d4ed8);
        border-color: var(--jp-primary-hover, #1d4ed8);
        box-shadow: 0 2px 6px rgb(37 99 235 / 0.35);
      }

      .btn.secondary {
        color: var(--jp-primary, #2563eb);
        background: var(--jp-secondary-bg, #fff);
        border-color: var(--jp-primary, #2563eb);
      }

      .btn.secondary:hover:not(:disabled):not([aria-disabled="true"]) {
        background: var(--jp-secondary-hover, #eff6ff);
      }

      .btn.tertiary {
        color: var(--jp-primary, #2563eb);
        background: transparent;
        border-color: transparent;
        box-shadow: none;
      }

      .btn.tertiary:hover:not(:disabled):not([aria-disabled="true"]) {
        background: var(--jp-tertiary-hover, rgb(37 99 235 / 0.08));
      }
    `;

    @property({ type: String })
    label: string = '';

    @property({ type: String })
    variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

    @property({ type: String })
    size: 'small' | 'medium' | 'large' = 'medium';

    @property({ type: Boolean })
    disabled = false;

    @property({ type: String })
    url: string = '';

    @property({ type: String })
    target: '_self' | '_blank' | '_parent' | '_top' = '_self';
    
    render(): TemplateResult {

    return this.url
      ? html`<a
        class="btn ${this.variant} ${this.size}"
        href=${this.url}
        target=${ifDefined(this.target)}
        aria-label="${ifDefined(this.label)}"
        aria-disabled="${ifDefined(this.disabled)}"
      >
        <slot></slot>
      </a>`
      : html`<button
        class="btn ${this.variant} ${this.size}"
        aria-label="${ifDefined(this.label)}"
        aria-disabled="${ifDefined(this.disabled)}"
      >
        <slot></slot>
    </button> `;
    }
    

   updated() {
     if(this.hasAttribute('disabled')) {
        this.setAttribute('aria-disabled', 'true');
     } else {
        this.removeAttribute('aria-disabled');
     }
   }


}
