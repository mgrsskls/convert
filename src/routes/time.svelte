<script>
	import Layout from "../components/layout.svelte";
	import TimeZones from "../components/time/time.svelte";
	import i18n from "../i18n.js";
</script>

<Layout alias="time" title={i18n.time.title} description={i18n.time.description}>
	<TimeZones />
</Layout>
