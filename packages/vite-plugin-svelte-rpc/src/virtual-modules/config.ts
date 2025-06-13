import type { PluginOptions } from "../types";

export function getVirtualModuleConfig(options: PluginOptions): string {
    return `export const options = ${JSON.stringify(options)}`
}