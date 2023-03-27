---
{
  "title": "Vanilla JS WebR + Rollup For Smaller & Easier Deploys",
  "og" : {
    "site_name": "WebR Exeriments",
    "url": "https://rud.is/w/rollup-vanilla-webr",
    "description": "Vanilla JS WebR + Rollup For Smaller & Easier Deploys",
    "image": {
      "url": "https://rud.is/w/rollup-vanilla-webr/img/preview.png",
      "height": "768",
      "width": "1536",
      "alt": "Base R bar plot"
    }
  },
  "twitter": {
    "site": "@hrbrmstr",
    "domain": "rud.is"
  }
}
---

# 🧪 Vanilla JS WebR + Rollup For Smaller & Easier Deploys

<status-message id="status"></status-message>

## Going Deeper Into the JavaScript Well

### This is a Lit + WebR + [Observable Plot](https://github.com/observablehq/plot) reproduction of the [OG Shiny Demo App](https://shiny.rstudio.com/gallery/telephones-by-region.html)

<region-plot id="regionsOutput" svgId="lit-regions">
  <select-list label="Select a region:" id="regionsInput"></select-list>
</region-plot>

### Yo Yo Yo!

[Install npm](https://nodejs.org/en/download/package-manager)

```console
npm install -g npx
npm install rollup --global 
npm install --save-dev \
  rollup \
  rollup-plugin-url-resolve \
	@web/rollup-plugin-html \
	rollup-plugin-copy
```

<p style="text-align:center;margin-top:2rem;">Brought to you by @hrbrmstr</p>
