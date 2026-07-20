<script lang="ts">
	// Custom scrollbar per the Figma work/play frames: paper track with ink
	// border, echo-green thumb, ink arrow buttons at both ends (all of which
	// invert with the theme). Drives (and follows) an external scroll container.
	let { target }: { target: HTMLElement | undefined } = $props();

	let track: HTMLElement;
	let thumbTop = $state(0);
	let thumbHeight = $state(40);
	let scrollable = $state(false);
	let atTop = $state(true);
	let atBottom = $state(false);

	function update() {
		if (!target || !track) return;
		const { scrollTop, scrollHeight, clientHeight } = target;
		scrollable = scrollHeight > clientHeight + 1;
		const trackH = track.clientHeight;
		const h = Math.max(30, (clientHeight / scrollHeight) * trackH);
		thumbHeight = h;
		const maxScroll = scrollHeight - clientHeight;
		thumbTop = maxScroll > 0 ? (scrollTop / maxScroll) * (trackH - h) : 0;
		atTop = scrollTop <= 1;
		atBottom = scrollTop >= maxScroll - 1;
	}

	$effect(() => {
		if (!target) return;
		update();
		target.addEventListener('scroll', update, { passive: true });
		const ro = new ResizeObserver(update);
		ro.observe(target);
		return () => {
			target?.removeEventListener('scroll', update);
			ro.disconnect();
		};
	});

	function step(dir: 1 | -1) {
		target?.scrollBy({ top: dir * 130, behavior: 'smooth' });
	}

	function onThumbDown(e: PointerEvent) {
		e.preventDefault();
		if (!target) return;
		const startY = e.clientY;
		const startScroll = target.scrollTop;
		const maxScroll = target.scrollHeight - target.clientHeight;
		const range = track.clientHeight - thumbHeight;

		function move(ev: PointerEvent) {
			if (!target || range <= 0) return;
			target.scrollTop = startScroll + ((ev.clientY - startY) / range) * maxScroll;
		}
		function up() {
			window.removeEventListener('pointermove', move);
			window.removeEventListener('pointerup', up);
		}
		window.addEventListener('pointermove', move);
		window.addEventListener('pointerup', up);
	}

	function onTrackDown(e: PointerEvent) {
		if (!target || e.target !== track) return;
		const rect = track.getBoundingClientRect();
		const ratio = (e.clientY - rect.top - thumbHeight / 2) / (track.clientHeight - thumbHeight);
		target.scrollTop = ratio * (target.scrollHeight - target.clientHeight);
	}
</script>

<!-- Redundant visual control: the region it drives scrolls natively for
     keyboard and assistive tech, so the whole widget is hidden from the
     accessibility tree and removed from tab order. -->
<div class="scrollbar" class:disabled={!scrollable} aria-hidden="true">
	<button class="end up" tabindex="-1" aria-label="Scroll up" disabled={atTop} onclick={() => step(-1)}>
		<svg viewBox="0 0 11.8239 16.2886">
			<path
				d="M0.421875 12.2304V4.38499C0.421875 2.58773 2.4803 1.56825 3.9099 2.65746L9.40172 6.84171C10.5881 7.74562 10.5312 9.54895 9.29021 10.3763L3.79839 14.0375C2.3551 14.9997 0.421875 13.9651 0.421875 12.2304Z"
				stroke-width="0.84375"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="track" bind:this={track} onpointerdown={onTrackDown}>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="thumb"
			style:top="{thumbTop}px"
			style:height="{thumbHeight}px"
			onpointerdown={onThumbDown}
		></div>
	</div>
	<button class="end down" tabindex="-1" aria-label="Scroll down" disabled={atBottom} onclick={() => step(1)}>
		<svg viewBox="0 0 11.8239 16.2886">
			<path
				d="M0.421875 12.2304V4.38499C0.421875 2.58773 2.4803 1.56825 3.9099 2.65746L9.40172 6.84171C10.5881 7.74562 10.5312 9.54895 9.29021 10.3763L3.79839 14.0375C2.3551 14.9997 0.421875 13.9651 0.421875 12.2304Z"
				stroke-width="0.84375"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
</div>

<style>
	/* Theme-inverting per the Figma dark-mode slider: paper track and ink
	   buttons in light mode, ink track and paper buttons in dark mode */
	.scrollbar {
		display: flex;
		flex-direction: column;
		background: var(--paper);
		border: 1.5px solid var(--ink);
		border-radius: 5px;
		overflow: hidden;
		user-select: none;
		transition:
			background-color 240ms ease,
			border-color 240ms ease;
	}

	.scrollbar.disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.end {
		flex-shrink: 0;
		aspect-ratio: 1;
		background: var(--ink);
		display: grid;
		place-items: center;
		cursor: pointer;
		transition: background-color 240ms ease;
	}

	/* The glyph is the brand's rounded arrow (drawn pointing right in the
	   Figma asset), rotated to point up/down */
	.end svg {
		width: 44%;
		height: auto;
	}

	.end.up svg {
		rotate: -90deg;
	}

	.end.down svg {
		rotate: 90deg;
	}

	.end svg path {
		fill: var(--paper);
		stroke: var(--paper);
		transition:
			fill 150ms ease,
			stroke 150ms ease,
			stroke-opacity 150ms ease;
	}

	/* Nothing further that way: the fill melts into the button face and only
	   a 30% outline remains, per the Figma slider sheet */
	.end:disabled {
		cursor: default;
	}

	.end:disabled svg path {
		fill: var(--ink);
		stroke-opacity: 0.3;
	}

	.track {
		flex: 1;
		position: relative;
		cursor: pointer;
	}

	.thumb {
		position: absolute;
		left: -1.5px;
		right: -1.5px;
		background: var(--echo-green);
		border: 1.5px solid var(--ink);
		cursor: grab;
		transition: border-color 240ms ease;
	}

	.thumb:active {
		cursor: grabbing;
	}
</style>
