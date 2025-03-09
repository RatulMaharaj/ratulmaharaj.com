import type { MDXInstance, MarkdownInstance, Page } from "astro";

type Theme = "light" | "dark";

interface IElement {
	readonly as?: keyof HTMLElementTagNameMap;
}

type SiteMeta = {
	title: string;
	description?: string;
	image?: string;
	pubDate?: string;
};

type PaginationLink = {
	url: string;
	text?: string;
	srLabel?: string;
};

interface Post {
	title: string;
	description: string;
	pubDate?: Date;
	tags?: string[];
}

interface Snippet {
	title: string;
	description: string;
	pubDate?: Date;
	tags?: string[];
}


interface Frontmatter {
	title: string;
	description?: string;
	layout: string;
	pubDate: Date;
	tags: string[];
	author: string;
}

export type {
	MDXInstance,
	MarkdownInstance,
	Frontmatter,
	Page,
	Theme,
	IElement,
	SiteMeta,
	PaginationLink,
	Post,
	Snippet
};

