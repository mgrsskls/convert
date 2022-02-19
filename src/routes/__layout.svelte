<script context="module">
	import i18n from "$lib/i18n.js";

	export const load = ({ url }) => {
		const alias = url.pathname.slice(1);

		return {
			stuff: {
				alias,
				title: alias ? i18n[alias].title : i18n.title,
				description: alias ? i18n[alias].description : i18n.description,
			},
		};
	};
</script>

<script>
	import { page } from "$app/stores";
	import Layout from "$lib/components/layout.svelte";
</script>

<Layout alias={$page.stuff.alias} title={$page.stuff.title} description={$page.stuff.description}>
	<slot />
</Layout>
