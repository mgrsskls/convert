import i18n from "$lib/i18n.js";

export default ({ url }) => {
	const alias = url.pathname.slice(1);
	return {
		stuff: {
			alias,
			title: i18n[alias].title,
			description: i18n[alias].description,
		},
	};
};
