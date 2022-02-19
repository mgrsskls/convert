<script>
	export let label;
	export let result = "";
	export let wrap = false;
	export let highlight = false;
</script>

<dl>
	<dt>{label}</dt>
	<dd class="Result" class:can-wrap={wrap}>
		{#if highlight}
			<b>{@html result}</b>
		{:else}
			{@html result}
		{/if}
	</dd>
</dl>

<style>
	dt {
		margin-block-end: 1rem;
		font-weight: 800;
		color: var(--color-accent);
	}

	.can-wrap {
		word-wrap: anywhere;
	}

	:global(.Result small) {
		font-weight: normal;
	}
</style>
