<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();
</script>

<!-- Carousel card from the Figma explore frame: dark 315x237 card, device
     frame on the left, details column on the right. Sized in em so the whole
     card scales via its container's font-size. -->
<article class="card">
	<div class="frame" class:logo={!project.image && project.logoText}>
		{#if project.image}
			<img src={project.image} alt="{project.title} screenshot" />
		{:else if project.logoText}
			<span class="logo-text">{project.logoText}</span>
		{/if}
	</div>

	<div class="details">
		<div>
			<h3>{project.title}</h3>
			<p class="desc">{project.description}</p>
		</div>
		<div>
			<p class="label">Tools Used.</p>
			<ul class="chips">
				{#each project.tools as tool}
					<li>{tool}</li>
				{/each}
			</ul>
		</div>
		<div>
			<p class="label">See more.</p>
			<div class="links">
				{#if project.liveUrl}
					<a class="mini-keycap" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
						Live link
						<svg viewBox="0 0 5.0193 6.435" aria-hidden="true">
							<path
								d="M0.5148 4.83181V1.73237C0.5148 1.02235 1.32801 0.619585 1.89278 1.04989L4.06239 2.70293C4.53109 3.06003 4.50862 3.77246 4.01834 4.09931L1.84873 5.54571C1.27854 5.92584 0.5148 5.51709 0.5148 4.83181Z"
								fill="var(--void)"
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
								fill="var(--void)"
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
								fill="var(--void)"
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
	</div>
</article>

<style>
	/* 1em = 12px at design scale. Figma draws the card at 315.3x308 (26.25em, near
	   square), but the real descriptions and tool lists overflow that: widened to
	   30em so the text and chips have room, with the extra going to the details
	   column. Slightly wider than tall, rather than Figma's square, to keep the
	   height down now that the width carries the content. */
	.card {
		display: flex;
		gap: 1.85em;
		width: 30em;
		aspect-ratio: 30 / 28;
		padding: 1.6em 1.55em;
		background: var(--void);
		border-radius: 1.25em;
		color: var(--sandbox);
	}

	.frame {
		flex-shrink: 0;
		width: 10.1em;
		border-radius: 0.67em;
		border: 2px solid var(--void);
		background: #fff;
		overflow: hidden;
		display: grid;
		place-items: center;
	}

	.frame.logo {
		background: var(--echo-green);
	}

	.frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.logo-text {
		font-size: 1.5em;
		font-weight: 700;
		color: var(--void);
		text-align: center;
		line-height: 1.2;
		max-width: 6em;
	}

	.details {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	h3 {
		font-size: 1.17em;
		font-weight: 700;
		line-height: 1.2;
		color: var(--echo-green);
	}

	.desc {
		margin-top: 0.5em;
		font-size: 1em;
		font-weight: 400;
		line-height: 1.2;
	}

	.label {
		font-size: 1em;
		font-weight: 500;
	}

	.chips {
		list-style: none;
		padding: 0;
		margin: 0.55em 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4em;
	}

	.chips li {
		font-size: 0.67em;
		font-weight: 400;
		padding: 0.25em 0.7em;
		border-radius: 0.25em;
		background: color-mix(in srgb, var(--sandbox) 30%, transparent);
	}

	.links {
		margin-top: 0.55em;
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
		color: var(--sandbox);
		background: var(--void);
		border: 1.5px solid var(--sandbox);
		border-radius: 0.75em;
		padding: 0.45em 1.1em;
		box-shadow: 0.35em 0.35em 0 -1px var(--sandbox);
		transition:
			translate 110ms ease,
			box-shadow 110ms ease,
			background-color 240ms ease,
			border-color 240ms ease,
			color 240ms ease;
	}

	.mini-keycap svg {
		width: 0.56em;
		height: auto;
	}

	/* Hovered CTA fills with Echo Green and flips to ink-dark text/border, per
	   the Figma CTA buttons sheet */
	.mini-keycap:hover {
		translate: 0.12em 0.12em;
		background: var(--echo-green);
		color: var(--void);
		border-color: var(--void);
		box-shadow: 0.2em 0.2em 0 -1px var(--sandbox);
	}

	.mini-keycap:active {
		translate: 0.3em 0.3em;
		box-shadow: 0 0 0 -1px var(--sandbox);
	}
</style>
