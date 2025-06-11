import { SyntaxKind } from "ts-morph";
import { tsProject } from "./tsmorph-project";
import type { SvelteServerFunctionOptions } from "./types/config";
import { globFiles, readFile, writeFile } from "./utils/file-system";
import { convertMapIntoObject } from "./utils/map";

export async function generateEndpointManifest(options: string | string[]) {
  let endpoints: Map<string, { args: string[]; body: string }> = new Map();

  // Normalize options to an array of glob patterns
  const patterns = Array.isArray(options) ? options : [options];
  // Collect all files matching all patterns
  let allFiles: string[] = [];
  for (const pattern of patterns) {
    const files = await globFiles(pattern);
    allFiles.push(...files);
  }

  for (const file of allFiles) {
    const code = await readFile(file);
    const source = tsProject.createSourceFile(file, code, { overwrite: true });
    source.getExportedDeclarations().forEach((value, key) => {
      value.forEach((decl) => {
        const fnArrows = decl.getChildrenOfKind(SyntaxKind.ArrowFunction);
        fnArrows.forEach((arrowFn) => {
          const varDecl = arrowFn.getFirstAncestorByKind(
            SyntaxKind.VariableDeclaration
          );
          const name = varDecl?.getName() ?? "anonymousArrowFn";
          const args = arrowFn.getParameters().map((arg) => arg.getName());
          const body = arrowFn.getBodyText() ?? "";
          endpoints.set(name, { args, body });
        });
        const fns = decl.getChildrenOfKind(SyntaxKind.FunctionDeclaration);
        fns.forEach((fn) => {
          const name = fn.getName() ?? "anonymousFn";
          const args = fn.getParameters().map((arg) => arg.getName());
          const body = fn.getBodyText() ?? "";
          endpoints.set(name, { args, body });
        });
      });
    });
  }

  const manifestPath = "src/lib/server/manifest.json";
  await writeFile(
    manifestPath,
    JSON.stringify(convertMapIntoObject(endpoints))
  );

  return endpoints;
}
