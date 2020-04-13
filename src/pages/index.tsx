import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring'
import Layout from '../components/layout'
import GridItem from '../components/grid-item'
import SEO from '../components/SEO'
import { ChildImageSharp } from '../types'

type PageProps = {
  data: {
    lunchtimeProjects: {
      nodes: {
        title: string
        slug: string
        cover: ChildImageSharp
      }[]
    }
    afterworkProjects: {
      nodes: {
        title: string
        slug: string
        cover: ChildImageSharp
      }[]
    }
    instagram: ChildImageSharp
  }
}

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 35vw 40vw 25vw;
  grid-template-areas:
    'lunch-time lunch-time lunch-time'
    'afterwork-time afterwork-time afterwork-time'
    'instagram instagram instagram';

  @media (max-width: ${props => props.theme.breakpoints[3]}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 35vw 30vw 30vw 25vw;

    grid-template-areas:
      'lunch-time lunch-time lunch-time lunch-time'
      'afterwork-time afterwork-time afterwork-time afterwork-time'
      'afterwork-time afterwork-time afterwork-time afterwork-time'
      'instagram instagram instagram instagram';
  }

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 38vw);

    grid-template-areas:
      'lunch-time lunch-time'
      'lunch-time lunch-time'
      'afterwork-time afterwork-time'
      'afterwork-time afterwork-time'
      'afterwork-time afterwork-time'
      'instagram instagram';
  }

  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 50vw);

    grid-template-areas:
      'lunch-time'
      'lunch-time'
      'lunch-time'
      'afterwork-time'
      'afterwork-time'
      'afterwork-time'
      'instagram';
  }
`
const LunchTime = styled.div`
  grid-area: lunch-time;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`

const AfterworkTime = styled.div`
  grid-area: afterwork-time;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`

const Instagram = styled(GridItem)`
  grid-area: instagram;
`

const Index: React.FunctionComponent<PageProps> = ({ data: { lunchtimeProjects, afterworkProjects } }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  return (
    <Layout>
      <SEO />
      <Area style={pageAnimation}>
        <LunchTime>
          {lunchtimeProjects.nodes.map(project => (
            <GridItem to={project.slug} key={project.slug} aria-label={`View category "${project.title}"`}>
              <Img fluid={project.cover.childImageSharp.fluid} />
              <span>{project.title}</span>
            </GridItem>
          ))}
        </LunchTime>
        <AfterworkTime>
          {afterworkProjects.nodes.map(project => (
            <GridItem to={project.slug} key={project.slug} aria-label={`View category "${project.title}"`}>
              <Img fluid={project.cover.childImageSharp.fluid} />
              <span>{project.title}</span>
            </GridItem>
          ))}
        </AfterworkTime>
        {/* <Instagram to="/instagram" aria-label="See my Instagram pictures">
          <Img fluid={instagram.childImageSharp.fluid} />
          <span>Instagram</span>
        </Instagram> */}
      </Area>
    </Layout>
  )
}

export default Index

export const query = graphql`
  query Index {
    lunchtimeProjects: allCategoriesYaml(limit: 3) {
      nodes {
        title
        slug
        cover {
          childImageSharp {
            fluid(quality: 95, maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    afterworkProjects: allCategoriesYaml(limit: 2, skip: 3) {
      nodes {
        title
        slug
        cover {
          childImageSharp {
            fluid(quality: 95, maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    aboutUs: file(sourceInstanceName: { eq: "images" }, name: { eq: "about-us" }) {
      childImageSharp {
        fluid(quality: 95, maxWidth: 1200) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
