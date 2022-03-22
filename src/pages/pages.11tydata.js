const slugify = require("slugify");

module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      title: (data) => data.title,
      parent: (data) => data.hub || "",
      key: (data) => data.title || "",
    },
    layout: "layouts/page.njk",
    permalink: (data) => {
      return `${data.hub ? `${slugify(data.hub)}/` : ""}${
        data.page.fileSlug
      }/index.html`;
    },
  },
};
