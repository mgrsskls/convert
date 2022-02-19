import i18n from "../../../i18n.js";

export const names = {
	sq_mm: i18n.units.areas.names.sq_mm,
	sq_cm: i18n.units.areas.names.sq_cm,
	sq_m: i18n.units.areas.names.sq_m,
	sq_km: i18n.units.areas.names.sq_km,
	sq_in: i18n.units.areas.names.sq_in,
	sq_ft: i18n.units.areas.names.sq_ft,
	sq_yd: i18n.units.areas.names.sq_yd,
	sq_mi: i18n.units.areas.names.sq_mi,
};

export const conversions = {
	sq_mm: {
		sq_cm: 0.01,
		sq_m: 0.000001,
		sq_km: 0.000000000001,
		sq_in: 0.00155,
		sq_ft: 0.000011,
		sq_yd: 0.000001,
		sq_mi: 3.8610215854245e-13,
	},
	sq_cm: {
		sq_mm: 100,
		sq_m: 0.0001,
		sq_km: 1.0e-10,
		sq_in: 0.155,
		sq_ft: 0.001076,
		sq_yd: 0.00012,
		sq_mi: 3.8610215854245e-11,
	},
	sq_m: {
		sq_mm: 1000000,
		sq_cm: 10000,
		sq_km: 1.0e-6,
		sq_in: 1550.003,
		sq_ft: 10.76391,
		sq_yd: 1.19599,
		sq_mi: 3.8610215854245e-7,
	},
	sq_km: {
		sq_mm: 1000000000000,
		sq_cm: 10000000000,
		sq_m: 1000000,
		sq_in: 1550003100.0062,
		sq_ft: 10763910.41670972,
		sq_yd: 1195990.0463011,
		sq_mi: 0.3861021585,
	},
	sq_in: {
		sq_mm: 645.16,
		sq_cm: 6.4516,
		sq_m: 0.000645,
		sq_km: 6.4516e-10,
		sq_ft: 0.006944,
		sq_yd: 0.000772,
		sq_mi: 2.4909766860524e-10,
	},
	sq_ft: {
		sq_mm: 92903.04,
		sq_cm: 929.0304,
		sq_m: 0.09290304,
		sq_km: 0.00000009290304,
		sq_in: 144,
		sq_yd: 0.111111,
		sq_mi: 0.000000036,
	},
	sq_yd: {
		sq_mm: 836127,
		sq_cm: 8361.274,
		sq_m: 0.836127,
		sq_km: 8.3612736e-7,
		sq_in: 1296,
		sq_ft: 9,
		sq_mi: 3.228305785124e-7,
	},
	sq_mi: {
		sq_mm: 1609344,
		sq_cm: 160934.4,
		sq_m: 1609.344,
		sq_km: 1.609344,
		sq_in: 63360,
		sq_ft: 5280,
		sq_yd: 1760,
	},
};

export default {
	names,
	conversions,
};
