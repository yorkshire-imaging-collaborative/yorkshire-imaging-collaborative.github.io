module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      title: (data) => data.title,
      parent: (data) => data.category[0],
      key: (data) => data.category[0],
    },
    tags: (data) => {
      return [...data.category];
    },
    layout: (data) =>
      data.is_mini_hub ? "layouts/mini-hub.njk" : "layouts/page.njk",
    permalink: (data) => {
      const categories = [...data.category];
      if (
        categories &&
        categories.filter(
          (category) => category === "nav" || category === "generic"
        ).length === 0
      ) {
        return `${categories[0]}/${data.page.fileSlug}/index.html`;
      } else if (data.is_mini_hub) {
        return `/${categories[0]}/index.html`;
      }

      return `/${data.page.fileSlug}/index.html`;
    },
  },
};
