/**
 * R Stuff
 * 
 * @module rstuff
 */

import { WebR } from 'https://webr.r-wasm.org/latest/webr.mjs'

globalThis.webR = new WebR();

await globalThis.webR.init();

export const webR = globalThis.webR;

export const library = await webR.evalR('library')

