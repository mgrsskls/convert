import fetch from "node-fetch";

const cache = {};

export const handler = async function (event) {
	const { location } = event.queryStringParameters;

	if (!event.headers.referer || !event.headers.referer.startsWith(process.env.FRONTEND_HOST)) {
		return {
			statusCode: 403,
		};
	}

	try {
		const headers = {};
		headers["Access-Control-Allow-Origin"] = process.env.FRONTEND_HOST;
		let body;

		if (cache[location]) {
			body = cache[location];
		} else {
			const response = await fetch(
				`https://timezone.abstractapi.com/v1/current_time/?api_key=${process.env.TIMEZONES_API_KEY}&location=${location}`
			);
			body = await response.json();
			cache[location] = {
				timezone_location: body.timezone_location,
			};
		}

		return {
			statusCode: 200,
			body: JSON.stringify({
				timezone: body.timezone_location,
			}),
			headers,
		};
	} catch (e) {
		return {
			statusCode: 500,
			body: e.toString(),
		};
	}
};
