/**
 * @param {string} address
 * @returns {Promise}
 */
export const getLocation = async (address) => {
	try {
		const response = await fetch(`/time/iana-name?location=${encodeURIComponent(address)}`);
		return await response.json();
	} catch (e) {
		console.error(e);
		return null;
	}
};
