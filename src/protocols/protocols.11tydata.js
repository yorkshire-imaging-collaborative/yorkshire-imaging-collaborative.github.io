const { default: slugify } = require("slugify");

module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      title: (data) => data.title,
      parent: (data) => data.groups[0],
    },
    layout: () => "layouts/protocol.njk",
    tags: () => ["protocol"],
    files: (data) => data.files.replace('src', ''),
  },
};
