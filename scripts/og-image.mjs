// Renders the 1200x630 card that Open Graph consumers (LinkedIn, Slack, X,
// WhatsApp, iMessage) show in place of a bare link, to static/og.png.
//
//   npm run og
//
// The output is committed, so re-run this only if the brand or wording changes.
import puppeteer from 'puppeteer-core';
import { existsSync, writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const SANDBOX = '#fdfbf0';
const ECHO_GREEN = '#9fd49b';
const VOID = '#262a2c';

const mark = readFileSync(resolve(root, 'src/lib/assets/logomark.svg'), 'utf8');

// Inlined: the render has no dev server behind it, so the font cannot be fetched.
const font = readFileSync(
	resolve(root, 'node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2')
).toString('base64');

const CHROMIUM = [
	'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
	'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
	'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];
const executablePath = CHROMIUM.find((p) => existsSync(p));
if (!executablePath) throw new Error(`No Chromium browser found. Looked in:\n${CHROMIUM.join('\n')}`);

const html = `<!doctype html><meta charset="utf-8"><style>
	@font-face {
		font-family: 'Space Grotesk Variable';
		src: url(data:font/woff2;base64,${font}) format('woff2-variations');
		font-weight: 300 700;
	}
	html { --ink: ${VOID} }
	html, body { margin: 0; padding: 0 }
	body {
		width: 1200px; height: 630px; background: ${SANDBOX}; color: ${VOID};
		font-family: 'Space Grotesk Variable', sans-serif;
		display: flex; flex-direction: column; justify-content: center;
		padding: 0 88px; box-sizing: border-box; position: relative;
	}
	/* The brand's tick strip, as on the résumé sheet. */
	.strip { position: absolute; top: 0; left: 0; right: 0; height: 18px; display: flex }
	.strip i { flex: 1; background: ${ECHO_GREEN} }
	.strip i:nth-child(even) { background: transparent }
	.mark { position: absolute; top: 76px; right: 88px; width: 132px; height: 132px }
	.mark svg { width: 100%; height: 100% }
	h1 { font-size: 104px; font-weight: 700; letter-spacing: -0.03em; line-height: 1.02; margin: 0 }
	.dot { color: ${ECHO_GREEN} }
	p { font-size: 40px; font-weight: 500; margin: 20px 0 0; color: ${VOID} }
	.url {
		position: absolute; bottom: 64px; left: 88px;
		font-size: 26px; font-weight: 700; letter-spacing: 0.02em;
		border-bottom: 4px solid ${ECHO_GREEN}; padding-bottom: 4px;
	}
</style>
<div class="strip">${'<i></i>'.repeat(48)}</div>
<span class="mark">${mark}</span>
<h1>Luís Carvalho<span class="dot">.</span></h1>
<p>Software developer</p>
<span class="url">lepc.dev</span>`;

const browser = await puppeteer.launch({ executablePath, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluateHandle('document.fonts.ready');

const out = resolve(root, 'static/og.png');
await page.screenshot({ path: out, type: 'png' });
await browser.close();

console.log(`og.png  ${(readFileSync(out).length / 1024).toFixed(1)} kB  1200x630`);
