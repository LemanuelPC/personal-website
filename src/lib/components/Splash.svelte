<script lang="ts">
	import { browser } from '$app/environment';

	// Hidden pre-paint via [data-splashed] set in app.html for repeat visits.
	let done = $state(false);

	$effect(() => {
		if (document.documentElement.dataset.splashed === 'true') {
			done = true;
			return;
		}
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const t = setTimeout(
			() => {
				done = true;
				try {
					sessionStorage.setItem('splashed', 'true');
				} catch {}
			},
			reduced ? 400 : 2200
		);
		return () => clearTimeout(t);
	});
</script>

{#if browser}
	<div class="splash" class:done role="status" aria-label="Loading">
		<p class="label">Loading...</p>
		<div class="bar">
			<div class="fill"></div>
		</div>
	</div>
{/if}

<style>
	.splash {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: var(--echo-green);
		display: grid;
		place-content: center;
		justify-items: center;
		gap: 10px;
		transition: opacity 350ms ease 150ms;
	}

	/* visibility, not just opacity: a transparent element stays in the
	   accessibility tree, which left a permanent "Loading" status for screen
	   readers to find. Delayed past the fade so the transition still plays. */
	:global(html[data-splashed='true']) .splash,
	.splash.done {
		opacity: 0;
		pointer-events: none;
		visibility: hidden;
		transition:
			opacity 350ms ease 150ms,
			visibility 0s linear 500ms;
	}

	.label {
		font-size: 20px;
		font-weight: 700;
		color: var(--void);
	}

	.bar {
		width: 121px;
		height: 26px;
		border-radius: 6px;
		background: var(--void);
		padding: 4px;
	}

	/* Discrete retro blocks: a repeating gradient revealed by a width animation
	   quantized with steps() */
	.fill {
		height: 100%;
		width: 100%;
		background: repeating-linear-gradient(
			to right,
			var(--sandbox) 0 10.5px,
			transparent 10.5px 14.125px
		);
		animation: fill 1.8s steps(8, jump-start) both;
	}

	@keyframes fill {
		from {
			clip-path: inset(0 100% 0 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.fill {
			animation: none;
		}
	}
</style>
