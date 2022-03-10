module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      title: (data) => data.title,
      parent: (data) => data.category,
    },
    tags: (data) => [data.category],
    layout: () => "layouts/page.njk",
    permalink: (data) => {
      if (data.category && data.category !== "generic") {
        return `${data.category}/${data.page.fileSlug}/index.html`;
      } else {
        return `/${data.page.fileSlug}/index.html`;
      }
    },
  },
};
