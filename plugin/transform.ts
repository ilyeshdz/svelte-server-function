import type { TransformResult } from "vite";
import { tsProject } from "./tsmorph-project";
import { SyntaxKind } from "ts-morph";
import { removeQuotes } from "./utils/string";

export function transformServerFunctions(
  code: string,
  id: string
): TransformResult | null {
  const sourceFile = tsProject.createSourceFile(id, code, { overwrite: true });

  let changed = false;
  let isImported = false;

  sourceFile.getImportDeclarations().forEach((importDecl) => {
    const moduleSpecifier = importDecl.getModuleSpecifier().getText();
    if (moduleSpecifier.includes("$lib/server")) {
      const importNames = importDecl.getNamedImports().map((i) => i.getName());

      importNames.forEach((fnName) => {
        const refs = sourceFile
          .getDescendantsOfKind(SyntaxKind.Identifier)
          .filter((idNode) => idNode.getText() === fnName);

        refs.forEach((ref) => {
          const callExpr = ref.getParentIfKind(SyntaxKind.CallExpression);
          if (!callExpr) return;

          const args = callExpr.getArguments().map((arg) => arg.getText());

          callExpr.replaceWithText(
            `useServerFunction("${removeQuotes(moduleSpecifier)}::${fnName}"${
              args.length > 0 ? `, ${args.join(", ")}` : ""
            })`
          );

          if (!isImported) {
            importDecl.replaceWithText(
              `import { useServerFunction } from 'virtual:server-functions/internal'`
            );
            isImported = true;
          } else {
            importDecl.remove();
          }

          changed = true;
        });
      });
    }
  });

  if (changed) {
    return {
      code: sourceFile.getFullText(),
      map: {
        mappings: "",
      },
    };
  }
  return null;
}
