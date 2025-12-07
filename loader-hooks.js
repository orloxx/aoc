import { existsSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import { pathToFileURL } from "node:url";

export async function resolve(specifier, context, nextResolve) {
  // Handle @/ imports
  if (specifier.startsWith("@/")) {
    const path = specifier.slice(2); // Remove @/
    const resolvedPath = resolvePath(process.cwd(), path);

    // Try with .js extension
    const pathWithJS = resolvedPath.endsWith(".js")
      ? resolvedPath
      : `${resolvedPath}.js`;

    if (existsSync(pathWithJS)) {
      return {
        url: pathToFileURL(pathWithJS).href,
        shortCircuit: true,
      };
    }

    // If file doesn't exist with .js, try as-is
    if (existsSync(resolvedPath)) {
      return {
        url: pathToFileURL(resolvedPath).href,
        shortCircuit: true,
      };
    }
  }

  // Let Node.js handle all other specifiers
  return nextResolve(specifier, context);
}
