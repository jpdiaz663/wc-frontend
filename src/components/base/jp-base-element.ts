import { css, LitElement } from "lit";

export class JPBaseElement extends LitElement {

  connectedCallback(): void {
      super.connectedCallback();
  }  

  static styles = css`
    :host {
      display: block;
      border: 1px solid black;
      padding: 16px;
    }
  `;
}

customElements.get('jp-base-element') ||
customElements.define('jp-base-element', JPBaseElement);