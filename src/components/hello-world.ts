import { css, html } from 'lit';
import { JPBaseElement } from './base/jp-base-element';
import './base/base-alert/base-alert';
import './base/base-button/base-button';
import './jp/jp-card-spotlight/jp-card-spotlight';
import './jp/jp-content-slider/jp-content-slider';
import './base/base-icons/base-icons';

const demoSpotlightCards = [
  {
    title: 'Opción A',
    category: 'Producto',
    description: 'Descripción breve de la primera tarjeta del spotlight.',
    link: '#',
    thumb: 'https://picsum.photos/seed/jp-a/480/320',
    image: 'https://picsum.photos/seed/jp-a/960/720',
  },
  {
    title: 'Opción B',
    category: 'Servicio',
    description: 'Segunda tarjeta con otro mensaje para el panel lateral.',
    link: '#',
    thumb: 'https://picsum.photos/seed/jp-b/480/320',
    image: 'https://picsum.photos/seed/jp-b/960/720',
  },
  {
    title: 'Opción C',
    category: 'Insight',
    description: 'Tercera opción; en móvil podés expandir y colapsar la selección.',
    link: '#',
    thumb: 'https://picsum.photos/seed/jp-c/480/320',
    image: 'https://picsum.photos/seed/jp-c/960/720',
  },
] as const;

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
    <jp-alert statusType="error" size="small" showIcon>
      <span>Success! Your action was successful.</span>
    </jp-alert>
</br>
    <h2> Buttons </h2>
    <jp-button label="Click me" variant="primary" size="medium" url="https://www.google.com" target="_blank">
      <span>Click me!</span>
    </jp-button>

    <h2> Card Spotlight </h2>
    <jp-card-spotlight .cards=${demoSpotlightCards} button-text="Ver más">
      <span slot="title">The Emerald Core — Spotlight</span>
      <span slot="description">Elegí una tarjeta; en escritorio el panel izquierdo muestra el detalle.</span>
    </jp-card-spotlight>
    
    <h2> Icons </h2>
    <base-icons name="battery-charging" size="55"></base-icons>
    <base-icons name="leaf" library="jam" size="55"></base-icons>
    <base-icons name="Food-beer-fill" library="remix" size="55"></base-icons>
    <br><br><br>
    `;
  }
};

customElements.get('hello-world') || customElements.define('hello-world', HelloWorld);