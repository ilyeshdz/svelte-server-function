import type { Plugin } from 'vite';
import type { PluginOptions } from './types';
import { defaultOptions } from './core/options';
import { RpcRegistry } from './core/rpc-registry';

export default function vitePluginSvelteRpc(options: PluginOptions = defaultOptions): Plugin[] {
    const registry = new RpcRegistry();

    return []
}
