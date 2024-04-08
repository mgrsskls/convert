export async function load({ fetch, url }) {
	if (url.searchParams.get('from[currency]')) {
		try {
			const response = await fetch(
				`/currencies/rates?currency=${url.searchParams.get('from[currency]')}`
			);

			try {
				const json = await response.json();
				return {
					result: response.ok && json
				};
			} catch (e) {
				console.error(e);
				return {};
			}
		} catch (e) {
			console.error(e);
			return {};
		}
	}

	return {};
}
