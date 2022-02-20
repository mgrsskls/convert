<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
	import i18n from "$lib/i18n.js";

	const dispatch = createEventDispatcher();

	let renderReset = false;

	interface Option {
		label: string;
		value: string;
	}

	export let id: string;
	export let label: string;
	export let type = "text";
	export let value: string | number = "";
	export let placeholder: string | null = null;
	export let list: string | null = null;
	export let step: number | null = null;
	export let hasResetButton = false;
	export let resetButtonIsVisible = false;
	export let toggleLabel: string | null = null;
	export let viaSlot = false;
	export let suggestion: string | null = null;
	export let loading = false;
	export let options: Array<Option> | null = null;
	export let invalid = false;
	export let name = "";
	export let inputmode = "";

	function onInput(e: Event) {
		const target = e.target as HTMLInputElement;
		dispatch("input", type === "number" ? parseFloat(target.value) : target.value);
	}

	function onChange(e: Event) {
		const target = e.target as HTMLInputElement;
		dispatch("change", type === "number" ? parseFloat(target.value) : target.value);
	}

	function onReset(e: Event) {
		const target = e.target as HTMLInputElement;
		dispatch("toggleReset", target.checked);
	}

	function onKeydown(e: KeyboardEvent) {
		const target = e.target as HTMLInputElement;
		if (e.key === "ArrowDown" && suggestion) {
			const suggestionInput = target
				.closest(".Input")
				.querySelector(".Input-suggestion") as HTMLInputElement;
			suggestionInput.focus();
		}
	}

	onMount(() => {
		renderReset = true;
	});
</script>

<div class="Input">
	<div class="Input-container">
		<label class="Input-label" for={!viaSlot ? id : null}>
			{label}
			<slot />
		</label>
		{#if !viaSlot}
			{#if options}
				<select
					{name}
					required
					class="Input-element"
					{id}
					aria-invalid={invalid}
					on:change={onChange}
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
					{id}
					{value}
					{placeholder}
					{step}
					{list}
					{name}
					{inputmode}
					required
					aria-invalid={invalid}
					on:input={onInput}
					on:change={onChange}
					on:focus
					on:keydown={onKeydown}
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

	{#if hasResetButton && renderReset}
		<label class="Input-toggle">
			<input type="checkbox" checked={!resetButtonIsVisible} on:change={onReset} />
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
		border-block-end: 0.2rem solid currentColor;
	}

	.Input-element[aria-invalid="true"] {
		border-block-end-color: var(--color-invalid-bg);
	}

	.Input-element[type="datetime-local"] {
		cursor: text;
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
		display: block;
		width: fit-content;
		font-size: 0.75em;
		background: var(--color-invalid-bg);
		color: var(--color-invalid-copy);
		padding: 0.2em 0.4em;
		font-weight: 800;
		border-radius: 0 0 var(--box-border-radius) var(--box-border-radius);
	}

	input[type="checkbox"] {
		margin: 0;
	}

	::placeholder {
		color: inherit;
		opacity: 0.5;
	}
</style>
