<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, url }) {
		if (url.searchParams.get("from[currency]")) {
			const response = await fetch(
				`${
					import.meta.env.VITE_BACKEND_HOST || ""
				}/.netlify/functions/currencies?currency=${url.searchParams.get("from[currency]")}`
			);

			return {
				status: 200,
				stuff: {
					data: response.ok && (await response.json()),
				},
			};
		}

		return {};
	}
</script>

<script>
	import Currencies from "$lib/components/currencies/currencies.svelte";
</script>

<Currencies />
