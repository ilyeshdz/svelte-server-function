import type { Plugin } from "vite";
import { PLUGIN_PREFIX, VIRTUAL_MODULE_PREFIX } from "../constants";

export function virtualModulesPlugin(): Plugin {
  return {
    name: `${PLUGIN_PREFIX}virtual-modules`,
    resolveId(source) {
      if (source.startsWith(VIRTUAL_MODULE_PREFIX)) return source;
      return null;
    },
    load(id) {
      // TODO: Implement virtual modules
    }
  }
}