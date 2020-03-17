import React from 'react'
import { config, useSpring } from 'react-spring'
import Layout from '../components/layout'
import { AnimatedBox } from '../elements'
import SEO from '../components/SEO'

const About = () => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout>
      <SEO title="About | Clement" desc="Hi. I'm Clement and this is an experiment of an interractive mennu" />
      <AnimatedBox style={pageAnimation} py={[6, 6, 6, 8]} px={[6, 6, 8, 6, 8, 13]}>
        <h1>Hi I'm Clement =)</h1>
        <p>
          An international Frenchman who likes to help people making their life easier, both physicaly and digitaly. When something has to
          be done, I don"t hesitate to put my hands on it and do it. Either building IKEA furnitures, speaking out loud hard topics that
          slows down our team, making smalls tools that simplify some redundant tasks, refining the project I am working on.
        </p>
        <p>
          The environment around me is very important and I try to spend a bit of my energy to make it good, even improve it sometimes! Just
          ask any of my previous teammate, you will not be decepointed!
        </p>
        <p>Of course, this is just a little bit of my personality and what people, both professionally and personally, can appreciate.</p>
        <p>
          Now, I'm in Canada to try to see if this country is as good as every canadian people told me, and maybe make my new life here who
          knows =)
        </p>
      </AnimatedBox>
    </Layout>
  )
}

export default About
