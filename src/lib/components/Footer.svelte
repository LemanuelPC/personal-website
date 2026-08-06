<script lang="ts">
	import codeBadge from '$lib/assets/icon-code-badge.svg?raw';
</script>

<footer>
	<div class="rule" aria-hidden="true">
		<span class="badge">{@html codeBadge}</span>
		<span class="line"></span>
	</div>
	<p class="copy">© 2026 Luís Carvalho. Coded with care.</p>
</footer>

<style>
	footer {
		margin-top: 12px;
		padding-bottom: clamp(1.5rem, 8vh, 84px);
	}

	.rule {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.badge :global(svg) {
		width: 21px;
		height: 21px;
	}

	/* Its own tint rather than --ink-muted: the rule is decorative, so it keeps
	   the lighter Figma weight that the text token had to leave behind. */
	.line {
		flex: 1;
		height: 2px;
		background: color-mix(in srgb, var(--ink) 50%, transparent);
	}

	.copy {
		margin-top: 18px;
		font-size: 12px;
		font-weight: 400;
		color: var(--ink-muted);
		text-align: right;
	}

	/* The mobile Figma frame keeps the copy right-aligned and only flips the
	   badge to the line's right end */
	@media (max-width: 760px) {
		.rule {
			flex-direction: row-reverse;
		}
	}
</style>
