import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteServerFunction } from './plugin';

export default defineConfig({
	plugins: [svelteServerFunction(), sveltekit()]
});
