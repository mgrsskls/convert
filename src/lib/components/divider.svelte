<div class="Divider">
	<slot />
	<span class="Divider-arrow Divider-arrow--right" aria-hidden="true">→</span>
	<span class="Divider-arrow Divider-arrow--down" aria-hidden="true">↓</span>
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

	@media (max-width: 56em) {
		.Divider {
			flex-direction: row-reverse;
			gap: 2rem;
		}

		.Divider-arrow {
			font-size: 4rem;
		}

		.Divider-arrow--right {
			display: none;
		}
	}

	@media (min-width: 56.0625em) {
		.Divider {
			inline-size: 16em;
			flex-direction: column-reverse;
		}

		.Divider-arrow {
			font-size: 8rem;
		}

		.Divider-arrow--down {
			display: none;
		}
	}
</style>
