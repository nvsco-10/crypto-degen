import React from 'react'
import { useAppContext } from '../context/appContext'
import PortfolioRow from './PortfolioRow'
import { Box } from '@chakra-ui/react'

const PortfolioMain = () => {
  const { watchlistData } = useAppContext()

  return (
    <Box backgroundColor='#1d2945' px={4} pb={6} >
      {watchlistData?.length > 0 &&
       watchlistData?.map(data => {
        return (
          <PortfolioRow
            key={data.id}
            name={data.name}
            image={data.image}
            symbol={data.symbol}
            price={data.current_price}
            change={data.price_change_percentage_24h}
            owned={25}
          />
        )
       })
      }
    </Box>
  )
}

export default PortfolioMain