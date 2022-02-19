import i18n from "../../../i18n.js";

export const names = {
	m_s: i18n.units.speeds.names.m_s,
	m_min: i18n.units.speeds.names.m_min,
	km_h: i18n.units.speeds.names.km_h,
	ft_s: i18n.units.speeds.names.ft_s,
	ft_min: i18n.units.speeds.names.ft_min,
	mi_h: i18n.units.speeds.names.mi_h,
	kn: i18n.units.speeds.names.kn,
	c: i18n.units.speeds.names.c,
};

export const conversions = {
	m_s: {
		m_min: 60,
		km_h: 3.6,
		ft_s: 3.28084,
		ft_min: 196.8504,
		mi_h: 2.237136,
		kn: 1.944,
		c: 3.336e-9,
	},
	m_min: {
		m_s: 0.0166666667,
		km_h: 0.06,
		ft_s: 0.054692,
		ft_min: 3.281496,
		mi_h: 0.037293,
		kn: 0.0323767094902607,
		c: 5.5610694114877e-11,
	},
	km_h: {
		m_s: 0.2778,
		m_min: 16.66467,
		ft_s: 0.911417,
		ft_min: 54.68504,
		mi_h: 0.621477,
		kn: 0.53995680346039,
		c: 9.266e-10,
	},
	ft_s: {
		m_s: 0.3048,
		m_min: 18.28434,
		km_h: 1.097192,
		ft_min: 60,
		mi_h: 0.681879,
		kn: 0.5924838,
		c: 1.0170083739729e-9,
	},
	ft_min: {
		m_s: 0.00508,
		m_min: 0.304739,
		km_h: 0.018287,
		ft_s: 0.016667,
		mi_h: 0.011365,
		kn: 0.00987473,
		c: 1.6950139566215e-11,
	},
	mi_h: {
		m_s: 0.447,
		m_min: 26.81464,
		km_h: 1.609071,
		ft_s: 1.466535,
		ft_min: 87.99213,
		kn: 0.8688,
		c: 1.491e-9,
	},
	kn: {
		m_s: 0.51444444444,
		m_min: 30.8666666664,
		km_h: 1.851999999984,
		ft_s: 1.6878099110965,
		ft_min: 101.26859466579,
		mi_h: 1.1507794480136,
		c: 1.7160019563934e-9,
	},
	c: {
		m_s: 299792458,
		m_min: 17987547480,
		km_h: 1079252848.8,
		ft_s: 983571087.90472,
		ft_min: 59014265274.283,
		mi_h: 670616629.3844,
		kn: 582749918.36357,
	},
};

export default {
	names,
	conversions,
};
