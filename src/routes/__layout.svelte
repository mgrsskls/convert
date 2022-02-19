<script context="module" lang="ts">
	import i18n from "$lib/i18n.js";

	export const load = ({ url }) => {
		const alias = url.pathname.slice(1);
		const trans = alias ? i18n[alias] : null;

		return {
			stuff: {
				alias,
				title: trans ? trans.title : i18n.title,
				description: trans ? trans.description : i18n.description,
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
