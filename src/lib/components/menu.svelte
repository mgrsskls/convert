<script>
	import menu from "$lib/menu.js";
	import i18n from "$lib/i18n.js";

	export let current;

	let menuElement;

	function closeMenu() {
		menuElement.open = false;
	}
</script>

<details class="small-menu" bind:this={menuElement}>
	<summary>Menu</summary>
	<nav>
		<ul>
			{#each menu as item}
				<li>
					<a
						data-sveltekit-reload
						href={item.path}
						aria-current={current === item.alias ? "page" : "false"}
						on:click={closeMenu}
					>
						{item.label}
					</a>
				</li>
			{/each}
			<li>
				<a
					data-sveltekit-reload
					href="/about-convert"
					aria-current={current === "about-convert" ? "page" : "false"}
					on:click={closeMenu}
				>
					{i18n["about-convert"].title}
				</a>
			</li>
		</ul>
	</nav>
</details>

<nav class="large-menu">
	<ul>
		{#each menu as item}
			<li>
				<a
					data-sveltekit-reload
					href={item.path}
					aria-current={current === item.alias ? "page" : "false"}>{item.label}</a
				>
			</li>
		{/each}
		<li>
			<a
				data-sveltekit-reload
				href="/about-convert"
				aria-current={current === "about-convert" ? "page" : "false"}
				on:click={closeMenu}
			>
				{i18n["about-convert"].title}
			</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		padding: 0;
		position: relative;
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

	@media (max-width: 40em) {
		.large-menu {
			display: none;
		}

		.small-menu summary {
			align-items: center;
			display: flex;
			gap: 1rem;
			padding-inline-start: calc(1rem + var(--spacing-x));
			padding-inline-end: var(--spacing-x);
			position: relative;
		}

		.small-menu summary::-webkit-details-marker,
		.small-menu summary::marker {
			display: none;
			content: "";
		}

		.small-menu summary::before {
			content: "";
			display: block;
			block-size: 1em;
			inline-size: 1em;
			background: linear-gradient(to bottom, var(--color-copy-light) 30%, transparent 30%);
			background-size: 100% 0.6rem;
			position: absolute;
			inset-inline-start: 0;
			inset-block-start: calc(50% + 0.15rem);
			transform: translateY(-50%);
		}

		.small-menu nav {
			background: var(--color-bg);
			position: absolute;
			inset-block-end: 100%;
			inset-inline: 0;
			padding-block: var(--spacing-y);
			border-block-start: 0.1rem solid var(--color-box-bg);
		}
	}

	@media (min-width: 40.0625em) {
		.small-menu {
			display: none;
		}

		.large-menu {
			flex: 1;
		}

		ul {
			display: flex;
		}

		li:last-child {
			margin-inline-start: auto;
		}

		a {
			white-space: nowrap;
		}
	}
</style>
