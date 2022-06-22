import React from 'react'
import { MarketTable, NewsContainer, TrendingTable, WatchlistTable } from '../components'
import { 
  Container,
  Flex,
} from '@chakra-ui/react';

const Home = () => {
  return (
    <>
      <Container maxW='6xl'>
        <Flex 
          direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row'}} 
          align={{sm: 'center', lg: 'flex-start'}} 
          justify='center'
          gap={{ xs: '10', sm: '10', md: '10', lg: '20'}}
          mb={10}
        >
            <TrendingTable/>
            <NewsContainer/>
        </Flex>
      </Container>
      <Container maxW='7xl' pt={4}>
        <MarketTable/>
      </Container>
    </>
  )
}

export default Home