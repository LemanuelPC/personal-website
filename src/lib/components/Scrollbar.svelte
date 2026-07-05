<script lang="ts">
	// Custom scrollbar per the Figma work/play frames: sandbox track with ink
	// border, echo-green thumb, dark arrow buttons at both ends. Drives (and
	// follows) an external scroll container.
	let { target }: { target: HTMLElement | undefined } = $props();

	let track: HTMLElement;
	let thumbTop = $state(0);
	let thumbHeight = $state(40);
	let scrollable = $state(false);

	function update() {
		if (!target || !track) return;
		const { scrollTop, scrollHeight, clientHeight } = target;
		scrollable = scrollHeight > clientHeight + 1;
		const trackH = track.clientHeight;
		const h = Math.max(30, (clientHeight / scrollHeight) * trackH);
		thumbHeight = h;
		const maxScroll = scrollHeight - clientHeight;
		thumbTop = maxScroll > 0 ? (scrollTop / maxScroll) * (trackH - h) : 0;
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
	<button class="end up" tabindex="-1" aria-label="Scroll up" onclick={() => step(-1)}>
		<svg viewBox="0 0 12 8"><path d="M6 1.2 L10.8 6.8 L1.2 6.8 Z" /></svg>
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
	<button class="end down" tabindex="-1" aria-label="Scroll down" onclick={() => step(1)}>
		<svg viewBox="0 0 12 8"><path d="M6 6.8 L10.8 1.2 L1.2 1.2 Z" /></svg>
	</button>
</div>

<style>
	.scrollbar {
		display: flex;
		flex-direction: column;
		background: var(--sandbox);
		border: 1.5px solid var(--void);
		border-radius: 5px;
		overflow: hidden;
		user-select: none;
	}

	.scrollbar.disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	.end {
		flex-shrink: 0;
		aspect-ratio: 1;
		background: var(--void);
		display: grid;
		place-items: center;
		cursor: pointer;
	}

	.end svg {
		width: 45%;
		fill: var(--sandbox);
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
		border: 1.5px solid var(--void);
		cursor: grab;
	}

	.thumb:active {
		cursor: grabbing;
	}
</style>
