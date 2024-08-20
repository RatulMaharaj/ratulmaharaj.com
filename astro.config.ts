import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  markdown: {
    syntaxHighlight: 'prism'
  },
  site: "https://ratulmaharaj.com",
  integrations: [mdx({}), tailwind({
    applyBaseStyles: true,
  }), sitemap()],
});