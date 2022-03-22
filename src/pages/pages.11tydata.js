const slugify = require("slugify");

module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      title: (data) => data.title,
      parent: (data) => data.hub || "",
      key: (data) => data.title || "",
    },
    layout: (data) =>
      data.is_mini_hub ? "layouts/mini-hub.njk" : "layouts/page.njk",
    permalink: (data) => {
      return `${slugify(data.hub)}/${data.page.fileSlug}/index.html`;
    },
  },
};
