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
import './wc/drop-target.js'

// update our status component
let message = document.getElementById("status");
message.text = "WebR Loading…"

// crank up WebR
import * as R from "./r.js";

message.text = "Installing {xtable}…"
await R.webR.installPackages([ "xtable" ])
R.library("xtable")

message.text = "Web R Initialized!"

await R.library(`datasets`)

// it's all in the hands of the user now
message.text = "Ready"
