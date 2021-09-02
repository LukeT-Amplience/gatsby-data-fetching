import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import {getMostRecentPosts} from './../api/api'

export default function Index() {

  return (
    <main>
      <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
        src="https://mma.prnewswire.com/media/1336916/Amplience_Logo.jpg?p=publish"
      />
    </Layout>
    </main>
  )
}


