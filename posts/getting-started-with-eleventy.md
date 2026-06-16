---
title: Getting Started with Eleventy
description: A brief look at what makes 11ty a great choice for a personal blog.
date: 2026-06-10
tags:
  - posts
  - eleventy
  - web
layout: post.njk
---

[Eleventy](https://www.11ty.dev/) (11ty) is a simple static site generator that stays out of your way. No client-side JavaScript by default, no opinionated framework — just your content, your templates, and fast builds.

## Why 11ty

- **Zero client-side JS by default** — what you write is what ships
- **Multiple template languages** — Nunjucks, Liquid, Markdown, HTML, and more
- **Fast builds** — even large sites build in seconds
- **Highly configurable** — collections, filters, shortcodes, plugins

## Getting started

```bash
npm install @11ty/eleventy
npx eleventy --serve
```

That's genuinely all you need. Write a Markdown file, add a layout, and you have a blog.

## File structure

A minimal 11ty blog looks something like this:

```
_includes/
  base.njk
_data/
  site.js
posts/
  first-post.md
index.njk
```

From there you build up however you need to.
