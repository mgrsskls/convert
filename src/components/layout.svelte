<script>
	import Header from "../components/header.svelte";
	import Introduction from "../components/introduction.svelte";
	import Footer from "../components/footer.svelte";

	export let alias;
	export let title;
	export let description;
</script>

<svelte:head>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<Header {title} current={alias} />
<main id="main">
	{#if title || description}
		<Introduction {title} copy={description} />
	{/if}
	<slot />
</main>
<Footer />

<style>
	@import "../css/index.css";

	:global(html) {
		height: 100%;
	}

	:global(body) {
		min-height: 100%;
	}

	:global(body) {
		display: flex;
		flex-direction: column;
	}

	main {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: clamp(2rem, 5vh, 8rem) var(--spacing-x);
	}
</style>
