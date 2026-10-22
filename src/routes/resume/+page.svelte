<script lang="ts">
	// Static instances of Space Grotesk for the sheet; see `.doc` for why.
	import '@fontsource/space-grotesk/400.css';
	import '@fontsource/space-grotesk/500.css';
	import '@fontsource/space-grotesk/700.css';
	import logomark from '$lib/assets/logomark.svg?raw';
	import Seo from '$lib/components/Seo.svelte';

	const skills = [
		{ group: 'Programming', items: ['Python', 'TypeScript', 'JavaScript', 'Dart', 'Java', 'SQL', 'Rust'] },
		{
			group: 'Frameworks',
			items: [
				'Odoo',
				'React Native',
				'Expo',
				'Flutter',
				'React',
				'SvelteKit',
				'Tailwind',
				'Node.js',
				'Express',
				'FastAPI',
				'Flask',
				'Tauri'
			]
		},
		{
			group: 'Data & Infra',
			items: ['PostgreSQL', 'Redis', 'SQLite', 'Docker', 'Git', 'REST', 'WebSockets', 'JWT', 'CUDA']
		}
	];

	// `roles` rather than a single role: a promotion within one employer is worth
	// showing, and stacking the titles under one org keeps each of them bound to
	// that org when a CV parser reads the page. Newest first.
	const experience = [
		{
			org: 'Eclypsys',
			roles: [
				{ role: 'Senior Full Stack Developer', period: '2026 - present' },
				{ role: 'Full Stack Developer', period: '2024 - 2026' }
			],
			bullets: [
				'Lead developer on Village du Soir, an Odoo 18 platform for a Geneva venue: 45 custom modules, 164 API endpoints, 248 tests, Adyen and TWINT across 40 POS terminals, 400k+ orders.',
				'Rewrote the customer app in TypeScript on Expo: 62 screens, half the code of the original, shipped over the air without app-store releases.',
				'Made Redis optional behind a PostgreSQL fallback, clearing 5s request stalls and unblocking the move to Odoo.sh.'
			]
		},
		{
			org: 'Fed. Portuguesa de Artes Marciais Chinesas',
			roles: [{ role: 'Administrative Technician', period: '2017 - 2024' }],
			bullets: [
				"Member database, member support, and the federation's website."
			]
		}
	];

	// Village du Soir is deliberately absent: it is named in the Eclypsys entry,
	// and this section is for work that has nowhere else to appear.
	const projects = [
		{
			name: 'Karaoke Room',
			url: 'https://github.com/LemanuelPC/karaoke-room',
			text: 'ML vocal separation, word-level lyric sync with CJK romanization, big-screen player driven by phone remotes.'
		},
		{
			name: 'UNW Hunt Tracker',
			url: 'https://github.com/LemanuelPC/unw-hunt-tracker',
			text: 'Excel to PostgreSQL pipeline behind a Flask API with role-based access, used weekly by a 100+ member guild.'
		}
	];

	const education = [
		{
			org: 'Code for All_',
			period: '2024',
			text: 'A 14-Week Intensive & Immersive Full Stack Programming Bootcamp'
		},
		{
			org: 'Faculty of Arts and Humanities (FLUP)',
			period: '2015 - 2018',
			text: 'Applied Languages'
		},
		{
			org: 'Faculty of Sciences (FCUP)',
			period: '2011 - 2015',
			text: 'Network and Information Systems Engineering'
		}
	];

	// Pre-rendered from this very page by `npm run resume:pdf`, so the download is
	// an A4 document rather than whatever the visitor's print dialog decides.
	const pdf = '/resume.pdf';

	// Cells in the decorative edge strips. They divide the sheet's width evenly
	// (see --cells), so this only has to be enough to cover the widest case.
	const ticks = 24;

	function close() {
		if (history.length > 1) history.back();
		else location.href = '/';
	}
</script>

<Seo
	title="Résumé - Luís Carvalho"
	description="Résumé of Luís Carvalho, software developer."
/>

