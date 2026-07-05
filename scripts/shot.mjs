// Screenshot utility: node scripts/shot.mjs <out.png> [width] [height] [theme]
import puppeteer from 'puppeteer-core';

const [out = 'shot.png', width = '1440', height = '1024', theme = 'light'] = process.argv.slice(2);

const browser = await puppeteer.launch({
	executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
	headless: 'new'
});
const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: Number(height) });
await page.evaluateOnNewDocument((t) => localStorage.setItem('theme', t), theme);
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: out });
await browser.close();
console.log(`saved ${out} (${width}x${height}, ${theme})`);
