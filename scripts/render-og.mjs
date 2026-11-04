// Renders src/app/opengraph-image.png (1200×630) from local fonts and the hero painting.
// Usage: node scripts/render-og.mjs
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const f = (p) => readFileSync(new URL(`../${p}`, import.meta.url)).toString("base64");
const font = (n) => `data:font/woff2;base64,${f(`src/fonts/${n}`)}`;
const art = `data:image/webp;base64,${f("public/art/krishna-fluting-800.webp")}`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(`<!doctype html><html><head><style>
@font-face{font-family:C;font-weight:300;src:url(${font("cormorant-garamond-latin-300-normal.woff2")})}
@font-face{font-family:C;font-style:italic;font-weight:400;src:url(${font("cormorant-garamond-latin-400-italic.woff2")})}
@font-face{font-family:M;font-weight:700;src:url(${font("manrope-latin-700-normal.woff2")})}
@font-face{font-family:M;font-weight:600;src:url(${font("manrope-latin-600-normal.woff2")})}
@font-face{font-family:T;src:url(${font("tiro-devanagari-sanskrit-subset.woff2")})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#f5eee2;color:#1b1713;display:grid;grid-template-columns:1fr 380px;gap:56px;align-items:center;padding:0 72px 0 80px;overflow:hidden;position:relative}
.e{font:700 14px M;letter-spacing:.18em;text-transform:uppercase;display:flex;gap:14px;align-items:center}
.e b{font:400 22px T;letter-spacing:0;color:#8a4a12}
h1{font:300 112px/0.86 C;letter-spacing:-.035em;margin-top:26px}
h1 em{font:italic 400 112px/0.86 C;color:#8a4a12}
p{font:600 20px/1.45 M;color:#4a4037;margin-top:26px;max-width:32ch}
.a{height:520px;border-radius:999px 999px 6px 6px;overflow:hidden}
.a img{width:100%;height:100%;object-fit:cover}
.c{position:absolute;left:80px;bottom:34px;font:600 12px M;letter-spacing:.06em;color:#4a4037}
</style></head><body>
<div><div class="e"><b>ज्योतिष</b>Pandit Thulasidas · Sydney</div><h1>Ancient sky, <em>personal</em> counsel.</h1><p>Vedic astrology, palmistry, psychic &amp; spiritual guidance.</p></div>
<div class="a"><img src="${art}"></div>
<div class="c">Krishna Fluting, Rajasthan c. 1675–1700 · The Cleveland Museum of Art · CC0</div>
</body></html>`);
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(300);
for (const n of ["opengraph-image.png", "twitter-image.png"]) await p.screenshot({ path: new URL(`../src/app/${n}`, import.meta.url).pathname });
await b.close();
console.log("wrote OG + Twitter images");
