module.exports = {
    eleventyComputed: {
      eleventyNavigation: {
        key: (data) => data.title,
        title: (data) => data.title,
        parent: (data) => "Videos"
      },
      layout: () => "layouts/video.njk",
      tags: () => ["video"],
      thumbnail: (data) => "https://img.youtube.com/vi/" + data.youtube_id + "/hqdefault.jpg"
    },
  };