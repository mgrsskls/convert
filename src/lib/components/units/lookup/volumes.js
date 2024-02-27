import i18n from '$lib/i18n.js';

export const names = {
	cbcm: i18n.units.volumes.names.cbcm,
	cbm: i18n.units.volumes.names.cbm,
	l: i18n.units.volumes.names.l,
	cbin: i18n.units.volumes.names.cbin,
	cbft: i18n.units.volumes.names.cbft,
	us_gal: i18n.units.volumes.names.us_gal,
	imp_gal: i18n.units.volumes.names.imp_gal,
	us_brl: i18n.units.volumes.names.us_brl
};

export const conversions = {
	cbcm: {
		cbm: 0.000001,
		l: 0.001,
		cbin: 0.061024,
		cbft: 0.000035,
		us_gal: 0.000264,
		imp_gal: 0.00022,
		us_brl: 0.000006
	},
	cbm: {
		cbcm: 1000000,
		l: 1000,
		cbin: 61024,
		cbft: 35,
		us_gal: 264,
		imp_gal: 220,
		us_brl: 6.29
	},
	l: {
		cbcm: 1000,
		cbm: 0.001,
		cbin: 61,
		cbft: 0.035,
		us_gal: 0.264201,
		imp_gal: 0.22,
		us_brl: 0.00629
	},
	cbin: {
		cbcm: 16.387,
		cbm: 0.000016387,
		l: 0.016387,
		cbft: 0.000579,
		us_gal: 0.004329,
		imp_gal: 0.003605,
		us_brl: 0.000103
	},
	cbft: {
		cbcm: 2831685,
		cbm: 0.02831685,
		l: 28.31685,
		cbin: 1728,
		us_gal: 7.481333,
		imp_gal: 6.229712,
		us_brl: 0.178127
	},
	us_gal: {
		cbcm: 3785,
		cbm: 0.003785,
		l: 3.79,
		cbin: 231,
		cbft: 0.13,
		imp_gal: 0.832701,
		us_brl: 0.02381
	},
	imp_gal: {
		cbcm: 4545,
		cbm: 0.004545,
		l: 4.545,
		cbin: 277,
		cbft: 0.16,
		us_gal: 1.2,
		us_brl: 0.028593
	},
	us_brl: {
		cbcm: 158970,
		cbm: 0.15897,
		l: 158.97,
		cbin: 9701,
		cbft: 6,
		us_gal: 42,
		imp_gal: 35
	}
};

export default {
	names,
	conversions
};
