<script>
	export let label;
	export let result;
	export let raw = null;
	export let wrap = false;
	export let highlight = false;
	export let isCode = false;

	import Copy from '$lib/components/copy.svelte';
</script>

<dl>
	<dt>{label}</dt>
	<dd
		class="Result"
		class:is-highlighted={highlight && result != '-'}
		class:can-wrap={wrap}
		class:is-code={isCode}
	>
		{#if result != '-'}
			<Copy value={result} />
			{#if raw}
				<div class="Result-raw"><Copy value={raw} /></div>
			{/if}
		{:else}
			{@html result}
		{/if}
	</dd>
</dl>

<style>
	dt {
		margin-block-end: 0.25em;
		font-weight: 800;
		color: var(--color-accent);
	}

	.Result.is-highlighted {
		font-weight: 800;
	}

	.Result.is-code {
		font-family: Courier;
	}

	.can-wrap {
		word-wrap: anywhere;
	}

	.Result-raw {
		font-size: 0.875em;
		font-weight: normal;
	}
</style>
