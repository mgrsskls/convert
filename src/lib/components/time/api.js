export const getLocation = (address) => {
	return fetch(
		`${
			import.meta.env.VITE_BACKEND_HOST || ""
		}/.netlify/functions/timezones?location=${encodeURIComponent(address)}`
	)
		.then(async (response) => {
			return await response.json();
		})
		.catch((e) => {
			console.error(e);
			return null;
		});
};
