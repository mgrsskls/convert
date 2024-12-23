<script>
	import { onMount } from 'svelte';

	/**
	 * @typedef {Object} Props
	 * @property {any} type
	 * @property {string} [label]
	 */

	/** @type {Props} */
	let { type, label = 'Convert' } = $props();

	let renderButton = $state(true);

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
