// Modules
const readableDate = require("./_11ty/date.js");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const embeds = require("eleventy-plugin-embed-everything");
const dotenv = require("dotenv").config();
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const { DateTime } = require("luxon");
var humanizeDuration = require("humanize-duration");
const pluginSEO = require("eleventy-plugin-seo");
const site = require("./src/_data/site.json");

console.log("Running in " + process.env.NODE_ENV + " environment...");

module.exports = function (eleventyConfig) {
  // Markdown
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      linkify: true,
      typographer: true,
    }).use(markdownItAnchor)
  );

  // Layout aliases
  eleventyConfig.addLayoutAlias("default", "layouts/base.njk");

  /* Pass through */
  eleventyConfig.addPassthroughCopy("src/images");

  // @TODO - The line below causes an error due to the first point here:
  // https://www.11ty.dev/blog/eleventy-one-point-oh/#minor
  // https://github.com/11ty/eleventy/issues/1677
  // It seems to think we're passing src/admin through twice.

  // eleventyConfig.addPassthroughCopy('src/admin')

  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"],
    wrapper: "nav",
    wrapperClass: "toc",
  });

  eleventyConfig.addPlugin(embeds);

  eleventyConfig.addPlugin(pluginSEO, {
    title: site.title,
    description: site.description,
    url: site.baseUrl,
    author: site.author.name,
    twitter: site.twitter,
    image: site.featuredImage,
  });

  // Filters
  eleventyConfig.addFilter("date", readableDate);

  // Custom inline date formatting using Luxon formats 'dd LLLL yyyy' etc
  eleventyConfig.addFilter("dateFormat", (date, format) => {
    const dateFromISO = DateTime.fromISO(new Date(date).toISOString());
    return dateFromISO.toFormat(format);
  });

  // Humanly readable duration from date tag with param as end time e.g. {{ start | duration(end)}}
  eleventyConfig.addFilter("duration", (starts, ends) => {
    const startFromISO = DateTime.fromISO(new Date(starts).toISOString());
    const endFromISO = DateTime.fromISO(new Date(ends).toISOString());
    const duration = endFromISO.ts - startFromISO.ts;

    return humanizeDuration(duration);
  });

  // Limit array results
  eleventyConfig.addFilter("limit", (arr, limit) => {
    return arr.slice(0, limit);
  });

  // Map over array by a given key
  eleventyConfig.addFilter("map", (array, key) => {
    return array.map((item) => item[key]);
  });

  // Filter over array "where" object key has the given value
  eleventyConfig.addFilter("where", (array, key, value) => {
    const filteredArray = array.filter((item) => {
      if (typeof item[key] === "object") {
        return item[key].find((entry) => entry === value);
      }
      return item[key] === value;
    });

    return filteredArray;
  });

  // Helper to convert a value to JSON
  eleventyConfig.addFilter("json", (value) => {
    return JSON.stringify(value);
  });

  // Dump circular data
  eleventyConfig.addFilter("dump", (obj) => {
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

    return JSON.stringify(obj, getCircularReplacer(), 4);
  });

  // ... cssmin
  // ... jsmin

  // Events
  eleventyConfig.addCollection("events", (collection) => {
    const events = collection.getFilteredByGlob("src/meetings/*.md");

    return events;
  });

  // Groups
  eleventyConfig.addCollection("groups", (collection) => {
    const groups = collection.getFilteredByGlob("src/groups/*.md");

    console.log("GROUPS", groups);

    return groups;
  });

  // Custom Collections

  eleventyConfig.addCollection("futureEvents", (collection) => {
    let allEvents = collection.getFilteredByGlob("src/meetings/*.md");
    let futureEvents = allEvents.filter((item) => {
      let d1 = DateTime.fromISO(item.data.start).toMillis();
      let d2 = DateTime.now().toMillis();
      return d1 >= d2;
    });
    return futureEvents;
  });

  eleventyConfig.addCollection("pastEvents", (collection) => {
    let allEvents = collection.getFilteredByGlob("src/meetings/*.md");
    let futureEvents = allEvents.filter((item) => {
      let d1 = DateTime.fromISO(item.data.start).toMillis();
      let d2 = DateTime.now().toMillis();
      return d1 < d2;
    });
    return futureEvents;
  });

  // Custom Shortcodes

  // Transforms
  if (process.env.NODE_ENV == "production") {
    eleventyConfig.addTransform("htmlmin", require("./_11ty/htmlmin.js"));
  }

  // Deep merge on front matter data such as tags
  eleventyConfig.setDataDeepMerge(true);

  return {
    dir: { input: "src", output: "dist", data: "_data" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "css", "html", "yml"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
