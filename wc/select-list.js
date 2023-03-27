/**
 * @module select-list
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class SelectList extends LitElement {

	static properties = {
		id: { type: String },    // gives us easy access to the id we set
		label: { type: String }, // lets us define the label up front
		options: { type: Array } // where the options for the popup will go
	};

	static styles = [
		css`
			:host {
				display: block;
				margin-bottom: 1rem;
			}
		`
	];

	constructor() {
		super()
		this.options = [] // start with an empty list
	}
	
	render() {
		const selectId = `select-list-${this.id}`;
		return html`
		<label for="${selectId}">${this.label} 
		  <select id="${selectId}" @change=${this._dispatch}>
			  ${this.options.map(option => html`<option>${option}</option>`)}
		  </select>
	  </label>
		`;
	}

	_dispatch(e) {
		const options = {
			detail: e.target,
			bubbles: true,
			composed: true,
		};
		this.dispatchEvent(new CustomEvent(`regionChanged`, options));
  }

}

customElements.define('select-list', SelectList);
