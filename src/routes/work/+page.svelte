<script lang="ts">
	import SubPage from '$lib/components/SubPage.svelte';
	import CardShelf from '$lib/components/CardShelf.svelte';
	import { projects } from '$lib/data/projects';

	const items = projects.filter((p) => p.shelf.includes('work'));
</script>

<svelte:head>
	<title>Work — Luís Carvalho</title>
	<meta name="description" content="All shipped work across products and platforms." />
</svelte:head>

<SubPage title="Work." subtitle="All shipped work across products and platforms.">
	{#snippet panel()}
		<CardShelf {items} />
	{/snippet}
</SubPage>
