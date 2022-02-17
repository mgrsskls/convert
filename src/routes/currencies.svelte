<script>
	import Layout from "../components/layout.svelte";
	import Currencies from "../components/currencies/currencies.svelte";
	import i18n from "../i18n.js";
</script>

<Layout alias="currencies" title={i18n.currencies.title} description={i18n.currencies.description}
	><Currencies /></Layout
>
