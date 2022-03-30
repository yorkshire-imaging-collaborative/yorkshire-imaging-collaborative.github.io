module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      parent: "Groups",
      title: (data) => data.title,
      key: (data) => data.title,
    },
    layout: () => "layouts/sig.njk",
    tags: (data) => {
      console.log(data.tags);
      return ["event", ...data.tags];
    },
  },
};
