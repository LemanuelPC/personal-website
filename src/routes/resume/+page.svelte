<script lang="ts">
	import logomark from '$lib/assets/logomark.svg?raw';

	const skills = [
		{ group: 'Programming', items: ['Java', 'JavaScript', 'Python', 'SQL'] },
		{ group: 'Frameworks', items: ['React', 'Flask', 'Spring Boot', 'Hibernate', 'Node.js', 'Tailwind'] },
		{ group: 'Methodologies', items: ['SCRUM', 'Kanban'] },
		{ group: 'Tools', items: ['Git', 'IntelliJ', 'VS Code', 'PyCharm', 'Docker', 'REST API'] }
	];

	const experience = [
		{
			org: 'Eclypsys',
			role: 'Full Stack Developer',
			period: '2024 - present',
			text: 'Designed, developed, and maintained enterprise-level ERP and e-commerce applications, working across backend, frontend, and integration layers. Utilized Odoo, Django, and SvelteKit to build scalable, maintainable systems supporting core business operations.'
		},
		{
			org: 'Fed. Portuguesa de Artes Marciais Chinesas',
			role: 'Administrative Technician',
			period: '2017 - 2024',
			text: 'Oversaw communications and operational coordination with athletes and trainers, ensuring smooth scheduling and information flow. Planned and executed events while managing digital channels to grow and engage the community.'
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

	function close() {
		if (history.length > 1) history.back();
		else location.href = '/';
	}
</script>

<svelte:head>
	<title>Résumé — Luís Carvalho</title>
	<meta name="description" content="Résumé of Luís Carvalho, software developer." />
</svelte:head>

<section class="resume">
	<div class="actions">
		<button aria-label="Download résumé" onclick={() => window.print()}>
			<svg viewBox="0 0 16 16" aria-hidden="true">
				<path d="M8 2v7m0 0 3-3M8 9 5 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M3 11v2.2h10V11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
			</svg>
		</button>
		<button aria-label="Close résumé" onclick={close}>
			<svg viewBox="0 0 16 16" aria-hidden="true">
				<path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
			</svg>
		</button>
	</div>

	<div class="doc" id="resume-doc">
		<div class="deco-strip" aria-hidden="true"></div>

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
						Software Developer focused on scalable application development and complex
						problem-solving. Skilled in Java, JavaScript, and Python, with hands-on experience in
						React, Spring Boot, and Flask to deliver efficient, real-world solutions.
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

	.actions button {
		width: 34px;
		height: 34px;
		border-radius: 8px;
		background: var(--ink);
		color: var(--paper);
		display: grid;
		place-items: center;
		transition: translate 120ms ease;
	}

	.actions button:hover {
		translate: 0 -2px;
	}

	.actions button svg {
		width: 18px;
		height: 18px;
	}

	/* The document: 618x800 in Figma, scaled fluidly; 1em = 11px at design size */
	.doc {
		max-width: 820px;
		margin-inline: auto;
		background: var(--paper);
		border: 1px solid color-mix(in srgb, var(--ink) 40%, transparent);
		container-type: inline-size;
		font-size: clamp(11px, 1.78cqw, 15px);
		padding-bottom: 3em;
		transition: background-color 240ms ease;
	}

	/* Decorative grid row along the top edge, as in the template */
	.deco-strip {
		height: 2.6em;
		border-bottom: 1px solid color-mix(in srgb, var(--ink) 50%, transparent);
		background-image: repeating-linear-gradient(
			to right,
			color-mix(in srgb, var(--ink) 50%, transparent) 0 1px,
			transparent 1px 2.6em
		);
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
		padding: 2.8em 3.9em 0;
		position: relative;
	}

	.columns::before {
		content: '';
		position: absolute;
		top: 2.8em;
		bottom: 0;
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

	@media (max-width: 700px) {
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

	@media print {
		.actions {
			display: none;
		}

		.doc {
			border: none;
			max-width: none;
			font-size: 11px;
		}

		:global(.shell > header),
		:global(.shell > footer) {
			display: none !important;
		}
	}
</style>
