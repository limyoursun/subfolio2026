import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import path from "path";

const dir = process.argv[2];
if (!dir) {
  console.error("Usage: node convert-webp.mjs <dir>");
  process.exit(1);
}

const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".png"));

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const inputPath = path.join(dir, file);
  const outputPath = path.join(dir, file.replace(/\.png$/i, ".webp"));
  const before = statSync(inputPath).size;

  await sharp(inputPath).webp({ lossless: true }).toFile(outputPath);

  const after = statSync(outputPath).size;
  totalBefore += before;
  totalAfter += after;

  console.log(
    `${file} -> ${path.basename(outputPath)}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
  );
}

console.log("---");
console.log(
  `Total: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`
);
