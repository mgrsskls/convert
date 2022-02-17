<div class="Grid">
	<slot name="1" />
	<slot name="2" />
</div>

<style>
	.Grid {
		display: flex;
		flex-wrap: wrap;
		gap: calc(2 * var(--spacing-y));
	}
</style>
