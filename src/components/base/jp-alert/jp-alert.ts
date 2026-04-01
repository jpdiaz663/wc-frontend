import { css, html, TemplateResult } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { JPBaseElement } from "../../base/jp-base-element";
import { customElement, property } from "lit/decorators.js";
import { icons } from "../jp-icons/jp-icons";
//import styles from './jp-alert.css';


export const statusTypes = ['success', 'error', 'warning', 'info'] as const;
export type JPAlertStatusType = typeof statusTypes[number];


export const sizes = ['small', 'medium', 'large'] as const;
export type JPAlertSizeType = typeof sizes[number];

export interface JPAlertInterface extends HTMLElement {
    statusType: JPAlertStatusType;
    size: JPAlertSizeType;
    showIcon: boolean;
};

@customElement('jp-alert')
export class JPAlert extends JPBaseElement implements JPAlertInterface {

     static styles = css`
      :host {
        display: block;
        border: 2px solid transparent;
        border-radius: 4px;
      }

      :host([statusType='success']) {
        border-color: green;
      }

      :host([statusType='error']) {
        border-color: red;
      }

      :host([statusType='warning']) {
        border-color: orange;
      }

      :host([statusType='info']) {
        border-color: blue;
      }

      :host([size='small']) {
        padding: 8px;
      }

      :host([size='medium']) {
        padding: 16px;
      }

      :host([size='large']) {
        padding: 24px;
      }
    `;

   // static styles: CSSResultGroup = [styles]

   @property({ type: String })
   statusType: JPAlertStatusType = 'error';

   @property({ type: String })
   size: JPAlertSizeType = 'medium';

   @property({ type: Boolean })
   showIcon = false;


   render(): TemplateResult {

      const icon = this.showIcon ? icons[this.statusType] : '';

      return html`
         <div class="alert ${this.statusType} ${this.size}">
            ${this.showIcon ? html`<span class="icon">${unsafeHTML(icon)}</span>` : ''}
            <div id="message"><slot></slot></div>
         </div>
      `;
   }

}