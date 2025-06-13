import type { Plugin } from 'vite';
import {
    PLUGIN_PREFIX,
    VIRTUAL_MODULE_CONFIG_ID,
    VIRTUAL_MODULE_INTERNAL_ID,
    VIRTUAL_MODULE_PREFIX
} from '../constants';
import type { PluginOptions } from '../types';
import { getVirtualModuleConfig } from './config';

export function virtualModulesPlugin(options: PluginOptions): Plugin {
    return {
        name: `${PLUGIN_PREFIX}virtual-modules`,
        resolveId(source) {
            if (source.startsWith(VIRTUAL_MODULE_PREFIX)) return source;
            return null;
        },
        load(id) {
            switch (id) {
                case VIRTUAL_MODULE_INTERNAL_ID:
                    return '';
                case VIRTUAL_MODULE_CONFIG_ID:
                    return getVirtualModuleConfig(options);
                default:
                    return null;
            }
        }
    };
}
