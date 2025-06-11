# Svelte Server Function

> Experimental Vite plugin for calling server-side functions in SvelteKit as if they were local client-side hooks.

## 🚨 Disclaimer

This project is **experimental** and **not production-ready**. Use it at your own risk.  
We currently have no plans to publish it as a stable package, but **contributions and feedback are welcome**.

---

## ✨ What It Does

This Vite plugin enables developers to:

- Write server-side functions in `src/lib/server/*.ts`
- Import and call them from client-side Svelte components as if they were local functions
- Automatically get reactive state: `isPending`, `data`, `error`

---

## ⚙️ How It Works

1. ### 🔁 Server Function Transformation

   The plugin scans and rewrites imports from `src/lib/server/**/*`.  
   For example:

   ```ts
   import { getUser } from "$lib/server/get-user";

   const { data, error, isPending } = getUser("123");
   ```

---

## 🗂 Manifest Generation

Whenever you run the dev server or build your project, the plugin will automatically generate a manifest file at `src/lib/server/manifest.json`. This manifest contains metadata about all exported server functions, including their names, argument lists, and function bodies. The manifest is kept up to date with file changes, additions, or deletions in your server function files.

- **Location:** `src/lib/server/manifest.json`
- **Contents:**
  ```json
  {
    "df4e9a87": {
      "id": "df4e9a87",
      "filePath": "$lib/server/get-user",
      "exportName": "getUser"
    }
  }
  ```
- **How it's generated:**
  - On dev server start
  - On build
  - On any add/change/remove of files in your server functions directory

You do not need to manually update or maintain this manifest; it is handled automatically by the plugin.
