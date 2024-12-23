<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="Divider">
	<span class="Divider-arrow Divider-arrow--right" aria-hidden="true">→</span>
	<span class="Divider-arrow Divider-arrow--down" aria-hidden="true">↓</span>
	<div class="Divider-content">
		{@render children?.()}
	</div>
</div>

<style>
	.Divider {
		align-items: center;
		display: flex;
		justify-content: center;
		text-align: center;
		position: relative;
	}

	.Divider-arrow {
		font-weight: 100;
		line-height: 1;
	}

	.Divider-content {
		display: flex;
	}

	@media (max-width: 56em) {
		.Divider {
			gap: 2rem;
		}

		.Divider-arrow {
			font-size: 4rem;
		}

		.Divider-arrow--right {
			display: none;
		}

		.Divider-content {
			align-items: center;
			flex-wrap: wrap;
			gap: 1rem;
			justify-content: center;
		}
	}

	@media (min-width: 56.0625em) {
		.Divider {
			flex-direction: column;
			inline-size: 16em;
		}

		.Divider-arrow {
			font-size: 8rem;
		}

		.Divider-arrow--down {
			display: none;
		}

		.Divider-content {
			align-items: center;
			flex-direction: column;
		}
	}
</style>
