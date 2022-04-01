module.exports = {
  eleventyComputed: {
    groups: (data) => data.groups,

    eleventyNavigation: {
      key: (data) => data.title,
      title: (data) => data.title,
      parent: (data) => data.groups[0],
    },
    layout: () => "layouts/meeting.njk",
    tags: () => ["event"],
    sidebar: true,
  },
};
