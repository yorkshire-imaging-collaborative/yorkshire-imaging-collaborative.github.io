module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      parent: "Groups",
    },
    layout: () => "layouts/sig.njk",
    tags: () => ["event"],
  },
};
