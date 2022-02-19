<script>
	import { page } from "$app/stores";
	import i18n from "$lib/i18n.js";
</script>

<footer>
	<small
		><a
			href="/about-convert"
			aria-current={$page.url.pathname === "/about-convert" ? "page" : "false"}
			>{i18n["about-convert"].title}</a
		></small
	>
</footer>

<style>
	footer {
		padding: var(--spacing-y) var(--spacing-x);
	}
</style>
