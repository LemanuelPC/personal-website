<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();
</script>

<!-- Expanded card from the Figma work/play frames: dark 278x448 card with a
     title header and a light body holding a browser/phone mockup, tool chips
     and link keycaps. 1em = 12px at design scale. -->
<article class="wcard">
	<header>
		<h3>{project.title}</h3>
		<p class="desc">{project.description}</p>
	</header>

	<div class="body">
		<div class="mock {project.frame ?? 'wide'}">
			<div class="chrome" aria-hidden="true">
				<span class="dot sandbox"></span>
				<span class="dot gold"></span>
				<span class="dot green"></span>
			</div>
			<div class="screen" class:placeholder={!project.image}>
				{#if project.image}
					<img src={project.image} alt="{project.title} screenshot" />
				{/if}
			</div>
		</div>

		<p class="label">Tools Used.</p>
		<ul class="chips">
			{#each project.tools as tool}
				<li>{tool}</li>
			{/each}
		</ul>

		<p class="label">See more.</p>
		<div class="links">
			{#if project.liveUrl}
				<a class="mini-keycap" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
					Live link
					<svg viewBox="0 0 5.0193 6.435" aria-hidden="true">
						<path
							d="M0.5148 4.83181V1.73237C0.5148 1.02235 1.32801 0.619585 1.89278 1.04989L4.06239 2.70293C4.53109 3.06003 4.50862 3.77246 4.01834 4.09931L1.84873 5.54571C1.27854 5.92584 0.5148 5.51709 0.5148 4.83181Z"
							fill="var(--sandbox)"
							stroke="currentColor"
							stroke-width="1.0296"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</a>
			{/if}
			{#if project.githubUrl}
				<a class="mini-keycap" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
					Github
					<svg viewBox="0 0 5.0193 6.435" aria-hidden="true">
						<path
							d="M0.5148 4.83181V1.73237C0.5148 1.02235 1.32801 0.619585 1.89278 1.04989L4.06239 2.70293C4.53109 3.06003 4.50862 3.77246 4.01834 4.09931L1.84873 5.54571C1.27854 5.92584 0.5148 5.51709 0.5148 4.83181Z"
							fill="var(--sandbox)"
							stroke="currentColor"
							stroke-width="1.0296"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</a>
			{/if}
			{#each project.links ?? [] as link}
				<a class="mini-keycap" href={link.url} target="_blank" rel="noopener noreferrer">
					{link.label}
					<svg viewBox="0 0 5.0193 6.435" aria-hidden="true">
						<path
							d="M0.5148 4.83181V1.73237C0.5148 1.02235 1.32801 0.619585 1.89278 1.04989L4.06239 2.70293C4.53109 3.06003 4.50862 3.77246 4.01834 4.09931L1.84873 5.54571C1.27854 5.92584 0.5148 5.51709 0.5148 4.83181Z"
							fill="var(--sandbox)"
							stroke="currentColor"
							stroke-width="1.0296"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</a>
			{/each}
		</div>
	</div>
</article>

<style>
	.wcard {
		/* Wider than the Figma frame so the browser mockup lands near a standard
		   16:10 screen and screenshots aren't cropped; taller so a wrapped tool
		   row never squeezes the mockup (the mock is a flex item). */
		width: 26em;
		aspect-ratio: 26 / 42;
		background: var(--void);
		border-radius: 1.25em;
		display: flex;
		flex-direction: column;
	}

	header {
		padding: 1.4em 1.1em 0;
		height: 30%;
		color: var(--sandbox);
		overflow: hidden;
	}

	h3 {
		font-size: 1.17em;
		font-weight: 700;
		line-height: 1.2;
		color: var(--echo-green);
	}

	.desc {
		margin-top: 0.4em;
		font-size: 1em;
		font-weight: 400;
		line-height: 1.2;
		display: -webkit-box;
		-webkit-line-clamp: 6;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.body {
		flex: 1;
		margin: 0 0.83em 1.05em;
		background: var(--sandbox);
		border-radius: 1.25em;
		padding: 1.15em;
		display: flex;
		flex-direction: column;
		color: var(--void);
		min-height: 0;
	}

	/* Browser / phone mockup with traffic-light chrome */
	.mock {
		border: 1.5px solid var(--void);
		border-radius: 0.67em;
		overflow: hidden;
		height: 16.1em;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		background: #fff;
	}

	.mock.wide {
		width: 100%;
	}

	.mock.phone {
		width: 45%;
		align-self: center;
	}

	.chrome {
		height: 1.8em;
		background: var(--void);
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.5em;
		padding-inline: 0.7em;
		flex-shrink: 0;
	}

	.dot {
		width: 0.67em;
		height: 0.67em;
		border-radius: 50%;
	}

	.dot.sandbox {
		background: var(--sandbox);
	}

	.dot.gold {
		background: var(--gold-byte);
	}

	.dot.green {
		background: var(--echo-green);
	}

	.screen {
		flex: 1;
		min-height: 0;
	}

	.screen img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Empty-state X, drawn with gradients instead of an asset */
	.screen.placeholder {
		background:
			linear-gradient(
				to top right,
				transparent calc(50% - 0.5px),
				var(--void) calc(50% - 0.5px) calc(50% + 0.5px),
				transparent calc(50% + 0.5px)
			),
			linear-gradient(
				to bottom right,
				transparent calc(50% - 0.5px),
				var(--void) calc(50% - 0.5px) calc(50% + 0.5px),
				transparent calc(50% + 0.5px)
			);
	}

	.label {
		margin-top: 0.9em;
		font-size: 1em;
		font-weight: 500;
	}

	.chips {
		list-style: none;
		padding: 0;
		margin: 0.5em 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4em;
	}

	.chips li {
		font-size: 0.67em;
		font-weight: 400;
		padding: 0.25em 0.7em;
		border-radius: 0.25em;
		background: color-mix(in srgb, var(--void) 30%, transparent);
	}

	.links {
		margin-top: 0.5em;
		display: flex;
		flex-wrap: wrap;
		gap: 0.85em;
	}

	.mini-keycap {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		font-size: 0.67em;
		font-weight: 700;
		color: var(--void);
		background: var(--sandbox);
		border: 1.5px solid var(--void);
		border-radius: 0.75em;
		padding: 0.45em 1.1em;
		box-shadow: 0.35em 0.35em 0 -1px var(--void);
		transition:
			translate 110ms ease,
			box-shadow 110ms ease,
			background-color 240ms ease;
	}

	.mini-keycap svg {
		width: 0.56em;
		height: auto;
	}

	.mini-keycap svg path {
		transition: fill 240ms ease;
	}

	/* Hovered CTA fills with Echo Green and the arrow goes solid ink, per the
	   Figma CTA buttons sheet */
	.mini-keycap:hover {
		translate: 0.12em 0.12em;
		background: var(--echo-green);
		box-shadow: 0.2em 0.2em 0 -1px var(--void);
	}

	.mini-keycap:hover svg path {
		fill: var(--void);
	}

	.mini-keycap:active {
		translate: 0.3em 0.3em;
		box-shadow: 0 0 0 -1px var(--void);
	}
</style>
