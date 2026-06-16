import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import rssPlugin from "@11ty/eleventy-plugin-rss";

export default async function(eleventyConfig) {
	// Plugins
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(rssPlugin);

	// Passthrough
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("js");
	eleventyConfig.addPassthroughCopy("img");

	// Collections
	eleventyConfig.addCollection("posts", col =>
		col.getFilteredByGlob("posts/**/*.md").sort((a, b) => b.date - a.date)
	);

	eleventyConfig.addCollection("toys", col =>
		col.getFilteredByGlob("toys/**/*.md").sort((a, b) => b.date - a.date)
	);

	eleventyConfig.addCollection("tagList", col => {
		const tags = new Set();
		col.getAll().forEach(item => (item.data.tags || []).forEach(t => tags.add(t)));
		return [...tags].filter(t => !["posts", "all"].includes(t)).sort();
	});

	// Filters
	eleventyConfig.addFilter("readingTime", content => {
		const words = content.trim().split(/\s+/).length;
		const mins = Math.ceil(words / 200);
		return mins === 1 ? "1 min read" : `${mins} min read`;
	});

	eleventyConfig.addFilter("dateDisplay", date =>
		new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
	);

	eleventyConfig.addFilter("dateToISO", date => new Date(date).toISOString());

	return {
		dir: {
			input: ".",
			output: "_site",
			includes: "_includes",
			data: "_data"
		},
		templateFormats: ["njk", "md", "html"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk"
	};
};