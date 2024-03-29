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
const { google, outlook, ics } = require("calendar-link");

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
  eleventyConfig.addPassthroughCopy("src/files");
  eleventyConfig.addPassthroughCopy("src/pdfkit.js");
  eleventyConfig.addPassthroughCopy("src/blob-stream.js");

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

  eleventyConfig.addFilter("split", (string, splitter) => {
    return string.split(splitter);
  });

  // Custom inline date formatting using Luxon formats 'dd LLLL yyyy' etc
  eleventyConfig.addFilter("dateFormat", (date, format) => {
    const formattedDate = DateTime.fromJSDate(date).setZone("Europe/London");
    return formattedDate.toFormat(format);
  });

  // Humanly readable duration from date tag with param as end time e.g. {{ start | duration(end)}}
  eleventyConfig.addFilter("duration", (starts, ends) => {
    // Remove seconds/milliseconds to prevent awkward 'humanization'
    const roundDate = (_date) => {
      _date.setSeconds(0);
      _date.setMilliseconds(0);
      return _date;
    };

    const startFromISO = DateTime.fromISO(
      roundDate(new Date(starts)).toISOString()
    );

    const endFromISO = DateTime.fromISO(
      roundDate(new Date(ends)).toISOString()
    );

    return humanizeDuration(endFromISO.ts - startFromISO.ts);
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

  // Render Markdown
  eleventyConfig.addFilter("markdownify", function (value) {
    const md = new markdownIt({
      html: true,
      linkify: true,
      typographer: true,
    });

    return md.render(value);
  });

  // Check if is array
  eleventyConfig.addFilter("isArray", (item) => Array.isArray(item));

  // Handle Calendar Links
  eleventyConfig.addNunjucksShortcode(
    "calendarLinks",
    function (title, start, duration) {
      const splitDuration = duration.split(" ");
      const data = {
        title,
        start,
        duration: splitDuration,
      };

      return `
        <ul class="list-none leading-none p-5">
          <li class="mb-2"><a class="no-underline" href="${ics(
            data
          )}">Add to Calendar</a></li>
          <li class="mb-2"><a class="no-underline" href="${google(
            data
          )}">Add to Google Calendar</a></li>
          <li class="mb-2"><a class="no-underline" href="${outlook(
            data
          )}">Add to Outlook Calendar</a></li>
        </ul>
      `;
    }
  );

  // ... cssmin
  // ... jsmin

  eleventyConfig.addCollection("homepages", (collection) => {
    const pages = collection.getFilteredByGlob("src/utils/pageCardOrder.md");
    const cards = collection.getFilteredByGlob("src/layout/page-cards/*.md");
    const layout = pages.map((page) => page.data.order);

    const data = layout.flat().map(({ page }) => {
      return cards.find((card) => page === card.data.title);
    });

    return data;
  });

  // Events
  eleventyConfig.addCollection("events", (collection) => {
    const events = collection.getFilteredByGlob("src/meetings/*.md");

    return events;
  });

  // Protocols
  eleventyConfig.addCollection("protocols", (collection) => {
    const protocols = collection.getFilteredByGlob("src/protocols/*.md");

    return protocols;
  });

  // Procedures
  eleventyConfig.addCollection("procedures", (collection) => {
    const procedures = collection.getFilteredByGlob("src/procedures/*.md");

    return procedures;
  });

  // Reporting Standards
  eleventyConfig.addCollection("reporting", (collection) => {
    const reportingStandards = collection.getFilteredByGlob(
      "src/reporting-standards/*.md"
    );

    return reportingStandards;
  });

  // Advice Documents
  eleventyConfig.addCollection("advice", (collection) => {
    const adviceDocuments = collection.getFilteredByGlob("src/advice/*.md");

    return adviceDocuments;
  });

  // Groups
  eleventyConfig.addCollection("groups", (collection) => {
    const groups = collection.getFilteredByGlob("src/groups/*.md");

    return groups;
  });

  // Pages
  eleventyConfig.addCollection("pages", (collection) => {
    const groups = collection.getFilteredByGlob("src/pages/**/*");

    return groups;
  });

  // Videos
  eleventyConfig.addCollection("videos", (collection) => {
    const videos = collection.getFilteredByGlob("src/videos/**/*");

    return videos;
  });

  // Hubs
  eleventyConfig.addCollection("hubs", (collection) => {
    const groups = collection.getFilteredByGlob("src/hubs/**/*");

    return groups;
  });

  // Custom Collections

  eleventyConfig.addCollection("futureEvents", (collection) => {
    const allEvents = collection.getFilteredByGlob("src/meetings/*.md");
    const futureEvents = allEvents.filter((item) => {
      const start = new Date(item.data.start).toISOString();
      const d1 = DateTime.fromISO(start).toMillis();
      const d2 = DateTime.now().toMillis();

      return d1 >= d2;
    });
    return futureEvents;
  });

  eleventyConfig.addCollection("pastEvents", (collection) => {
    const allEvents = collection.getFilteredByGlob("src/meetings/*.md");
    const pastEvents = allEvents.filter((item) => {
      const start = new Date(item.data.start).toISOString();
      const d1 = DateTime.fromISO(start).toMillis();
      const d2 = DateTime.now().toMillis();
      return d1 < d2;
    });

    return pastEvents;
  });

  eleventyConfig.addCollection("pastEventsSorted", (collection) => {
    const allEvents = collection.getFilteredByGlob("src/meetings/*.md");
    const pastEvents = allEvents.filter((item) => {
      const start = new Date(item.data.start).toISOString();
      const d1 = DateTime.fromISO(start).toMillis();
      const d2 = DateTime.now().toMillis();
      return d1 < d2;
    });
    const sortedEvents = pastEvents.sort(function (a, b) {
      let firstStart = new Date(a.data.start).toISOString();
      let secondStart = new Date(b.data.start).toISOString();

      firstStart = DateTime.fromISO(firstStart).toMillis();
      secondStart = DateTime.fromISO(secondStart).toMillis();

      return secondStart - firstStart; // sort by date - descending
    });

    return sortedEvents;
  });

  eleventyConfig.addCollection("sortedGroups", (collection) => {
    const groups = collection.getFilteredByGlob("src/groups/*.md");

    if (groups?.length > 0) {
      return groups.sort((a, b) => a.fileSlug.localeCompare(b.fileSlug));
    }
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
