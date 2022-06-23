import React from 'react'
import PortfolioRow from './PortfolioRow'
import { Box } from '@chakra-ui/react'

const PortfolioMain = () => {
  return (
    <Box backgroundColor='#1d2945' px={4} pb={6} >
      <PortfolioRow />
      <PortfolioRow />
      <PortfolioRow />
      <PortfolioRow />
    </Box>
  )
}

export default PortfolioMain