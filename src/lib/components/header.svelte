<script>
	import i18n from '$lib/i18n.js';
	import Menu from './menu.svelte';

	let { title, current } = $props();
</script>

<svelte:head>
	<title>{title && title != 'Convert' ? `${title} — ${i18n.title}` : i18n.title}</title>
</svelte:head>

<header>
	<a class="SkipLink" href="#main">{i18n.skipToContent}</a>
	<h1>
		<a data-sveltekit-reload href="/" aria-current={!current ? 'page' : 'false'}
			><span class="Convert">{i18n.title}</span></a
		>
		{#if title !== 'Convert'}<span class="CurrentPage">{title}</span>{/if}
	</h1>
	<Menu {current} />
</header>

<style>
	header {
		align-items: center;
		display: flex;
		background: var(--color-bg);
		z-index: 1;
		position: sticky;
	}

	h1 {
		align-items: center;
		display: flex;
	}

	a {
		display: block;
		text-decoration: none;
	}

	h1 a {
		padding: var(--spacing-y) 0 var(--spacing-y) var(--spacing-x);
	}

	h1 a::after {
		content: '→';
		padding-inline-start: var(--spacing-x);
	}

	.Convert {
		font-weight: 800;
	}

	a:focus-visible {
		outline-offset: -0.2rem;
	}

	.SkipLink {
		background: var(--color-copy);
		color: var(--color-bg);
		padding: var(--spacing-y) var(--spacing-x);
		position: absolute;
		inset-block-start: 0;
		inset-inline-start: 50%;
		transform: translateX(-50%);
		z-index: 2;
	}

	.SkipLink:not(:focus) {
		inset-block-start: -100%;
	}

	@media (max-width: 40em) {
		header {
			border-block-start: 0.1rem solid var(--color-box-bg);
			justify-content: space-between;
			inset-block-end: 0;
			inline-size: 100%;
			order: 1;
		}

		h1 a {
			--spacing-y: 1em;
		}

		.CurrentPage {
			padding-inline-start: var(--spacing-x);
		}
	}

	@media (min-width: 40.0625em) {
		header {
			flex-wrap: wrap;
			inset-block-start: 0;
		}

		.CurrentPage {
			display: none;
		}
	}
</style>
