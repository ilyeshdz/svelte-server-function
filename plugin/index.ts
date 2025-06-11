import type { Plugin } from "vite";

export function svelteServerFunction(): Plugin {
  return {
    name: "svelte-server-function",
    enforce: "pre",
    configResolved(config) {
      console.log("svelte-server-function is ready");
    },
  };
}
