<script lang="ts">
	import '@fontsource-variable/space-grotesk/index.css';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Splash from '$lib/components/Splash.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Splash />

<div class="shell">
	<Header />
	<main>
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
</style>
