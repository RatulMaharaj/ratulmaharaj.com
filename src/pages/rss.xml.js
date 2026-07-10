import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

export async function GET(context) {
  const postImportResult = import.meta.glob('./posts/*.md', { eager: true });
  const posts = Object.values(postImportResult);

  return rss({
  title: `Ratul's Blog`,
  description: `Personal blog of Ratul Maharaj`,
  site: context.site,
  items: await Promise.all(posts.map(async (post) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: post.frontmatter.pubDate,
    categories: post.frontmatter.tags,
    author: post.frontmatter.author,
    content: sanitizeHtml(await post.compiledContent()),
  }))),
  customData: `<language>en-ZA</language>`,
  stylesheet: '/rss/styles.xsl',
  trailingSlash: false,
})
}