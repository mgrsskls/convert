export const getLocation = (address) => {
	return Promise.resolve(null);
	return fetch(
		`https://timezoneapi.io/api/address/?${encodeURIComponent(address)}&token=aTQoWHRpmzQAMlCetmzR`
	)
		.then(async (response) => {
			const json = await response.json();

			if (json.data?.addresses) {
				return json.data.addresses;
			}

			return null;
		})
		.catch((e) => {
			console.error(e);
			return null;
		});
};
