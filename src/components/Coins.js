import React from 'react'

import { CoinsRow } from '../components'

import {
  Container,
  Input,
  Box,
  HStack,

} from '@chakra-ui/react'

import { 
  ArrowBackIcon
} from '@chakra-ui/icons'

import cryptoList from '../utils/cryptoList'

const Coins = () => {
  return (
    <Container px={4} py={2}>
      <HStack mb={4}>
        <Box w='25px'>
          <ArrowBackIcon className='btn-icon' />
        </Box>
        <Input variant='filled' size='md' />
      </HStack>
      <Box backgroundColor='#1d2945' px={4} pb={6} >
        {cryptoList.map(crypto => {
          return (
            <CoinsRow 
              key={crypto.id} 
              id={crypto.id} 
              name={crypto.id}
              symbol={crypto.symbol}
              image={crypto.image}
            />
          )
        })}
        
    </Box>
    </Container>
  )
}

export default Coins