<script lang="ts">
	export let wrapSize = "20rem";
</script>

<div class="Grid" style:--wrap-size={wrapSize}>
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
		flex: 1 1 var(--wrap-size);
	}
</style>
