<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [id]
	 * @property {boolean} [open]
	 * @property {import('svelte').Snippet} [title]
	 * @property {import('svelte').Snippet} [content]
	 */

	/** @type {Props} */
	let { id = '', open = false, title, content } = $props();

	function onSummaryClick(e) {
		const target = e.target;
		target.scrollIntoView();
	}
</script>

<details {id} {open}>
	<summary onclick={onSummaryClick}>{@render title?.()}</summary>
	{@render content?.()}
</details>

<style>
	details {
		--border: 0.1rem solid var(--color-accent-light);

		border-block-start: var(--border);
	}

	details:last-of-type {
		border-block-end: var(--border);
	}

	summary {
		--font-size: clamp(1.6rem, 2vw, 2.2rem);

		font-size: var(--font-size);
		font-weight: 800;
		line-height: 1.2;
		padding-block: 2rem;
	}

	summary::marker {
		color: var(--color-accent);
	}

	summary :global(span) {
		font-weight: normal;
	}

	details[open] summary + :global(*) {
		padding-block: 2rem 4rem;
	}

	@media (max-width: 32em) {
		details {
			scroll-margin-block-start: -0.1rem;
		}
	}

	@media (min-width: 32.0625em) {
		details {
			scroll-margin-block-start: 9rem;
		}
	}
</style>
