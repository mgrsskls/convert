<script>
	import i18n from "../i18n.js";
	import menu from "../menu.js";

	import Layout from "../components/layout.svelte";
</script>

<svelte:head>
	<meta name="description" content={i18n.description} />
</svelte:head>

<Layout>
	<ul>
		{#each menu as item}
			<li>
				<a href={item.path}><span>{item.label}</span></a>
				<p>{@html item.description}</p>
			</li>
		{/each}
	</ul>
</Layout>

<style>
	ul {
		display: grid;
		grid-gap: var(--spacing-x);
		inline-size: 100%;
		margin: auto;
	}

	li {
		list-style-type: none;
		border: var(--contrast-border);
		border-radius: var(--box-border-radius);
		align-items: flex-end;
		display: flex;
		background: var(--color-box-bg);
		padding: 2rem;
		position: relative;
	}

	a {
		display: flex;
		justify-content: space-between;
		color: var(--color-accent);
		font-size: 2.4rem;
		font-weight: 800;
		text-decoration: none;
		position: absolute;
		inset: 0;
		padding: inherit;
	}

	a::after {
		color: var(--color-copy);
		content: "→";
		display: block;
		transition: 0.1s all ease;
		opacity: 0.5;
	}
	a:where(:hover, :focus)::after {
		transition: 0.25s all ease;
		color: var(--color-accent);
		opacity: 1;
	}

	span {
		text-decoration: underline;
		transition: 0.1s all ease;
	}

	a:where(:hover, :focus) span {
		transform: translateX(0.5rem);
		transition: 0.25s all ease;
	}

	@media (max-width: 36em) {
		p {
			margin-block-start: 6rem;
		}
	}

	@media (min-width: 36.0625em) {
		ul {
			grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		}

		p {
			margin-block-start: 8rem;
		}
	}
</style>
