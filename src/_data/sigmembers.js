const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function () {
  let url =
    "https://yorkshire-imaging-cms.netlify.app/.netlify/functions/hello-world";

  return (results = Cache(url, {
    duration: "1h",
    type: "json",
  }));
};
