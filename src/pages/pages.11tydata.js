module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      title: (data) => data.title,
      parent: (data) => {
        if (data.categories.find((cat) => cat === "nav")) {
          return "Home";
        }

        return data.categories[0];
      },
      key: (data) => data.categories[0],
    },
    tags: (data) => {
      return data.tags;
    },
    layout: (data) =>
      data.is_mini_hub ? "layouts/mini-hub.njk" : "layouts/page.njk",
    permalink: (data) => {
      const { categories, tags } = data;

      const isBasePage =
        categories.find((cat) => cat === "nav" || cat === "generic") ||
        tags.find((tag) => tag === "nav");

      if (isBasePage) {
        return `/${data.page.fileSlug}/index.html`;
      } else if (data.is_mini_hub) {
        return `/${categories[0]}/index.html`;
      } else {
        return `${categories[0]}/${data.page.fileSlug}/index.html`;
      }
    },
  },
};
