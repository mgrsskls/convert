<script>
	export let label;
	export let result = "";
</script>

<dl>
	<dt>{label}</dt>
	<dd>{result}</dd>
</dl>

<style>
	dt {
		margin-block-end: 1rem;
		font-weight: 800;
		color: var(--color-accent);
	}

	dd {
		font-weight: 700;
	}
</style>
