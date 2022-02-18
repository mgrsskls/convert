<script>
	import i18n from "../i18n.js";
	import Header from "../components/header.svelte";
	import Introduction from "../components/introduction.svelte";
	import Footer from "../components/footer.svelte";

	export let alias;
	export let title;
	export let description;

	const metaDescription = (description || i18n.description).replace(/<[^>]*>?/gm, "");
</script>

<svelte:head>
	<meta name="description" content={metaDescription} />
</svelte:head>

<Header {title} current={alias} />
<main id="main">
	{#if title || description}
		<Introduction {title} {description} />
	{/if}
	<slot />
</main>
<Footer />

<style>
	@import "../css/index.css";

	:global(html) {
		block-size: 100%;
	}

	:global(body) {
		min-block-size: 100%;
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
