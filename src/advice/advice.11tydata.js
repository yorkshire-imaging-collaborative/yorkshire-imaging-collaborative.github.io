module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      title: (data) => data.title,
      parent: (data) => data.groups[0],
    },
    layout: () => "layouts/page.njk",
    tags: () => ["advice"],
    files: (data) => data.files.replace("src", ""),
  },
};
