import type { Page } from "astro";

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

export type { Page, Theme, IElement, SiteMeta, PaginationLink };
