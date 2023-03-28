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

message.text = "Installing packages…"

await R.webR.installPackages(["svglite", "xtable"])
await R.installRUniversePackages("basetheme")

await R.webR.evalRVoid(`
library(svglite)
library(xtable)
library(basetheme)
library(datasets)
`)

message.text = "Web R Initialized!"

message.text = "Ready"
