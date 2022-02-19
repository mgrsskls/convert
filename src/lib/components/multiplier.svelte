<script>
	export let value;
</script>

<div class="Multiplier">
	&times; {value}
</div>

<style>
	.Multiplier {
		font-weight: 800;
		line-height: 1;
	}

	@media (max-width: 56em) {
		.Multiplier {
			font-size: 2.4rem;
		}
	}

	@media (min-width: 56.0625em) {
		.Multiplier {
			font-size: 3.2rem;
			word-wrap: anywhere;
		}
	}
</style>
