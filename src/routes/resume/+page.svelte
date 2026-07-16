<script lang="ts">
	import logomark from '$lib/assets/logomark.svg?raw';

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
				'Node.js',
				'Express',
				'FastAPI',
				'Flask',
				'Spring Boot',
				'Tauri'
			]
		},
		{
			group: 'Data & Infra',
			items: ['PostgreSQL', 'Redis', 'SQLite', 'Docker', 'Git', 'REST', 'WebSockets', 'JWT', 'CUDA']
		},
		{ group: 'Methodologies', items: ['SCRUM', 'Kanban'] }
	];

	const experience = [
		{
			org: 'Eclypsys',
			role: 'Full Stack Developer',
			period: '2024 - present',
			text: 'Designed, developed, and maintained enterprise-level ERP and e-commerce applications, working across backend, frontend, and integration layers. Utilized Odoo, Python, and React Native to build scalable, maintainable systems supporting core business operations, from custom ERP modules to a customer-facing mobile app.'
		},
		{
			org: 'Fed. Portuguesa de Artes Marciais Chinesas',
			role: 'Administrative Technician',
			period: '2017 - 2024',
			text: "Primary communication liaison between the federation, its member associations, athletes and trainers. Handled database management and member support, planned and ran championships and workshops, and maintained the federation's website alongside its social channels."
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
			period: '2015',
			text: '(Frequency) Bachelor in Applied Languages'
		},
		{
			org: 'Faculty of Sciences (FCUP)',
			period: '2011',
			text: '(Frequency) Integrated Master’s Degree in Network and Information Systems Engineering'
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

<svelte:head>
	<title>Résumé - Luís Carvalho</title>
	<meta name="description" content="Résumé of Luís Carvalho, software developer." />
</svelte:head>

<section class="resume">
	<div class="actions">
		<a class="action" href={pdf} download="Luis-Carvalho-Resume.pdf" aria-label="Download résumé">
			<svg viewBox="0 0 16 16" aria-hidden="true">
				<path d="M8 2v7m0 0 3-3M8 9 5 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M3 11v2.2h10V11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
			</svg>
		</a>
		<button class="action" aria-label="Close résumé" onclick={close}>
			<svg viewBox="0 0 16 16" aria-hidden="true">
				<path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
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
					<h1>Hi,<br />I’m Luís.</h1>
					<p class="tagline">A software developer.</p>
				</div>
				<span class="mark" aria-hidden="true">{@html logomark}</span>
			</header>

			<div class="columns">
				<div class="col">
					<section>
						<h2>Contact</h2>
						<ul class="contact">
							<li><a href="https://lepc.dev">lepc.dev</a></li>
							<li><a href="mailto:prazerescarvalho@gmail.com">prazerescarvalho@gmail.com</a></li>
							<li><a href="tel:+351911775897">+351 911775897</a></li>
						</ul>
					</section>

					<section>
						<h2>Profile</h2>
						<p>
							Full-stack developer building production ERP, web and mobile systems: custom Odoo
							modules in Python, React Native apps in TypeScript. I work across stacks by design, and
							a new framework is a ramp rather than a wall.
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
						<h2>Languages</h2>
						<p>English &amp; Portuguese</p>
					</section>
				</div>

				<div class="col">
					<section>
						<h2>Experience</h2>
						{#each experience as job}
							<article>
								<h3>{job.org}</h3>
								<p class="meta"><span>{job.role}</span><span class="period">{job.period}</span></p>
								<p>{job.text}</p>
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

	.actions .action {
		width: 34px;
		height: 34px;
		border-radius: 8px;
		background: var(--ink);
		color: var(--paper);
		display: grid;
		place-items: center;
		transition: translate 120ms ease;
	}

	.actions .action:hover {
		translate: 0 -2px;
	}

	.actions .action svg {
		width: 18px;
		height: 18px;
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

	h1 {
		font-size: 8em;
		letter-spacing: -0.03em;
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

	.meta {
		display: flex;
		justify-content: space-between;
		gap: 1em;
		opacity: 0.5;
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
