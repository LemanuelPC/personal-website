<script lang="ts">
	import SubPage from '$lib/components/SubPage.svelte';
	import CardShelf from '$lib/components/CardShelf.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { projects } from '$lib/data/projects';

	const items = projects.filter((p) => p.shelf.includes('work'));
</script>

<Seo
	title="Work - Luís Carvalho"
	description="All shipped work across products and platforms."
/>

<SubPage title="Work." subtitle="All shipped work across products and platforms.">
	{#snippet panel()}
		<CardShelf {items} />
	{/snippet}
</SubPage>
