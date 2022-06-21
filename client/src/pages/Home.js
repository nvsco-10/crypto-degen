import React from 'react'
import { MarketTable, TrendingTable } from '../components'
import { 
  Container,
  SimpleGrid,
  Flex,
  Box,
  HStack
} from '@chakra-ui/react';

const Home = () => {
  return (
    <>
      <Container maxW='6xl'>
        <Flex 
          direction={{ sm: 'column', md: 'column', lg: 'row'}} 
          align='center' justify='center'
          gap={{ sm: '10', md: '10', lg: '20'}}
          mb={10}
        >
            <TrendingTable/>
            <TrendingTable/>
        </Flex>
      </Container>
      <Container maxW='7xl'>
        <MarketTable/>
      </Container>
    </>
  )
}

export default Home