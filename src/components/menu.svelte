<script>
	import menu from "../menu.js";

	export let current;
</script>

<nav>
	<ul>
		{#each menu as item}
			<li>
				<a href={item.path} aria-current={current === item.alias ? "page" : "false"}>{item.label}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		padding: 0;
		position: relative;
	}

	ul {
		display: flex;
	}

	li {
		list-style-type: none;
	}

	a {
		color: inherit;
		display: block;
		padding: var(--spacing-y) var(--spacing-x);
	}

	a:focus-visible {
		outline-offset: -0.2rem;
	}

	a[aria-current="page"] {
		font-weight: 900;
	}
</style>
