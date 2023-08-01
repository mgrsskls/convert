module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	extends: ["plugin:svelte/recommended", "plugin:@typescript-eslint/recommended", "prettier"],
	parserOptions: {
		project: "tsconfig.json",
		extraFileExtensions: [".svelte"],
	},
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
		},
	],
	plugins: ["@typescript-eslint"],
	ignorePatterns: ["*.cjs"],
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
