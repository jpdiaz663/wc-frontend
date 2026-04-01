import { css, html, LitElement, render } from 'lit';
import { JPBaseElement } from './base/jp-base-element';
import './base/jp-alert/jp-alert';

// un componente deberia tener guion en su nombre de file
// lit element es como extender de una etiqueta html
export class HelloWorld extends JPBaseElement {

    //el host estilo propio para este elemento.
    static styles = css`
      :host {
        padding: 16px;
      }
    `;


  static get properties() {
    return {
      name: { type: String }
    };
  }

  constructor() {
    super();
    this.name = 'Juan';
  }


  render () {
    return html`
    <span>Hello ${this.name}!</span>
    <jp-alert statusType="info" size="small" showIcon>
      <span>Success! Your action was successful.</span>
    </jp-alert>
</br>
    <h2> Buttons </h2>
    <jp-button label="Click me" variant="primary" size="medium" url="https://www.google.com" target="_blank">
      <span>Click me</span>
    </jp-button>
    `;
  }
};

customElements.get('hello-world') || customElements.define('hello-world', HelloWorld);