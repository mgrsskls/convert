<script>
	import Layout from "../components/layout.svelte";
	import Colors from "../components/colors/colors.svelte";
	import i18n from "../i18n.js";
</script>

<Layout alias="colors" title={i18n.colors.title} description={i18n.colors.description}>
	<Colors />
</Layout>
