<script lang="ts">
	import type { Snippet } from 'svelte';
	import NavLinks from './NavLinks.svelte';

	let {
		title,
		subtitle,
		panel,
		gridCols = 15,
		gridRows = 12,
		mobilePortrait = false
	}: {
		title: string;
		subtitle: string;
		panel: Snippet;
		gridCols?: number;
		gridRows?: number;
		mobilePortrait?: boolean;
	} = $props();

	// A trailing full stop is the brand's headline dot and gets its own span,
	// so it can go Echo Green in dark mode like the other page titles
	const hasDot = $derived(title.endsWith('.'));
	const stem = $derived(hasDot ? title.slice(0, -1) : title);
</script>

<section class="subpage">
	<div class="nav-slot">
		<NavLinks />
	</div>

	<div class="intro">
		<h1>{stem}{#if hasDot}<span class="dot">.</span>{/if}</h1>
		<p class="subtitle">{subtitle}</p>
	</div>

	<div class="panel" class:portrait={mobilePortrait} style:--cols={gridCols} style:--rows={gridRows}>
		{@render panel()}
	</div>
</section>

<style>
	/* Same skeleton as the homepage hero: nav top-left, title bottom-left,
	   836x668 grid panel on the right (Figma x 511.5-1347, y 212-880) */
	.subpage {
		flex: 1;
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		grid-template-rows: auto 1fr;
		column-gap: clamp(2rem, 4vw, 5rem);
		margin-top: clamp(2.5rem, 8.9vh, 91px);
	}

	.nav-slot {
		grid-area: 1 / 1;
	}

	.intro {
		grid-area: 2 / 1;
		align-self: end;
		animation: rise 600ms 150ms both;
	}

	h1 {
		font-size: clamp(40px, 4.45vw, 64px);
	}

	.dot {
		color: var(--headline-dot);
		transition: color 240ms ease;
	}

	.subtitle {
		margin-top: 14px;
		font-size: 18px;
		font-weight: 700;
	}

	.panel {
		grid-area: 1 / 2 / span 2;
		align-self: start;
		position: relative;
		width: min(836px, 58vw, calc((100dvh - 300px) * 1.2515));
		aspect-ratio: 835.7 / 667.77;
		border: 1px solid var(--ink);
		background-image:
			repeating-linear-gradient(to right, var(--ink) 0 1px, transparent 1px calc(100% / var(--cols))),
			repeating-linear-gradient(to bottom, var(--ink) 0 1px, transparent 1px calc(100% / var(--rows)));
		container-type: inline-size;
		animation: fade 700ms 100ms both;
	}

	@keyframes rise {
		from {
			opacity: 0;
			translate: 0 14px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 760px) {
		.subpage {
			display: flex;
			flex-direction: column;
			margin-top: 28px;
			gap: 28px;
		}

		.nav-slot {
			align-self: stretch;
		}

		.intro {
			order: 3;
			align-self: stretch;
		}

		h1 {
			font-size: clamp(40px, 13vw, 48px);
		}

		.panel {
			width: 100%;
		}

		/* Mobile Figma frames use a portrait grid panel (329x439). */
		.panel.portrait {
			aspect-ratio: 329.49 / 438.804;
			background-image:
				repeating-linear-gradient(
					to right,
					var(--ink) 0 1px,
					transparent 1px calc(100% / 6)
				),
				repeating-linear-gradient(
					to bottom,
					var(--ink) 0 1px,
					transparent 1px calc(100% / 8)
				);
		}
	}
</style>
