module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      title: (data) => data.title,
      parent: (data) => data.category || "",
      key: (data) => data.title || "",
    },
    layout: (data) =>
      data.is_mini_hub ? "layouts/mini-hub.njk" : "layouts/page.njk",
    //     permalink: (data) => {
    //       console.log("THIS IS DATA:", data);
    //       const {
    //         tags,
    //         page: { fileSlug },
    //         is_mini_hub,
    //         category,
    //       } = data;

    //       const isBasePage = tags && tags.find((tag) => tag === "nav");
    //       if (isBasePage) {
    //         return `${fileSlug}/index.html`;
    //       } else if (is_mini_hub) {
    //         return `${category}/index.html`;
    //       } else {
    //         return `${category}/${fileSlug}/index.html`;
    //       }
    //     },
    //   },
    // };
  },
};

// module.exports = {
//   eleventyComputed: {
//     eleventyNavigation: {
//       title: (data) => {
//         console.log("DATA TITLE", data.title);
//         return data.title;
//       },
//       parent: (data) => (data.category ? data.category : "Home"),
//       key: (data) => "technology",
//     },

//     tags: (data) => {
//       return data.tags;
//     },
//     layout: (data) =>
//       data.is_mini_hub ? "layouts/mini-hub.njk" : "layouts/page.njk",
//     permalink: (data) => {
//       console.log("THIS IS DATA:", data);
//       const {
//         tags,
//         page: { fileSlug },
//         is_mini_hub,
//         category,
//       } = data;

//       const isBasePage = tags && tags.find((tag) => tag === "nav");
//       if (isBasePage) {
//         return `${fileSlug}/index.html`;
//       } else if (is_mini_hub) {
//         return `${category}/index.html`;
//       } else {
//         return `${category}/${fileSlug}/index.html`;
//       }
//     },
//   },
// };
