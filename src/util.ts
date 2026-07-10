import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export function postUrl(post: Post) {
	return `/posts/${post.id}/`;
}

// Tag routes are generated from lowercased tags; hrefs must match.
export function tagUrl(tag: string) {
	return `/tags/${tag.toLowerCase()}/`;
}

export function sortPostsByDate(posts: Post[] = []) {
	return [...posts].sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

// This function expects the @arg posts to be sorted by sortPostsByDate()
export function getPreviousAndNextPosts(currentId: string, posts: Post[] = []) {
	const index = posts.findIndex(({ id }) => id === currentId);
	return {
		prev: posts[index + 1] ?? null,
		next: posts[index - 1] ?? null,
	};
}

export function getAllTags(posts: Post[] = []) {
	const allTags = new Set<string>();
	posts.forEach((post) => {
		post.data.tags?.map((tag) => allTags.add(tag.toLowerCase()));
	});
	return [...allTags];
}

export function getAllTagsWithCount(posts: Post[] = []): {
	[key: string]: number;
} {
	return posts.reduce((prev, post) => {
		const currTags: { [key: string]: number } = { ...prev };
		post.data.tags?.forEach(function (tag) {
			const key = tag.toLowerCase();
			currTags[key] = (currTags[key] || 0) + 1;
		});
		return currTags;
	}, {});
}

export function getLocaleTime(
	date: number | Date,
	options: Intl.DateTimeFormatOptions = {},
	locale: string | string[] = "en-GB",
) {
	const formatOptions: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
		...options,
	};
	return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}
