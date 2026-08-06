<script lang="ts">
	import { page } from '$app/state';
	import NavLinks from '$lib/components/NavLinks.svelte';

	// 404 is the one people actually land on, from a stale link or a typo, so it
	// gets its own line rather than the framework's generic message.
	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{page.status} - Luís Carvalho</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="error">
	<div class="nav-slot">
		<NavLinks />
	</div>

	<div class="intro">
		<p class="code">{page.status}</p>
		<h1>{notFound ? 'Nothing here' : 'Something broke'}<span class="dot">.</span></h1>
		<p class="blurb">
			{notFound
				? 'That page moved or never existed.'
				: (page.error?.message ?? 'An unexpected error occurred.')}
		</p>
		<a class="home" href="/">Back home</a>
	</div>
</section>

<style>
	.error {
		flex: 1;
		display: grid;
		grid-template-rows: auto 1fr;
		margin-top: clamp(2.5rem, 8.9vh, 91px);
	}

	.intro {
		align-self: center;
		padding-bottom: clamp(2rem, 10vh, 8rem);
		animation: rise 600ms 150ms both;
	}

	.code {
		font-size: 18px;
		font-weight: 700;
		color: var(--ink-muted);
		letter-spacing: 0.08em;
	}

	h1 {
		font-size: clamp(40px, 4.45vw, 64px);
		letter-spacing: var(--tracking-tight);
		margin-top: 4px;
	}

	.dot {
		color: var(--headline-dot);
		transition: color 240ms ease;
	}

	.blurb {
		margin-top: 12px;
		font-size: clamp(16px, 1.4vw, 20px);
		color: var(--ink-muted);
		max-width: 34ch;
	}

	.home {
		display: inline-block;
		margin-top: 28px;
		font-size: 18px;
		font-weight: 700;
		color: inherit;
		text-decoration: none;
		border-bottom: 2px solid var(--echo-green);
		padding-bottom: 2px;
		transition: border-color 200ms ease;
	}

	.home:hover {
		border-color: var(--ink);
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.intro {
			animation: none;
		}
	}
</style>
