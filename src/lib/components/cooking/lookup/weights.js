import i18n from '$lib/i18n.js';

export const names = {
	lb: i18n.cooking.weights.names.lb,
	oz: i18n.cooking.weights.names.oz,
	g: i18n.cooking.weights.names.g,
	kg: i18n.cooking.weights.names.kg
};

export const conversions = {
	lb: {
		oz: 16,
		g: 453.59237,
		kg: 0.45359237
	},
	oz: {
		lb: 1 / 16,
		g: 28.349523125,
		kg: 0.0283495231
	},
	g: {
		lb: 0.00220462,
		oz: 0.03527396,
		kg: 0.001
	},
	kg: {
		lb: 2.20462262,
		oz: 35.27396198,
		g: 1000
	}
};

export default {
	names,
	conversions
};
