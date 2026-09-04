/**
 * Baut die Vorschau: eine einzelne HTML-Datei mit eingebettetem CSS und JS.
 *
 *   node tools/build-preview.mjs dist/preview.html
 */
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";

/* --standalone erzeugt ein vollstaendiges HTML-Dokument, das sich per
   Doppelklick oder auf jedem Webspace oeffnen laesst. Ohne das Flag bleibt
   es ein Fragment fuer den Artifact-Host, der Kopf und Rumpf selbst mitbringt. */
const args = process.argv.slice(2).filter((a) => a !== "--standalone");
const standalone = process.argv.includes("--standalone");
const target = args[0] ?? "dist/preview.html";
const tmp = ".preview-build";

rmSync(tmp, { recursive: true, force: true });

await build({
  entryPoints: ["tools/preview-entry.tsx"],
  bundle: true,
  /* Bezeichner NICHT mangeln: die verkuerzten Namen der CSS-Module
     kollidieren dateiuebergreifend und Regeln ueberschreiben sich. */
  minifyWhitespace: true,
  minifySyntax: true,
  minifyIdentifiers: false,
  format: "iife",
  target: ["es2020"],
  jsx: "automatic",
  tsconfig: "tsconfig.json",
  outdir: tmp,
  loader: { ".css": "local-css" },
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "warning",
});

const js = readFileSync(join(tmp, "preview-entry.js"), "utf8");
const css = readFileSync(join(tmp, "preview-entry.css"), "utf8");

const title = "ISI TAT BUSINESS CLUB";
const description =
  "Über 20 Jahre Vertrieb, Business und Netzwerk. Inhalte, Live-Austausch und ein Umfeld, in dem du mit deinen Fragen nicht alleine bleibst.";

/* next/font faellt in der Vorschau weg — Inter kommt von Google Fonts.
   Die Variablen tragen dieselben Namen wie im Produktionsbuild. */
const html = `<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Inter:wght@400;500;600;700&display=swap">
<style>
:root {
  --font-inter: "Inter";
  --font-archivo: "Archivo";
}
${css}
</style>
<div id="root"></div>
<script>
${js.replace(/<\/(script)/gi, "<\\/$1")}
</script>
`;

const doc = standalone
  ? `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${description}">
<meta name="robots" content="noindex, nofollow">
<style>
  :root { color-scheme: light }
  body { margin: 0 }
  img { max-width: 100% }
  [hidden] { display: none !important }
</style>
${html.replace('<div id="root">', '</head>\n<body>\n<div id="root">')}</body>
</html>
`
  : html;

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, doc);
rmSync(tmp, { recursive: true, force: true });
console.log(`${target} — ${(html.length / 1024).toFixed(0)} KB`);
