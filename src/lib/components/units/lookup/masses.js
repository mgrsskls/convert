import i18n from "$lib/i18n.js";

export const names = {
	g: i18n.units.masses.names.g,
	kg: i18n.units.masses.names.kg,
	tonne: i18n.units.masses.names.tonne,
	shton: i18n.units.masses.names.shton,
	lton: i18n.units.masses.names.lton,
	lb: i18n.units.masses.names.lb,
	oz: i18n.units.masses.names.oz,
};

export const conversions = {
	g: {
		kg: 0.001,
		tonne: 0.000001,
		shton: 0.000001102,
		lton: 9.84e-7,
		lb: 0.002204586,
		oz: 0.03527337,
	},
	kg: {
		g: 1000,
		tonne: 0.001,
		shton: 0.001102,
		lton: 0.000984,
		lb: 2.204586,
		oz: 35.27337,
	},
	tonne: {
		g: 1000000,
		kg: 1000,
		shton: 1.102293,
		lton: 0.984252,
		lb: 2204.586,
		oz: 35273.37,
	},
	shton: {
		g: 907200,
		kg: 907.2,
		tonne: 0.9072,
		lton: 0.892913,
		lb: 2000,
		oz: 32000,
	},
	lton: {
		g: 1016000,
		kg: 1016,
		tonne: 1.016,
		shton: 1.119929,
		lb: 2239.859,
		oz: 35837.74,
	},
	lb: {
		g: 453.6,
		kg: 0.4536,
		tonne: 0.0004536,
		shton: 0.0005,
		lton: 0.000446,
		oz: 16,
	},
	oz: {
		g: 28.349523125,
		kg: 0.028349523125,
		tonne: 0.000028349523125,
		shton: 0.000031,
		lton: 0.000028,
		lb: 0.0625,
	},
};

export default {
	names,
	conversions,
};
