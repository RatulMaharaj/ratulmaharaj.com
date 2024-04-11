const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				surface: "oklch(var(--theme-surface) / <alpha-value>)",
				"surface-content": "oklch(var(--theme-surface-content) / <alpha-value>)",
				primary: "oklch(var(--theme-primary) / <alpha-value>)",
				neutral: "oklch(var(--theme-neutral) / <alpha-value>)"
			},
			transitionProperty: {
				height: "height",
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme("colors.surface-content"),
						h1: {
							color: theme("colors.surface-content"),
						},
						h2: {
							color: theme("colors.surface-content"),
						},
						h3: {
							color: theme("colors.surface-content"),
						},
						h4: {
							color: theme("colors.surface-content"),
						},
						strong: {
							fontWeight: "700",
						},
						code: {
							backgroundColor: "var(--prism-background)",
							padding: "0.1em",
							borderRadius: "3px",
						},
						blockquote: {
							color: theme("colors.surface-content"),
							borderColor: "oklch(var(--theme-primary))"
						},
						hr: {
							borderTopStyle: "solid",
						},
						thead: {
							borderBottomWidth: "none",
						},
						"thead th": {
							color:  "oklch(var(--theme-primary))",
							fontWeight: "700",
							borderBottom: "1px solid oklch(var(--theme-primary))",
						},
						"tbody tr": {
							borderBottomWidth: "none",
						},
						tfoot: {
							borderTop: "1px solid oklch(var(--theme-primary))",
						},
					},
				},
				sm: {
					css: {
						code: {
							fontSize: theme("fontSize.sm")[0],
							fontWeight: "400",
							color: theme("colors.surface-content"),
						},
					},
				},
			}),
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
