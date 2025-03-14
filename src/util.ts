import type { Frontmatter, MarkdownInstance, MDXInstance, Post, Snippet } from "./types";

export function sortMDByDate(posts: MarkdownInstance<Frontmatter>[] = []) {
	return posts.sort(
		(a, b) =>
			new Date(b.frontmatter.pubDate).valueOf() -
			new Date(a.frontmatter.pubDate).valueOf()
	);
}

// This function expects the @arg posts to be sorted by sortMDByDate()
export function getPreviousAndNextPosts(
	currentSlug: string,
	posts: MarkdownInstance<Frontmatter>[] = []
) {
	const index = posts.findIndex(({ url }) => url === currentSlug);
	return {
		prev: posts[index + 1] ?? null,
		next: posts[index - 1] ?? null,
	};
}


export function getAllTags(posts: MDXInstance<Post>[] = []) {
	const allTags = new Set<string>();
	posts.forEach((post) => {
		post.frontmatter.tags?.map((tag) => allTags.add(tag.toLowerCase()));
	});
	return [...allTags];
}

export function getAllTagsWithCount(posts: MDXInstance<Post>[] = []): {
	[key: string]: number;
} {
	return posts.reduce((prev, post) => {
		const currTags = { ...prev };
		post.frontmatter.tags?.forEach(function (tag) {
			currTags[tag] = (currTags[tag] || 0) + 1;
		});
		return currTags;
	}, {});
}

export function toggleClass(element: HTMLElement, className: string) {
	element.classList.toggle(className);
}

export function elementHasClass(element: HTMLElement, className: string) {
	return element.classList.contains(className);
}

export function getLocaleTime(
	date: number | Date,
	options: Intl.DateTimeFormatOptions = {},
	locale: string | string[] = "en-GB"
) {
	const formatOptions: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
		...options,
	};
	return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}


export function getPosts() {
  return Object.values(
    import.meta.glob<MarkdownInstance<Frontmatter>>("src/pages/posts/*.md", {
      eager: true,
    })
  );
};