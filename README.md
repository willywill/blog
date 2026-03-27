# blog

Personal blog, built with [Astro](https://astro.build/) (static), MDX content collections, and `@astrojs/react` for future interactive components.

Use [Bun](https://bun.sh/) for installs and scripts (Astro still targets Node; `engines.node` applies for compatibility).

```bash
bun install
bun run dev      # http://localhost:4321
bun run build    # output: dist/
bun run preview  # serve dist/
```

Posts live in `src/content/blog/` as `.mdx` with frontmatter (`title`, `description`, `pubDate`, optional `cover`, `updatedDate`, `draft`). Site URL is set in `astro.config.mjs` (`site`).
