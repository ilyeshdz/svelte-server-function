# Svelte Server Function

> This is an experimental project to seamlessly integrate server-side logic directly into your SvelteKit client components, allowing you to call server functions as if they were local client-side functions.

## Disclaimer

This project is currently in its early stages and is not yet ready for production use. It is provided as-is and without any warranty, express or implied. Use at your own risk.
We don't plan to release this as a production-ready library, but we welcome feedback and contributions to help us improve it.

## How It Works

This project provides a Vite plugin that enables you to call server-side functions from your SvelteKit client components as if they were local functions. The core mechanism works as follows:

1. **Server Function Import Transformation**:  
   When you import functions from files matching the pattern (by default, `src/lib/server/**/*.ts`) and use them in your Svelte or route files, the plugin automatically rewrites those function calls. Instead of calling the server function directly, the call is replaced with a special `useServerFunction` hook.

2. **Virtual Module Injection**:  
   The plugin injects a virtual module (`virtual:server-functions/internal`) that exports the `useServerFunction` hook. This hook is used as a placeholder for the client-side invocation of server functions. (Currently, this is a stub and does not actually perform a network call, but demonstrates the transformation pipeline.)

3. **Vite Plugin Integration**:  
   The plugin hooks into the Vite build process:

   - It resolves imports to the virtual module.
   - It loads the virtual module code when requested.
   - It transforms code in `.svelte` and `src/routes` files, rewriting server function imports and calls.

4. **Experimental Status**:  
   This is an early-stage, experimental project. The current implementation demonstrates the transformation and plugin pipeline, but does not yet provide a full RPC mechanism or server-side execution. Contributions and feedback are welcome!
