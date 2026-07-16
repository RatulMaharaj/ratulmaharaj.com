// A view-source treat. It lives here as a raw string because Astro's
// compressHTML strips template comments, and the Astro compiler can't
// lex `<!--` inside .astro frontmatter.
export const asciiBanner = String.raw`<!--
            _         _
  _ __ __ _| |_ _   _| |
 | '__/ _${"`"} | __| | | | |
 | | | (_| | |_| |_| | |
 |_|  \__,_|\__|\__,_|_|

 source: https://github.com/RatulMaharaj/ratulmaharaj.com
 humans: https://ratulmaharaj.com/humans.txt
-->`;
