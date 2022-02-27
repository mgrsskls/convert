<div class="Grid">
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
		flex-wrap: wrap;
	}

	.Grid-item {
		flex: 1 1 20rem;
	}
</style>
