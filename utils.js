/**
 * @module utils
 */

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/**
 * Make R data frames more useful in JS
 *
 * Converts a WebR R data frame JS object  JS format of a data frame into
 * something more usable by lots of JS libraries; `simpleDataFrameTable`
 * in this module is also one of them.
 *
 * @param {RObject} obj the result of a call to WebR's toJs() on an R data frame object.
 * @returns {Object[]} an array of JS dictionaries in typical JS "data frame" format.
 * @examples
 * let result = await globalThis.webR.evalR(`mtcars`);
 * let output = await result.toJs();
 * let usable = webRDataFrameToJS(output);
 */
export function webRDataFrameToJS(obj) {
	return d3.range(0, obj.values[0].values.length).map((ridx) => {
		let m = {};
		for (var cidx = 0; cidx < obj.names.length; cidx++) {
			m[obj.names[cidx]] = obj.values[cidx].values[ridx];
		}
		return m;
	});
}

/**
 * Slugify a string
 * 
 * @param {string} str a JS string
 * @returns {string} a slugified string
 */
export function slugify(str) {
	return str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

export const queryParams = new URLSearchParams(window.location.search);

/**
 * Returns a filled-in meta tag node
 * 
 * @param {string} property 
 * @param {string} content 
 * @returns {HTMLElement}
 */
export function createMetaTag(property, content) {
	const meta = document.createElement("meta");
	meta.setAttribute("property", property);
	meta.content = content
	return(meta)
}