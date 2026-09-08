import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { alerts, math, tables } from "./src/markdown/plugins";

// https://astro.build/config
export default defineConfig({
	output: "static",
	markdown: {
		processor: satteri({
			mdastPlugins: [alerts, math],
			hastPlugins: [tables],
			features: { math: true },
		}),
		syntaxHighlight: {
			type: "shiki",
			// A mermaid fence is a diagram, not code: it is left as plain text for
			// the browser to draw (src/components/Mermaid.astro).
			excludeLangs: ["mermaid", "math"],
		},
		shikiConfig: {
			theme: "css-variables",
		},
	},
	site: "https://ratulmaharaj.com",
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
