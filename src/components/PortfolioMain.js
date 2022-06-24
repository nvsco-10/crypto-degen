import React from 'react'
import { useAppContext } from '../context/appContext'
import PortfolioRow from './PortfolioRow'
import { Box } from '@chakra-ui/react'

const PortfolioMain = () => {
  const { portfolioMarketData } = useAppContext()

  return (
    <Box backgroundColor='#1d2945' px={4} pb={6} >
      {portfolioMarketData?.length > 0 &&
       portfolioMarketData?.map(data => {
        return (
          <PortfolioRow
            key={data.coinId}
            name={data.name}
            image={data.image}
            symbol={data.symbol}
            price={data.current_price}
            change={data.price_change_percentage_24h}
            qty={data.qty}
          />
        )
       })
      }
    </Box>
  )
}

export default PortfolioMain