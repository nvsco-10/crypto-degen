import { useState } from 'react'

import { CoinsRow, CoinsSearch } from '../components'

import {
  Container,
  Input,
  Box,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'

import { 
  ArrowBackIcon
} from '@chakra-ui/icons'

import cryptoList from '../utils/cryptoList'

const Coins = () => {
  const [ coinSearch, setCoinSearch ] = useState('')


  const handleChange = (e) => {
    setCoinSearch(e.target.value)
  }
  
  const filteredList = cryptoList.filter(data => 
    data.name.toLowerCase().includes(coinSearch.toLowerCase())  
  )

  return (
    <Container px={0} py={4}>
      <CoinsSearch coinSearch={coinSearch} handleChange={handleChange} />
      {/* #1d2945 */}
      <Box 
        backgroundColor={useColorModeValue('gray.100', '#1d2945')} 
        px={4} 
        pb={6} 
        borderRadius={4}
      >
        {filteredList.map(crypto => {
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