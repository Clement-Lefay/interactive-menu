import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { config, animated, useSpring } from 'react-spring'
import { transparentize, readableColor } from 'polished'
import Layout from '../components/layout'
import GridItem from '../components/grid-item'
import { Box, AnimatedBox, Button } from '../elements'
import SEO from '../components/SEO'
import { ChildImageSharp } from '../types'

const PBox = styled(AnimatedBox)`
  max-width: 1400px;
  margin: 0 auto;
`

const Content = styled(Box)<{ bg: string }>`
  background-color: ${props => transparentize(0.9, props.bg)};

  .gatsby-image-wrapper:not(:last-child) {
    margin-bottom: ${props => props.theme.space[10]};

    @media (max-width: ${props => props.theme.breakpoints[3]}) {
      margin-bottom: ${props => props.theme.space[8]};
    }
  }
`

const Category = styled(AnimatedBox)`
  letter-spacing: 0.05em;
  font-size: ${props => props.theme.fontSizes[1]};
  text-transform: uppercase;
`

const Description = styled(animated.div)`
  max-width: 960px;
  letter-spacing: -0.003em;
  --baseline-multiplier: 0.179;
  --x-height-multiplier: 0.35;
  line-height: 1.58;
`

const PButton = styled(Button)<{ color: string }>`
  background: ${props => (props.color === 'white' ? 'black' : props.color)};
  color: ${props => readableColor(props.color === 'white' ? 'black' : props.color)};
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
      products: {
        name: string
        image: {
          childImageSharp: {
            fluid: {
              aspectRatio: number
              src: string
              srcSet: string
              sizes: string
              base64: string
              tracedSVG: string
              srcWebp: string
              srcSetWebp: string
            }
          }
        }
        slug: string
      }[]
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

  const titleAnimation = useSpring({
    config: config.slow,
    delay: 300,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })
  const descAnimation = useSpring({
    config: config.slow,
    delay: 600,
    from: { opacity: 0 },
    to: { opacity: 1 },
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
        {/* <animated.h1 style={titleAnimation}>titleee</animated.h1> */}
        {/* <Description style={descAnimation}>
          <div dangerouslySetInnerHTML={{ __html: 'description' }} />
        </Description> */}
      </PBox>
      <Area style={pageAnimation}>
        {/* got to prevent the case when products is empty or non existing */}
        {products.nodes.map(item => (
          <GridItem key={item.slug} to={item.slug} aria-label={`View item "${item.name}"`}>
            <Img fluid={item.image.childImageSharp.fluid} />
            <span>{item.name}</span>
          </GridItem>
        ))}
      </Area>
    </Layout>
  )
}

export default SubMenu

// need to adapt the query when some data will be available
export const query = graphql`
  query SubMenuTemplate($slug: String!, $images: String!, $category: String!) {
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
    images: allFile(filter: { relativePath: { regex: $images } }, sort: { fields: name, order: ASC }) {
      nodes {
        name
        childImageSharp {
          fluid(quality: 95, maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp
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
              base64
              tracedSVG
              srcWebp
              srcSetWebp
              originalImg
              originalName
              presentationWidth
              presentationHeight
            }
          }
        }
      }
    }
  }
`
