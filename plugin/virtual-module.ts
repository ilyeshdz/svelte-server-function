export function resolveVirtualModuleId(id: string) {
  if (id === "virtual:server-functions/internal") {
    return {
      id: id,
      moduleSideEffects: false,
    };
  }
}

export function loadVirtualModule(id: string) {
  if (id === "virtual:server-functions/internal") {
    return {
      code: "export const useServerFunction = (fnName, ...args) => {return {isPending: false, data: null, error: null}}",
    };
  }
}
