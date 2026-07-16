<script lang="ts">
	// Shared panel content for the Work and Play pages: a scrollable two-column
	// card region with the custom scrollbar, per the Figma frames.
	import WorkCard from './WorkCard.svelte';
	import Scrollbar from './Scrollbar.svelte';
	import type { Project } from '$lib/data/projects';

	let { items }: { items: Project[] } = $props();

	let scroller = $state<HTMLElement>();
</script>

<div class="region" bind:this={scroller}>
	<div class="cards">
		{#each items as project}
			<WorkCard {project} />
		{/each}
	</div>
</div>
<div class="sb-slot">
	<Scrollbar target={scroller} />
</div>

<style>
	/* Geometry as % of the 835.7x668 panel */
	.region {
		position: absolute;
		left: 8%;
		top: 8.25%;
		width: 81%;
		height: 83.4%;
		overflow-y: auto;
		scrollbar-width: none;
		/* 1em = 12px at panel width 836 */
		font-size: clamp(9px, 1.435cqw, 12px);
	}

	.region::-webkit-scrollbar {
		display: none;
	}

	.cards {
		display: flex;
		flex-wrap: wrap;
		gap: 4.45em 6%;
	}

	.sb-slot {
		position: absolute;
		left: 90.05%;
		top: 8.33%;
		width: 3.24%;
		height: 83.4%;
	}

	.sb-slot :global(.scrollbar) {
		width: 100%;
		height: 100%;
	}

	@media (max-width: 760px) {
		.region {
			left: 6%;
			width: 76%;
			font-size: clamp(9px, 2.6cqw, 12px);
		}

		.cards {
			justify-content: center;
		}

		.sb-slot {
			left: 88%;
			width: 6%;
		}
	}
</style>
