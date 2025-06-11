export interface SvelteServerFunctionOptions {
  /**
   * The glob pattern or patterns to match server functions files (e.g., 'src/lib/server/**\/*.ts' or ['src/api/**\/*.ts', 'src/server/**\/*.ts'])
   */
  serverFunctionGlob?: string | string[];
  /**
   * The HTTP endpoint path where server functions will be exposed (e.g., '/_server_fns')
   */
  rpcEndpoint?: string;
}
