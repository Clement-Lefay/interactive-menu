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
    <Layout color={'white'}>
      <SEO
        pathname={product.slug}
        title={`${product.name} | Clement`}
        desc={product.desc}
        node={product.parent}
        // banner={product.cover.childImageSharp.resize.src}
        individual
      />
      <PBox py={10} px={[6, 6, 8, 10]}>
        <Category style={categoryAnimation}>{product.name}</Category>
        {/* <animated.h1 style={titleAnimation}>{product.title_detail}</animated.h1>
        <Description style={descAnimation}>
          <div dangerouslySetInnerHTML={{ __html: product.desc }} />
        </Description> */}
      </PBox>
      <Area style={pageAnimation}>
        {/* should find a default picture */}
        <Img fluid={product.image.childImageSharp.fluid} />
        <PBox py={10} px={[6, 6, 8, 10]}>
          <Description style={descAnimation}>{product.desc}</Description>
        </PBox>
      </Area>
      {/* <Content bg={product.color} py={10}>
        <PBox style={imagesAnimation} px={[6, 6, 8, 10]}>
          {images.nodes.map(image => (
            <Img alt={image.name} key={image.childImageSharp.fluid.src} fluid={image.childImageSharp.fluid} />
          ))}
        </PBox>
      </Content>
      <PBox style={{ textAlign: 'center' }} py={10} px={[6, 6, 8, 10]}>
        <h2>Want to start your own project?</h2>
        <PButton color={product.color} py={4} px={8}>
          Contact Us
        </PButton>
      </PBox> */}
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
