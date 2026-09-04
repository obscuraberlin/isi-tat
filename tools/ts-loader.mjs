/* Minimaler Loader: erlaubt import einer .ts-Datei mit reinen Typen.
   Die Datendatei enthaelt keine Laufzeit-TypeScript-Konstrukte ausser
   Typannotationen, die Node ab 22 selbst entfernt. */
export async function load(url, context, next) {
  if (url.endsWith(".ts")) return next(url, { ...context, format: "module-typescript" });
  return next(url, context);
}
