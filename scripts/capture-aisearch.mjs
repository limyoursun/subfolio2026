import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync } from "fs";

const URL = "https://www.firstmall.kr/event/202609/aisearch";
const OUT_DIR = "public/images";
const VIEWPORT = { width: 1440, height: 900 };

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VIEWPORT });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const fullHeight = await page.evaluate(() => document.body.scrollHeight);
const stops = [0, 0.28, 0.5, 0.82].map((r) => Math.round(r * (fullHeight - VIEWPORT.height)));

const shots = [
  { name: "img_aisearch_1", y: stops[0] },
  { name: "img_aisearch_4", y: stops[1] },
  { name: "img_aisearch_5", y: stops[2] },
  { name: "img_aisearch_detail_1", y: stops[3] },
];

for (const shot of shots) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.max(shot.y, 0));
  await page.waitForTimeout(600);
  const pngPath = `${OUT_DIR}/${shot.name}.png`;
  await page.screenshot({ path: pngPath });
  await sharp(pngPath).webp({ quality: 88 }).toFile(`${OUT_DIR}/${shot.name}.webp`);
  console.log(`captured ${shot.name}`);
}

await browser.close();
