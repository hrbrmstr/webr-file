# This is a justfile (https://github.com/casey/just)

# list out the available actions
default:
	@just --list

# install/update miniserve
install-miniserve:
  @cargo install miniserve

# open google chrome beta to the local dev server
browse: 
	@open -a "Google Chrome Beta"  http://localhost:8080/

# serve project (requires miniserve)
serve:
	@miniserve \
		--header "Cache-Control: no-cache; max-age=1" \
		--header "Cross-Origin-Embedder-Policy: require-corp" \
		--header "Cross-Origin-Opener-Policy: same-origin" \
		--header "Cross-Origin-Resource-Policy: cross-origin" \
		--index index.html \
		.

# serve project from ./build (requires miniserve)
serve-build:
	@miniserve \
		--header "Cache-Control: no-cache; max-age=1" \
		--header "Cross-Origin-Embedder-Policy: require-corp" \
		--header "Cross-Origin-Opener-Policy: same-origin" \
		--header "Cross-Origin-Resource-Policy: cross-origin" \
		--index index.html \
		build

# sync to host
rsync:
	@rsync -avp ./build/ rud.is:~/rud.is/w/webr-file/

# publish to GH
github:
	@git add -A
	@git commit -m "chore: lazy justfile commit" 
	@git push

# be environmentally conscious
rollup:
	@rm -rf build/
	@npx rollup --config