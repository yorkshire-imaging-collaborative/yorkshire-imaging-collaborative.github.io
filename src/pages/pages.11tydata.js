module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      title: (data) => data.title,
      parent: (data) => data.category,
    },
    tags: (data) => [data.category],
    layout: (data) =>
      data.is_mini_hub ? "layouts/mini-hub.njk" : "layouts/page.njk",
    permalink: (data) => {
      if (data.is_mini_hub) {
        return `${data.category}/index.html`;
      } else if (
        data.category &&
        data.category !== "generic" &&
        data.category !== "nav"
      ) {
        return `${data.category}/${data.page.fileSlug}/index.html`;
      } else {
        return `/${data.page.fileSlug}/index.html`;
      }
    },
  },
};
