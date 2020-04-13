import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Box } from '../elements'
import Logo from './logo'
import Back from '../back.svg'

// maybe change it to the arraw when the page is not the home page, or make it change visually and keep the same back history behavior
const DynamicLogo = () => {
  const isBackDisplay = false

  return (
    <Box width={['3rem', '4rem', '5rem', '6rem']}>
      {isBackDisplay ? (
        <a
          onClick={() => {
            window.history.back()
          }}
        >
          <img src={Back} alt="bla" />
        </a>
      ) : (
        <Link to="/" aria-label="LekoArts, Back to Home">
          <Logo />
        </Link>
      )}
    </Box>
  )
}

export default DynamicLogo
