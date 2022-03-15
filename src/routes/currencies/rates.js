import fetch from "node-fetch";

/**
 * @param {object} options
 * @param {string} options.url
 * @returns {Promise<object>}
 */
export const get = async function ({ url }) {
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
