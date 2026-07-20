<script lang="ts">
	import { page } from '$app/state';
	import iconWork from '$lib/assets/icon-work.svg?raw';
	import iconPlay from '$lib/assets/icon-play.svg?raw';
	import iconConnect from '$lib/assets/icon-connect.svg?raw';
	import iconNavHover from '$lib/assets/icon-nav-hover.svg?raw';

	const nav = [
		{ href: '/work', label: 'Work', icon: iconWork },
		{ href: '/play', label: 'Play', icon: iconPlay },
		{ href: '/connect', label: 'Connect', icon: iconConnect }
	];
</script>

<nav class="site-nav" aria-label="Primary">
	{#each nav as item, i}
		{@const active = page.url.pathname.replace(/\/$/, '') === item.href}
		<a href={item.href} style:--i={i} class:active aria-current={active ? 'page' : undefined}>
			{item.label}
			<span class="nav-icon" aria-hidden="true">
				<span class="icon-default">{@html item.icon}</span>
				<span class="icon-hover">{@html iconNavHover}</span>
			</span>
		</a>
	{/each}
</nav>

<style>
	.site-nav {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
	}

	.site-nav a {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		font-size: 18px;
		font-weight: 700;
		animation: rise 500ms both;
		animation-delay: calc(80ms * var(--i));
	}

	/* Active page: label and coin turn Gold Byte (the icons draw with var(--ink),
	   so scoping an override recolors them without a second asset) */
	.site-nav a.active {
		color: var(--gold-byte);
	}

	.site-nav a.active .nav-icon {
		--ink: var(--gold-byte);
	}

	/* Two icon states per the Figma component (Groups 373-375): a raised coin
	   by default, squashed flat with impact sparks on hover. The hover svg
	   shares the coin's layout box; the sparks overflow above-right. */
	.nav-icon {
		position: relative;
		width: 19px;
		height: 11px;
	}

	.nav-icon > span {
		position: absolute;
		inset: 0;
		transition: opacity 100ms ease;
	}

	.nav-icon :global(svg) {
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.icon-hover,
	.site-nav a:hover .icon-default,
	.site-nav a:focus-visible .icon-default {
		opacity: 0;
	}

	.site-nav a:hover .icon-hover,
	.site-nav a:focus-visible .icon-hover {
		opacity: 1;
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

	/* The mobile Figma frames keep the nav row inset from the page margins:
	   a 296px row on the 331.76px content box, i.e. ~5.3% padding per side */
	@media (max-width: 760px) {
		.site-nav {
			flex-direction: row;
			justify-content: space-between;
			padding-inline: 5.3%;
		}
	}
</style>
