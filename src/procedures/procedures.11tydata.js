module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      title: (data) => data.title,
      parent: (data) => data.groups[0],
    },
    layout: () => "layouts/procedure.njk",
    tags: () => ["procedure"],
    files: (data) => data.files.replace("src", ""),
  },
};
