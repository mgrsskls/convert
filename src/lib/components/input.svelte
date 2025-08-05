<script>
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { onMount } from 'svelte';
	import i18n from '$lib/i18n.js';

	let renderReset = $state(false);

	/**
	 * @typedef {Object} Props
	 * @property {string} id
	 * @property {string} label
	 * @property {string} [type]
	 * @property {string} value
	 * @property {string} placeholder
	 * @property {any} [list]
	 * @property {number|null} [step]
	 * @property {boolean} [hasResetButton]
	 * @property {boolean} [resetButtonIsVisible]
	 * @property {string|null} [toggleLabel]
	 * @property {boolean} [viaSlot]
	 * @property {any} [options]
	 * @property {boolean} [invalid]
	 * @property {any} [name]
	 * @property {any} [inputmode]
	 * @property {boolean} [required]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let {
		id,
		label,
		type = 'text',
		value,
		placeholder,
		list = null,
		step = null,
		hasResetButton = false,
		resetButtonIsVisible = false,
		toggleLabel = null,
		viaSlot = false,
		options = null,
		invalid = false,
		name = null,
		inputmode = null,
		required = true,
		input,
		change,
		toggleReset,
		focus,
		children
	} = $props();

	/**
	 * @param {Event} e
	 */
	function onInput(e) {
		if (typeof input != 'function') return;

		const target = e.target;

		if (target) {
			input(type === 'number' ? parseFloat(target.value) : target.value);
		}
	}

	function onChange(e) {
		if (typeof change != 'function') return;
		const target = e.target;
		change(type === 'number' ? parseFloat(target.value) : target.value);
	}

	function onFocus(e) {
		if (typeof focus != 'function') return;

		focus(e);
	}

	function onReset(e) {
		if (typeof toggleReset != 'function') return;

		const target = e.target;
		toggleReset(target.checked);
	}

	onMount(() => {
		renderReset = true;
	});
</script>

<div class="Input">
	<div class="Input-container">
		<label class="Input-label" for={!viaSlot ? id : null}>
			{label}
			{@render children?.()}
		</label>
		{#if !viaSlot}
			{#if options}
				<select
					name={name || id}
					{required}
					class="Input-element"
					{id}
					aria-invalid={invalid}
					onchange={onChange}
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
					name={name || id}
					{inputmode}
					{required}
					aria-invalid={invalid}
					oninput={onInput}
					onchange={onChange}
					onfocus={onFocus}
				/>
			{/if}
		{/if}

		{#if invalid}
			<span class="Input-error">{i18n.invalid}</span>
		{/if}
	</div>

	{#if hasResetButton && renderReset}
		<label class="Input-toggle">
			<input type="checkbox" checked={!resetButtonIsVisible} onchange={onReset} />
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

	.Input-element:where(:global(:not([type='color']))) {
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
