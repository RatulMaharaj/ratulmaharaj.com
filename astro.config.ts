import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    analytics: true
  }),
  markdown: {
    syntaxHighlight: 'prism'
  },
  site: "https://ratulmaharaj.com",
  integrations: [mdx({}), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), image(), sitemap(), react()],
});