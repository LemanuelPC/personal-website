// Prerendered to build/sitemap.xml, so it is a plain file on the static host and
// stays in step with ROUTES rather than being kept up to date by hand.
import { ROUTES, absolute } from '$lib/seo';

export const prerender = true;

export function GET() {
	const urls = ROUTES.map(
		(route) =>
			`\t<url>\n\t\t<loc>${absolute(route)}</loc>\n\t\t<changefreq>monthly</changefreq>\n\t\t<priority>${route === '/' ? '1.0' : '0.8'}</priority>\n\t</url>`
	).join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{ headers: { 'content-type': 'application/xml' } }
	);
}
