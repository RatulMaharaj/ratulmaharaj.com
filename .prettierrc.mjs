export default {
	semi: true,
	singleQuote: false,
	tabWidth: 2,
	useTabs: true,
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	tailwindStylesheet: "./src/styles/global.css",
	overrides: [
		{
			files: "**/*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
