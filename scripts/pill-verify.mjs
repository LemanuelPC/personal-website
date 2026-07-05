import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
	executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
	headless: 'new'
});
const page = await browser.newPage();

for (const [w, h, name] of [
	[1920, 919, 'full'],
	[687, 647, 'small']
]) {
	await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
	await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
	await new Promise((r) => setTimeout(r, 1000));
	const m = await page.evaluate(() => {
		const mobile = getComputedStyle(document.querySelector('.art-mobile')).display !== 'none';
		const svg = document.querySelector(mobile ? '.art-mobile svg' : '.art-desktop svg').getBoundingClientRect();
		const art = document.querySelector('.art').getBoundingClientRect();
		const pill = document.querySelector('.explore-pill').getBoundingClientRect();
		// grid rects measured from the SVG sources
		const g = mobile
			? { x: 14.19, y: 28.13, size: 330.53, vw: 346, vh: 359, rows: 5 }
			: { x: 38.588, y: 22.376, size: 667.773, vw: 708, vh: 691, rows: 6 };
		const sx = svg.width / g.vw;
		const sy = svg.height / g.vh;
		const gridBottom = svg.top + (g.y + g.size) * sy;
		const rowTop = gridBottom - (g.size / g.rows) * sy;
		const gridRight = svg.left + (g.x + g.size) * sx;
		return {
			mobile,
			artH: +art.height.toFixed(1),
			svgH: +svg.height.toFixed(1),
			svgTopInArt: +(svg.top - art.top).toFixed(1),
			dTop: +(pill.top - rowTop).toFixed(2),
			dBottom: +(pill.bottom - gridBottom).toFixed(2),
			dRight: +(pill.right - gridRight).toFixed(2)
		};
	});
	console.log(name, JSON.stringify(m));
	const rect = await page.evaluate(() => {
		const r = document.querySelector('.explore-pill').getBoundingClientRect();
		return { x: Math.max(0, r.x - 70), y: Math.max(0, r.y - 60), width: r.width + 130, height: r.height + 120 };
	});
	await page.screenshot({ path: `${process.argv[2]}/verify-${name}.png`, clip: rect });
}
await browser.close();
