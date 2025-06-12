import type { FileBackedCache } from "./utils/cache";
import { readFile } from "./utils/file-system";

export function resolveVirtualModuleId(id: string) {
  if (id === "virtual:server-functions/internal") {
    return {
      id: id,
      moduleSideEffects: false,
    };
  } else if (id === "virtual:server-functions/manifest") {
    return {
      id: id,
      moduleSideEffects: false,
    };
  }
}

export async function loadVirtualModule(id: string, cache: FileBackedCache, rpcEndpoint: string) {
  if (id === "virtual:server-functions/internal") {
    return {
      code: (await readFile("./plugin/modules/internal.js")).replace("{rpcEndpoint}", rpcEndpoint),
    };
  } else if (id === "virtual:server-functions/manifest") {
    return {
      code: `export const manifest = ${JSON.stringify(cache.toObject())}`,
    };
  }
}
