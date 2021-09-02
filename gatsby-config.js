import {getMostRecentPosts} from './src/api/api'

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Gatsby Data Fetching",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      }
    },
  ],
};
exports.createPages = async ({ actions: { createPage } }) => {
  // `getPokemonData` is a function that fetches our data
  const data = await getMostRecentPosts()

  // Create a page that lists all Pokémon.
  createPage({
    path: `/static-blog`,
    component: require.resolve("./src/components/StaticBlog.js"),
    context: { fetchedPosts },
  })

}