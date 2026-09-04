import pw from "/opt/node22/lib/node_modules/playwright/index.js"; const { chromium } = pw;
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); } });
await p.waitForTimeout(900);
const dir = "/tmp/claude-0/-home-user-isi-tat/cab66d79-1775-51d3-b5fd-e30435b2a107/scratchpad/";
const bands = p.locator('section[aria-label="Aufnahme anfragen"]');
const n = await bands.count();
console.log("Baender:", n);
for (let i = 0; i < n; i++) {
  const el = bands.nth(i);
  await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  await el.screenshot({ path: `${dir}band${i}.png` });
}
await b.close(); console.log("ok");
