<script lang="ts">
	import { onMount } from "svelte";

	export let type: "submit" | "button" | "reset" = "submit";
	export let label = "Convert";

	let renderButton = true;

	onMount(() => {
		renderButton = false;
	});
</script>

{#if renderButton}
	<button {type}>{label}</button>
{/if}

<style>
	button {
		background: var(--button-color-bg);
		color: var(--button-color-copy);
		font-weight: 800;
		padding: 0.5em 1.5em;
		border-radius: 2em;
		margin-block-start: 2rem;
	}
</style>
