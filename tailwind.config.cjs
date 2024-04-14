const defaultTheme = require('tailwindcss/defaultTheme')

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
			fontFamily: {
				sans: ["Monaspace Argon", ...defaultTheme.fontFamily.sans],
				mono: ["Monaspace Krypton", ...defaultTheme.fontFamily.mono],
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: "oklch(var(--theme-surface-content))",
						a: {
							color: "oklch(var(--theme-surface-content))",
							"&:hover": {
								color: "oklch(var(--theme-primary))",
							},
						},
						h1: {
							color: "oklch(var(--theme-surface-content))",
							"&::before": {
								content: "#",
							}
						},
						h2: {
							color: "oklch(var(--theme-surface-content))",
						},
						h3: {
							color: "oklch(var(--theme-surface-content))",
						},
						h4: {
							color: "oklch(var(--theme-surface-content))",
						},
						strong: {
							fontWeight: "700",
						},
						code: {
							padding: "0.1em",
							borderRadius: "3px",
						},
						blockquote: {
							color: "oklch(var(--theme-surface-content))",
							borderColor: "oklch(var(--theme-primary))",
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
							color: "oklch(var(--theme-surface-content))",
						},
					},
				},
			}),
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
