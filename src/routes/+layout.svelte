<script lang="ts">
	import '@fontsource-variable/space-grotesk/index.css';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Splash from '$lib/components/Splash.svelte';

	let { children } = $props();
</script>

<!--
	The icons are served from static/ rather than imported: Vite inlines an asset
	this small as a data: URI, which leaves no URL for Google's favicon crawler or
	for anything that fetches /favicon.ico directly to find.
-->
<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />

	<!-- Tints the browser chrome on mobile. These follow the system preference
	     rather than the in-page toggle, which is as far as the meta tag goes. -->
	<meta name="theme-color" content="#fdfbf0" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#262a2c" media="(prefers-color-scheme: dark)" />
</svelte:head>

<Splash />

<a class="skip" href="#main">Skip to content</a>

<div class="shell">
	<Header />
	<main id="main" tabindex="-1">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.shell {
		min-height: 100dvh;
		max-width: 1440px;
		margin-inline: auto;
		padding-inline: clamp(16px, 5vw, 72px);
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	/* The header repeats on every page, so a keyboard user would otherwise tab
	   the logo, both socials and the theme switch before reaching the content.
	   Off-screen until focused rather than display:none, which is skipped. */
	.skip {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 200;
		transform: translateY(-120%);
		background: var(--paper);
		color: var(--ink);
		font-weight: 700;
		padding: 12px 18px;
		margin: 8px;
		border-radius: 4px;
		box-shadow: 0 0 0 2px var(--ink);
	}

	.skip:focus {
		transform: none;
	}

	main:focus {
		outline: none;
	}
</style>
