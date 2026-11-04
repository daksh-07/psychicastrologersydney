// Browser QA for The Sacred Atelier preview.
// Usage: BASE_URL=http://localhost:3100 node tests/e2e/run.mjs
// Uses synthetic data only. wa.me navigations are intercepted and aborted — no message is ever sent.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";

const require = createRequire(import.meta.url);
const { chromium, webkit } = require("playwright");

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const OUT = new URL("./output/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const SERVICE_SLUGS = [
  "love-marriage", "relationship-guidance", "get-your-love-back", "extra-marital-concerns",
  "marriage-guidance", "family-problems", "childless-couples",
  "vedic-astrology", "palm-reading", "psychic-reading",
  "career-and-education", "business-and-finance", "legal-concerns",
  "spiritual-guidance", "negative-energy", "black-magic-concerns",
];
const ROUTES = ["/", "/about", "/consultations", ...SERVICE_SLUGS.map((s) => `/consultations/${s}`), "/faq", "/contact", "/privacy"];
const WIDTHS = [320, 375, 390, 430, 768, 1024, 1440, 1920];
const SYNTH = { name: "Testa Synthetic", phone: "+61 400 000 000", note: "Synthetic QA note — 50% & more?" };

let failures = 0;
const results = [];
function check(name, cond, detail = "") {
  results.push(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
  if (!cond) failures++;
}

async function run(browserType, label) {
  let browser;
  try {
    browser = await browserType.launch();
  } catch (e) {
    results.push(`SKIP  ${label}: browser unavailable (${String(e.message).split("\n")[0]})`);
    return;
  }
  const full = label === "chromium";

  // ---------- Routes, metadata, noindex, console ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(`${page.url()}: ${m.text()}`));
    page.on("pageerror", (e) => consoleErrors.push(`${page.url()}: ${e.message}`));
    const titles = new Set();
    const descs = new Set();
    for (const r of ROUTES) {
      const res = await page.goto(BASE + r, { waitUntil: "networkidle" });
      const status = res?.status();
      const xr = res?.headers()["x-robots-tag"] ?? "";
      const info = await page.evaluate(() => ({
        h1: document.querySelectorAll("h1").length,
        title: document.title,
        desc: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
        robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "",
        canonical: !!document.querySelector('link[rel="canonical"]'),
        header: !!document.querySelector("header"),
        footer: !!document.querySelector("footer"),
        tel: [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute("href")),
        wa: [...document.querySelectorAll('a[href*="wa.me"]')].map((a) => a.getAttribute("href")),
        html: document.documentElement.outerHTML,
        text: document.body.innerText,
        headingsInOrder: (() => {
          const levels = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => +h.tagName[1]);
          return levels.every((l, i) => i === 0 || l <= levels[i - 1] + 1);
        })(),
      }));
      check(`[${label}] ${r} returns 200`, status === 200, String(status));
      check(`[${label}] ${r} exactly one H1`, info.h1 === 1, String(info.h1));
      check(`[${label}] ${r} heading levels do not skip`, info.headingsInOrder);
      check(`[${label}] ${r} meta robots noindex`, /noindex/.test(info.robots), info.robots);
      check(`[${label}] ${r} X-Robots-Tag noindex`, /noindex/.test(xr), xr);
      check(`[${label}] ${r} no preview canonical`, !info.canonical);
      check(`[${label}] ${r} shared header+footer`, info.header && info.footer);
      check(`[${label}] ${r} tel links use configured number`, info.tel.length > 0 && info.tel.every((h) => h === "tel:+61426562158"), info.tel.join(","));
      check(`[${label}] ${r} wa links use configured number, no PII`, info.wa.every((h) => h.startsWith("https://wa.me/61426562158")));
      check(`[${label}] ${r} legacy header number absent`, !/470\s?325\s?836|470325836/.test(info.html));
      check(`[${label}] ${r} no email / star ratings / overstated claims`, !/@gmail|mailto:/i.test(info.html) && !/★|100%|satisfaction guarantee|best astrologer|google reviews|spells? caster|solution in one call/i.test(info.text));
      titles.add(info.title);
      descs.add(info.desc);
    }
    check(`[${label}] unique titles`, titles.size === ROUTES.length, `${titles.size}/${ROUTES.length}`);
    check(`[${label}] unique descriptions`, descs.size === ROUTES.length, `${descs.size}/${ROUTES.length}`);
    const nf = await page.goto(BASE + "/no-such-page", { waitUntil: "networkidle" });
    check(`[${label}] custom 404`, nf?.status() === 404 && (await page.locator("h1").innerText()).includes("isn’t here"));
    const robotsTxt = await (await page.request.get(BASE + "/robots.txt")).text();
    check(`[${label}] robots.txt allows crawl, no sitemap`, /Allow: \//.test(robotsTxt) && !/Sitemap/i.test(robotsTxt) && !/Disallow: \/\s*$/m.test(robotsTxt));
    const ogs = await page.request.get(BASE + "/opengraph-image.png");
    check(`[${label}] OG artwork served`, ogs.status() === 200);
    check(`[${label}] no console errors on any route`, consoleErrors.filter((e) => !e.includes("404")).length === 0, consoleErrors.join(" | "));
    await ctx.close();
  }

  // ---------- Responsive overflow ----------
  for (const w of full ? WIDTHS : [390, 1440]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    const over = [];
    for (const r of ROUTES) {
      await page.goto(BASE + r, { waitUntil: "load" });
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      if (sw > w) over.push(`${r}:${sw}`);
    }
    check(`[${label}] no horizontal overflow at ${w}px`, over.length === 0, over.join(","));
    if (w <= 430) {
      await page.goto(BASE + "/", { waitUntil: "load" });
      const order = await page.evaluate(() => {
        const cta = document.querySelector("section a.btn")?.getBoundingClientRect().top ?? 0;
        const art = document.querySelector("section figure")?.getBoundingClientRect().top ?? 0;
        return cta < art;
      });
      check(`[${label}] ${w}px enquiry actions before artwork`, order);
      const small = await page.evaluate(() =>
        [...document.querySelectorAll("header a, header button, main a.btn, main button")]
          .filter((el) => el.offsetParent !== null && !el.classList.contains("skip-link"))
          .map((el) => el.getBoundingClientRect())
          .filter((r) => r.height < 44 || r.width < 44).length,
      );
      check(`[${label}] ${w}px header/CTA targets >= 44px`, small === 0, String(small));
    }
    await ctx.close();
  }

  // ---------- Art & imagery ----------
  {
    for (const w of [390, 1440]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      for (const r of ROUTES) {
        await page.goto(BASE + r, { waitUntil: "load" });
        const imgs = await page.evaluate(() =>
          [...document.querySelectorAll("main img")].map((i) => ({
            src: i.getAttribute("src"),
            alt: i.getAttribute("alt"),
            w: i.getAttribute("width"),
            h: i.getAttribute("height"),
            loading: i.getAttribute("loading"),
            hero: !!i.closest("[data-hero]"),
            local: (i.getAttribute("src") || "").startsWith("/art/"),
          })),
        );
        check(`[${label}] ${w}px ${r} images local, sized, with alt attribute`, imgs.every((i) => i.local && i.w && i.h && i.alt !== null), JSON.stringify(imgs.filter((i) => !(i.local && i.w && i.h && i.alt !== null))));
        check(`[${label}] ${w}px ${r} below-hero images lazy`, imgs.filter((i) => !i.hero).every((i) => i.loading === "lazy"));
      }
      await ctx.close();
    }
    const head = await (await browser.newContext()).newPage();
    await head.goto(BASE + "/", { waitUntil: "load" });
    const heroImg = await head.evaluate(() => { const i = document.querySelector("[data-hero] img"); return i && { loading: i.getAttribute("loading"), alt: i.getAttribute("alt") }; });
    check(`[${label}] hero artwork eager with descriptive alt`, heroImg?.loading === "eager" && (heroImg?.alt ?? "").length > 40);
  }

  // ---------- Mobile menu ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 320, height: 720 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const btn = page.locator('button[aria-controls="site-menu"]');
    check(`[${label}] menu toggle labelled & collapsed`, (await btn.getAttribute("aria-expanded")) === "false" && (await btn.innerText()).includes("Menu"));
    await btn.click();
    await page.waitForTimeout(900);
    check(`[${label}] menu opens`, (await btn.getAttribute("aria-expanded")) === "true" && (await page.locator("#site-menu").isVisible()));
    const focusedInMenu = await page.evaluate(() => !!document.activeElement?.closest("#site-menu"));
    check(`[${label}] focus moves into menu`, focusedInMenu);
    if (full) await page.screenshot({ path: `${OUT}menu-open-320.png` });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
    check(`[${label}] Escape closes menu and returns focus`, (await btn.getAttribute("aria-expanded")) === "false" && (await page.evaluate(() => document.activeElement?.getAttribute("aria-controls"))) === "site-menu" && !(await page.locator("#site-menu").isVisible()));
    await btn.click();
    await page.waitForTimeout(900);
    await page.locator("#site-menu a", { hasText: "About" }).click();
    await page.waitForURL("**/about");
    await page.waitForTimeout(900);
    check(`[${label}] route change closes menu`, (await btn.getAttribute("aria-expanded")) === "false" && !(await page.locator("#site-menu").isVisible()));
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.keyboard.press("Tab");
    check(`[${label}] first Tab reaches skip link`, (await page.evaluate(() => document.activeElement?.textContent)) === "Skip to content");
    await ctx.close();
  }

  // ---------- Enquiry composer ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    const requests = [];
    page.on("request", (r) => requests.push(r.url() + " " + (r.postData() ?? "")));
    await ctx.route("https://wa.me/**", (route) => route.abort());
    await ctx.route("https://api.whatsapp.com/**", (route) => route.abort());
    await page.addInitScript(() => {
      window.__opened = [];
      window.open = (url) => {
        window.__opened.push(String(url));
        return null;
      };
    });

    await page.goto(BASE + "/contact?topic=career-and-education", { waitUntil: "networkidle" });
    const sel = page.locator("select");
    check(`[${label}] allowlisted topic preselected from query`, (await sel.inputValue()) === "career-and-education");
    await page.goto(BASE + "/contact?topic=black-magic", { waitUntil: "networkidle" });
    check(`[${label}] unknown topic ignored`, (await page.locator("select").inputValue()) === "");

    await page.goto(BASE + "/consultations/palm-reading", { waitUntil: "networkidle" });
    await page.locator("main a", { hasText: "Ask about this consultation" }).first().click();
    await page.waitForURL("**/contact?topic=palm-reading*");
    await page.waitForFunction(() => document.querySelector("select")?.value === "palm-reading");
    check(`[${label}] detail CTA carries topic slug only`, page.url().endsWith("/contact?topic=palm-reading#enquiry"));

    // Invalid submit
    await page.fill('input[autocomplete="name"]', SYNTH.name);
    await page.fill('input[type="tel"]', "12ab");
    await page.selectOption("select", "");
    await page.click('button[type="submit"]');
    await page.waitForSelector('[data-testid="error-summary"]');
    await page.waitForTimeout(100);
    const summaryFocused = await page.evaluate(() => document.activeElement?.getAttribute("data-testid") === "error-summary");
    check(`[${label}] invalid submit focuses error summary`, summaryFocused);
    check(`[${label}] invalid fields marked`, (await page.locator('[aria-invalid="true"]').count()) === 2);
    check(`[${label}] entries preserved after error`, (await page.inputValue('input[autocomplete="name"]')) === SYNTH.name);
    if (full) await page.screenshot({ path: `${OUT}contact-invalid-390.png`, fullPage: false, clip: undefined });

    // Valid
    await page.fill('input[type="tel"]', SYNTH.phone);
    await page.selectOption("select", "palm-reading");
    await page.fill("textarea", SYNTH.note);
    await page.click('button[type="submit"]');
    await page.waitForSelector('[data-testid="review"]');
    const draft = await page.locator('[data-testid="draft"]').innerText();
    check(`[${label}] review shows draft`, draft.includes(SYNTH.name) && draft.includes("Topic: Palm reading") && draft.includes(SYNTH.note));
    check(`[${label}] review heading focused`, (await page.evaluate(() => document.activeElement?.tagName)) === "H3");
    const opensBefore = await page.evaluate(() => window.__opened.length);
    check(`[${label}] nothing opened before final click`, opensBefore === 0);
    const hrefWithPii = await page.evaluate((n) => [...document.querySelectorAll("a")].some((a) => a.href.includes(encodeURIComponent(n))), SYNTH.name);
    check(`[${label}] no prebuilt draft URL in DOM`, !hrefWithPii);
    if (full) await page.screenshot({ path: `${OUT}contact-review-390.png` });

    await page.locator("button", { hasText: "Open WhatsApp" }).click();
    const opened = await page.evaluate(() => window.__opened);
    check(`[${label}] Open WhatsApp opens exactly one URL`, opened.length === 1, String(opened.length));
    const u = new URL(opened[0]);
    check(`[${label}] destination is configured wa.me number`, u.origin + u.pathname === "https://wa.me/61426562158", u.origin + u.pathname);
    const decoded = u.searchParams.get("text") ?? "";
    check(`[${label}] decoded text equals reviewed draft`, decoded === draft.trim() || decoded.replace(/\s+/g, " ") === draft.replace(/\s+/g, " ").trim());
    check(`[${label}] encoded once`, !opened[0].includes("%2520") && opened[0].includes("%20%26%20"));
    const piiRequests = requests.filter((r) => r.includes("Testa") || r.includes(encodeURIComponent(SYNTH.name)) || r.includes("400%20000") || r.includes("400 000"));
    check(`[${label}] no network request carried personal data`, piiRequests.length === 0, piiRequests.join(" | "));
    const stored = await page.evaluate(() => JSON.stringify(localStorage) + JSON.stringify(sessionStorage) + document.cookie);
    check(`[${label}] nothing written to storage/cookies`, !stored.includes("Testa"));

    await page.locator("button", { hasText: "Edit details" }).click();
    check(`[${label}] edit returns with values intact`, (await page.inputValue('input[type="tel"]')) === SYNTH.phone);
    await ctx.close();
  }

  // ---------- No-JS and reduced motion ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "load" });
    check(`[${label}] no-JS: H1 and CTA visible`, (await page.locator("h1").isVisible()) && (await page.locator("main a.btn").first().isVisible()));
    check(`[${label}] no-JS: menu fallback link to footer nav`, await page.locator('header a[href="#footer-nav"]').isVisible());
    await page.goto(BASE + "/faq", { waitUntil: "load" });
    await page.locator("summary").first().click();
    check(`[${label}] no-JS: native FAQ disclosure opens`, (await page.locator("details").first().getAttribute("open")) !== null);
    await ctx.close();

    const rctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const rp = await rctx.newPage();
    await rp.goto(BASE + "/", { waitUntil: "load" });
    const t0 = await rp.evaluate(() => getComputedStyle(document.querySelector("[data-spin]")).transform);
    await rp.waitForTimeout(1500);
    const rm = await rp.evaluate(() => ({
      motionClass: document.documentElement.classList.contains("motion"),
      ledeOpacity: getComputedStyle(document.querySelector('[data-hero-in="2"]')).opacity,
      artClip: getComputedStyle(document.querySelector("[data-hero-art]")).clipPath,
      splitLines: document.querySelectorAll(".line").length,
      spin: getComputedStyle(document.querySelector("[data-spin]")).transform,
    }));
    check(`[${label}] reduced motion: hero visible immediately, no split/spin`, !rm.motionClass && rm.ledeOpacity === "1" && rm.artClip === "none" && rm.splitLines === 0 && rm.spin === t0, JSON.stringify(rm));
    if (full) await rp.screenshot({ path: `${OUT}home-reduced-motion-1440.png` });
    await rctx.close();
  }

  // ---------- Deliverable screenshots ----------
  if (full) {
    for (const [w, dpr] of [[1440, 1], [390, 2]]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, deviceScaleFactor: dpr });
      const page = await ctx.newPage();
      for (const r of ["/", "/contact", "/consultations/vedic-astrology", "/consultations/palm-reading"]) {
        await page.goto(BASE + r, { waitUntil: "networkidle" });
        await page.waitForTimeout(2200);
        // Scroll through so scroll-triggered reveals have played before the full-page capture.
        const H = await page.evaluate(() => document.body.scrollHeight);
        for (let y = 0; y < H; y += 450) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(110); }
        await page.waitForTimeout(1800);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(700);
        const name = r === "/" ? "home" : r.split("/").pop();
        await page.screenshot({ path: `${OUT}${name}-${w}.png`, fullPage: true });
      }
      if (w === 390) {
        await page.goto(BASE + "/faq", { waitUntil: "networkidle" });
        await page.locator("summary").nth(1).click();
        await page.screenshot({ path: `${OUT}faq-open-390.png`, fullPage: true });
      }
      await ctx.close();
    }
    const ctx = await browser.newContext({ viewport: { width: 320, height: 640 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.screenshot({ path: `${OUT}home-320-viewport.png` });
    await ctx.close();
  }

  await browser.close();
}

await run(chromium, "chromium");
await run(webkit, "webkit");
console.log(results.join("\n"));
console.log(`\n${results.filter((r) => r.startsWith("PASS")).length} passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
