/**
 * The options for the vite-plugin-svelte-rpc plugin.
 */
export interface PluginOptions {
    /**
     * The endpoint of the RPC server;
     * @default '/__rpc'
     */
    rpcEndpoint: string;
    /**
     * The glob pattern to match the server files.
     * @default 'src/lib/server/** /*ts'
     */
    include?: string | string[];
}

/**
 * The metadata of a server function argument.
 */
export interface ServerFunctionArgumentMetadata {
    name: string;
    type: string;
}

/**
 * The metadata of a server function.
 */
export interface ServerFunctionMetadata {
    id: string;
    filePath: string;
    functionName: string;
    args: ServerFunctionArgumentMetadata[];
    isDefaultExport?: boolean;
    returnType: string;
}

export interface RegisterFunctionOptions {
    override?: boolean;
}
