// Measures the pill against the ACTUAL painted grid lines (from the SVG paths),
// in a real (non-headless) browser window.
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
	executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
	headless: false,
	defaultViewport: null,
	args: ['--window-size=1936,790', '--window-position=0,0']
});
const page = (await browser.pages())[0];
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1500));

const info = await page.evaluate(() => {
	const desktop = getComputedStyle(document.querySelector('.art-desktop')).display !== 'none';
	const svg = document.querySelector(desktop ? '.art-desktop svg' : '.art-mobile svg');
	const s = svg.getBoundingClientRect();
	// true line coords measured from the svg sources
	const g = desktop
		? { vw: 708, vh: 691, lineX: 516.16, lineY: 595.75, right: 706.36, bottom: 690.15 }
		: { vw: 346, vh: 359, lineX: 214.39, lineY: 291.86, right: 345.0, bottom: 358.66 };
	const sx = s.width / g.vw;
	const sy = s.height / g.vh;
	const p = document.querySelector('.explore-pill').getBoundingClientRect();
	return {
		desktop,
		viewport: [innerWidth, innerHeight],
		dLeft: +(p.left - (s.left + g.lineX * sx)).toFixed(1),
		dTop: +(p.top - (s.top + g.lineY * sy)).toFixed(1),
		dRight: +(p.right - (s.left + g.right * sx)).toFixed(1),
		dBottom: +(p.bottom - (s.top + g.bottom * sy)).toFixed(1),
		pill: { x: p.x, y: p.y, w: p.width, h: p.height }
	};
});
console.log(JSON.stringify(info));

const r = info.pill;
await page.screenshot({
	path: process.argv[2],
	clip: { x: r.x - 80, y: r.y - 60, width: r.w + 150, height: r.h + 120 }
});
await browser.close();
