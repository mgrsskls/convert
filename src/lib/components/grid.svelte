<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [one]
	 * @property {import('svelte').Snippet} [two]
	 */

	/** @type {Props} */
	let { one, two } = $props();
</script>

<div class="Grid">
	<div class="Grid-item">
		{@render one?.()}
	</div>
	<div class="Grid-item">
		{@render two?.()}
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
