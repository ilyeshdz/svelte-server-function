import { createHash } from 'node:crypto';
import type { ServerFunctionMetadata } from '../types';

export class RpcRegistry {
    private functions: Map<string, ServerFunctionMetadata> = new Map();

    /**
     * Generates a unique ID for a server function.
     * @param filePath The path to the server file.
     * @param functionName The name of the server function.
     * @returns The generated ID.
     */
    public generateFunctionId(filePath: string, functionName: string): string {
        const data = `${filePath}::${functionName}`;
        return createHash('sha256').update(data).digest('hex');
    }

    /**
     * Registers a server function.
     * @param metadata The metadata of the server function.
     */
    public registerFunction(metadata: ServerFunctionMetadata): void {
        if (!metadata.id) {
            metadata.id = this.generateFunctionId(
                metadata.filePath,
                metadata.functionName
            );
        }

        this.functions.set(metadata.id, metadata);
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
