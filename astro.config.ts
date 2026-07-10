import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'css-variables'
    }
  },
  site: "https://ratulmaharaj.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});