const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function () {
  let url =
    "https://v1.nocodeapi.com/danfascia/airtable/EXUHjXTkuTzMBBXe?tableName=tblRVOuut4NpY7ekE&fields=Title,FullName,MembersNames,groupTag&view=ALL&perPage=all";

  return (results = Cache(url, {
    duration: "1h",
    type: "json",
  }));
};
