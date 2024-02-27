<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import i18n from '$lib/i18n.js';

	const dispatch = createEventDispatcher();

	let renderReset = false;

	/** @type {string} */
	export let id;
	/** @type {string} */
	export let label;
	export let type = 'text';
	/** @type {string} */
	export let value;
	/** @type {string} */
	export let placeholder;
	export let list = null;
	/** @type {number|null} */
	export let step = null;
	export let hasResetButton = false;
	export let resetButtonIsVisible = false;
	/** @type {string|null} */
	export let toggleLabel = null;
	export let viaSlot = false;
	export let options = null;
	export let invalid = false;
	export let name = null;
	export let inputmode = null;
	export let required = true;

	/**
	 * @param {Event} e
	 */
	function onInput(e) {
		const target = e.target;

		if (target) {
			dispatch('input', type === 'number' ? parseFloat(target.value) : target.value);
		}
	}

	function onChange(e) {
		const target = e.target;
		dispatch('change', type === 'number' ? parseFloat(target.value) : target.value);
	}

	function onReset(e) {
		const target = e.target;
		dispatch('toggleReset', target.checked);
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
					name={name || id}
					{required}
					class="Input-element"
					{id}
					aria-invalid={invalid}
					on:change={onChange}
				>
					<option value="" disabled hidden>Please choose</option>
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
					name={name || id}
					{inputmode}
					{required}
					aria-invalid={invalid}
					on:input={onInput}
					on:change={onChange}
					on:focus
				/>
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
		display: inline-block;
		margin-block-end: 1rem;
		font-weight: 800;
		color: var(--color-accent);
	}

	.Input-container {
		position: relative;
	}

	.Input-element {
		display: block;
		height: 3.6rem;
	}

	select.Input-element {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath d='M21 5.8c.5-.5 1.1-.7 1.8-.5.6.2 1 .6 1.1 1.1l.1.3V7c-.1.6-.4 1-.8 1.3l-10 10c-.3.3-.7.5-1.2.5a2 2 0 0 1-1.2-.5L.5 8.2l-.5-1v-.5c.1-.4.3-.8.6-1.1.6-.5 1.5-.5 2.1 0l.3.3 9 8.7'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-size: auto 50%;
		background-position: center right;
	}

	.Input-element:where(:not([type='color'])) {
		padding-block-end: 0.4rem;
		inline-size: 100%;
		box-sizing: border-box;
		background: var(--color-box-bg);
		border-block-end: 0.2rem solid currentColor;
	}

	.Input-element[aria-invalid='true'] {
		border-block-end-color: var(--color-invalid-bg);
	}

	.Input-element[type='datetime-local'] {
		cursor: text;
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

	input[type='checkbox'] {
		margin: 0;
	}

	::placeholder {
		color: inherit;
		opacity: 0.5;
	}
</style>
