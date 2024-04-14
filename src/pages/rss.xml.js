import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

export function GET(context) {
  const postImportResult = import.meta.glob('./posts/*.md', { eager: true });
  const posts = Object.values(postImportResult);
  
  return rss({
  title: `Ratul's Blog`,
  description: `Personal blog of Ratul Maharaj`,
  site: context.site,
  items: posts.map((post) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: post.frontmatter.pubDate,
    categories: post.frontmatter.tags,
    author: post.frontmatter.author,
    content: sanitizeHtml(post.compiledContent()),

  })),
  customData: `<language>en-ZA</language>`,
  stylesheet: '/src/styles/rss.xsl',
  trailingSlash: false,
})
}