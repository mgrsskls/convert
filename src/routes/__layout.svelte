<script>
	import { page } from "$app/stores";
	import Layout from "$lib/components/layout.svelte";
</script>

<Layout alias={$page.stuff.alias} title={$page.stuff.title} description={$page.stuff.description}>
	<slot />
</Layout>
