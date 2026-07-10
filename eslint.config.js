import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";

export default tseslint.config(
	{
		ignores: ["dist/", ".astro/", ".vercel/", "node_modules/", "public/"],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...astro.configs.recommended,
	...astro.configs["jsx-a11y-recommended"],
	{
		files: ["scripts/**/*.mjs"],
		languageOptions: {
			globals: {
				console: "readonly",
				process: "readonly",
				URL: "readonly",
			},
		},
	},
	{
		files: ["**/*.ts"],
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
			],
		},
	},
	prettier
);
