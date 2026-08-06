<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import SubPage from '$lib/components/SubPage.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import iconArrow from '$lib/assets/icon-arrow.svg?raw';
	import { projects } from '$lib/data/projects';

	const bestRuns = projects.filter((p) => p.bestRun);

	let strip: HTMLElement;
	let atStart = $state(true);
	let atEnd = $state(false);

	function updateArrows() {
		if (!strip) return;
		const { scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight } = strip;
		// The strip scrolls on one axis at a time (horizontal on desktop,
		// vertical on mobile); the idle axis reads as both at-start and at-end,
		// so checking both axes works for either layout.
		atStart = scrollLeft <= 1 && scrollTop <= 1;
		atEnd =
			scrollLeft + clientWidth >= scrollWidth - 1 && scrollTop + clientHeight >= scrollHeight - 1;
	}

	$effect(() => {
		updateArrows();
		const ro = new ResizeObserver(updateArrows);
		ro.observe(strip);
		return () => ro.disconnect();
	});

	function scrollByCard(dir: 1 | -1) {
		const rect = strip.querySelector('article')?.getBoundingClientRect();
		// Mobile stacks cards and scrolls vertically; desktop is a horizontal strip.
		if (window.matchMedia('(max-width: 760px)').matches) {
			strip.scrollBy({ top: dir * ((rect?.height ?? 220) + 12), behavior: 'smooth' });
		} else {
			strip.scrollBy({ left: dir * ((rect?.width ?? 320) + 10), behavior: 'smooth' });
		}
	}
</script>

<Seo
	title="Explore - Luís Carvalho"
	description="Best runs. A curated selection of work worth replaying."
/>

<SubPage title="Best runs." subtitle="A curated selection of work worth replaying." mobilePortrait>
	{#snippet panel()}
		<div class="track" aria-hidden="true"></div>

		<button
			class="arrow prev"
			aria-label="Previous project"
			disabled={atStart}
			onclick={() => scrollByCard(-1)}
		>
			{@html iconArrow}
		</button>

		<div class="strip" bind:this={strip} tabindex="-1" onscroll={updateArrows}>
			{#each bestRuns as project}
				<ProjectCard {project} />
			{/each}
		</div>

		<button
			class="arrow next"
			aria-label="Next project"
			disabled={atEnd}
			onclick={() => scrollByCard(1)}
		>
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
		/* Centred on the pill (left gap = right gap = (86.58% - 66.65%) / 2 off
		   the track's 6.7%), which also keeps the card cut off at either scroll
		   end clear of the pill's arcs: its squared-off corners fall inside the
		   curve with room to spare on both sides. */
		left: 16.665%;
		/* Centred on the pill rather than pinned to a fixed offset, so the cards
		   stay centred whatever height they end up. The pill starts at 21.15% and
		   is 66.67% of the panel tall, so its middle sits here. */
		top: 54.49%;
		translate: 0 -50%;
		width: 66.65%;
		display: flex;
		gap: 10px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		/* 1em = 12px at panel width 836; scale text with the panel all the way
		   down (no min) so the cards always fit inside the pill. */
		font-size: min(1.435cqw, 12px);
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

	.arrow :global(path) {
		transition: stroke-opacity 150ms ease;
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

	/* Nothing further in that direction: ink stroke drops to 30%, per the
	   Figma arrow component's greyed-out variant. */
	.arrow:disabled {
		pointer-events: none;
	}

	.arrow:disabled :global(path) {
		stroke-opacity: 0.3;
	}

	@media (max-width: 760px) {
		/* Vertical capsule inside the portrait panel */
		.track {
			aspect-ratio: auto;
			left: 11.1%;
			top: 8.34%;
			width: 77.7%;
			height: 83.3%;
			border-radius: 999px;
		}

		/* Cards stack and scroll vertically, per the Figma mobile frame */
		.strip {
			left: 17%;
			top: 26.3%;
			translate: none;
			width: 66%;
			height: 47.4%;
			flex-direction: column;
			align-items: center;
			overflow-x: hidden;
			overflow-y: auto;
			scroll-snap-type: y mandatory;
			gap: 1.3em;
			/* scale the card with the panel (no cap) so it stays centred in the
			   capsule instead of drifting left as the width grows. 30em at 2.2cqw
			   spans the strip's 66%, so the card fills the capsule as before. */
			font-size: 2.2cqw;
		}

		/* Arrows move to the top/bottom of the capsule and point up/down */
		.arrow {
			width: 7%;
		}

		.arrow.prev {
			left: 46.5%;
			top: 13.5%;
			scale: 1 1;
			rotate: -90deg;
		}

		.arrow.next {
			left: 46.5%;
			top: 80%;
			rotate: 90deg;
		}
	}
</style>
