import i18n from '$lib/i18n.js';

export const names = {
	C: i18n.units.temperatures.names.C,
	F: i18n.units.temperatures.names.F,
	K: i18n.units.temperatures.names.K
};

export const conversions = {
	C: {
		F: (C) => (C * 9) / 5 + 32,
		K: (C) => C + 273.15
	},
	F: {
		C: (F) => ((F - 32) * 5) / 9,
		K: (F) => (F + 459.67) / 1.8
	},
	K: {
		C: (K) => K - 273.15,
		F: (K) => (K === 0 ? 459.67 : 1.8 * K - 459.67)
	}
};

export default {
	names,
	conversions
};