<section class="resume">
	<div class="actions">
		<a class="action" href={pdf} download="Luis-Carvalho-Resume.pdf" aria-label="Download résumé">
			<svg class="dl" viewBox="0 0 11.6886 16.1971" aria-hidden="true">
				<path d="M3.16016 15.1971H8.5293" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M5.84375 10.9322L5.84375 1.0296" fill="none" stroke="currentColor" stroke-width="2.0592" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M1 6.8194L4.52511 10.4147C5.19033 11.0931 6.27885 11.1062 6.96016 10.4439L10.6886 6.8194" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</a>
		<button class="action" aria-label="Close résumé" onclick={close}>
			<svg class="x" viewBox="0 0 14.6839 14.6837" aria-hidden="true">
				<path d="M1.00013 13.6837L13.6839 1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M13.6837 13.6837L1 1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	</div>

	<div class="sheet">
		<div class="doc" id="resume-doc">
			<div class="deco-strip" aria-hidden="true">
				{#each Array(ticks) as _}<i></i>{/each}
			</div>

			<header class="doc-head">
				<div>
					<h1>Hi,<br />I’m Luís Carvalho<span class="dot">.</span></h1>
					<p class="tagline">A software developer.</p>
				</div>
				<span class="mark" aria-hidden="true">{@html logomark}</span>
			</header>

			<div class="columns">
				<div class="col">
					<section>
						<h2>Contact</h2>
						<ul class="contact">
							<li>Amarante, Portugal</li>
							<li><a href="mailto:prazerescarvalho@gmail.com">prazerescarvalho@gmail.com</a></li>
							<li><a href="https://lepc.dev">lepc.dev</a></li>
							<li>
								<a href="https://www.linkedin.com/in/le-pc/">linkedin.com/in/le-pc</a> ·
								<a href="https://github.com/LemanuelPC">github.com/LemanuelPC</a>
							</li>
						</ul>
					</section>

					<section>
						<h2>Profile</h2>
						<p>
							Full-stack developer building production ERP, web and mobile systems: custom Odoo
							modules in Python, React Native apps in TypeScript. A new framework is a ramp, not a
							wall.
						</p>
					</section>

					<section>
						<h2>Skills</h2>
						{#each skills as { group, items }}
							<h3>{group}</h3>
							<ul class="chips">
								{#each items as item}
									<li>{item}</li>
								{/each}
							</ul>
						{/each}
					</section>

					<section>
						<h2>Projects</h2>
						{#each projects as { name, url, text }}
							<p class="project"><strong><a href={url}>{name}</a>:</strong> {text}</p>
						{/each}
					</section>
				</div>

				<div class="col">
					<section>
						<h2>Experience</h2>
						{#each experience as job}
							<article>
								<h3>{job.org}</h3>
								{#each job.roles as { role, period }}
									<p class="meta">{role} · {period}</p>
								{/each}
								<ul class="bullets">
									{#each job.bullets as bullet}
										<li>{bullet}</li>
									{/each}
								</ul>
							</article>
						{/each}
					</section>

					<section>
						<h2>Education</h2>
						{#each education as edu}
							<article>
								<h3>{edu.org}</h3>
								<p class="meta"><span class="period start">{edu.period}</span></p>
								<p>{edu.text}</p>
							</article>
						{/each}
					</section>

					<!-- Languages sits in the right column: the contact block grew with the
					     location and profile links, and this is where the slack is. -->
					<section>
						<h2>Languages</h2>
						<p>English &amp; Portuguese</p>
					</section>
				</div>
			</div>

			<div class="deco-strip bottom" aria-hidden="true">
				{#each Array(ticks) as _}<i></i>{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.resume {
		flex: 1;
		position: relative;
		padding-block: clamp(1rem, 4vh, 42px);
	}

	.actions {
		position: absolute;
		right: 0;
		top: clamp(1rem, 4vh, 42px);
		display: flex;
		gap: 12px;
	}

	/* Per the Figma résumé frames: a solid ink square in light mode; in dark
	   mode the fill matches the page and a paper outline carries the shape */
	/* The outline ring is an inset box-shadow rather than a border: Chromium
	   paints thin borders as four bevel-joined sides, which chamfers the
	   corners at DPR 1, while a shadow ring rasterizes as one smooth pass.
	   Radius is 9.5px against Figma's 8: Skia flattens small arcs into a
	   near-chamfer at 1x, so a slightly larger radius is what actually paints
	   with the roundness the design shows. */
	.actions .action {
		width: 33px;
		height: 33px;
		border-radius: 9.5px;
		background: var(--ink);
		box-shadow: inset 0 0 0 1.5px var(--ink);
		color: var(--paper);
		display: grid;
		place-items: center;
		transition:
			translate 120ms ease,
			background-color 240ms ease,
			box-shadow 240ms ease,
			color 240ms ease;
	}

	:global([data-theme='dark']) .actions .action {
		background: var(--paper);
		color: var(--ink);
	}

	/* Hover is Gold Byte with an ink-dark glyph in both themes */
	.actions .action:hover,
	:global([data-theme='dark']) .actions .action:hover {
		translate: 0 -2px;
		background: var(--gold-byte);
		box-shadow: inset 0 0 0 1.5px var(--gold-byte);
		color: var(--void);
	}

	/* Sized off the 33px Figma buttons; the viewBoxes include the round-cap
	   stroke bleed, so each glyph gets its own box rather than a shared 18px */
	.actions .action svg.dl {
		height: 16.2px;
		width: auto;
	}

	.actions .action svg.x {
		width: 14.7px;
		height: auto;
	}

	/* The sheet is A4 on screen exactly as on paper, so what you see here is the
	   PDF. Every size in the document below is an em off .doc's font-size, which
	   tracks the sheet's width, so the whole thing scales as one piece. */
	.sheet {
		width: min(100%, 210mm);
		margin-inline: auto;
		container-type: inline-size;
	}

	/* The document: 618x800 in Figma, redrawn to A4's proportions. 1em = 12.6px
	   on a full-size sheet, the size at which the content fills the page. */
	.doc {
		width: 100%;
		aspect-ratio: 210 / 297;
		background: var(--paper);
		/* An outline rather than a border: the frame is decorative, and a border
		   would take 2px out of the content box, laying the sheet out narrower on
		   screen than the borderless one on paper. */
		outline: 1px solid color-mix(in srgb, var(--ink) 40%, transparent);
		outline-offset: -1px;
		font-size: 1.5875cqw;
		/* The static font rather than the site's variable one: Skia embeds a
		   variable font in the PDF without Ascent, Descent or FontBBox, so text
		   extractors guess each line's height, overlap neighbouring lines, and
		   splice them into one another letter by letter. */
		font-family: 'Space Grotesk', var(--font-sans);
		display: flex;
		flex-direction: column;
		/* Measure text by linear metrics, the way the PDF backend does, so a line
		   near the column's width wraps identically on screen and on paper. */
		text-rendering: geometricPrecision;
		transition: background-color 240ms ease;
	}

	/* Decorative grid rows along the top and bottom edges, as in the template.
	   Drawn as real cells rather than a repeating-linear-gradient: Skia rasterizes
	   gradients into the PDF, which lands the hairlines at uneven spacings. */
	.deco-strip {
		/* Cells divide the width evenly rather than being a fixed 2.6em, so the
		   strip always ends on a whole cell instead of a sliver. 24 of them across
		   an A4 sheet lands each one at 2.62em, near enough square to the design. */
		--cells: 24;
		height: 2.6em;
		flex: none;
		display: flex;
		overflow: hidden;
		border-bottom: 1px solid color-mix(in srgb, var(--ink) 50%, transparent);
	}

	.deco-strip i {
		flex: 0 0 calc(100% / var(--cells));
		border-left: 1px solid color-mix(in srgb, var(--ink) 50%, transparent);
	}

	/* Only the dividers between cells, so the strip meets the sheet's edges the
	   same way on both sides: no line hard against the paper's edge. */
	.deco-strip i:first-child {
		border-left: none;
	}

	.deco-strip.bottom {
		border-bottom: none;
		border-top: 1px solid color-mix(in srgb, var(--ink) 50%, transparent);
	}

	.doc-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 3.2em 3.9em 0;
	}

	/* 5.6em rather than the 8em of the Figma frame: the headline carries the full
	   name so that a CV parser reads it from the largest type on the sheet, and
	   "I'm Luís Carvalho." only stays on one line at this size. */
	h1 {
		font-size: 5.6em;
		line-height: 0.95;
		letter-spacing: -0.03em;
	}

	/* The headline's full stop goes Echo Green in dark mode, per the Figma
	   dark frames; print already pins --headline-dot back to ink for the PDF */
	.dot {
		color: var(--headline-dot);
		transition: color 240ms ease;
	}

	.tagline {
		margin-top: 0.4em;
		font-size: 2.9em;
		font-weight: 700;
		line-height: 0.9;
		letter-spacing: -0.03em;
	}

	.mark {
		width: 10.4em;
		margin-top: 1em;
	}

	.mark :global(svg) {
		width: 100%;
		height: auto;
	}

	.columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5em;
		padding: 2.8em 3.9em 3em;
		position: relative;
		flex: 1;
	}

	.columns::before {
		content: '';
		position: absolute;
		top: 2.8em;
		bottom: 3em;
		left: 50%;
		width: 1px;
		background: color-mix(in srgb, var(--ink) 50%, transparent);
	}

	.col > section + section {
		margin-top: 1.6em;
		padding-top: 1.4em;
		border-top: 1px solid color-mix(in srgb, var(--ink) 50%, transparent);
	}

	h2 {
		font-size: 1.27em;
		line-height: 1.2;
		letter-spacing: -0.03em;
	}

	h3 {
		margin-top: 1.4em;
		font-size: 1em;
		font-weight: 700;
		line-height: 1.2;
	}

	.col p,
	.contact {
		margin-top: 0.6em;
		font-size: 1em;
		font-weight: 400;
		line-height: 1.25;
	}

	.contact {
		list-style: none;
		padding: 0;
	}

	.contact li + li {
		margin-top: 0.4em;
	}

	.contact a:hover {
		color: var(--gold-byte);
	}

	/* Muted via a blended colour rather than `opacity`: an opacity below 1 makes
	   the PDF backend paint this into its own transparency group, which lands at
	   the end of the content stream. The role and dates then extract detached
	   from the employer above them, which is the one thing a CV parser must get
	   right. Blending against --paper renders identically.
	   The dates follow the role inline rather than sitting flush right: across
	   a gap that wide, extractors split the two into separate blocks, and every
	   title came out ahead of every date. */
	.meta {
		color: color-mix(in srgb, var(--ink) 50%, var(--paper));
	}

	/* Stacked titles under one employer read as one ladder, so they sit closer
	   together than the 0.6em a paragraph would otherwise take. */
	.meta + .meta {
		margin-top: 0.25em;
	}

	/* Achievements scan far better as bullets than as a paragraph. The marker is
	   generated content rather than a list-style disc: the PDF backend draws a
	   disc as vector paths, which leaves no bullet in the text layer, while
	   ::before content is laid out as real text and extracts with the line. */
	.bullets {
		list-style: none;
		margin-top: 0.6em;
		padding-left: 0;
	}

	.bullets li {
		font-size: 1em;
		font-weight: 400;
		padding-left: 0.9em;
		text-indent: -0.9em;
	}

	.bullets li::before {
		content: '• ';
	}

	.bullets li + li {
		margin-top: 0.4em;
	}

	.chips {
		list-style: none;
		padding: 0;
		margin: 0.6em 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.55em;
	}

	.chips li {
		font-size: 1em;
		font-weight: 400;
		padding: 0.15em 0.8em;
		border-radius: 0.2em;
		background: color-mix(in srgb, var(--ink) 20%, transparent);
	}

	article + article {
		margin-top: 1.5em;
	}

	/* Too narrow to hold an A4 sheet legibly, so stop pretending to be one and
	   let the document reflow into a single readable column. */
	@media (max-width: 700px) {
		.doc {
			aspect-ratio: auto;
			font-size: clamp(11px, 3cqw, 14px);
		}

		/* Half the cells over a much narrower sheet, so they stay roughly square
		   rather than thinning into slots. The extras are clipped. */
		.deco-strip {
			--cells: 12;
		}

		.columns {
			grid-template-columns: 1fr;
			gap: 2em;
		}

		.columns::before {
			display: none;
		}

		h1 {
			font-size: 5.5em;
		}
	}

	/* The printed sheet is the document itself, edge to edge, with none of the
	   site around it. `npm run resume:pdf` renders exactly this to static/. */
	@media print {
		@page {
			size: A4;
			margin: 0;
		}

		/* A résumé is always on paper, whichever theme the visitor picked. */
		:global(:root) {
			--paper: var(--sandbox) !important;
			--ink: var(--void) !important;
			--headline-dot: var(--ink) !important;
			color-scheme: light !important;
		}

		:global(.splash),
		:global(.shell > header),
		:global(.shell > footer),
		.actions {
			display: none !important;
		}

		/* !important: these live in the layout's own stylesheet, which the bundler
		   is free to order after this one, and the selectors tie on specificity. */
		:global(.shell),
		:global(main) {
			display: block !important;
			max-width: none !important;
			min-height: 0 !important;
			padding: 0 !important;
			margin: 0 !important;
		}

		.resume {
			padding: 0;
		}

		/* The sheet already is A4: it just needs the page to itself. */
		.sheet {
			width: 210mm;
		}

		.doc {
			outline: none;
			/* Belt and braces against a sub-pixel spill onto a second page */
			overflow: hidden;
		}
	}
</style>
