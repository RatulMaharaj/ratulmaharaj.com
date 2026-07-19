// Guards against URL regressions: compares the routes and sitemap entries in
// dist/ against the checked-in snapshot. Run `node scripts/check-urls.mjs
// --update` to (re)capture the snapshot after an intentional URL change.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const snapshotPath = join(root, "scripts", "url-snapshot.json");

if (!existsSync(dist)) {
	console.error("dist/ not found — run `pnpm build` first.");
	process.exit(1);
}

function collectRoutes(dir) {
	const routes = [];
	for (const entry of readdirSync(dir, { withFileTypes: true, recursive: true })) {
		if (!entry.isFile()) continue;
		const abs = join(entry.parentPath ?? entry.path, entry.name);
		const rel = relative(dist, abs).split("\\").join("/");
		if (rel.startsWith("_astro/")) continue;
		if (entry.name === "index.html") {
			routes.push("/" + rel.slice(0, -"index.html".length));
		} else if (rel.endsWith(".html")) {
			routes.push("/" + rel);
		} else if (rel === "rss.xml" || rel === "robots.txt" || /^sitemap.*\.xml$/.test(rel)) {
			routes.push("/" + rel);
		}
	}
	return routes.sort();
}

function collectSitemapUrls() {
	const urls = [];
	for (const entry of readdirSync(dist)) {
		if (!/^sitemap.*\.xml$/.test(entry)) continue;
		const xml = readFileSync(join(dist, entry), "utf8");
		for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
			if (!loc.endsWith(".xml")) urls.push(loc);
		}
	}
	return urls.sort();
}

const current = { routes: collectRoutes(dist), sitemap: collectSitemapUrls() };

if (process.argv.includes("--update")) {
	writeFileSync(snapshotPath, JSON.stringify(current, null, "\t") + "\n");
	console.log(
		`Snapshot updated: ${current.routes.length} routes, ${current.sitemap.length} sitemap URLs.`
	);
	process.exit(0);
}

if (!existsSync(snapshotPath)) {
	console.error("No snapshot found — run with --update to capture one.");
	process.exit(1);
}

const snapshot = JSON.parse(readFileSync(snapshotPath, "utf8"));
let failed = false;
for (const key of ["routes", "sitemap"]) {
	const missing = snapshot[key].filter((u) => !current[key].includes(u));
	const added = current[key].filter((u) => !snapshot[key].includes(u));
	if (missing.length) {
		failed = true;
		console.error(`MISSING ${key} (present in snapshot, absent in build):`);
		missing.forEach((u) => console.error(`  - ${u}`));
	}
	if (added.length) {
		console.log(`New ${key} (not failing, but review):`);
		added.forEach((u) => console.log(`  + ${u}`));
	}
}

if (failed) {
	console.error("URL check FAILED — existing URLs changed or disappeared.");
	process.exit(1);
}
console.log(
	`URL check passed: ${current.routes.length} routes, ${current.sitemap.length} sitemap URLs unchanged.`
);
