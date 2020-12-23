const config = require('./gatsby-config')
const path = require(`path`)
const { paginate } = require(`gatsby-awesome-pagination`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const basePath = config.siteMetadata.basePath || '/'

  // Create a page for each "post"
  const postsQuery = await graphql(query.posts)
  const posts = postsQuery.data.allPrismicPost.edges
  posts.forEach((post, i) => {
    const next = i === posts.length - 1 ? null : posts[i + 1].node
    const prev = i === 0 ? null : posts[i - 1].node

    createPage({
      path: `${basePath === '/' ? '' : basePath}/${post.node.uid}/`,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        uid: post.node.uid,
        basePath: basePath === '/' ? '' : basePath,
        prev,
        next,
      },
    })
  })

  // Create a page containing all "posts" and paginate.
  paginate({
    createPage,
    component: path.resolve(`./src/templates/posts.js`),
    items: posts,
    itemsPerFirstPage: config.siteMetadata.postsPerFirstPage || 7,
    itemsPerPage: config.siteMetadata.postsPerPage || 6,
    pathPrefix: basePath,
    context: {
      basePath: basePath === '/' ? '' : basePath,
      paginationPath: basePath === '/' ? '' : `/${basePath}`,
    },
  })

  // Create "tag" page and paginate
  // const tagsQuery = await graphql(query.tags)
  // const tags = tagsQuery.data.allPrismicTag.edges

  // tags.forEach((tag, i) => {
  //   const tagPagination =
  //     basePath === '/'
  //       ? `/tag/${tag.node.uid}`
  //       : `/${basePath}/tag/${tag.node.uid}`

  //   paginate({
  //     createPage,
  //     component: path.resolve(`./src/templates/tag.js`),
  //     items: tag.node.post || [],
  //     itemsPerPage: config.siteMetadata.postsPerPage || 6,
  //     pathPrefix: tagPagination,
  //     context: {
  //       uid: tag.node.uid,
  //       basePath: basePath === '/' ? '' : basePath,
  //       paginationPath: tagPagination,
  //     },
  //   })
  // })

  // // Create a page for each "page"
  // const pagesQuery = await graphql(query.pages)
  // const pages = pagesQuery.data.allPrismicPage.edges
  // pages.forEach((page, i) => {
  //   createPage({
  //     path: `/${page.node.uid}/`,
  //     component: path.resolve(`./src/templates/page.js`),
  //     context: {
  //       uid: page.node.uid,
  //     },
  //   })
  // })
}

const query = {
  posts: `{
    allPrismicPost(sort: { fields: [last_publication_date], order: DESC }) {
      edges {
        node {
          uid
        }
      }
    }
  }`,
  // pages: `{
  //   allPrismicPage {
  //     edges {
  //       node {
  //         uid
  //       }
  //     }
  //   }
  // }`,
  // tags: `{
  //   allPrismicTag {
  //     edges {
  //       node {
  //         uid
  //         post {
  //           id
  //         }
  //       }
  //     }
  //   }
  // }`,
}
