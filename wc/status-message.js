/**
 * @module status-message
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

// Web Components use classes

export class StatusMessage extends LitElement {

	// these properties can be retrieved and assigned into; the TypeScript annotations
	// are a "Lit" requirement
  static properties = {
    text: {type: String},
  };

	// You can go bonkers with local styling; the CSS used here will not impact anything else
	// in the DOM but these components.
	static styles = [
		css`
			:host {
				display: block;
				color: #586c5c;
				font-family: monospace;
			}
		`
	];

	// all initialization happens here
	constructor() {
    super()
    this.text = ''
  }

  // whenever any of the properties change, this gets called
	render() {
		return html`<div>${crossOriginIsolated ? '🔵' : '🌕'} ${this.text}</div>`;
	}

}

// this registeres the component into the DOM
customElements.define('status-message', StatusMessage);
