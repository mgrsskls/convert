<script lang="ts">
	export let id = "";
	export let open = false;

	function onSummaryClick(e: Event) {
		const target = e.target as HTMLElement;
		target.scrollIntoView();
	}
</script>

<details {id} {open}>
	<summary on:click={onSummaryClick}><slot name="title" /></summary>
	<slot name="content" />
</details>

<style>
	details {
		--border: 0.1rem solid var(--color-accent-light);

		border-block-start: var(--border);
		scroll-margin-block-start: 9rem;
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

	details[open] summary + :global(*) {
		padding-block: 2rem 4rem;
	}
</style>
