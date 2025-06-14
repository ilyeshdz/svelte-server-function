import { createHash } from 'node:crypto';
import type { ServerFunctionMetadata, RegisterFunctionOptions } from '../types';

export class RpcRegistry {
    private functions: Map<string, ServerFunctionMetadata> = new Map();

    /**
     * Generates a unique ID for a server function.
     */
    public generateFunctionId(filePath: string, functionName: string): string {
        const data = `${filePath}::${functionName}`;
        return createHash('sha256').update(data).digest('hex');
    }

    /**
     * Registers a server function.
     * @throws If the function is already registered
     */
    public registerFunction(
        metadata: Omit<ServerFunctionMetadata, 'id'>,
        options: RegisterFunctionOptions
    ): string {
        const id = this.generateFunctionId(
            metadata.filePath,
            metadata.functionName
        );

        if (this.functions.has(id)) {
            if (!options.override) {
                throw new Error(
                    `Function '${metadata.functionName}' from '${metadata.filePath}' is already registered`
                );
            }
        }

        const functionMetadata: ServerFunctionMetadata = {
            ...metadata,
            id,
            isDefaultExport: metadata.isDefaultExport ?? false
        };

        this.functions.set(id, functionMetadata);
        return id;
    }

    /**
     * Gets a server function by its ID.
     **/
    public getFunctionById(id: string): ServerFunctionMetadata | undefined {
        return this.functions.get(id);
    }

    /**
     * Gets a server function by its path and name.
     * @param filePath The path to the server file.
     * @param functionName The name of the server function.
     * @returns The server function metadata.
     */
    public getFunctionByPathAndName(
        filePath: string,
        functionName: string
    ): ServerFunctionMetadata | undefined {
        return this.functions.get(
            this.generateFunctionId(filePath, functionName)
        );
    }

    /**
     * Gets all server functions.
     * @returns An array of server function metadata.
     */
    public getAllFunctions(): ServerFunctionMetadata[] {
        return Array.from(this.functions.values());
    }

    /**
     * Clears the registry.
     */
    public clear(): void {
        this.functions.clear();
    }
}
