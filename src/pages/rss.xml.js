import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function GET(context) {
	const posts = await getCollection("posts");

	return rss({
		title: `Ratul's Blog`,
		description: `Personal blog of Ratul Maharaj`,
		site: context.site,
		items: posts.map((post) => ({
			link: `/posts/${post.id}/`,
			title: post.data.title,
			pubDate: post.data.pubDate,
			categories: post.data.tags,
			author: post.data.author,
			content: sanitizeHtml(parser.render(post.body)),
		})),
		customData: `<language>en-ZA</language>`,
		stylesheet: "/rss/styles.xsl",
		trailingSlash: false,
	});
}
