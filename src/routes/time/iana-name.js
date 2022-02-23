import fetch from "node-fetch";

const cache = {};

/**
 * @param {object} options
 * @param {string} options.url
 * @returns {Promise<object>}
 */
export const get = async function ({ url }) {
	const location = url.searchParams.get("location");

	try {
		let body;

		if (cache[location]) {
			body = cache[location];
		} else {
			const response = await fetch(
				`https://timezone.abstractapi.com/v1/current_time/?api_key=${
					import.meta.env.VITE_TIMEZONES_API_KEY
				}&location=${location}`,
				{
					headers: {
						Accept: "application/json",
					},
				}
			);

			body = await response.json();
			cache[location] = {
				timezone_location: body.timezone_location,
			};
		}

		return {
			status: 200,
			body: {
				timezone: body.timezone_location,
			},
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": import.meta.env.VITE_FRONTEND_HOST,
			},
		};
	} catch (e) {
		return {
			status: 500,
			body: e.toString(),
		};
	}
};
