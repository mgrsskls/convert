import i18n from '$lib/i18n.js';

export const names = {
	us_oz: i18n.cooking.liquids.names.us_oz,
	ml: i18n.cooking.liquids.names.ml,
	l: i18n.cooking.liquids.names.l
};

export const conversions = {
	us_oz: {
		ml: 29.573529562,
		l: 0.029573529562
	},
	ml: {
		us_oz: 0.033814022702,
		l: 0.001
	},
	l: {
		us_oz: 33.814022702,
		ml: 1000
	}
};

export default {
	names,
	conversions
};
