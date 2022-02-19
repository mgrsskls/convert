<script lang="ts">
	export let title: string;
	export let description: string | null;
</script>

<div class="Introduction">
	<h2>{title}</h2>
	{#if description}
		<p>{@html description}</p>
	{/if}
</div>

<style>
	.Introduction {
		align-items: flex-end;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-block-end: 4rem;
		gap: 2rem;
	}

	h2 {
		font-size: clamp(3.2rem, 4vw, 4.8rem);
		line-height: 1;
		font-weight: 800;
	}

	p {
		color: var(--color-copy-light);
	}
</style>
