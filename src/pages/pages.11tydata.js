module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      title: (data) => data.title,
    },
    layout: () => "layouts/page.njk",
    permalink: (data) => {
      console.log("DATA", data.category);
      if (data.category && data.category !== "generic") {
        return `${data.category}/${data.page.fileSlug}/index.html`;
      } else {
        return `/${data.page.fileSlug}/index.html`;
      }
    },
  },
};
