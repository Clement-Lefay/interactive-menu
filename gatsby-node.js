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
  // add the product template

  const result = await wrapper(
    graphql(`
      {
        subMenus: allCategoriesYaml {
          nodes {
            slug
            images
          }
        }
        products: allCategoriesYaml {
          nodes {
            products {
              slug
              name
            }
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
      },
    })
  })
  // before applying the template to the product, we need to merge all products together in order to apply the same. No need to do a 2 level loop
}
