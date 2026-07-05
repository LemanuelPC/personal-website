<script lang="ts">
	import { browser } from '$app/environment';

	type Theme = 'light' | 'dark';

	let theme = $state<Theme>(
		browser && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
	);

	function toggle() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('theme', theme);
		} catch {
			// storage unavailable (private mode) — theme still applies for this visit
		}
	}
</script>

<button
	class="toggle"
	role="switch"
	aria-checked={theme === 'dark'}
	aria-label="Dark mode"
	onclick={toggle}
>
	<span class="thumb">
		<svg class="sun" viewBox="0 0 16 16" aria-hidden="true">
			<circle cx="8" cy="8" r="8" fill="var(--gold-byte)" />
		</svg>
		<svg class="moon" viewBox="0 0 16 16" aria-hidden="true">
			<mask id="moon-cut">
				<rect width="16" height="16" fill="white" />
				<circle cx="3.2" cy="5.2" r="6.4" fill="black" />
			</mask>
			<circle cx="8" cy="8" r="8" fill="var(--echo-green)" mask="url(#moon-cut)" />
		</svg>
	</span>
</button>

<style>
	.toggle {
		display: inline-block;
		width: 54px;
		height: 24px;
		border: 1.5px solid var(--ink);
		border-radius: 999px;
		background: var(--paper);
		position: relative;
		transition:
			background-color 240ms ease,
			border-color 240ms ease;
	}

	.thumb {
		position: absolute;
		top: 50%;
		left: 4px;
		width: 15px;
		height: 15px;
		translate: 0 -50%;
		transition: translate 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.toggle[aria-checked='true'] .thumb {
		translate: 28px -50%;
	}

	.sun,
	.moon {
		position: absolute;
		inset: 0;
		transition:
			opacity 200ms ease,
			rotate 300ms ease;
	}

	.moon {
		opacity: 0;
		rotate: -90deg;
	}

	.toggle[aria-checked='true'] .sun {
		opacity: 0;
		rotate: 90deg;
	}

	.toggle[aria-checked='true'] .moon {
		opacity: 1;
		rotate: 0deg;
	}
</style>
