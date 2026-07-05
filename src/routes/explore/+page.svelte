<script lang="ts">
	import SubPage from '$lib/components/SubPage.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import iconArrow from '$lib/assets/icon-arrow.svg?raw';
	import { projects } from '$lib/data/projects';

	const bestRuns = projects.filter((p) => p.bestRun);

	let strip: HTMLElement;

	function scrollByCard(dir: 1 | -1) {
		const card = strip.querySelector('article');
		const step = card ? card.getBoundingClientRect().width + 10 : 320;
		strip.scrollBy({ left: dir * step, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Explore — Luís Carvalho</title>
	<meta name="description" content="Best runs. A curated selection of work worth replaying." />
</svelte:head>

<SubPage title="Best runs." subtitle="A curated selection of work worth replaying.">
	{#snippet panel()}
		<div class="track" aria-hidden="true"></div>

		<button class="arrow prev" aria-label="Previous project" onclick={() => scrollByCard(-1)}>
			{@html iconArrow}
		</button>

		<div class="strip" bind:this={strip} tabindex="-1">
			{#each bestRuns as project}
				<ProjectCard {project} />
			{/each}
		</div>

		<button class="arrow next" aria-label="Next project" onclick={() => scrollByCard(1)}>
			{@html iconArrow}
		</button>
	{/snippet}
</SubPage>

<style>
	/* Geometry from the Figma explore frame, as % of the 835.7x667.77 panel */

	.track {
		position: absolute;
		left: 6.7%;
		top: 21.15%;
		width: 86.58%;
		aspect-ratio: 723.53 / 445.25;
		border: 2px solid var(--ink);
		border-radius: 999px;
		background: var(--paper);
	}

	.strip {
		position: absolute;
		left: 15.95%;
		top: 36.75%;
		width: 66.65%;
		display: flex;
		gap: 10px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		/* 1em = 12px at panel width 836 -> card text scales with the panel */
		font-size: clamp(9px, 1.435cqw, 12px);
	}

	.strip::-webkit-scrollbar {
		display: none;
	}

	.strip :global(article) {
		scroll-snap-align: start;
		flex-shrink: 0;
	}

	.arrow {
		position: absolute;
		top: 50.9%;
		width: 3.25%;
		z-index: 1;
		transition: translate 110ms ease;
	}

	.arrow :global(svg) {
		width: 100%;
		height: auto;
		display: block;
	}

	.arrow.prev {
		left: 9.1%;
		scale: -1 1;
	}

	.arrow.next {
		left: 87.7%;
	}

	.arrow:hover {
		translate: 0 2px;
	}

	.arrow.prev:hover {
		translate: 0 2px;
	}

	.arrow:active {
		translate: 0 4px;
	}

	@media (max-width: 760px) {
		.strip {
			font-size: clamp(9px, 2.8cqw, 12px);
			left: 10%;
			width: 80%;
		}
	}
</style>
