module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      title: (data) => data.title,
    },
    layout: () => "layouts/page.njk",
    tags: ["tech"],
  },
};
