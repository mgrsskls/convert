export const getLocation = (address) => {
	return fetch(`/time/iana-name?location=${encodeURIComponent(address)}`)
		.then(async (response) => {
			return await response.json();
		})
		.catch((e) => {
			console.error(e);
			return null;
		});
};
