import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Container from '../components/Container'
import PageBody from '../components/PageBody'
import TagList from '../components/TagList'
import PostLinks from '../components/PostLinks'
import PostDetails from '../components/PostDetails'
import SEO from '../components/SEO'

const PostTemplate = ({ data, pageContext }) => {
  const {
    date,
    title,
    heroimage,
    content,
  } = data.prismicPost.data

  // const previous = pageContext.prev
  // const next = pageContext.next
  // const { basePath } = pageContext

  return (
    <Layout>
      <SEO
        title={title[0].text}
        image={heroimage.url}
      />
      <Hero
        title={title[0].text}
        image={heroimage.url}
      />
      <Container>
        <PostDetails
          date={date}
        />
        <PageBody body={content[0].text} />
      </Container>
      {/* <PostLinks previous={previous} next={next} basePath={basePath} /> */}
    </Layout>
  )
}

export const query = graphql`
  query($uid: String!) {
    prismicPost(uid: { eq: $uid }) {
      uid
      data {
        date
        title {
          text
        }
        heroimage {
          url
        }
        content {
          text
        }
      }
    }
  }
`

export default PostTemplate
