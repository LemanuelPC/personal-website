<script lang="ts">
	import logoHorizontal from '$lib/assets/logo-horizontal.svg?raw';
	import logoVertical from '$lib/assets/logo-vertical.svg?raw';
	import iconGithub from '$lib/assets/icon-github.svg?raw';
	import iconLinkedin from '$lib/assets/icon-linkedin.svg?raw';
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<header>
	<a href="/" class="logo logo-horizontal" aria-label="Luís Carvalho - home">
		{@html logoHorizontal}
	</a>
	<a href="/" class="logo logo-vertical" aria-label="Luís Carvalho - home">
		{@html logoVertical}
	</a>
	<div class="actions">
		<a href="https://github.com/LemanuelPC" class="social" aria-label="GitHub">{@html iconGithub}</a>
		<a href="https://www.linkedin.com/in/le-pc/" class="social" aria-label="LinkedIn">{@html iconLinkedin}</a>
		<ThemeToggle />
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: clamp(1rem, 4.5vh, 46px);
	}

	.logo :global(svg) {
		height: 21px;
		width: auto;
	}

	.logo-vertical {
		display: none;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.social :global(svg) {
		width: 24px;
		height: 24px;
		transition: translate 150ms ease;
	}

	.social:hover :global(svg) {
		translate: 0 -2px;
	}

	@media (max-width: 760px) {
		header {
			flex-direction: column-reverse;
			gap: 24px;
		}

		.logo-horizontal {
			display: none;
		}

		.logo-vertical {
			display: block;
		}

		.logo-vertical :global(svg) {
			height: 76px;
			width: auto;
		}
	}
</style>
