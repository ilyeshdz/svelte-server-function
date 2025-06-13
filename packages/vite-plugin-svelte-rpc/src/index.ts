import type { Plugin } from 'vite';
import type { PluginOptions } from './types';
import { defaultOptions } from './core/options';

export default function vitePluginSvelteRpc(options: PluginOptions = defaultOptions): Plugin {
    return {
        name: 'vite-plugin-svelte-rpc'
    };
}
