module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: data => data.title
      },
    layout: () => "layouts/meeting.njk",
    tags: () => ['event']
  }
}