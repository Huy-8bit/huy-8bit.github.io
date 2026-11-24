# Writing

Articles live here as Markdown files. Files starting with `_` are ignored.

```md
---
title: A clear, specific title
description: One or two sentences for the article list, search results and social previews.
published: 2026-12-01
updated: 2026-12-10   # optional
tags: [postgresql, observability]   # optional
draft: true           # optional; drafts show in `npm run dev` only
---

Body in Markdown. Fenced code blocks are highlighted, tables scroll on small screens,
and images can be added with standard Markdown or <figure> elements.
```

The first published (non-draft) article turns on the "Writing" link in the header, the
section on the home page, `/writing/` and the RSS feed at `/writing/rss.xml`.
