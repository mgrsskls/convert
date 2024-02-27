<script>
	import { fade } from 'svelte/transition';

	let copied = false;

	export let value;

	function copy() {
		navigator.clipboard.writeText(value).then(
			function () {
				copied = true;

				setTimeout(() => {
					copied = false;
				}, 1000);
			},
			function (err) {
				console.error('Async: Could not copy text: ', err);
			}
		);
	}
</script>

<span class="Copy">
	<button aria-label="Copy the value to clipboard" type="button" on:click={copy}>
		{@html value}
		<svg
			class:is-copied={copied}
			focusable="false"
			aria-hidden="true"
			class="Copy-icon"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 469.3 469.3"
			><path d="M330.7 0h-256C51 0 32 19 32 42.7v298.6h42.7V42.7h256V0z" /><path
				d="M394.7 85.3H160c-23.6 0-42.7 19.1-42.7 42.7v298.7c0 23.5 19.1 42.6 42.7 42.6h234.7c23.5 0 42.6-19 42.6-42.6V128c0-23.6-19-42.7-42.6-42.7zm0 341.4H160V128h234.7v298.7z"
			/></svg
		>
	</button>

	{#if copied}
		<span
			class="Tooltip"
			in:fade|global={{ delay: 0, duration: 100 }}
			out:fade|global={{ delay: 0, duration: 500 }}>Copied!</span
		>
	{/if}
</span>

<style>
	@keyframes copied {
		0% {
			transform: rotate(0);
		}

		20% {
			transform: rotate(-25deg);
		}

		100% {
			transform: rotate(0);
		}
	}

	.Copy {
		width: fit-content;
		position: relative;
	}

	button {
		text-align: start;
		cursor: pointer;
		position: relative;
	}

	.Copy-icon {
		width: var(--icon-size);
		height: var(--icon-size);
		transform: translateY(0.25rem);
		fill: var(--color-copy-light);
		margin-inline-start: 0.25em;
	}

	.Copy-icon path {
		transition: 0.1s opacity ease;
		transform-origin: center;
	}

	.Copy-icon.is-copied path {
		animation: copied 0.5s ease;
	}

	.Tooltip {
		--bg-color: var(--button-color-bg);

		position: absolute;
		inset-inline-start: -0.2em;
		inset-block-end: calc(100% + 0.5em);
		background: var(--bg-color);
		color: var(--button-color-copy);
		font-size: 1.2rem;
		font-weight: normal;
		padding: 0.25em 0.5em;
		border-radius: var(--box-border-radius);
		font-family: var(--font-family);
	}

	.Tooltip::after {
		width: 0;
		height: 0;
		content: '';
		display: block;
		border: 0.25em solid transparent;
		border-block-start-color: var(--bg-color);
		position: absolute;
		inset-block-start: 100%;
	}

	@media (max-width: 48em) {
		.Copy {
			--icon-size: 0.75em;
		}
	}

	@media (min-width: 48.0625em) {
		.Copy {
			--icon-size: 1em;
		}
	}

	@media (pointer: fine) {
		.Copy-icon {
			opacity: 0;
			transition: 0.1s opacity ease;
		}

		button:where(:hover, :focus-visible) .Copy-icon {
			opacity: 1;
		}
	}
</style>
