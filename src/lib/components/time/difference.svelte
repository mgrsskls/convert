<script>
	export let diff;
</script>

<span class="Difference"><span>{diff}</span> hours</span>

<style>
	.Difference {
		text-align: center;
		font-weight: 600;
	}

	.Difference span {
		font-weight: 800;
		line-height: 1;
	}

	@media (max-width: 48em) {
		.Difference span {
			font-size: 3.2rem;
		}
	}

	@media (min-width: 48.0625em) {
		.Difference span {
			display: block;
			font-size: 4.8rem;
		}
	}
</style>
