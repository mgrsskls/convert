import i18n from "../../../i18n.js";

export const names = {
	mm: i18n.units.lengths.names.mm,
	cm: i18n.units.lengths.names.cm,
	m: i18n.units.lengths.names.m,
	km: i18n.units.lengths.names.km,
	in: i18n.units.lengths.names.in,
	ft: i18n.units.lengths.names.ft,
	yd: i18n.units.lengths.names.yd,
	mi: i18n.units.lengths.names.mi,
};

export const conversions = {
	mm: {
		cm: 0.1,
		m: 0.001,
		km: 0.000001,
		in: 0.03937,
		ft: 0.003281,
		yd: 0.001094,
		mi: 0.000000621,
	},
	cm: {
		mm: 10,
		m: 0.01,
		km: 0.00001,
		in: 0.393701,
		ft: 0.032808,
		yd: 0.010936,
		mi: 0.000006,
	},
	m: {
		mm: 1000,
		cm: 100,
		km: 0.001,
		in: 39.37008,
		ft: 3.28084,
		yd: 1.093613,
		mi: 0.000621,
	},
	km: {
		mm: 1000000,
		cm: 100000,
		m: 1000,
		in: 39370.08,
		ft: 3280.84,
		yd: 1093.613,
		mi: 0.621371,
	},
	in: {
		mm: 25.4,
		cm: 2.54,
		m: 0.0254,
		km: 0.000025,
		ft: 0.083333,
		yd: 0.027778,
		mi: 0.000016,
	},
	ft: {
		mm: 304.8,
		cm: 30.48,
		m: 0.3048,
		km: 0.0003048,
		in: 12,
		yd: 0.333333333,
		mi: 0.000189,
	},
	yd: {
		mm: 914.4,
		cm: 91.44,
		m: 0.9144,
		km: 0.000914,
		in: 36,
		ft: 3,
		mi: 0.000568,
	},
	mi: {
		mm: 1609344,
		cm: 160934.4,
		m: 1609.344,
		km: 1.609344,
		in: 63360,
		ft: 5280,
		yd: 1760,
	},
};

export default {
	names,
	conversions,
};
