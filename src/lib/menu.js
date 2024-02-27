import i18n from '$lib/i18n.js';

export default [
	{
		path: '/colors/',
		label: i18n.colors.title,
		description: i18n.colors.description,
		alias: 'colors/'
	},
	{
		path: '/cooking/',
		label: i18n.cooking.title,
		description: i18n.cooking.description,
		alias: 'cooking/'
	},
	{
		path: '/currencies/',
		label: i18n.currencies.title,
		description: i18n.currencies.description,
		alias: 'currencies/'
	},
	{ path: '/time/', label: i18n.time.title, description: i18n.time.description, alias: 'time/' },
	{
		path: '/units/',
		label: i18n.units.title,
		description: i18n.units.description,
		alias: 'units/'
	}
];
