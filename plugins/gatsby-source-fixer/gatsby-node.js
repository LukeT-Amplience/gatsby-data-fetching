const fetch = require('node-fetch')

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { createNode } = actions
  
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
      return content;
    });
  }
  

  const fetchedPosts = await getMostRecentPosts();
  fetchedPosts.map (post => {
    const idNumber = Math.floor(Math.random() * 10);
    post = {id: idNumber,
    ...post}
    console.log(post.id);
    createNode({id: createNodeId(10),internal:{contentDigest: 'digest', type:'myNodetype'}, post});
  })

  return
}