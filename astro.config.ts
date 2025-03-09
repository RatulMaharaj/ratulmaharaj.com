import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  markdown: {
    syntaxHighlight: 'prism'
  },
  site: "https://ratulmaharaj.com",
  integrations: [mdx({}), tailwind({
    applyBaseStyles: true,
  }), sitemap()],
});