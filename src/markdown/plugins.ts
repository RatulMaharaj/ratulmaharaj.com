/**
 * Markdown as the Plans editor draws it: the pieces of its pipeline that the
 * blog needs at build time. Sätteri plugins, wired in astro.config.mjs.
 *
 * Mermaid needs nothing here — the fence is excluded from Shiki in the Astro
 * config and drawn in the browser by src/components/Mermaid.astro, with the
 * same theme the editor hands to mermaid.
 */
import katex from "katex";
import { defineHastPlugin, defineMdastPlugin } from "satteri";

/**
 * GitHub-flavoured alerts: a blockquote whose first line is `[!NOTE]` and the
 * like, drawn as a coloured callout with a badge.
 *
 * Mirrors src/alert-view.ts in the Plans app. There the label stays in the
 * document as text and is dressed by decorations; here the HTML is the only
 * output, so the label becomes the badge outright and the brackets go. Where
 * the syntax is not understood (the RSS feed, GitHub's own fallback) the
 * markdown still degrades to a quote with a bracketed label, as designed.
 */
const LABEL = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?=\s|$)/;

export const alerts = defineMdastPlugin({
	name: "alerts",
	blockquote(quote, ctx) {
		// The label must be the very first thing in the first paragraph, as
		// GitHub requires: `> text [!NOTE]` is prose.
		const first = quote.children?.[0];
		if (!first || first.type !== "paragraph") return;
		const lead = first.children?.[0];
		if (!lead || lead.type !== "text") return;
		const m = LABEL.exec(lead.value);
		if (!m) return;
		const kind = m[1].toLowerCase();
		ctx.setProperty(quote, "data", {
			hProperties: { className: ["alert"], "data-alert": kind },
		});
		const rest = lead.value.slice(m[0].length).replace(/^\s+/, "");
		ctx.replaceNode(lead, {
			type: "html",
			value: `<span class="alert-label">${m[1]}</span>`,
		});
		if (rest) ctx.insertAfter(lead, { type: "text", value: rest });
	},
});

/**
 * Math: `$…$` inline and `$$…$$` blocks, typeset by KaTeX at build time.
 *
 * Both are replaced by KaTeX's HTML here, so the page ships no math JavaScript. A formula that
 * fails to parse is left as its source in a code element rather than
 * breaking the build.
 */
function typeset(source: string, displayMode: boolean): string {
	return katex.renderToString(source, {
		displayMode,
		throwOnError: false,
		output: "html",
	});
}

export const math = defineMdastPlugin({
	name: "math",
	// In the markdown phase, before Shiki: a `$$` block is a code node by the
	// time the HTML plugins run, and the highlighter takes it first.
	math(node) {
		return { rawHtml: typeset(node.value, true) };
	},
	inlineMath(node) {
		return { type: "html", value: typeset(node.value, false) };
	},
});

/**
 * A table wider than the measure scrolls inside its own block rather than
 * pushing the page sideways — the editor wraps every table the same way.
 */
export const tables = defineHastPlugin({
	name: "table-wrap",
	element: {
		filter: ["table"],
		visit(table, ctx) {
			ctx.wrapNode(table, {
				type: "element",
				tagName: "div",
				properties: { className: ["table-wrap"] },
				children: [],
			});
		},
	},
});
