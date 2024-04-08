const js = require('@eslint/js');

/** @type { import("eslint").Linter.Config } */
module.exports = [
	js.configs.recommended,
	{
		languageOptions: {
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2020,
				extraFileExtensions: ['.svelte']
			},
			globals: {
				Intl: true,
				console: true,
				Response: true
			}
		},
		rules: {
			'svelte/no-at-html-tags': 0
		}
	},
	{
		ignores: ['src/lib/components/colors/w3color.js', 'build/', '.svelte-kit', '.netlify']
	}
];
