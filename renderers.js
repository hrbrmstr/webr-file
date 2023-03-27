/**
 * @module renderers
 */


import * as shiki from './dist/index.browser.mjs';
import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/+esm';
import markdownItFrontMatter from 'https://cdn.jsdelivr.net/npm/markdown-it-front-matter@0.2.3/+esm'
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { createMetaTag } from './utils.js';

export let frontMatter;
export let currentTheme;
export let highlighter;

/**
 * Renter a markdown file directly into the body of a page,
 * optionally including open graph tags.
 * 
 * @note Most "unfurlers" won't see the OG tags if dynamically rendered.
 *       I'm using the JSON frontmatter to keep track of stuff and to 
 *       potentially provide parameterized (via HTTP query strings) experiments.
 *       It's super easy to change `renderFrontMatter` to `false` for "production"
 *       after I copy the rendered OG tags into `index.html` from DevTools "inspect".
 * @param {string} markdownFile 
 * @param {string} theme 
 * @param {string[]} langs 
 * @param {boolean} renderFrontmatter 
 */
export async function renderMarkdownInBody(
	markdownFile,
	theme,
	langs = [ 'javascript', 'r', 'json', 'xml', 'console' ],
	renderFrontmatter = true) {
	
	currentTheme = await d3.json(`./themes/${theme}.json`);
	const readHTML = new DOMParser();
	const content = document.getElementById("content")

	const highlighter = await shiki.getHighlighter({
		theme: 'ayu-dark',
		langs: [ 'js', 'r', 'json', 'xml', 'console' ]
	});

	const md = new MarkdownIt({
		html: true,
		highlight: (code, lang) => {
			return highlighter.codeToHtml(code, { lang })
		}
	}).use(markdownItFrontMatter, async fm => {

		// extract frontmatter and setup meta tags and title
		frontMatter = JSON.parse(fm);
		
		if (renderFrontmatter) {
			const matterKeys = Object.keys(frontMatter);

			const head = document.getElementsByTagName("head")[ 0 ];

			if (matterKeys.includes("title")) {
				document.title = frontMatter.title;
				head.appendChild(createMetaTag("og:title", frontMatter.title))
				head.appendChild(createMetaTag("twitter:title", frontMatter.title))
			}

			if (matterKeys.includes("og")) {
				frontMatter.og.description && head.appendChild(createMetaTag("og:description", frontMatter.og.description))
				frontMatter.og.description && head.appendChild(createMetaTag("twitter:description", frontMatter.og.description))
				frontMatter.og.url && head.appendChild(createMetaTag("og:site", frontMatter.og.url))
				frontMatter.og.site_name && head.appendChild(createMetaTag("og:site_name", frontMatter.og.site_name))
				frontMatter.og.image.url && head.appendChild(createMetaTag("og:image:url", frontMatter.og.image.url))
				frontMatter.og.image.width && head.appendChild(createMetaTag("og:image:width", frontMatter.og.image.width))
				frontMatter.og.image.height && head.appendChild(createMetaTag("og:image:height", frontMatter.og.image.height))
				frontMatter.og.image.alt && head.appendChild(createMetaTag("og:image:alt", frontMatter.og.image.alt))
			
			}

			if (matterKeys.includes("twitter")) {
				frontMatter.twitter.site && head.appendChild(createMetaTag("twitter:site_name", frontMatter.twitter.site))
				frontMatter.twitter.domain && head.appendChild(createMetaTag("twitter:domain", frontMatter.twitter.domain))
				frontMatter.og.image.url && head.appendChild(createMetaTag("twitter:image", frontMatter.og.image.url))
				frontMatter.og.image.url && head.appendChild(createMetaTag("twitter:card", "summary_large_image"))
			}

			head.appendChild(createMetaTag("article:published_time", new Date().toISOString()))
	}

	})

	// parse the rest of the document and add it to the body
	const mdContent = await d3.text(`md/${markdownFile}.md`);
	const rendered = md.render(mdContent);
	const contentParsed = readHTML.parseFromString(rendered, "text/html");
	const bodyContent = contentParsed.getElementsByTagName("body")[ 0 ];
	content.replaceChildren();
	while (bodyContent.childNodes.length > 0) {
		content.appendChild(bodyContent.childNodes[ 0 ]);
	}

}
