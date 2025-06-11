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
