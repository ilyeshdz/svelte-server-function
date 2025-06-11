import { parseAst, type Plugin } from "vite";
import type { SvelteServerFunctionOptions } from "./types/config";
import { transformServerFunctions } from "./transform";
import { resolveVirtualModuleId, loadVirtualModule } from "./virtual-module";
import { generateEndpointManifest } from "./build";

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
    resolveId(id) {
      return resolveVirtualModuleId(id);
    },
    load(id) {
      return loadVirtualModule(id);
    },
    transform(code, id) {
      if (id.endsWith(".svelte") || id.includes("src/routes")) {
        return transformServerFunctions(code, id);
      }
    },
    configureServer(server) {
      const regenerate = async () => {
        if (!options.serverFunctionGlob) return;
        console.log("[svelte-server-functions] Regenerating manifest...");
        await generateEndpointManifest(options.serverFunctionGlob);
      };
    
      server.watcher.on("add", regenerate);
      server.watcher.on("unlink", regenerate);
      server.watcher.on("change", regenerate);
    },
    async buildStart() {
      if (!options.serverFunctionGlob) return;
      const endpoints = await generateEndpointManifest(
        options.serverFunctionGlob
      );
    },
  };
}
