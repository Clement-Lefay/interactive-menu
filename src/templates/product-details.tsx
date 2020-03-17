import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { transparentize, readableColor } from 'polished'
import styled from 'styled-components'
import { config, useSpring, animated } from 'react-spring'
import Layout from '../components/layout'
import { Box, AnimatedBox, Button } from '../elements'
import SEO from '../components/SEO'
import { ChildImageSharp } from '../types'

const PBox = styled(AnimatedBox)`
  max-width: 1400px;
  margin: 0 auto;
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

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 50vw;
`

const PButton = styled(Button)<{ color: string }>`
  background: ${props => (props.color === 'white' ? 'black' : props.color)};
  color: ${props => readableColor(props.color === 'white' ? 'black' : props.color)};
`

type PageProps = {
  data: {
    product: {
      name: string
      category: string
      slug: string
      desc: string
      price: number
      parent: {
        modifiedTime: string
        birthTime: string
      }
      image: ChildImageSharp
    }
  }
}

const Project: React.FunctionComponent<PageProps> = ({ data: { product } }) => {
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
        pathname={product.slug}
        title={`${product.name} | Clement`}
        desc={product.desc}
        node={product.parent}
        // banner={product.cover.childImageSharp.resize.src}
        individual
      />
      <PBox py={10} px={[6, 6, 8, 10]} style={{ textAlign: 'center' }}>
        <animated.h1 style={categoryAnimation}>{product.name}</animated.h1>
      </PBox>
      <Area style={pageAnimation}>
        {/* should find a default picture */}
        <Img fluid={product.image.childImageSharp.fluid} style={imagesAnimation} />
        <PBox py={10} px={[6, 6, 8, 10]}>
          <Description style={descAnimation}>{product.desc}</Description>
          {/* see allergen */}
        </PBox>
      </Area>
    </Layout>
  )
}

export default Project

export const query = graphql`
  query ProductTemplate($slug: String!) {
    product: productsYaml(slug: { eq: $slug }) {
      name
      category
      price
      slug
      desc
      parent {
        ... on File {
          modifiedTime
          birthTime
        }
      }
      image {
        childImageSharp {
          fluid(quality: 95) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`
