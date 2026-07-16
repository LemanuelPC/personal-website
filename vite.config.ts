import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// The site has no server routes, so it prerenders to plain files that
			// any static host can serve. Trailing slashes give every route its own
			// directory with an index.html, which Apache and LiteSpeed serve
			// without needing rewrite rules.
			adapter: adapter(),
			prerender: { handleHttpError: 'fail' },
			paths: { relative: false }
		})
	]
});
