<script>
	let { tag, title, children } = $props();
</script>

{#if tag === 'fieldset'}
	<fieldset class="Box">
		<legend class="Box-title">{title}</legend>
		<div class="Box-inner">
			{@render children?.()}
		</div>
	</fieldset>
{:else}
	<div class="Box">
		<div class="Box-title">
			{@html title}
		</div>
		{@render children?.()}
	</div>
{/if}

<style>
	.Box {
		background: var(--color-box-bg);
		padding: var(--spacing-x);
		border: var(--contrast-border);
		border-radius: var(--box-border-radius);
	}

	.Box-title {
		font-size: clamp(2.4rem, 3vw, 3.2rem);
		font-weight: 800;
		float: left;
		margin-block-end: 2rem;
	}

	.Box-inner {
		clear: left;
	}

	@media (max-width: 38em) and (max-height: 50em) {
		.Box-inner {
			gap: calc(2 * var(--spacing-y));
		}
	}
</style>
