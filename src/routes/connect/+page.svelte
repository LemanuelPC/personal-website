<script lang="ts">
	import NavLinks from '$lib/components/NavLinks.svelte';
	import pieceGreen from '$lib/assets/piece-green.svg?raw';
	import pieceGold from '$lib/assets/piece-gold.svg?raw';
	import pieceGreenMobile from '$lib/assets/piece-green-mobile.svg?raw';
	import pieceGoldMobile from '$lib/assets/piece-gold-mobile.svg?raw';

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

	// Mobile grid (Figma frame 22:3534), in the same 346x359 space as the
	// homepage mobile art: [x, y, w, h, fill] cells and measured line runs
	const mCells: [number, number, number, number, string][] = [
		[214.4, 27.74, 66.32, 66.71, 'var(--echo-green)'],
		[280.63, 94.52, 64.37, 65.77, 'var(--gold-byte)'],
		[83.1, 94.51, 65.1, 65.78, 'var(--ink)'],
		[213.95, 160.29, 65.78, 65.78, 'var(--ink)'],
		[14.32, 291.68, 68.5, 66.98, 'var(--echo-green)']
	];
	const mVLines: [number, number, number][] = [
		[82.82, 28.73, 357.63],
		[148.6, 28.73, 357.63],
		[214.39, 28.73, 357.63],
		[280.17, 29.44, 291.87]
	];
	const mHLines = [94.51, 160.29, 226.07, 291.86];
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
		<svg class="grid grid-d" viewBox="0 0 681 669" aria-hidden="true" preserveAspectRatio="none">
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
				<!-- The divider between the pill's two cells stops above the pill
				     row, as in the mobile frame -->
				<line x1={x} y1={Y[0]} x2={x} y2={x === X[6] ? Y[6] : Y.at(-1)} stroke="var(--ink)" />
			{/each}
			{#each Y as y}
				<line x1={X[0]} y1={y} x2={X.at(-1)} y2={y} stroke="var(--ink)" />
			{/each}
		</svg>

		<!-- The mobile Figma frame swaps the composition: the same grid as the
		     homepage mobile art, with the photo card overlaying its left side.
		     Geometry from frame 22:3534 in the homepage svg's coordinate space. -->
		<svg class="grid grid-m" viewBox="0 0 346 359" aria-hidden="true" preserveAspectRatio="none">
			{#each mCells as [x, y, w, h, fill]}
				<rect {x} {y} width={w} height={h} {fill} />
			{/each}
			{#each mVLines as [x, y1, y2]}
				<line x1={x} y1={y1} x2={x} y2={y2} stroke="var(--ink)" stroke-width="0.687" />
			{/each}
			{#each mHLines as y}
				<line x1="14.19" y1={y} x2="345" y2={y} stroke="var(--ink)" stroke-width="0.687" />
			{/each}
			<rect
				x="14.19"
				y="28.13"
				width="330.81"
				height="329.5"
				fill="none"
				stroke="var(--ink)"
				stroke-width="0.687"
			/>
		</svg>

		<span class="piece gold" aria-hidden="true">{@html pieceGold}</span>

		<div class="photo-card">
			<div class="photo">
				<img src="/photo-luis.webp" alt="Luís Carvalho" />
			</div>
			<p class="name">Luís C.</p>
		</div>

		<span class="piece green" aria-hidden="true">{@html pieceGreen}</span>

		<!-- Mobile pieces sit ON the card: green over its top-left corner, gold
		     over its bottom-right edge, at the Figma rotations -->
		<span class="piece green-m" aria-hidden="true">{@html pieceGreenMobile}</span>
		<span class="piece gold-m" aria-hidden="true">{@html pieceGoldMobile}</span>

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
		/* Figma insets the photo frame 19.7/21.5 from the card edges (of the
		   681 panel: 2.9% / 3.16%), leaving the name a 79px strip below */
		padding: 3.16% 2.9% 0;
	}

	.photo {
		position: relative;
		border: 0.45em solid var(--echo-green);
		outline: 1.5px solid var(--ink);
		--photo-r: 1.6cqw;
		border-radius: var(--photo-r);
		overflow: hidden;
		font-size: clamp(8px, 2.05cqw, 14px);
		/* The Figma portrait frame is 346x474; the source image is a touch
		   wider (3:4), so cover-crop it to the design's proportions */
		aspect-ratio: 346 / 474;
		flex-shrink: 0;
	}

	/* The Figma frame outlines the green band on BOTH edges: the outline above
	   draws the outer ink line, this ring draws the inner one over the photo */
	.photo::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: calc(var(--photo-r) - 0.45em);
		box-shadow: inset 0 0 0 1.5px var(--ink);
		pointer-events: none;
	}

	.photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Figma's desktop mask shows a specific window of the portrait (x 11.4%
	   to 94.2%, y 1.3% to 86.9% of the image), not a centered cover crop */
	@media (min-width: 761px) {
		.photo img {
			position: absolute;
			width: 120.9%;
			max-width: none;
			height: auto;
			left: -13.8%;
			top: -1.5%;
		}
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

	/* Sits ON the photo card, above its frame, per the Figma desktop frame */
	.piece.gold {
		left: -4.3%;
		top: 18.65%;
		width: 31.57%;
		z-index: 1;
	}

	.piece.green {
		left: 59.5%;
		top: 64.4%;
		width: 20.66%;
	}

	/* Mobile-frame pieces: hidden on desktop, sized to their rotated Figma
	   bounding boxes with the raw asset rotated inside */
	.piece.green-m,
	.piece.gold-m {
		display: none;
		place-items: center;
	}

	.piece.green-m {
		left: -1.48%;
		top: -5.13%;
		width: 23.3%;
		height: 23.9%;
	}

	.piece.green-m :global(svg) {
		width: 65.6%;
		height: auto;
		rotate: -31.27deg;
	}

	.piece.gold-m {
		left: 48.85%;
		top: 61.41%;
		width: 15.25%;
		height: 14.47%;
	}

	.piece.gold-m :global(svg) {
		width: 74.4%;
		height: auto;
		rotate: 34.43deg;
	}

	.grid-m {
		display: none;
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

		/* Same treatment as the homepage mobile art: the box bleeds past the
		   margins so the grid border lands flush with the content edges */
		.panel {
			width: 104.59%;
			margin-left: -4.29%;
			aspect-ratio: 346 / 359;
		}

		.grid-d {
			display: none;
		}

		.grid-m {
			display: block;
		}

		.piece.gold,
		.piece.green {
			display: none;
		}

		.piece.green-m,
		.piece.gold-m {
			display: grid;
		}

		/* Card spans the grid's left side (Figma: 200x266 at 14.35,27.74 in the
		   346x359 frame); padding percentages resolve against the panel width */
		.photo-card {
			left: 4.15%;
			top: 7.73%;
			width: 57.82%;
			height: 74.07%;
			border-radius: 2.17cqw;
			padding: 3.6% 3.13% 2.46%;
		}

		/* Figma crops the mobile portrait to a wider 178:216 ratio; without this
		   the taller source image eats the name strip below it. flex-shrink 0 so
		   the name's padding repositions the text instead of squeezing the photo. */
		.photo {
			font-size: clamp(8px, 2.54cqw, 14px);
			--photo-r: 2.6cqw;
			aspect-ratio: 177.912 / 216.316;
			flex-shrink: 0;
		}

		/* Inscribed in the last two cells of the bottom row, same box as the
		   homepage explore pill */
		.resume-pill {
			width: 37.75%;
			height: 18.32%;
			right: 0.289%;
			bottom: 0.29%;
		}

		/* The Figma keycap face is 26px tall on the 346 frame, an 11.1px face
		   font with roughly half the desktop's side padding */
		.keycap {
			font-size: clamp(10px, 3.2cqw, 22px);
			padding-inline: 0.55em;
		}

		/* Seat the name on Figma's baseline: its strip is not quite symmetric
		   between the photo and the card's bottom edge (cqw so it tracks the
		   panel, percentages here would resolve against the card instead) */
		.name {
			padding-top: 2.2cqw;
		}
	}
</style>
