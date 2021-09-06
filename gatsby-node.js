const fetch = require('node-fetch')
const path = require('path')

exports.createPages = async ({ actions: { createPage } }) => {

  async function getMostRecentPosts() {
    const query = {
      filterBy: [
        {
          path: "/_meta/schema",
          value: "https://blog.com/post",
        },
      ],
      page: {
        size: 3,
      },
      parameters: {
        depth: "all",
        format: "inlined",
      },
    };
    const response = await fetch(
      `https://eu-west-1.cdv2.content.amplience-turing.net/content/filter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-src-host': `cdv3`,
        },
        body: JSON.stringify(query),
      }
    );
  
    return extractContentFromFilterByResponse(await response.json());
  }
  
  function extractContentFromFilterByResponse({ responses }) {
    return responses.map(({ content }) => {
      content.slug = content._meta.deliveryKey;
      console.log(content);
      return content;
    });
  }
  

  const fetchedPosts = await getMostRecentPosts();
  // Create a page 
  createPage({
    path: `/StaticBlog`,
    component: path.resolve('./src/pages/StaticBlog.js'),
    context:  {fetchedPosts} 
  })

}
 