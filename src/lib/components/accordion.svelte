<script>
	export let open = false;
</script>

<details {open}>
	<summary on:click={(e) => e.target.scrollIntoView()}><slot name="title" /></summary>
	<slot name="content" />
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

		cursor: default;
		font-size: var(--font-size);
		font-weight: 800;
		line-height: 1;
		padding-block: 2rem;
		scroll-margin-block-start: 9rem;
	}

	summary::marker {
		color: var(--color-accent);
	}

	:global(details[open] summary + *) {
		padding-block: 2rem 4rem;
	}
</style>
