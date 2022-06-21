import React from 'react'
import { MarketTable } from '../components'
import { 
  Container
} from '@chakra-ui/react';

const Home = () => {
  return (
    <Container maxW='7xl'>
      <MarketTable/>
    </Container>
  )
}

export default Home