<script>
	import i18n from '$lib/i18n.js';
	import Box from './box.svelte';
	import Divider from './divider.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {any} [action]
	 * @property {string} [flex1]
	 * @property {string} [flex2]
	 * @property {import('svelte').Snippet} [from]
	 * @property {import('svelte').Snippet} [divider]
	 * @property {import('svelte').Snippet} [to]
	 * @property {import('svelte').Snippet} [support]
	 */

	/** @type {Props} */
	let { action = null, flex1 = '', flex2 = '', from, divider, to, support } = $props();
</script>

<div class="FromTo">
	<form {action} class="FromTo-form" style:--flex-1={flex1} style:--flex-2={flex2}>
		<Box tag="fieldset" title={i18n.from}>
			{@render from?.()}
		</Box>
		<Divider>
			{@render divider?.()}
		</Divider>
		<Box tag="fieldset" title={i18n.to}>
			{@render to?.()}
		</Box>
	</form>
	<div class="FromTo-supported">
		{@render support?.()}
	</div>
</div>

<style>
	.FromTo-form {
		display: flex;
	}

	.FromTo-supported {
		margin-inline: calc(var(--spacing-x) / 2);
	}

	@media (max-width: 56em) {
		.FromTo-form {
			flex-direction: column;
			gap: var(--spacing-y);
		}
	}

	@media (min-width: 56.0625em) {
		.FromTo-form {
			gap: 2rem;
		}

		.FromTo-form > :global(:nth-child(1)) {
			flex: var(--flex-1, 1 1 20rem);
		}

		.FromTo-form > :global(:nth-child(3)) {
			flex: var(--flex-2, 1 1 20rem);
		}
	}
</style>
