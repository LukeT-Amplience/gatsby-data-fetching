import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import {getMostRecentPosts} from './../api/api'


export default function Blog({ data }) {

  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
   
    const fetchData = async () => {

      const data = await getMostRecentPosts();
      setFetchedData(data);
      console.log({fetchedData});
    }
    fetchData()
  }, [])

  return (
    <Layout pageTitle="My Blog Posts">
      {fetchedData.map(post => (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          
        </div>
      ))}
      <h2></h2>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile {
      nodes {
        name
      }
    }
  }
`
