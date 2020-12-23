import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import { startCase } from 'lodash'

const Posts = ({ data, pageContext }) => {
  const posts = data.allPrismicPost.edges
  const { humanPageNumber, basePath } = pageContext
  const isFirstPage = humanPageNumber === 1
  let featuredPost
  let ogImage

  try {
    featuredPost = posts[0].node
  } catch (error) {
    featuredPost = null
  }

  return (
    <Layout>
      <SEO
        title={startCase(basePath)}
        image={featuredPost.data.heroimage.url}
      />
      <Container>
        {isFirstPage ? (
          <CardList>
            <Card
              featured
              basePath={basePath}
              slug={featuredPost.uid}
              title={featuredPost.data.title[0].text}
              image={featuredPost.data.heroimage.url}
              date={featuredPost.data.date}
            />
            {posts.slice(1).map(({ node: post }) => (
              <Card
                key={post.id}
                basePath={basePath}
                slug={post.uid}
                title={post.data.title[0].text}
                image={post.data.heroimage.url}
                date={post.data.date}
              />
            ))}
          </CardList>
        ) : (
          <CardList>
            {posts.map(({ node: post }) => (
              <Card
                key={post.id}
                basePath={basePath}
                slug={post.uid}
                title={post.data.title[0].text}
                image={post.data.heroimage.url}
                date={post.data.date}
              />
            ))}
          </CardList>
        )}
      </Container>
      <Pagination context={pageContext} />
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allPrismicPost(
      sort: { fields: data___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          uid
          id
          data {
            title {
              type
              text
            }
            heroimage {
              url
            }
            content {
              type
              text
            }
            date
          }
        }
      }
    }
  }
`

export default Posts
