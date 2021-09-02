import React from 'react'

export default function StaticBlog({ pageContext: { fetchedPosts } }) {
  return (
    <div>
      {fetchedPosts.map(post => (
        <h1>{post.title}</h1>
      ))}
    </div>
  )
}
