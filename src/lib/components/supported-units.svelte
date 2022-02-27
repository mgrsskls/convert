<script lang="ts">
	import i18n from "$lib/i18n.js";

	export let title: string;
	export let supported: Array<string>;
	export let unsupported: Array<string> = [];
	export let block = false;
</script>

<div class="SupportedUnits">
	<details>
		<summary class="SupportedUnits-title">{i18n.supported.replace("{{title}}", title)}</summary>
		<ul class="SupportedUnits-list" class:SupportedUnits-list--block={block}>
			{#each supported as unit}
				<li class="SupportedUnits-entry">{@html unit}</li>
			{/each}
		</ul>
	</details>
	{#if unsupported.length > 0}
		<details>
			<summary class="SupportedUnits-title">{i18n.unsupported.replace("{{title}}", title)}</summary>
			<ul class="SupportedUnits-list" class:SupportedUnits-list--block={block}>
				{#each unsupported as unit}
					<li class="SupportedUnits-entry">{@html unit}</li>
				{/each}
			</ul>
		</details>
	{/if}
</div>

<style>
	.SupportedUnits {
		color: var(--color-copy-light);
		font-size: 0.75em;
		margin-block-start: 2rem;
	}

	.SupportedUnits-title {
		color: var(--color-accent);
		font-weight: bold;
		width: fit-content;
	}

	.SupportedUnits-list {
		display: flex;
		flex-wrap: wrap;
		margin-block-start: 0.5em;
		margin-inline-start: 0.75em;
	}

	.SupportedUnits-list--block {
		display: block;
	}

	details + details {
		margin-block-start: 0.5em;
	}

	.SupportedUnits-entry {
		list-style-type: none;
	}

	.SupportedUnits-list--block .SupportedUnits-entry + .SupportedUnits-entry {
		margin-block-start: 0.5em;
	}

	.SupportedUnits-entry:not(:last-child) {
		padding-inline-end: 0.5ch;
	}

	.SupportedUnits-list:not(.SupportedUnits-list--block)
		.SupportedUnits-entry:not(:last-child)::after {
		content: ",";
	}

	.SupportedUnits :global(code) {
		background: var(--color-box-bg-light);
		padding: 0.1em 0.25em;
		border-radius: 0.3rem;
	}
</style>
