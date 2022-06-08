module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      title: (data) => data.title,
      key: (data) => data.title,
    },
    layout: "layouts/mini-hub.njk",
    permalink: (data) => `${data.page.fileSlug}/index.html`,
  },
};
