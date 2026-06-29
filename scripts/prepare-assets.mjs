import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = process.argv[2];

if (!source) {
  console.error("Usage: npm run assets -- <source-image-path>");
  process.exit(1);
}

const outputDir = path.join(process.cwd(), "public", "assets");
const outputPath = path.join(outputDir, "avatar.jpg");

await fs.mkdir(outputDir, { recursive: true });

await sharp(source)
  .resize(960, 960, {
    fit: "cover",
    position: "top",
  })
  .jpeg({
    quality: 88,
    mozjpeg: true,
  })
  .toFile(outputPath);

console.log(`Wrote ${path.relative(process.cwd(), outputPath)}`);
