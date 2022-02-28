module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      title: (data) => data.title,
    },
    layout: () => "layouts/protocol.njk",
    tags: () => ["protocol"],
  },
};
