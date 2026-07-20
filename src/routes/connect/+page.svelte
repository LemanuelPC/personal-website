<script lang="ts">
	import NavLinks from '$lib/components/NavLinks.svelte';
	import pieceGreen from '$lib/assets/piece-green.svg?raw';
	import pieceGold from '$lib/assets/piece-gold.svg?raw';

	// Exact grid geometry from the Figma connect frame (681x669 container):
	// 7x7 grid, border cells ~94.4, interior ~95.79 — measured, not assumed.
	const X = [12.59, 106.99, 202.78, 298.57, 394.36, 490.15, 585.94, 680.36];
	const Y = [1.12, 95.52, 191.31, 287.1, 382.89, 478.68, 574.47, 668.89];

	// [col, row, fill] — 1-indexed cells
	const cells: [number, number, string][] = [
		[7, 1, 'var(--echo-green)'],
		[1, 2, 'var(--gold-byte)'],
		[6, 3, 'var(--ink)'],
		[7, 4, 'var(--gold-byte)'],
		[6, 5, 'var(--echo-green)'],
		[1, 6, 'var(--echo-green)'],
		[2, 7, 'var(--ink)']
	];
</script>

<svelte:head>
	<title>Connect - Luís Carvalho</title>
	<meta name="description" content="Let’s connect. Email me or find me on GitHub and LinkedIn." />
</svelte:head>

<section class="connect">
	<div class="nav-slot">
		<NavLinks />
	</div>

	<div class="intro">
		<h1>Let’s connect<span class="dot">.</span></h1>
		<div class="blurb">
			<p>
				Hi there! It’s me, Luís. I write code, ship things, and enjoy seeing them survive
				production. I’m currently based in Portugal, working across time zones and enjoying the
				sunshine. I’ve been curious about computers for as long as I can remember.
			</p>
			<p>
				Off the clock, I’m gaming, spending time with my wife, keeping up with football matches, or
				hanging out with my cat.
			</p>
			<p>
				If you’re up for collaboration, talk tech, or just connect, email me at
				<a href="mailto:prazerescarvalho@gmail.com">prazerescarvalho@gmail.com</a> or find me on
				<a href="https://github.com/LemanuelPC" target="_blank" rel="noopener noreferrer">GitHub</a>
				and
				<a href="https://www.linkedin.com/in/le-pc/" target="_blank" rel="noopener noreferrer"
					>LinkedIn</a
				>.
			</p>
		</div>
	</div>

	<div class="panel">
		<svg class="grid" viewBox="0 0 681 669" aria-hidden="true" preserveAspectRatio="none">
			{#each cells as [col, row, fill]}
				<rect
					x={X[col - 1]}
					y={Y[row - 1]}
					width={X[col] - X[col - 1]}
					height={Y[row] - Y[row - 1]}
					{fill}
				/>
			{/each}
			{#each X as x}
				<line x1={x} y1={Y[0]} x2={x} y2={Y.at(-1)} stroke="var(--ink)" />
			{/each}
			{#each Y as y}
				<line x1={X[0]} y1={y} x2={X.at(-1)} y2={y} stroke="var(--ink)" />
			{/each}
		</svg>

		<span class="piece gold" aria-hidden="true">{@html pieceGold}</span>

		<div class="photo-card">
			<div class="photo">
				<img src="/photo-luis.webp" alt="Luís Carvalho" />
			</div>
			<p class="name">Luís C.</p>
		</div>

		<span class="piece green" aria-hidden="true">{@html pieceGreen}</span>

		<div class="resume-pill">
			<a class="keycap" href="/resume">
				Load résumé
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
	.connect {
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
		max-width: 421px;
		animation: rise 600ms 150ms both;
	}

	h1 {
		font-size: clamp(40px, 4.45vw, 64px);
	}

	/* The headline's full stop goes Echo Green in dark mode, per the Figma
	   dark frames (ink in light mode, where the token resolves to it) */
	.dot {
		color: var(--headline-dot);
		transition: color 240ms ease;
	}

	.blurb {
		margin-top: 20px;
		font-size: 18px;
		font-weight: 700;
		line-height: 1.2;
	}

	.blurb p + p {
		margin-top: 1.2em;
	}

	.blurb a {
		text-decoration: underline;
		text-underline-position: from-font;
	}

	.blurb a:hover {
		color: var(--gold-byte);
	}

	.panel {
		grid-area: 1 / 2 / span 2;
		align-self: start;
		position: relative;
		width: min(681px, 47.3vw, calc((100dvh - 300px) * 1.018));
		aspect-ratio: 681 / 669;
		container-type: inline-size;
		animation: fade 700ms 100ms both;
	}

	.grid {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.photo-card {
		position: absolute;
		left: 15.7%;
		top: 0.07%;
		width: 56.46%;
		height: 85.87%;
		background: var(--paper);
		border: 1.5px solid var(--ink);
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		padding: 3.8% 5.1%;
	}

	.photo {
		border: 0.45em solid var(--echo-green);
		outline: 1.5px solid var(--ink);
		border-radius: 18px;
		overflow: hidden;
		font-size: clamp(8px, 2.05cqw, 14px);
	}

	.photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.name {
		flex: 1;
		display: grid;
		place-content: center;
		font-size: clamp(22px, 7.05cqw, 48px);
		font-weight: 700;
		line-height: 0.9;
		letter-spacing: var(--tracking-tight);
	}

	.piece {
		position: absolute;
		pointer-events: none;
	}

	.piece :global(svg) {
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.piece.gold {
		left: -4.3%;
		top: 18.65%;
		width: 31.57%;
	}

	.piece.green {
		left: 59.5%;
		top: 64.4%;
		width: 20.66%;
	}

	/* Last two cells of the bottom row, same treatment as the homepage pill */
	.resume-pill {
		position: absolute;
		right: 0.09%;
		bottom: 0.02%;
		width: 27.93%;
		height: 14.11%;
		border: 1.5px solid var(--ink);
		border-radius: 999px;
		display: grid;
		place-items: center;
	}

	.keycap {
		display: inline-flex;
		align-items: center;
		gap: 0.44em;
		padding: 0.55em 1.1em;
		font-size: clamp(11px, 2.64cqw, 18px);
		font-weight: 700;
		background: var(--paper);
		border: 0.12em solid var(--ink);
		border-radius: 0.5em;
		box-shadow: 0.4em 0.4em 0 -1px var(--ink);
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
		.connect {
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
			max-width: none;
		}

		h1 {
			font-size: clamp(40px, 13vw, 48px);
		}

		.blurb {
			font-size: 16px;
		}

		.panel {
			width: 100%;
		}
	}
</style>
