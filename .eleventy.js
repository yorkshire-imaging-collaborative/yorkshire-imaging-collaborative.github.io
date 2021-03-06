// Modules
const readableDate = require('./_11ty/date.js');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")
const pluginTOC = require('eleventy-plugin-nesting-toc')
const embeds = require("eleventy-plugin-embed-everything")
const dotenv = require('dotenv').config()
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
var { DateTime } = require('luxon');
var humanizeDuration = require('humanize-duration')

console.log("Running in " + process.env.NODE_ENV + " environment...")

module.exports = function(eleventyConfig) {

    // Markdown
    eleventyConfig.setLibrary(
    'md',
    markdownIt({ 
      html: true,
      linkify: true,
      typographer: true,
    }).use(markdownItAnchor)
    )
  
    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');

    /* Pass through */
    eleventyConfig.addPassthroughCopy('src/images')
    eleventyConfig.addPassthroughCopy('src/admin')

    // Plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin)
    eleventyConfig.addPlugin(pluginTOC, {
      tags: ['h2', 'h3'],
      wrapper: 'nav',
      wrapperClass: 'toc',
    })
    eleventyConfig.addPlugin(embeds)
    

    // Filters
    eleventyConfig.addFilter('date', readableDate)
    
    // Custom inline date formatting using Luxon formats 'dd LLLL yyyy' etc
    eleventyConfig.addFilter('dateFormat', (date, format) => {
      return DateTime.fromISO(date).toFormat(format)
    })

    // Humanly readable duration from date tag with param as end time e.g. {{ start | duration(end)}}
    eleventyConfig.addFilter('duration', (starts, ends) => {
      duration = DateTime.fromISO(ends).toMillis() - DateTime.fromISO(starts).toMillis()
      return humanizeDuration(duration)
    })

    // Limit array results
    eleventyConfig.addFilter('limit', (arr, limit)=> {
      return arr.slice(0, limit)
    })


    // ... cssmin
    // ... jsmin

    // Custom Collections

    eleventyConfig.addCollection('futureEvents', (collection)=>{
      let allEvents = collection.getFilteredByGlob("src/meetings/*.md")
      let futureEvents = allEvents.filter( (item) => {
        let d1 = DateTime.fromISO(item.data.start).toMillis()
        let d2 = DateTime.now().toMillis()
        return d1 >= d2
      } )
      return futureEvents
    })

    eleventyConfig.addCollection('pastEvents', (collection)=>{
      let allEvents = collection.getFilteredByGlob("src/meetings/*.md")
      let futureEvents = allEvents.filter( (item) => {
        let d1 = DateTime.fromISO(item.data.start).toMillis()
        let d2 = DateTime.now().toMillis()
        return d1 < d2
      } )
      return futureEvents
    })

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