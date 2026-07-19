/** @type {import('stylelint').Config} */
export default {
	extends: ["stylelint-config-standard"],
	rules: {
		/* Tailwind v4's @import "tailwindcss" must stay in string notation —
		   url() imports are not processed by the Tailwind pipeline */
		"import-notation": "string",
		/* Astro's :global() selector in scoped <style> blocks */
		"selector-pseudo-class-no-unknown": [
			true,
			{ ignorePseudoClasses: ["global"] },
		],
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: [
					"theme",
					"plugin",
					"custom-variant",
					"variant",
					"apply",
					"reference",
					"config",
					"source",
					"utility",
					"tailwind",
				],
			},
		],
	},
	overrides: [
		{
			files: ["**/*.astro"],
			customSyntax: "postcss-html",
		},
	],
};
