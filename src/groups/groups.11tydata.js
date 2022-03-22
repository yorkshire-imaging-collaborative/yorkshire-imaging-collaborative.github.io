module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      parent: "Groups",
      key: (data) => data.title,
    },
    layout: () => "layouts/sig.njk",
    tags: () => ["event"],
  },
};
