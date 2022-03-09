module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      title: (data) => data.title,
      parent: (data) => data.category,
    },
    layout: () => "layouts/page.njk",
    tags: (data) => [data.category],
    permalink: (data) => {
      if (data.category && data.category !== "generic") {
        return `${data.category}/${data.page.fileSlug}/index.html`;
      } else {
        return `/${data.page.fileSlug}/index.html`;
      }
    },
  },
};
