import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class FileDrop extends LitElement {

  static properties = {
    id: { type: String },
    label: { type: String },
    files: { type: Array }
  };

  static styles = [
    css`
      :host {
        display: block;
      }
      :host div {
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
      :host div input {
        margin-left: 1rem;
      }
    `
  ];

  constructor() {
    super();
    this.files = [];
  }

  render() {
    return html`
      <div>
        <label for="file-drop-${this.id}">${this.label}</label>
        <input id="file-drop-${this.id}" accept=".csv" type="file" @change=${this._handleDrop} />
      </div>
    `;
  }

  _handleDrop(e) {
		this.files = e.target.files;
		const rdr = new FileReader();
		rdr.onload = (e) => {
			const options = {
				detail: { dataString: e.target.result },
				bubbles: true,
				composed: true,
			};
			// console.log("In file-drop, issuing event")
			this.dispatchEvent(new CustomEvent(`filesDropped`, options));
			// console.log("In file-drop, event issued")
		};
		rdr.readAsText(this.files[0]);
  }
}

customElements.define('file-drop', FileDrop);