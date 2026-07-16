// Prerender every route to static files: there is no server-side code on this
// site, so it can be served by any static host.
export const prerender = true;

// One directory per route, each with an index.html, so a plain Apache/LiteSpeed
// host resolves /work without rewrite rules.
export const trailingSlash = 'always';
