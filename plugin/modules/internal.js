import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { manifest } from "virtual:server-functions/manifest";

function getFn(path, exportName) {
  return Object.values(manifest).find(
    (fn) => fn.filePath === path && fn.exportName === exportName
  );
}

/**
 * useServerFunction retourne un store { isPending, data, error }
 */
export function useServerFunction(fnName, ...args) {
  const isPending = writable(false);
  const data = writable(null);
  const error = writable(null);

  if (!browser) {
    // Côté serveur : renvoyer un store "vide" statique
    return { isPending, data, error };
  }

  const [path, exportName] = fnName.split("::");
  const fn = getFn(path, exportName);

  if (!fn) {
    error.set(new Error(`Server function ${fnName} not found in manifest`));
    return { isPending, data, error };
  }

  isPending.set(true);

  fetch(`{rpcEndpoint}`, {
    method: "POST",
    body: JSON.stringify(args),
    headers: { "Server-Function-Id": fn.id },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
      return res.json();
    })
    .then((json) => {
      data.set(json);
      error.set(null);
    })
    .catch((err) => {
      error.set(err);
      data.set(null);
    })
    .finally(() => {
      isPending.set(false);
    });

  return { isPending, data, error };
}
