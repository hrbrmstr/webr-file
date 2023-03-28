/**
 * @module main
 */

// we need to render the markdown as quickly as possible
import { renderMarkdownInBody } from "./renderers.js";

await renderMarkdownInBody(
	`main`,
	"ayu-dark",
	[ 'javascript', 'r', 'json', 'xml', 'console' ],
	false
)

import "./wc/status-message.js"
import './wc/file-drop.js'
import './wc/file-target.js'

let message = document.getElementById("status");
message.text = "WebR Loading…"

import * as R from "./r.js";

await R.installRUniversePackages("basetheme")
R.library("basetheme")

message.text = "Installing {xtable}…"
await R.webR.installPackages([ "xtable" ])
R.library("xtable")

message.text = "Web R Initialized!"

await R.library(`datasets`)

message.text = "Ready"
