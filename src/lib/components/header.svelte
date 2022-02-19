<script>
	import i18n from "$lib/i18n.js";
	import Menu from "./menu.svelte";

	export let title;
	export let current;
</script>

<svelte:head>
	<title>{title ? `${title} — ${i18n.title}` : i18n.title}</title>
</svelte:head>

<header>
	<a class="SkipLink" href="#main">{i18n.skipToContent}</a>
	<h1>
		<a href="/" aria-current={!current ? "page" : "false"}>{i18n.title}</a>
	</h1>
	<Menu {current} />
</header>

<style>
	header {
		position: sticky;
		inset-block-start: 0;
		background: var(--color-bg);
		z-index: 1;
		display: flex;
		flex-wrap: wrap;
	}

	h1 {
		align-items: center;
		display: flex;
	}

	h1::after {
		content: "→";
	}
	a {
		display: block;
		padding: var(--spacing-y) var(--spacing-x);
		font-weight: 800;
		text-decoration: none;
	}

	a:focus-visible {
		outline-offset: -0.2rem;
	}

	.SkipLink {
		position: absolute;
		inset-block-start: 0;
		inset-inline-start: 50%;
		transform: translateX(-50%);
	}

	.SkipLink:not(:focus) {
		border: 0 !important;
		clip: rect(0 0 0 0) !important;
		clip-path: inset(100%) !important;
		height: 1px !important;
		margin: -1px !important;
		overflow: hidden !important;
		padding: 0 !important;
		width: 1px !important;
	}
</style>
