import puppeteer from 'puppeteer-core';
const out = process.argv[2];
const browser = await puppeteer.launch({
	executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
	headless: false,
	defaultViewport: null,
	args: ['--window-size=1456,1100', '--window-position=0,0']
});
const page = (await browser.pages())[0];
await page.evaluateOnNewDocument(() => sessionStorage.setItem('splashed', 'true'));
for (const path of ['', 'explore', 'work', 'play', 'connect', 'resume']) {
	await page.goto(`http://localhost:5173/${path}`, { waitUntil: 'networkidle0' });
	await new Promise((r) => setTimeout(r, 1100));
	await page.screenshot({ path: `${out}/page-${path || 'home'}.png` });
}
// splash: fresh page without the flag
await page.evaluateOnNewDocument(() => sessionStorage.removeItem('splashed'));
const p2 = await browser.newPage();
await p2.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
await new Promise((r) => setTimeout(r, 700));
await p2.screenshot({ path: `${out}/page-splash.png` });
await browser.close();
