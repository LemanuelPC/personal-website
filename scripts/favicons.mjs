// Renders the logomark into the favicon set under static/: an .ico for search
// engines and legacy clients, PNGs for iOS and Android, alongside the
// hand-written static/favicon.svg that modern browsers prefer.
//
//   npm run favicons
//
// The outputs are committed, so re-run this only if the logomark changes.
import puppeteer from 'puppeteer-core';
import { existsSync, writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const staticDir = resolve(root, 'static');

const SANDBOX = '#fdfbf0';
const VOID = '#262a2c';

// The logomark paths, in their own 110x110 Figma frame.
const MARK = readFileSync(resolve(root, 'src/lib/assets/logomark.svg'), 'utf8');

const CHROMIUM = [
	'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
	'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
	'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];
const executablePath = CHROMIUM.find((p) => existsSync(p));
if (!executablePath) throw new Error(`No Chromium browser found. Looked in:\n${CHROMIUM.join('\n')}`);

// `pad` insets the mark inside the canvas: iOS and Android crop icons to their
// own mask shapes, so those need room that a browser tab favicon does not.
function markup({ size, pad, background }) {
	const inner = size - 2 * pad;
	// The mark fills its stem with var(--ink), which only app.css defines: supply
	// the light-theme value here so a standalone render is not left with black.
	return `<!doctype html><meta charset="utf-8"><style>
		html{--ink:${VOID}}
		html,body{margin:0;padding:0}
		body{width:${size}px;height:${size}px;${background ? `background:${background};` : ''}
			display:grid;place-items:center}
		svg{display:block;width:${inner}px;height:${inner}px}
	</style>${MARK}`;
}

const browser = await puppeteer.launch({ executablePath, headless: 'new' });
const page = await browser.newPage();

async function png({ size, pad = 0, background = null }) {
	await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
	await page.setContent(markup({ size, pad, background }), { waitUntil: 'load' });
	return await page.screenshot({ type: 'png', omitBackground: !background });
}

// ICO is a directory of images; each entry here holds a whole PNG, which every
// browser that still asks for /favicon.ico has understood since Windows Vista.
function ico(images) {
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // type: icon
	header.writeUInt16LE(images.length, 4);

	let offset = 6 + images.length * 16;
	const entries = images.map(({ size, data }) => {
		const e = Buffer.alloc(16);
		e.writeUInt8(size === 256 ? 0 : size, 0);
		e.writeUInt8(size === 256 ? 0 : size, 1);
		e.writeUInt8(0, 2); // palette size
		e.writeUInt8(0, 3); // reserved
		e.writeUInt16LE(1, 4); // colour planes
		e.writeUInt16LE(32, 6); // bits per pixel
		e.writeUInt32LE(data.length, 8);
		e.writeUInt32LE(offset, 12);
		offset += data.length;
		return e;
	});

	return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const write = (name, data) => {
	writeFileSync(resolve(staticDir, name), data);
	console.log(`${name.padEnd(24)} ${(data.length / 1024).toFixed(1)} kB`);
};

// The .ico carries the tab and search-result sizes; the mark is already tight
// in its frame, so it needs no extra padding here. These render one at a time:
// the sizes share a single page, so running them at once would leave every
// screenshot at whichever viewport was set last.
const icoSizes = [];
for (const size of [16, 32, 48]) icoSizes.push({ size, data: await png({ size }) });
write('favicon.ico', ico(icoSizes));

// iOS composites a transparent touch icon onto black, so this one is opaque.
write('apple-touch-icon.png', await png({ size: 180, pad: 20, background: SANDBOX }));

// Android home screens mask icons to a circle: keep the mark inside the safe area.
write('icon-192.png', await png({ size: 192, pad: 24, background: SANDBOX }));
write('icon-512.png', await png({ size: 512, pad: 64, background: SANDBOX }));

await browser.close();
