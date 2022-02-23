<script lang="ts">
	export let label: string;
	export let result: string;
	export let raw = null;
	export let wrap = false;
	export let highlight = false;

	import Copy from "$lib/components/copy.svelte";
</script>

<dl>
	<dt>{label}</dt>
	<dd class="Result" class:is-highlighted={highlight && result != "-"} class:can-wrap={wrap}>
		{#if result != "-"}
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

	.can-wrap {
		word-wrap: anywhere;
	}

	.Result-raw {
		font-size: 0.875em;
		font-weight: normal;
	}
</style>
