// Renders the /resume route to a print-ready A4 PDF at static/resume.pdf, which
// the résumé page's download button serves directly.
//
//   npm run resume:pdf            # against the dev server on :5173
//   npm run resume:pdf -- --url http://localhost:4173/resume
//
// The PDF is committed, so re-run this whenever the résumé content changes.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'static/resume.pdf');

const args = process.argv.slice(2);
const url = args[args.indexOf('--url') + 1] ?? 'http://localhost:5173/resume';

const CHROMIUM = [
	'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
	'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
	'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];
const executablePath = CHROMIUM.find((p) => existsSync(p));
if (!executablePath) throw new Error(`No Chromium browser found. Looked in:\n${CHROMIUM.join('\n')}`);

const browser = await puppeteer.launch({ executablePath, headless: 'new' });
const page = await browser.newPage();

// Light theme for paper, and skip the splash so it can't land in the render.
await page.evaluateOnNewDocument(() => {
	localStorage.setItem('theme', 'light');
	sessionStorage.setItem('splashed', 'true');
});
await page.goto(url, { waitUntil: 'networkidle0' });
await page.evaluateHandle('document.fonts.ready');
await new Promise((r) => setTimeout(r, 400));

await page.pdf({
	path: out,
	format: 'A4',
	printBackground: true,
	margin: { top: 0, right: 0, bottom: 0, left: 0 },
	preferCSSPageSize: true
});

// The sheet is pinned to A4, so overflow would be silently clipped rather than
// spilling onto a second page. Measure the natural height to catch that.
await page.emulateMediaType('print');
await new Promise((r) => setTimeout(r, 200));
const fit = await page.evaluate(() => {
	const d = document.getElementById('resume-doc');
	const sheet = d.getBoundingClientRect().height;
	// The sheet's height is pinned by its aspect-ratio; drop that to let the
	// content state its natural height.
	d.style.aspectRatio = 'auto';
	d.style.height = 'auto';
	d.style.overflow = 'visible';
	const natural = d.getBoundingClientRect().height;
	for (const p of ['aspect-ratio', 'height', 'overflow']) d.style.removeProperty(p);
	return { sheet: Math.round(sheet), natural: Math.round(natural) };
});
const fill = ((fit.natural / fit.sheet) * 100).toFixed(1);
console.log(`content fills ${fill}% of the A4 sheet (${fit.natural}px of ${fit.sheet}px)`);
if (fit.natural > fit.sheet)
	console.warn('WARNING: content is taller than the sheet and will be clipped. Lower the print font-size in src/routes/resume/+page.svelte.');
console.log(`saved ${out}`);

await browser.close();
