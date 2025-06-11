import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteServerFunction } from './plugin';
import inspect from 'vite-plugin-inspect';

export default defineConfig({
	plugins: [inspect(), svelteServerFunction(), sveltekit()]
});
