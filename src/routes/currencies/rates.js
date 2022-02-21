import fetch from "node-fetch";

export const get = async function ({ url, request }) {
	const currency = url.searchParams.get("currency");

	if (
		!request.headers.get("referer") ||
		!request.headers.get("referer").startsWith(import.meta.env.VITE_FRONTEND_HOST)
	) {
		return {
			status: 403,
		};
	}

	try {
		const response = await fetch(
			`https://freecurrencyapi.net/api/v2/latest?apikey=${
				import.meta.env.VITE_CURRENCIES_API_KEY
			}&base_currency=${currency}`,
			{
				headers: {
					Accept: "application/json",
				},
			}
		);
		const body = await response.json();

		return {
			status: 200,
			body: body.data,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": import.meta.env.VITE_FRONTEND_HOST,
			},
		};
	} catch (e) {
		return {
			status: 404,
			body: e.toString(),
		};
	}
};
