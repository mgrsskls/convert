<script>
	export let wrap = true;
</script>

<div class="Grid" class:Grid--wrap={wrap}>
	<slot name="1" />
	<slot name="2" />
</div>

<style>
	.Grid {
		display: flex;
		gap: calc(2 * var(--spacing-y));
	}

	.Grid--wrap {
		flex-wrap: wrap;
	}

	.Grid > :global(*) {
		flex: 1 1 20rem;
	}
</style>
