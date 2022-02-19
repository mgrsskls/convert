<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				title: status,
				description: error.message,
			},
		};
	}
</script>

<script>
	import Layout from "$lib/components/layout.svelte";

	export let title;
	export let description;
</script>

<Layout {title}>
	<p>{description}</p>
</Layout>
