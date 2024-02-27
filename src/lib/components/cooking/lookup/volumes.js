import i18n from '$lib/i18n.js';

export const names = {
	imp_qt: i18n.cooking.volumes.names.imp_qt,
	imp_tbsp: i18n.cooking.volumes.names.imp_tbsp,
	imp_tsp: i18n.cooking.volumes.names.imp_tsp,
	l: i18n.cooking.volumes.names.l,
	ml: i18n.cooking.volumes.names.ml,
	us_cup: i18n.cooking.volumes.names.us_cup,
	us_qt: i18n.cooking.volumes.names.us_qt,
	us_tbsp: i18n.cooking.volumes.names.us_tbsp,
	us_tsp: i18n.cooking.volumes.names.us_tsp
};

export const conversions = {
	imp_qt: {
		imp_tbsp: 64,
		imp_tsp: 192,
		l: 1.13652296975,
		ml: 1136.52296975,
		us_cup: 4.8038016902,
		us_qt: 1.2009504226,
		us_tbsp: 76.8608267483,
		us_tsp: 230.582482017
	},
	imp_tbsp: {
		imp_qt: 0.015625,
		imp_tsp: 3,
		l: 0.0177581714,
		ml: 17.7581714,
		us_cup: 0.0750594016,
		us_qt: 0.0187648503,
		us_tbsp: 1.2009504226,
		us_tsp: 3.6028512633
	},
	imp_tsp: {
		imp_qt: 0.0052083333,
		imp_tbsp: 1 / 3,
		l: 0.005919390467,
		ml: 5.919390467,
		us_cup: 0.0250198005,
		us_qt: 0.0062549501,
		us_tbsp: 0.4003168075,
		us_tsp: 1.2009504226
	},
	l: {
		imp_qt: 0.8798766295,
		imp_tbsp: 56.312104297,
		imp_tsp: 168.9363127957,
		ml: 1000,
		us_cup: 4.2267528377,
		us_qt: 1.0566882094,
		us_tbsp: 67.6280453179,
		us_tsp: 202.8841363654
	},
	ml: {
		imp_qt: 0.0008798766295,
		imp_tbsp: 0.056312104297,
		imp_tsp: 0.1689363127957,
		l: 0.001,
		us_cup: 0.0042267528377,
		us_qt: 0.0010566882094,
		us_tbsp: 0.0676280453179,
		us_tsp: 0.2028841363654
	},
	us_cup: {
		imp_qt: 0.20816846,
		imp_tbsp: 13.3227814,
		imp_tsp: 39.9683443,
		l: 0.2365882365,
		ml: 236.5882365,
		us_qt: 0.25,
		us_tbsp: 16,
		us_tsp: 48
	},
	us_qt: {
		imp_qt: 0.83267384,
		imp_tbsp: 53.2911258,
		imp_tsp: 159.873377,
		l: 0.946352946,
		ml: 946.352946,
		us_cup: 4,
		us_tbsp: 64,
		us_tsp: 192
	},
	us_tbsp: {
		imp_qt: 0.0130105288,
		imp_tbsp: 0.83267384,
		imp_tsp: 2.49802152,
		l: 0.0147867648,
		ml: 14.7867648,
		us_cup: 0.0625,
		us_qt: 0.015625,
		us_tsp: 3
	},
	us_tsp: {
		imp_qt: 0.0043368429,
		imp_tbsp: 0.277557947,
		imp_tsp: 0.83267384,
		l: 0.0049289215938,
		ml: 4.9289215938,
		us_cup: 0.0208333333,
		us_qt: 0.0052083333,
		us_tbsp: 1 / 3
	}
};

export default {
	names,
	conversions
};
