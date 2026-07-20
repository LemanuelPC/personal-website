<script lang="ts">
	import heroArt from '$lib/assets/hero-illustration.svg?raw';
	import heroArtMobile from '$lib/assets/hero-illustration-mobile.svg?raw';
	import NavLinks from '$lib/components/NavLinks.svelte';
</script>

<svelte:head>
	<title>Luís Carvalho - Software Developer</title>
	<meta name="description" content="Hi, I’m Luís. A software developer." />
</svelte:head>

<section class="hero">
	<div class="hero-nav">
		<NavLinks />
	</div>

	<div class="intro">
		<h1>
			Hi, <br class="br-desktop" />I’m <br class="br-mobile" />Luís<span class="dot">.</span>
		</h1>
		<p class="tagline">A software developer.</p>
	</div>

	<div class="art">
		<div class="art-desktop" aria-hidden="true">{@html heroArt}</div>
		<div class="art-mobile" aria-hidden="true">{@html heroArtMobile}</div>
		<div class="explore-pill">
			<a class="keycap" href="/explore">
				Explore
				<svg viewBox="0 0 5.0193 6.435" aria-hidden="true">
					<path
						d="M0.5148 4.83181V1.73237C0.5148 1.02235 1.32801 0.619585 1.89278 1.04989L4.06239 2.70293C4.53109 3.06003 4.50862 3.77246 4.01834 4.09931L1.84873 5.54571C1.27854 5.92584 0.5148 5.51709 0.5148 4.83181Z"
						fill="var(--paper)"
						stroke="currentColor"
						stroke-width="1.0296"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	.hero {
		flex: 1;
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		grid-template-rows: auto 1fr;
		column-gap: clamp(2rem, 4vw, 5rem);
		margin-top: clamp(2.5rem, 8.9vh, 91px);
	}

	/* --- Navigation ------------------------------------------------------ */

	.hero-nav {
		grid-area: 1 / 1;
	}

	/* --- Headline --------------------------------------------------------- */

	.intro {
		grid-area: 2 / 1;
		align-self: end;
		animation: rise 600ms 200ms both;
	}

	h1 {
		font-size: clamp(56px, 9vw, 130px);
		white-space: nowrap;
	}

	.dot {
		color: var(--headline-dot);
		transition: color 240ms ease;
	}

	.tagline {
		margin-top: clamp(12px, 2.5vh, 26px);
		font-size: clamp(24px, 3.3vw, 48px);
		font-weight: 700;
		line-height: 1.1;
	}

	.br-mobile {
		display: none;
	}

	/* --- Illustration ------------------------------------------------------ */

	.art {
		grid-area: 1 / 2 / span 2;
		align-self: start;
		position: relative;
		width: min(708px, 46.5vw, calc((100dvh - 300px) * 1.025));
		container-type: inline-size;
		animation: fade 700ms 150ms both;
	}

	/* Lock the boxes to the artwork's exact ratio with plain CSS box math so the
	   pill's percentages always measure against the drawing, never a letterboxed
	   or misrounded svg box. */
	.art-desktop {
		aspect-ratio: 708 / 691;
	}

	.art-mobile {
		aspect-ratio: 346 / 359;
		display: none;
	}

	.art :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}

	/* Inscribed in the last two cells of the illustration's 7x7 grid: in the
	   708x691 svg the grid border spans x 38.59-706.36 / y 22.38-690.15 and the
	   relevant interior lines sit at x=516.16 and y=595.75 (the cells are NOT
	   width/6 — measure the line paths, don't assume). */
	.explore-pill {
		position: absolute;
		right: 0.232%;
		bottom: 0.123%;
		width: 26.86%;
		height: 13.66%;
		border: 1.5px solid var(--ink);
		border-radius: 999px;
		display: grid;
		place-items: center;
	}

	/* Sized in container-query units so the keycap keeps the Figma proportions
	   (18px type on a 708px-wide artwork) at any artwork size. */
	.keycap {
		display: inline-flex;
		align-items: center;
		gap: 0.44em;
		padding: 0.55em 1.1em;
		font-size: clamp(12px, 2.54cqw, 18px);
		font-weight: 700;
		background: var(--paper);
		border: 0.12em solid var(--ink);
		border-radius: 0.5em;
		box-shadow: 0.4em 0.4em 0 -1px var(--ink);
		/* center the face+shadow composition, not just the face */
		margin: 0 0.4em 0.4em 0;
		transition:
			translate 110ms ease,
			box-shadow 110ms ease,
			background-color 240ms ease,
			border-color 240ms ease,
			color 240ms ease;
	}

	.keycap svg {
		width: 0.55em;
		height: auto;
		flex-shrink: 0;
	}

	.keycap svg path {
		transition: fill 240ms ease;
	}

	/* Hovered CTA fills with Echo Green and holds ink-dark text/border in both
	   themes, per the Figma CTA buttons sheet; the arrow goes solid ink too */
	.keycap:hover {
		translate: 0.11em 0.11em;
		background: var(--echo-green);
		color: var(--void);
		border-color: var(--void);
		box-shadow: 0.29em 0.29em 0 -1px var(--ink);
	}

	.keycap:hover svg path {
		fill: var(--void);
	}

	.keycap:active {
		translate: 0.34em 0.34em;
		box-shadow: 0.06em 0.06em 0 -1px var(--ink);
	}

	/* --- Entrances ---------------------------------------------------------- */

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

	/* --- Mobile -------------------------------------------------------------- */

	@media (max-width: 760px) {
		.hero {
			display: flex;
			flex-direction: column;
			margin-top: 28px;
			gap: 28px;
		}

		.hero-nav {
			align-self: stretch;
		}

		.intro {
			order: 3;
			align-self: stretch;
		}

		h1 {
			font-size: clamp(48px, 17.5vw, 64px);
		}

		.tagline {
			font-size: 24px;
		}

		.br-desktop {
			display: none;
		}

		.br-mobile {
			display: block;
		}

		.art {
			width: 100%;
		}

		.art-desktop {
			display: none;
		}

		.art-mobile {
			display: block;
		}

		/* Mobile 5x5 grid in the 346x359 svg: border x 14.19-345.0 / y 28.13-358.66,
		   interior lines at x=214.39 and y=291.86 bound the last two cells */
		.explore-pill {
			width: 37.75%;
			height: 18.61%;
			right: 0.289%;
			bottom: 0.095%;
		}

		/* The mobile Figma frame uses a larger keycap-to-oval ratio than desktop
		   (13px type on a 346-wide artwork) */
		.keycap {
			font-size: clamp(12px, 3.76cqw, 28px);
		}
	}
</style>
