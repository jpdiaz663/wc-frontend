import { property } from "lit/decorators.js";
import { JPBaseElement } from "../jp-base-element";
import { css, html, TemplateResult } from "lit";
import { ifDefined } from 'lit/directives/if-defined.js';

export class JPButton extends JPBaseElement {


    static styles = css`
         :host {
            display: inline-flex;
            border-radius: var(--spacing-2);
            vertical-align: middle;
         }

         .btn {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            cursor: pointer;
            transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke, outline, outline-color;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 300ms;
            text-decoration-line: none;
            outline: none;
            line-height: 1.5;
            font-family: var(--ff-body);
            font-weight: var(--outline-btn-weight);
            z-index: 12;
        }
    `;

    @property({ type: String })
    label: string = '';

    @property({ type: String })
    variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

    @property({ type: String })
    size: 'small' | 'medium' | 'large' = 'medium';

    @property({ type: String })
    disabled: boolean = false;

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


customElements.get('jp-button') ||
customElements.define('jp-button', JPButton);