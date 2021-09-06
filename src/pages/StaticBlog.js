import React from 'react'
import Layout from '../components/layout'

export default function StaticBlog({ pageContext: { fetchedPosts } }) {
  return (
    <div>
      <Layout pageTitle="My Blog Posts">
        {fetchedPosts.map(post => (
          <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </Layout>
    </div>
  )
}
