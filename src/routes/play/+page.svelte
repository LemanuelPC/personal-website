<script lang="ts">
	import SubPage from '$lib/components/SubPage.svelte';
	import CardShelf from '$lib/components/CardShelf.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { projects } from '$lib/data/projects';

	const items = projects.filter((p) => p.shelf.includes('play'));
</script>

<Seo
	title="Play - Luís Carvalho"
	description="Experiments, prototypes, and things I made for fun."
/>

<SubPage title="Play." subtitle="Experiments, prototypes, and things I made for fun.">
	{#snippet panel()}
		<CardShelf {items} />
	{/snippet}
</SubPage>
