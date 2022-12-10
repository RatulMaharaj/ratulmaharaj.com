import rss from '@astrojs/rss';
const postImportResult = import.meta.glob('./posts/*.{md,mdx}', { eager: true });
const posts = Object.values(postImportResult);
import { siteMeta } from "../site-meta.config"

export const get = () => rss({
  title: `Ratul's Blog`,
  description: siteMeta.longDescription,
  site: import.meta.env.SITE,
  items: posts.map((post) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: post.frontmatter.pubDate,
  })),
  customData: `<language>en-za</language>`,
});