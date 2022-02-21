<script lang="ts">
	import i18n from "$lib/i18n.js";

	export let title: string;
	export let supported: Array<string>;
	export let unsupported: Array<string> = [];
</script>

<div class="SupportedUnits">
	<details>
		<summary class="SupportedUnits-title">{i18n.supported.replace("{{title}}", title)}</summary>
		<ul class="SupportedUnits-list">
			{#each supported as unit}
				<li class="SupportedUnits-currency">{@html unit}</li>
			{/each}
		</ul>
	</details>
	{#if unsupported.length > 0}
		<details>
			<summary class="SupportedUnits-title">{i18n.unsupported.replace("{{title}}", title)}</summary>
			<ul class="SupportedUnits-list">
				{#each unsupported as unit}
					<li class="SupportedUnits-currency">{@html unit}</li>
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
	}

	.SupportedUnits-list {
		display: flex;
		flex-wrap: wrap;
		margin-block-start: 0.5em;
		margin-inline-start: 0.75em;
	}

	details + details {
		margin-block-start: 0.5em;
	}

	.SupportedUnits-currency {
		list-style-type: none;
	}

	.SupportedUnits-currency:not(:last-child) {
		padding-inline-end: 0.5ch;
	}

	.SupportedUnits-currency:not(:last-child)::after {
		content: ",";
	}
</style>
