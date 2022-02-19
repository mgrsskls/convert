<script>
	export let label;
	export let result = "";
	export let wrap = false;
</script>

<dl>
	<dt>{label}</dt>
	<dd class="Result" class:can-wrap={wrap}>{@html result}</dd>
</dl>

<style>
	dt {
		margin-block-end: 1rem;
		font-weight: 800;
		color: var(--color-accent);
	}

	.Result {
		font-weight: 700;
	}

	.Result.can-wrap {
		word-wrap: anywhere;
	}

	:global(.Result small) {
		font-weight: normal;
	}
</style>
