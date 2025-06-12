# Svelte Server Function

> Experimental Vite plugin for calling server-side functions in SvelteKit as if they were local client-side hooks.

## 🚨 Disclaimer

This project is **experimental** and **not production-ready**. Use it at your own risk.  
We currently have no plans to publish it as a stable package, but **contributions and feedback are welcome**.

---

## ✨ What It Does

This experimental system lets you:

- Write server-side functions in `src/lib/server/*.ts`
- Import and call them from client-side Svelte components as if they were local functions
- Automatically get reactive state: `isPending`, `data`, `error` (via auto-generated code, not a public API)

---

## ⚙️ How It Works

1. ### 🔁 Server Function Transformation

   The system scans and rewrites imports from `src/lib/server/**/*` in your Svelte files.  
   For example:

   ```ts
   import { getUser } from "$lib/server/get-user";

   // This call is automatically transformed by the plugin to use an internal hook for RPC.
   const { data, error, isPending } = getUser("123");
   ```

   > **Note:** The internal hook (`useServerFunction`) is not meant to be used directly by developers. All transformation is handled automatically.

---

## 🗂 Manifest & Import Map Generation

When you run the dev server or build your project, the system now generates:

- A static import map at `src/lib/.svelte-server-functions-map.ts`
- An in-memory manifest (exposed via a virtual module)

These files contain metadata about all exported server functions, including their IDs, file paths, and export names. The system keeps them up to date with any file changes, additions, or deletions in your server function files.

- **Import Map Location:** `src/lib/.svelte-server-functions-map.ts`
- **Manifest:** Exposed as a virtual module (`virtual:server-functions/manifest`)
- **Contents Example:**
  ```js
  // .svelte-server-functions-map.ts
  import * as mod0 from '$lib/server/get-user';
  export const modules = {
    "$lib/server/get-user": mod0,
  };
  ```
  ```js
  // virtual:server-functions/manifest
  export const manifest = {
    "df4e9a87": {
      id: "df4e9a87",
      filePath: "$lib/server/get-user",
      exportName: "getUser"
    }
  };
  ```
- **How they're generated:**
  - On dev server start
  - On build
  - On any add/change/remove of files in your server functions directory

You do not need to manually update or maintain these files; everything is handled automatically by the system.