<script lang="ts">
	import i18n from "$lib/i18n.js";
	import Box from "./box.svelte";
	import Divider from "./divider.svelte";

	export let action = "";
	export let flex1 = "";
	export let flex2 = "";
</script>

<div class="FromTo">
	<form
		{action}
		class="FromTo-form"
		style:--flex-1={flex1}
		style:--flex-2={flex2}
		on:submit|preventDefault
	>
		<Box tag="fieldset" title={i18n.from}>
			<slot name="from" />
		</Box>
		<Divider>
			<slot name="divider" />
		</Divider>
		<Box tag="fieldset" title={i18n.to}>
			<slot name="to" />
		</Box>
	</form>
	<div class="FromTo-supported">
		<slot name="support" />
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
