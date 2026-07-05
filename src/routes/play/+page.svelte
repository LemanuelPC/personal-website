<script lang="ts">
	import SubPage from '$lib/components/SubPage.svelte';
	import CardShelf from '$lib/components/CardShelf.svelte';
	import { projects } from '$lib/data/projects';

	const items = projects.filter((p) => p.shelf.includes('play'));
</script>

<svelte:head>
	<title>Play — Luís Carvalho</title>
	<meta name="description" content="Experiments, prototypes, and things I made for fun." />
</svelte:head>

<SubPage title="Play." subtitle="Experiments, prototypes, and things I made for fun.">
	{#snippet panel()}
		<CardShelf {items} />
	{/snippet}
</SubPage>
