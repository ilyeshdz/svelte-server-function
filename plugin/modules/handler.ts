import { modules } from "$lib/.svelte-server-functions-map";
import { manifest } from "virtual:server-functions/manifest";
import { error, json } from "@sveltejs/kit";

export async function POST({ request }) {
  const id = request.headers.get("Server-Function-Id");
  const fnMeta = manifest[id];
  if (!fnMeta) throw error(404, "Function not found");

  const args = await request.json();

  const mod = modules[fnMeta.filePath];
  if (!mod) throw error(500, "Module not found");

  const fn = mod[fnMeta.exportName];
  if (typeof fn !== "function") throw error(500, "Export is not a function");

  try {
    const result = await fn(...args);
    return json(result);
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
}
