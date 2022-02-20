<script>
	export let value;
</script>

<div class="Multiplier" class:is-large={value.toString().length > 8}>
	&times; {value}
</div>

<style>
	.Multiplier {
		font-weight: 800;
		line-height: 1;
	}

	@media (max-width: 56em) {
		.Multiplier:not(.is-large) {
			font-size: 2.4rem;
		}

		.Multiplier.is-large {
			font-size: 2rem;
		}
	}

	@media (min-width: 56.0625em) {
		.Multiplier {
			word-wrap: anywhere;
		}

		.Multiplier:not(.is-large) {
			font-size: 3.2rem;
		}

		.Multiplier.is-large {
			font-size: 2.4rem;
		}
	}
</style>
