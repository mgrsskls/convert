export const en = {
	title: "Convert",
	description: "Convert is a tool to convert colors, currencies, time and units.",
	colors: {
		title: "Colors",
		description:
			"Convert between <b>HTML color names</b>, <b>RGB</b>, <b>Hex</b>, <b>HSL</b>, <b>HWB</b> and <b>CMYK</b>.",
		placeholder: "e.g. rebeccapurple or #663399",
	},
	currencies: {
		title: "Currencies",
		description: "Convert between <b>currencies</b> based on <b>real time data</b>.",
		labels: {
			amount: "Amount",
			currency: "Currency",
		},
		supported: "Supported currencies",
		unsupported: "Unsupported currencies",
	},
	units: {
		title: "Units",
		description:
			"Convert <b>areas</b>, <b>lengths</b>, <b>masses</b>, <b>speeds</b>, <b>temperatures</b> and <b>volumes</b>.",
		labels: {
			value: "Value",
			unit: "Unit",
		},
		lengths: {
			title: "Lengths",
			placeholders: {
				unit: {
					from: "e.g. km",
					to: "e.g. mi",
				},
				value: "e.g. 1337",
			},
			names: {
				mm: "Millimeter",
				cm: "Centimeter",
				m: "Meter",
				km: "Kilometer",
				in: "Inch",
				ft: "Feet",
				yd: "Yard",
				mi: "Mile",
			},
		},
		areas: {
			title: "Areas",
			placeholders: {
				unit: {
					from: "e.g. sq_m",
					to: "e.g. sq_ft",
				},
				value: "e.g. 500",
			},
			names: {
				sq_mm: "Square Millimeter",
				sq_cm: "Square Centimeter",
				sq_m: "Square Meter",
				sq_km: "Square Kilometer",
				sq_in: "Square Inch",
				sq_ft: "Square Feet",
				sq_yd: "Square Yard",
				sq_mi: "Square Mile",
			},
			abbr: {
				sq_mm: "mm²",
				sq_cm: "cm²",
				sq_m: "m²",
				sq_km: "km²",
				sq_in: "in²",
				sq_ft: "ft²",
				sq_yd: "yd²",
				sq_mi: "mi²",
			},
		},
		volumes: {
			title: "Volumes",
			placeholders: {
				unit: {
					from: "e.g. ltr",
					to: "e.g. us_gal",
				},
				value: "e.g. 10",
			},
			names: {
				cbcm: "Cubic Centimeter",
				cbm: "Cubic Meter",
				ltr: "Liter",
				cbin: "Cubic Inch",
				cbft: "Cubic Feet",
				us_gal: "US Gallon",
				imp_gal: "Imperial Gallon",
				us_brl: "US barrel",
			},
			abbr: {
				cbcm: "cm³",
				cbm: "m³",
				ltr: "ltr",
				cbin: "in³",
				cbft: "ft³",
				us_gal: "US gal",
				imp_gal: "Imp. gal",
				us_brl: "US brl",
			},
		},
		masses: {
			title: "Masses",
			placeholders: {
				unit: {
					from: "e.g. kg",
					to: "e.g. lb",
				},
				value: "e.g. 1000",
			},
			names: {
				g: "Gram",
				kg: "Kilogram",
				tonne: "Metric tonne",
				shton: "Short ton",
				lton: "Long ton",
				lb: "Pound",
				oz: "Ounce",
			},
		},
		densities: {
			title: "Densities",
			names: {
				g_ml: "Gram / Milliliter",
				kg_cbm: "Kilogram / Cubic Meter",
				lb_cbft: "Pound / Cubic Foot",
				lb_cbin: "Pound / Cubic Inch",
			},
			abbr: {
				g_ml: "g/ml",
				kg_cbm: "kg/m³",
				lb_cbft: "lb/ft³",
				lb_cbin: "lb/in³",
			},
		},
		speeds: {
			title: "Speeds",
			placeholders: {
				unit: {
					from: "e.g. km/h",
					to: "e.g. mi/h",
				},
				value: "e.g. 120",
			},
			names: {
				m_s: "Meter / Second",
				m_min: "Meter / Minute",
				km_h: "Kilometer / Hour",
				ft_s: "Foot / Second",
				ft_min: "Foot / Minute",
				mi_h: "Miles / Hour",
				kn: "Knots",
				c: "Speed of Light",
			},
			abbr: {
				m_s: "m/s",
				m_min: "m/min",
				km_h: "km/h",
				ft_s: "ft/s",
				ft_min: "ft/min",
				mi_h: "mi/h",
				kn: "kn",
				c: "c",
			},
		},
		temperatures: {
			title: "Temperatures",
			placeholders: {
				unit: {
					from: "e.g. C",
					to: "e.g. F",
				},
				value: "e.g. 32",
			},
			names: {
				C: "Degree Celsius",
				F: "Degree Fahrenheit",
				K: "Kelvin",
			},
			abbr: {
				C: "°C",
				F: "°F",
				K: "K",
			},
		},
	},
	"about-convert": {
		title: "About convert",
		createdBy: "Created by",
		repository: "Repository",
		builtWith: "Built with",
		hosting: "Hosting",
		apis: "External APIs",
		tracking: "Tracking",
		apiCurrencies: "Real time currency conversions:",
		apiTimeZones: "Getting the IANA time zone for a given location:",
	},
	from: "From",
	to: "To",
	reset: "Reset",
	skipToContent: "Skip to content",
	changeDirection: "Change direction",
	loadingSuggestions: "Loading suggestions …",
	invalid: "invalid",
	time: {
		title: "Time",
		description: "Convert between <b>time zones</b>, <b>UTC</b> and <b>UNIX timestamps</b>.",
		labels: {
			timeZone: "Time Zone",
			dateTime: "Date / Time",
			unixTimestamp: "UNIX Timestamp",
		},
		placeholders: {
			timeZone: {
				from: "e.g. Hamburg",
				to: "e.g. Seoul",
			},
			unixTimestamp: "e.g. 1644962040000",
		},
		toggle: {
			datetime: "Use current date / time",
			timestamp: "Use current timestamp",
			timeZone: "Use local time zone",
		},
	},
};

export default en;
