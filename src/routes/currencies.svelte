<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, url }) {
		if (url.searchParams.get("from[currency]")) {
			try {
				const response = await fetch(
					`/currencies/rates?currency=${url.searchParams.get("from[currency]")}`
				);

				return {
					status: 200,
					stuff: {
						data: response.ok && (await response.json()),
					},
				};
			} catch (e) {
				return {};
			}
		}

		return {};
	}
</script>

<script>
	import Currencies from "$lib/components/currencies/currencies.svelte";
</script>

<Currencies />
