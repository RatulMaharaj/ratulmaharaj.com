import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  }),
  markdown: {
    syntaxHighlight: 'prism'
  },
  site: "https://ratulmaharaj.com",
  integrations: [mdx({}), tailwind({
    applyBaseStyles: true,
  }), sitemap(), react()],
});