<script lang="ts">
	export let type = "submit";
	export let label = "Convert";
</script>

<button {type}>{label}</button>

<style>
	button {
		background: var(--button-color-bg);
		color: var(--button-color-copy);
		font-weight: 800;
		padding: 0.5em 1.5em;
		border-radius: 2em;
		margin-block-start: 2rem;
	}
</style>
