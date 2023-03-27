import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { unsafeHTML } from 'https://unpkg.com/lit/directives/unsafe-html.js?module';
import * as R from '../r.js'

export class DropTarget extends LitElement {
	
	static properties = {
		summary: { type: String },
		data: { type: String },
	};
	
	static styles = [
		css`
		:host div {
			margin-top: 2rem;
			margin-bottom: 2rem;
		}
		:host div#tbl, :host div#sum {
			font-family: monospace;
			overflow-x: auto;
		}
		:host table {
				border: 1px solid var(--primary-color);
				border-collapse: collapse;
				width: auto;
        table-layout: auto;
				text-align: left;
				width: 100%;
		}
		:host table caption { margin: 2rem 0; }
		:host table tr { border-bottom: 1px solid var(--primary-color); }
		:host table thead { position: sticky; top: 0; }
		:host table tbody tr:nth-child(even) { background: var(--tertiary-color); }
		:host table th { background: var(--secondary-color); font-weight: bold; }
		:host table th, table td { padding: 0.5rem; }
		`
	];
	
	async connectedCallback() {
		super.connectedCallback();
		
		console.log("IN TARGET connectedCallback")
		this.addEventListener('filesDropped', async (e) => {
			
			if (e.detail.dataString) {
				
				const dataShelter = await new R.webR.Shelter();

				const res = await dataShelter.captureR(`xdf <- read.csv(text=r"(${e.detail.dataString})")`)

				const sumRes = await dataShelter.captureR(`print(xtable(summary(xdf)), type = "html")`,
					{
						withAutoprint: true,
						captureStreams: true,
						captureConditions: false
					})
				
				const datRes = await dataShelter.captureR(`print(xtable(xdf), type = "html")`,
					{
						withAutoprint: true,
						captureStreams: true,
						captureConditions: false
					})
				
        this.summary = sumRes.output.filter(d => d.type == "stdout").map(d => d.data).join("\n")
				this.data = datRes.output.filter(d => d.type == "stdout").map(d => d.data).join("\n")

				dataShelter.purge()

			}
		});
		
	}
	
	performUpdate() {
		super.performUpdate();
		// console.log("PERFORM UPDTAE")
		// const options = {
		// 	detail: { value: this.dataString },
		// 	bubbles: true,
		// 	composed: true,
		// };
		// this.dispatchEvent(new CustomEvent(`filesDropped`, options));
	}
	
	constructor() {
		super();
		this.data = ''
		this.summary = ''
	}
	
	render() {
		return html`
		<div>
		<slot></slot>
		<h3>${this.summary.length > 0 ? "Summary Info" : ""}</h3>
    <div id="sum">${unsafeHTML(this.summary)}</div>
		<h3>${this.data.length > 0 ? "Data Table" : ""}</h3>
	  <div id="tbl">${unsafeHTML(this.data)}</div>
   	</div>`;
		}
		
	}
	
	customElements.define('drop-target', DropTarget);
	