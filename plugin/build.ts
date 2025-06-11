import { SyntaxKind } from "ts-morph";
import { tsProject } from "./tsmorph-project";
import { globFiles, readFile, writeFile } from "./utils/file-system";
import { createHash } from "crypto";

export async function generateEndpointManifest(options: string | string[]) {
  type ManifestEntry = {
    id: string;
    filePath: string;
    exportName: string;
  };

  const manifest: Record<string, ManifestEntry> = {};

  const patterns = Array.isArray(options) ? options : [options];
  let allFiles: string[] = [];
  for (const pattern of patterns) {
    const files = await globFiles(pattern);
    allFiles.push(...files);
  }

  for (const file of allFiles) {
    const code = await readFile(file);
    const source = tsProject.createSourceFile(file, code, { overwrite: true });

    source.getExportedDeclarations().forEach((decls, exportName) => {
      for (const decl of decls) {
        const fnDecl = decl.getFirstChildByKind(SyntaxKind.FunctionDeclaration);
        const arrowFn = decl.getFirstChildByKind(SyntaxKind.ArrowFunction);

        if (fnDecl || arrowFn) {
          const id = createHash("sha256")
            .update(`${file}::${exportName}`)
            .digest("hex")
            .slice(0, 8);
          const filePath = file
            .replace(/^src\/lib/, "$lib")
            .replace(/\.ts$/, "");

          manifest[id] = {
            id,
            filePath,
            exportName,
          };
        }
      }
    });
  }

  const manifestPath = "src/lib/server/manifest.json";
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  return manifest;
}
