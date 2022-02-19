import i18n from "$lib/i18n.js";

export const names = {
	g_ml: i18n.units.densities.names.g_ml,
	kg_cbm: i18n.units.densities.names.kg_cbm,
	lb_cbft: i18n.units.densities.names.lb_cbft,
	lb_cbin: i18n.units.densities.names.lb_cbin,
};

export const conversions = {
	g_ml: {
		kg_cbm: 1000,
		lb_cbft: 62.42197,
		lb_cbin: 0.036127,
	},
	kg_cbm: {
		g_ml: 0.001,
		lb_cbft: 0.06242197,
		lb_cbin: 0.000036127,
	},
	lb_cbft: {
		g_ml: 0.01602,
		kg_cbm: 16.02,
		lb_cbin: 0.000579,
	},
	lb_cbin: {
		g_ml: 27.68,
		kg_cbm: 27680,
		lb_cbft: 1727.84,
	},
};

export default {
	names,
	conversions,
};
