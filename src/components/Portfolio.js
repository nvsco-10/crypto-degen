import React from 'react'

import { PortfolioOverview, PortfolioMain } from '../components'

import {
  Container,

} from '@chakra-ui/react'

const Portfolio = () => {
  return (
    <Container px={0}>
      <PortfolioOverview/>
      <PortfolioMain/>
    </Container>
  )
}

export default Portfolio