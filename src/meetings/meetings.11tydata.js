module.exports = {
  eleventyComputed: {
    groups: (data) => data.groups,

    eleventyNavigation: {
      key: (data) => data.title,
      title: (data) => data.title,
    },
    layout: () => "layouts/meeting.njk",
    tags: () => ["event"],
  },
};
