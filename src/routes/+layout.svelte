<script module>
	import i18n from '$lib/i18n.js';

	export const load = ({ url }) => {
		const alias = url.pathname.slice(1);
		const trans = alias ? i18n[alias] : null;

		return {
			alias,
			title: trans ? trans.title : i18n.title,
			description: trans ? trans.description : i18n.description
		};
	};
</script>

<script>
	import { page } from '$app/stores';
	import Layout from '$lib/components/layout.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<Layout alias={$page.data.alias} title={$page.data.title} description={$page.data.description}>
	{@render children?.()}
</Layout>
