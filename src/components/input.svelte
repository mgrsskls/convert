<script>
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let id;
	export let label;
	export let type = "text";
	export let value = "";
	export let readonly;
	export let tabindex;
	export let placeholder;
	export let list;
	export let step;
	export let hasResetButton;
	export let resetButtonIsVisible;
	export let toggleLabel;
	export let viaSlot;
</script>

<div class="Input">
	<label class="Input-label" for={id}>
		{label}
		<slot />
	</label>

	{#if !viaSlot}
		<input
			class="Input-element"
			{type}
			{readonly}
			{id}
			{value}
			{tabindex}
			{placeholder}
			{step}
			{list}
			on:input={(e) => dispatch("input", e.target.value)}
			on:focus
		/>
	{/if}

	{#if hasResetButton}
		<label class="Input-toggle">
			<input type="checkbox" checked={!resetButtonIsVisible} on:change />
			{toggleLabel}
		</label>
	{/if}
</div>

<style>
	.Input {
		flex: 1 1 20rem;
	}

	.Input-label {
		display: block;
		margin-block-end: 1rem;
		font-weight: 800;
		color: var(--color-accent);
	}

	.Input-element {
		padding-block-end: 0.4rem;
		width: 100%;
		box-sizing: border-box;
		background: var(--color-box-bg);
	}

	.Input-element:not([readonly]) {
		border-block-end: 0.2rem solid currentColor;
	}

	.Input-element[type="datetime-local"] {
		cursor: text;
	}

	.Input-element[readonly]::-webkit-outer-spin-button,
	.Input-element[readonly]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.Input-element[readonly][type="number"],
	.Input-element[readonly][type="datetime-local"] {
		-moz-appearance: textfield;
	}

	.Input-element[readonly][tabindex="-1"] {
		outline: none;
	}
	.Input-toggle {
		display: block;
		margin-block-start: 1rem;
		font-size: 0.875em;
	}

	input[type="checkbox"] {
		margin: 0;
	}

	::placeholder {
		color: inherit;
		opacity: 0.5;
	}
</style>
