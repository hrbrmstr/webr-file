import urlResolve from 'rollup-plugin-url-resolve';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import copy from 'rollup-plugin-copy';

export default [
	{
		
		input: './main.js',
		
		output: {
			dir: 'build',
			format: 'es'
		},
		
		plugins: [
			urlResolve({
				cacheManager: '.cache',
				minify: true,
			}),
			html({
				input: 'index.html',
				minify: true,
			}),
			copy({
				targets: [
					{ src: 'dist/onig.wasm', dest: 'build/dist' },
					{ src: 'md/**/*', dest: 'build/md' },
					{ src: 'languages/**/*', dest: 'build/languages' },
					{ src: 'themes/**/*', dest: 'build/themes' },
					{ src: 'img/**/*', dest: 'build/img' },
					{ src: '*.map', dest: 'build' },
					{ src: 'favicon.ico', dest: 'build' },
				]
			})
		]
		
	}
];