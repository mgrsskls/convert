import fetch from "node-fetch";

export const handler = async function (event) {
	const { currency } = event.queryStringParameters;

	if (!event.headers.referer || !event.headers.referer.startsWith(process.env.FRONTEND_HOST)) {
		return {
			statusCode: 403,
		};
	}

	try {
		const response = await fetch(
			`https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.CURRENCIES_API_KEY}&base_currency=${currency}`
		);
		const body = await response.json();

		const headers = {};

		headers["Access-Control-Allow-Origin"] = process.env.FRONTEND_HOST;

		return {
			statusCode: 200,
			body: JSON.stringify(body.data),
			headers,
		};
	} catch (e) {
		return {
			statusCode: 404,
			body: e.toString(),
		};
	}
};
