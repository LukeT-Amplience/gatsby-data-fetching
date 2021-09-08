export async function getMostRecentPosts() {
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

export async function getPostBySlug(slug) {
  const AMPLIENCE_HUB="cdv3"

  const response = await fetch(
    `https://eu-west-1.cdv2.content.amplience-turing.net/content/key/${slug}?depth=all&format=inlined`,
    {
      headers: {
        "Content-Type": "application/json",
        host: `${AMPLIENCE_HUB}`,
      },
    }
  );
  return extractContent(await response.json());
}

function extractContent({ content }) {
  content.slug = content._meta.deliveryKey;
  return content;
}