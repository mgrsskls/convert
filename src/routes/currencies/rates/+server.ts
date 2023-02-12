import fetch from "node-fetch";

/**
 * @param {object} options
 * @param {string} options.url
 * @returns {Promise<object>}
 */
export const GET = async function ({ url }) {
	const currency = url.searchParams.get("currency");

	try {
		const response = await fetch(
			`https://api.currencyapi.com/v3/latest?apikey=${
				import.meta.env.VITE_CURRENCIES_API_KEY
			}&base_currency=${currency}`,
			{
				headers: {
					Accept: "application/json",
				},
			}
		);

		type Response = {
			data: object;
		};

		const body = (await response.json()) as Response;

		return new Response(JSON.stringify(body.data), {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": import.meta.env.VITE_FRONTEND_HOST,
			},
		});
	} catch (e) {
		return new Response(e.toString(), { status: 404 });
	}
};
