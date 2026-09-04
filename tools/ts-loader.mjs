/* Minimaler Loader fuer die Skripte in tools/: erlaubt import einer
   .ts-Datei mit reinen Typannotationen, die Node ab 22 selbst entfernt.

   Der resolve-Hook ergaenzt fehlende Endungen. TypeScript-Quellen
   schreiben "./mediaFiles" ohne .ts — Node ESM verlangt den vollen
   Bezeichner und wuerde sonst abbrechen. */
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve as resolvePath } from "node:path";

export async function resolve(specifier, context, next) {
  if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) {
    const base = context.parentURL
      ? dirname(fileURLToPath(context.parentURL))
      : process.cwd();
    for (const endung of [".ts", ".tsx", "/index.ts"]) {
      const kandidat = resolvePath(base, specifier + endung);
      if (existsSync(kandidat)) {
        return next(pathToFileURL(kandidat).href, context);
      }
    }
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url.endsWith(".ts") || url.endsWith(".tsx")) {
    return next(url, { ...context, format: "module-typescript" });
  }
  return next(url, context);
}
