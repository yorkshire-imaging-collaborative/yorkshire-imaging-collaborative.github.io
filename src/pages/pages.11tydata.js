module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      title: (data) => data.title,
      parent: (data) => (data.parent ? data.parent : "Home"),
      key: (data) => data.categories,
    },
    tags: (data) => {
      return data.tags;
    },
    layout: (data) =>
      data.is_mini_hub ? "layouts/mini-hub.njk" : "layouts/page.njk",
    permalink: (data) => {
      const { tags, page, is_mini_hub, categories } = data;
      const isBasePage = tags && tags.find((tag) => tag === "nav");
      if (isBasePage) {
        return `${page.fileSlug}/index.html`;
      } else if (is_mini_hub) {
        return `${categories}/index.html`;
      } else {
        return `${categories}/${page.fileSlug}/index.html`;
      }
    },
  },
};
