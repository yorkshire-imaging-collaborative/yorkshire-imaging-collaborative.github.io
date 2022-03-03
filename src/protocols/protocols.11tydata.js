module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.page.fileSlug,
      title: (data) => data.title,
    },
    layout: () => "layouts/protocol.njk",
    tags: () => ["protocol"],
  },
};
