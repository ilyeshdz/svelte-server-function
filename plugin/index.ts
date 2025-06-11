import type { Plugin } from "vite";
import type { SvelteServerFunctionOptions } from "./types/config";

/**
 * A Vite plugin that allows you to call server functions as if they were local client-side functions within SvelteKit.
 */
export function svelteServerFunction(
  options: SvelteServerFunctionOptions = {
    serverFunctionGlob: "src/lib/server/**/*.ts",
    rpcEndpoint: "/_server_fns",
  }
): Plugin {
  return {
    name: "svelte-server-function",
    enforce: "pre",
    configResolved(config) {},
  };
}
