// Renders src/app/opengraph-image.png (1200×630) from the live plate SVG and local fonts.
// Usage: BASE_URL=http://localhost:3100 node scripts/render-og.mjs
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const font = (f) => `data:font/woff2;base64,${readFileSync(new URL(`../src/fonts/${f}`, import.meta.url)).toString("base64")}`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto(BASE + "/", { waitUntil: "networkidle" });
const svg = await p.evaluate(() => {
  const s = document.querySelector("section figure svg").cloneNode(true);
  s.removeAttribute("class");
  return s.outerHTML;
});
await p.setContent(`<!doctype html><html><head><style>
@font-face{font-family:IS;src:url(${font("instrument-serif-latin-400-normal.woff2")})}
@font-face{font-family:MR;font-weight:700;src:url(${font("manrope-latin-700-normal.woff2")})}
@font-face{font-family:MR;font-weight:500;src:url(${font("manrope-latin-500-normal.woff2")})}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#171813;color:#F4EFE4;display:grid;grid-template-columns:1fr 520px;align-items:center;padding:0 64px 0 80px;overflow:hidden}
.e{font:700 15px MR;letter-spacing:.14em;text-transform:uppercase;color:#C3A46C}
h1{font:400 104px/0.95 IS;letter-spacing:-.035em;margin-top:28px}
p{font:500 20px/1.5 MR;color:#D1C8B6;margin-top:28px;max-width:30ch}
svg{width:520px;height:520px}
.c{position:absolute;left:80px;bottom:40px;font:700 12px MR;letter-spacing:.14em;color:#D1C8B6}
</style></head><body><div><div class="e">Pandit Thulasidas · Sydney</div><h1>Vedic astrology, one to one.</h1><p>Horoscope, palmistry and spiritual consultations.</p></div>${svg}<div class="c">FIG. 01 / CELESTIAL STUDY</div></body></html>`);
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: new URL("../src/app/opengraph-image.png", import.meta.url).pathname });
await b.close();
console.log("wrote src/app/opengraph-image.png");
