<script>
	import { createEventDispatcher } from "svelte";
	import i18n from "$lib/i18n.js";

	const dispatch = createEventDispatcher();

	export let id;
	export let label;
	export let type = "text";
	export let value = "";
	export let readonly;
	export let placeholder;
	export let list;
	export let step;
	export let hasResetButton;
	export let resetButtonIsVisible;
	export let toggleLabel;
	export let viaSlot;
	export let suggestion;
	export let loading;
	export let options;
	export let invalid = false;
</script>

<div class="Input">
	<div class="Input-container">
		<label class="Input-label" for={id}>
			{label}
			<slot />
		</label>
		{#if !viaSlot}
			{#if options}
				<select
					class="Input-element"
					{id}
					aria-invalid={invalid}
					on:change={(e) => dispatch("change", e.target.value)}
				>
					<option value="">Please choose</option>
					{#each options as option}
						<option value={option.value} selected={value === option.value}>{option.label}</option>
					{/each}
				</select>
			{:else}
				<input
					class="Input-element"
					{type}
					{readonly}
					{id}
					{value}
					{placeholder}
					{step}
					{list}
					aria-invalid={invalid}
					on:input={(e) =>
						dispatch("input", type === "number" ? parseFloat(e.target.value) : e.target.value)}
					on:change={(e) =>
						dispatch("change", type === "number" ? parseFloat(e.target.value) : e.target.value)}
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
		{/if}

		{#if invalid}
			<span class="Input-error">{i18n.invalid}</span>
		{/if}
	</div>

	{#if hasResetButton}
		<label class="Input-toggle">
			<input
				type="checkbox"
				checked={!resetButtonIsVisible}
				on:change={(e) => {
					dispatch("toggleReset", e.target.checked);
				}}
			/>
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
		inline-size: 100%;
		box-sizing: border-box;
		background: var(--color-box-bg);
	}

	.Input-element[aria-invalid="true"] {
		border-block-end-color: var(--color-invalid);
	}

	:where(.Input-element:not([readonly])) {
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

	.Input-suggestion,
	.Input-loading {
		position: absolute;
		inset-block-start: 100%;
		inset-inline-start: 0;
		background: var(--color-bg);
		padding: 0.5em;
		display: block;
		inline-size: 100%;
		text-align: start;
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

	.Input-error {
		position: absolute;
		inset-block-start: 0;
		inset-inline-end: 0;
		font-size: 0.75em;
		background: var(--color-invalid);
		color: var(--color-bg);
		padding: 0.2em 0.4em;
		font-weight: 800;
		border-radius: var(--box-border-radius);
	}

	input[type="checkbox"] {
		margin: 0;
	}

	::placeholder {
		color: inherit;
		opacity: 0.5;
	}
</style>