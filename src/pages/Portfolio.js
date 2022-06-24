import { useEffect } from 'react'

import { PortfolioOverview, PortfolioMain } from '../components'

import { useAppContext } from '../context/appContext'

import {
  Container,
} from '@chakra-ui/react'

const Portfolio = () => {
  const { getPortfolio } = useAppContext()

  useEffect(() => {
    getPortfolio()
  },[])

  return (
    <Container px={0}>
      <PortfolioOverview/>
      <PortfolioMain/>
    </Container>
  )
}

export default Portfolio