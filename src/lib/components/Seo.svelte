<script lang="ts">
	import { page } from '$app/state';
	import { SITE_URL, SITE_NAME, OG_IMAGE, OG_IMAGE_ALT, jsonLd } from '$lib/seo';

	let {
		title,
		description,
		schema = null
	}: { title: string; description: string; schema?: object | null } = $props();

	// Built from the pathname rather than the full URL so a link arriving with
	// ?utm_source=... still points every signal at the one clean address.
	const canonical = $derived(new URL(page.url.pathname, SITE_URL).href);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={OG_IMAGE_ALT} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content={OG_IMAGE_ALT} />

	{#if schema}
		{@html jsonLd(schema)}
	{/if}
</svelte:head>
