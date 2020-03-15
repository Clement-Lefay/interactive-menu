// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // const projectTemplate = require.resolve('./src/templates/project.tsx')
  const subMenuTemplate = require.resolve('./src/templates/sub-menu.tsx')
  const productDetailsTemplate = require.resolve('./src/templates/product-details.tsx')

  const result = await wrapper(
    graphql(`
      {
        subMenus: allCategoriesYaml {
          nodes {
            slug
            images
            category
          }
        }
        products: allProductsYaml {
          nodes {
            slug
            name
          }
        }
      }
    `)
  )

  result.data.subMenus.nodes.forEach(node => {
    createPage({
      path: node.slug,
      component: subMenuTemplate,
      context: {
        slug: node.slug,
        images: `/${node.images}/`,
        category: node.category,
      },
    })
  })

  result.data.products.nodes.forEach(node => {
    createPage({
      path: node.slug,
      component: productDetailsTemplate,
      context: {
        slug: node.slug,
      },
    })
  })
}
