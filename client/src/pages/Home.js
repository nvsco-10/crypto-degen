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
          direction={{ sm: 'column', md: 'column', lg: 'row'}} 
          align='flex-start' justify='center'
          gap={{ sm: '10', md: '10', lg: '20'}}
          mb={10}
        >
            <TrendingTable/>
            {/* <WatchlistTable/> */}
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