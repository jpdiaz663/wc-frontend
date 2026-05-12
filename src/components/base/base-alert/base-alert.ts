import { css, html, TemplateResult } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { JPBaseElement } from "../../base/jp-base-element";
import { customElement, property } from "lit/decorators.js";
import { resolveIconSvg } from "../base-icons/library";

export const statusTypes = ["success", "error", "warning", "info"] as const;
export type JPAlertStatusType = (typeof statusTypes)[number];

/** Default Feather icon names per alert status (override with `icon`). */
export const alertStatusIconNames: Record<JPAlertStatusType, string> = {
    success: "check-circle",
    error: "x-circle",
    warning: "alert-triangle",
    info: "info",
};


export const sizes = ["small", "medium", "large"] as const;
export type JPAlertSizeType = (typeof sizes)[number];

export interface JPAlertInterface extends HTMLElement {
    statusType: JPAlertStatusType;
    size: JPAlertSizeType;
    showIcon: boolean;
    iconLibrary: string;  
    icon: string;
}

@customElement('base-alert')
export class BaseAlert extends JPBaseElement {

    static styles = css`
      :host {
        display: block;
        border: 2px solid transparent;
        border-radius: 4px;
      }

      .alert {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .alert__icon {
        flex-shrink: 0;
        display: flex;
        color: inherit;
      }

      .alert__icon ::slotted(svg),
      .alert__icon svg {
        width: 1.25em;
        height: 1.25em;
        vertical-align: middle;
      }

      :host([statusType="success"]) {
        border-color: green;
      }

      :host([statusType="error"]) {
        border-color: red;
      }

      :host([statusType="warning"]) {
        border-color: orange;
      }

      :host([statusType="info"]) {
        border-color: blue;
      }

      :host([size="small"]) {
        padding: 8px;
      }

      :host([size="medium"]) {
        padding: 16px;
      }

      :host([size="large"]) {
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


    /** When set, overrides the default icon for statusType. */
    @property({ type: String })
    icon = "";

    private statusIconSvg(): string {
        const name =
            this.icon.trim() ||
            alertStatusIconNames[this.statusType] ||
            "info";
        return resolveIconSvg(name);
    }

    render(): TemplateResult {
        const svg = this.showIcon ? this.statusIconSvg() : "";

        return html`
            <div class="alert ${this.statusType} ${this.size}" part="alert">
                ${svg
                    ? unsafeSVG(svg)
                    : ""}
                <div id="message" part="message"><slot></slot></div>
            </div>
        `;
    }
}