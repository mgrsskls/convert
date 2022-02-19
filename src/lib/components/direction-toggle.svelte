<script>
	import i18n from "$lib/i18n.js";
</script>

<button type="button" class="ToggleDirection" on:click
	>{i18n.changeDirection}
	<span class="ToggleDirection-arrow ToggleDirection-arrow--horizontal" aria-hidden="true">⇄</span>
	<span class="ToggleDirection-arrow ToggleDirection-arrow--vertical" aria-hidden="true">⇅</span>
</button>

<style>
	.ToggleDirection {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.ToggleDirection:hover {
		cursor: pointer;
	}

	@media (max-width: 56em) {
		.ToggleDirection-arrow--horizontal {
			display: none;
		}
	}

	@media (min-width: 56.0625em) {
		.ToggleDirection {
			margin-block-start: 2rem;
		}

		.ToggleDirection-arrow--vertical {
			display: none;
		}
	}
</style>
