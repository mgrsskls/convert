<script>
	import { createEventDispatcher } from "svelte";
	import i18n from "../i18n.js";

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
	export let suggestion;
	export let loading;
</script>

<div class="Input">
	<div class="Input-container">
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
				on:keydown={(e) => {
					if (e.key === "ArrowDown" && suggestion) {
						e.target.closest(".Input").querySelector(".Input-suggestion").focus();
					}
				}}
			/>
		{/if}

		{#if suggestion}
			<button
				class="Input-suggestion"
				on:click={() => {
					value = suggestion;
					dispatch("suggestionAccepted", suggestion);
				}}
				type="button">{@html suggestion}</button
			>
		{/if}

		{#if loading}
			<span class="Input-loading">{i18n.loadingSuggestions}</span>
		{/if}
	</div>

	{#if hasResetButton}
		<label class="Input-toggle">
			<input type="checkbox" checked={!resetButtonIsVisible} on:change />
			{toggleLabel}
		</label>
	{/if}
</div>

<style>
	.Input-label {
		display: block;
		margin-block-end: 1rem;
		font-weight: 800;
		color: var(--color-accent);
	}

	.Input-container {
		position: relative;
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

	.Input-suggestion,
	.Input-loading {
		position: absolute;
		top: 100%;
		left: 0;
		background: var(--color-bg);
		padding: 0.5em;
		display: block;
		width: 100%;
		text-align: left;
		font-size: 1.4rem;
		box-sizing: border-box;
		z-index: 1;
	}

	.Input-suggestion {
		cursor: pointer;
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
