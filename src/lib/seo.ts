// Everything the pages, the sitemap and the structured data agree on about this
// site living at one canonical origin.

export const SITE_URL = 'https://lepc.dev';

export const SITE_NAME = 'Luís Carvalho';

// Absolute, because Open Graph consumers do not resolve relative URLs.
export const OG_IMAGE = `${SITE_URL}/og.png`;
export const OG_IMAGE_ALT = 'Luís Carvalho - Software Developer, lepc.dev';

// Trailing slashes to match `trailingSlash: 'always'`, so the sitemap, the
// canonical tags and the files the host actually serves are the same URLs.
export const ROUTES = ['/', '/work/', '/play/', '/explore/', '/connect/', '/resume/'] as const;

export const absolute = (path: string) => new URL(path, SITE_URL).href;

// Structured data lets search engines tie the name, the profiles and the work
// together as one entity, which plain prose on the page cannot express.
export const personSchema = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	'@id': `${SITE_URL}/#luis-carvalho`,
	name: 'Luís Carvalho',
	url: SITE_URL,
	image: absolute('/photo-luis.webp'),
	jobTitle: 'Full Stack Developer',
	description:
		'Full-stack developer building production ERP, web and mobile systems: custom Odoo modules in Python, React Native apps in TypeScript.',
	email: 'mailto:prazerescarvalho@gmail.com',
	worksFor: { '@type': 'Organization', name: 'Eclypsys' },
	alumniOf: [
		{ '@type': 'EducationalOrganization', name: 'Code for All_' },
		{ '@type': 'EducationalOrganization', name: 'Faculdade de Letras da Universidade do Porto' },
		{ '@type': 'EducationalOrganization', name: 'Faculdade de Ciências da Universidade do Porto' }
	],
	address: { '@type': 'PostalAddress', addressCountry: 'PT' },
	knowsLanguage: ['en', 'pt'],
	knowsAbout: [
		'Python',
		'TypeScript',
		'JavaScript',
		'Dart',
		'Java',
		'SQL',
		'Rust',
		'Odoo',
		'React Native',
		'Expo',
		'Flutter',
		'React',
		'SvelteKit',
		'Node.js',
		'FastAPI',
		'PostgreSQL',
		'Redis',
		'Docker',
		'ERP development',
		'Mobile app development',
		'Full-stack web development'
	],
	sameAs: ['https://github.com/LemanuelPC', 'https://www.linkedin.com/in/le-pc/']
};

export const websiteSchema = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': `${SITE_URL}/#website`,
	url: SITE_URL,
	name: SITE_NAME,
	inLanguage: 'en',
	publisher: { '@id': `${SITE_URL}/#luis-carvalho` }
};

// Svelte cannot hold a literal <script> in a template, so schema goes in through
// {@html}. Escaping `<` keeps a value in the data from closing the tag early.
export const jsonLd = (schema: object) =>
	`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}<\/script>`;
