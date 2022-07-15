module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      parent: "Groups",
      title: (data) => data.title,
      key: (data) => data.title,
    },
    // groupKey: (data) => data.groupKey
    layout: () => "layouts/sig.njk",
    tags: (data) => {
      console.log(data.tags);
      return ["event", ...data.tags];
    },
    files: (data) => data.files.replace('src', ''),
  },
}
