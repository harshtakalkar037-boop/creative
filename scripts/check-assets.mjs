import fs from "node:fs";
import path from "node:path";

const roots = ["src"];
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".html"]);
const publicRoot = path.resolve("public");
const missing = new Set();

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (sourceExtensions.has(path.extname(entry.name))) {
      const source = fs.readFileSync(full, "utf8");
      const pattern = /(["'`])\/(assets\/[A-Za-z0-9_./@ -]+)\1/g;
      for (const match of source.matchAll(pattern)) {
        const relative = match[2].split(/[?#]/, 1)[0];
        const candidate = path.resolve(publicRoot, relative);
        if (!candidate.startsWith(publicRoot + path.sep) || !fs.existsSync(candidate)) missing.add("/" + relative);
      }
    }
  }
}
for (const root of roots) walk(root);
if (missing.size) {
  console.error("Missing local public assets:");
  for (const item of [...missing].sort()) console.error(" - " + item);
  process.exit(1);
}
console.log("Local asset path check passed.");
