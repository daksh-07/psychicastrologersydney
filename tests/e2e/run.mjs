// Browser QA for The Celestial Almanac preview.
// Usage: BASE_URL=http://localhost:3100 node tests/e2e/run.mjs
// Uses synthetic data only. wa.me navigations are intercepted and aborted — no message is ever sent.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";

const require = createRequire(import.meta.url);
const { chromium, webkit } = require("playwright");

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const OUT = new URL("./output/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const ROUTES = [
  "/",
  "/about",
  "/consultations",
  "/consultations/vedic-astrology",
  "/consultations/palm-reading",
  "/consultations/relationships-and-family",
  "/consultations/career-and-business",
  "/consultations/spiritual-guidance",
  "/faq",
  "/contact",
  "/privacy",
];
const WIDTHS = [320, 375, 390, 430, 768, 1024, 1440];
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
      check(`[${label}] ${r} no email / review stars / guarantee`, !/@gmail|mailto:|★|guarantee|best astrologer|testimonial/i.test(info.html));
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

  // ---------- Editorial images ----------
  {
    const expected = { "/": ["notebook", ""], "/consultations/palm-reading": ["palm", "alt"], "/consultations/vedic-astrology": ["sphere", "alt"] };
    for (const w of [390, 1440]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      for (const r of ROUTES) {
        await page.goto(BASE + r, { waitUntil: "load" });
        const figs = await page.evaluate(() =>
          [...document.querySelectorAll("figure.editorial-figure")].map((f) => {
            const img = f.querySelector("img");
            const frame = f.querySelector(".frame").getBoundingClientRect();
            const hero = document.querySelector("main > section:first-child");
            return {
              name: f.dataset.image,
              alt: img.getAttribute("alt"),
              loading: img.getAttribute("loading"),
              reserved: frame.height > 100,
              afterOpening: frame.top >= (hero?.getBoundingClientRect().bottom ?? 0),
              inHero: hero?.contains(f) ?? false,
              hasCredit: f.querySelector("figcaption")?.textContent.length > 10,
            };
          }),
        );
        const exp = expected[r];
        if (!exp) {
          check(`[${label}] ${w}px ${r} stays typography-led (no photos)`, figs.length === 0);
          continue;
        }
        const f = figs[0];
        check(`[${label}] ${w}px ${r} shows ${exp[0]} image`, figs.length === 1 && f.name === exp[0]);
        check(`[${label}] ${w}px ${r} alt ${exp[1] === "" ? "empty (decorative)" : "informative"}`, exp[1] === "" ? f.alt === "" : (f.alt ?? "").length > 30);
        check(`[${label}] ${w}px ${r} image lazy, after the opening band, outside hero`, f.loading === "lazy" && f.afterOpening && !f.inHero);
        check(`[${label}] ${w}px ${r} aspect box reserved before load`, f.reserved);
        check(`[${label}] ${w}px ${r} caption + credit visible`, f.hasCredit);
      }
      await ctx.close();
    }
    const head = await (await browser.newContext()).newPage();
    await head.goto(BASE + "/", { waitUntil: "load" });
    const preloads = await head.evaluate(() => [...document.querySelectorAll('link[rel="preload"][as="image"]')].length);
    check(`[${label}] no image preloads in critical path`, preloads === 0);
  }

  // ---------- Mobile menu ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 320, height: 720 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const btn = page.locator('button[aria-controls="mobile-menu"]');
    check(`[${label}] menu toggle labelled & collapsed`, (await btn.getAttribute("aria-expanded")) === "false" && (await btn.innerText()).includes("Menu"));
    await btn.click();
    check(`[${label}] menu opens`, (await btn.getAttribute("aria-expanded")) === "true" && (await page.locator("#mobile-menu").isVisible()));
    const focusedInMenu = await page.evaluate(() => !!document.activeElement?.closest("#mobile-menu"));
    check(`[${label}] focus moves into menu`, focusedInMenu);
    if (full) await page.screenshot({ path: `${OUT}menu-open-320.png` });
    await page.keyboard.press("Escape");
    check(`[${label}] Escape closes menu and returns focus`, (await btn.getAttribute("aria-expanded")) === "false" && (await page.evaluate(() => document.activeElement?.getAttribute("aria-controls"))) === "mobile-menu");
    await btn.click();
    await page.locator("#mobile-menu a", { hasText: "About" }).click();
    await page.waitForURL("**/about");
    check(`[${label}] route change closes menu`, (await btn.getAttribute("aria-expanded")) === "false" && !(await page.locator("#mobile-menu").isVisible()));
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

    await page.goto(BASE + "/contact?topic=career-and-business", { waitUntil: "networkidle" });
    const sel = page.locator("select");
    check(`[${label}] allowlisted topic preselected from query`, (await sel.inputValue()) === "career-and-business");
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
    const anim = await rp.evaluate(() => getComputedStyle(document.querySelector(".plate-orbit")).animationName);
    check(`[${label}] reduced motion: orbit static`, anim === "none", anim);
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
        await page.waitForTimeout(1300);
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
