import i18n from "$lib/i18n.js";

export const load = ({ url }) => {
	const alias = url.pathname.slice(1);
	const trans = alias ? i18n[alias] : null;

	return {
		alias,
		title: trans ? trans.title : i18n.title,
		description: trans ? trans.description : i18n.description,
	};
};
