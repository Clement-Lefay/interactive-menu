import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { config, animated, useSpring } from 'react-spring'

import { AnimatedBox } from '../elements'
import { ChildImageSharp } from '../types'
import Layout from '../components/layout'
import GridItem from '../components/grid-item'
import SEO from '../components/SEO'

const PBox = styled(AnimatedBox)`
  max-width: 1400px;
  margin: 0 auto;
`

const Category = styled(AnimatedBox)`
  letter-spacing: 0.05em;
  font-size: ${props => props.theme.fontSizes[1]};
  text-transform: uppercase;
`

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 35vw 40vw 25vw;

  @media (max-width: ${props => props.theme.breakpoints[3]}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 35vw 30vw 30vw 25vw;
  }

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 38vw);
  }

  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 50vw);
  }
`

type PageProps = {
  data: {
    categoryItems: {
      title: string
      title_detail: string
      color: string
      category: string
      desc: string
      slug: string
      parent: {
        modifiedTime: string
        birthTime: string
      }
      cover: {
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }
    }
    products: {
      nodes: {
        name: string
        image: ChildImageSharp
        slug: string
      }[]
    }
  }
}

const SubMenu: React.FunctionComponent<PageProps> = ({ data: { categoryItems, products } }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })
  const categoryAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })
  const imagesAnimation = useSpring({
    config: config.slow,
    delay: 800,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout color="white">
      <SEO
        pathname={categoryItems.slug}
        title={`${categoryItems.title} | Clement`}
        desc={categoryItems.desc}
        node={categoryItems.parent}
        banner={categoryItems.cover.childImageSharp.resize.src}
        individual
      />
      <PBox style={{ textAlign: 'center' }} py={10} px={[6, 6, 8, 10]}>
        <Category style={categoryAnimation}>{categoryItems.title}</Category>
      </PBox>
      <Area style={pageAnimation}>
        {/* got to prevent the case when products is empty or non existing */}
        {products.nodes.map(item => (
          <GridItem key={item.slug} to={item.slug} aria-label={`View item "${item.name}"`}>
            <Img fluid={item.image.childImageSharp.fluid} style={imagesAnimation} />
            <span>{item.name}</span>
          </GridItem>
        ))}
      </Area>
    </Layout>
  )
}

export default SubMenu

export const query = graphql`
  query SubMenuTemplate($slug: String!, $category: String!) {
    categoryItems: categoriesYaml(slug: { eq: $slug }) {
      title
      title_detail
      color
      category
      desc
      slug
      parent {
        ... on File {
          modifiedTime
          birthTime
        }
      }
      cover {
        childImageSharp {
          resize(width: 1200, height: 675, quality: 80) {
            src
          }
        }
      }
    }
    products: allProductsYaml(filter: { category: { eq: $category } }, sort: { fields: name, order: ASC }) {
      nodes {
        name
        slug
        image {
          childImageSharp {
            fluid(quality: 95, maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
