// Modules
const readableDate = require('./_11ty/date.js');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")
const pluginTOC = require('eleventy-plugin-toc')
const dotenv = require('dotenv').config()
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

console.log("Running in " + process.env.NODE_ENV + " environment...")

module.exports = function(eleventyConfig) {

    // Markdown
    eleventyConfig.setLibrary(
    'md',
    markdownIt().use(markdownItAnchor)
    )
  
    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');

    /* Pass through */
    eleventyConfig.addPassthroughCopy('src/images')
    eleventyConfig.addPassthroughCopy('src/admin')

    // Plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin)
    eleventyConfig.addPlugin(pluginTOC, {
      tags: ['h2', 'h3', 'h4'],
      wrapper: 'nav',
      wrapperClass: 'toc',
      ul: true,
      flat: true
    })
    

    // Filters
    eleventyConfig.addFilter('date', readableDate)
    // ... cssmin
    // ... jsmin

    // Custom Collections
    eleventyConfig.addCollection()

    // Custom Shortcodes

    // Transforms
    if (process.env.NODE_ENV == 'production') {
    eleventyConfig.addTransform("htmlmin", require('./_11ty/htmlmin.js') );
    }

    // Deep merge on front matter data such as tags
    eleventyConfig.setDataDeepMerge(true);
  
    return {
      dir: { input: 'src', output: 'dist', data: '_data' },
      passthroughFileCopy: true,
      templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
      htmlTemplateEngine: 'njk',
      markdownTemplateEngine: 'njk',
    }
  }