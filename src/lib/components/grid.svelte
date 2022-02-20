<script>
	export let wrap = true;
</script>

<div class="Grid" class:Grid--wrap={wrap}>
	<div class="Grid-item">
		<slot name="1" />
	</div>
	<div class="Grid-item">
		<slot name="2" />
	</div>
</div>

<style>
	.Grid {
		display: flex;
		gap: calc(2 * var(--spacing-y));
	}

	.Grid--wrap {
		flex-wrap: wrap;
	}

	.Grid-item {
		flex: 1 1 20rem;
	}
</style>
