import { useState, useEffect } from 'react'
import axios from 'axios'

import { Heading, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot, HStack, Box, Text, Image } from '@chakra-ui/react';

import { ImFire } from 'react-icons/im'

const TrendingTable = () => {
  const [ marketData, setMarketData ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('https://api.coingecko.com/api/v3/search/trending')

      setMarketData(data.coins)
      // console.log(data.coins)
    }

    fetchData()

    // const interval = setInterval(() => {
    //   fetchData()
    // }, 30000)

    // return () => clearInterval()
    
  }, [])


  return (
    <TableContainer>
      <Box display='flex'>
        <ImFire style={{color: 'orange'}}/>
        <Heading as='h3'size={'sm'} mb={4} ml={2}> 
          Trending
        </Heading>
      </Box>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Symbol</Th>
            <Th isNumeric>Rank</Th>
          </Tr>
        </Thead>
        <Tbody>
          { marketData.length > 0 ? (
            marketData.map(data => {
              const { item } = data
              return (
              <Tr key={item.id}>
                <Td>
                  <HStack spacing='24px'>
                    <Image
                      borderRadius='full'
                      boxSize={{xs: '20px', lg: '30px'}}
                      src={item.thumb}
                      alt={item.name}
                    />
                    <Box>
                      {item.name}
                    </Box>
                  </HStack>
                </Td>
                <Td fontWeight={600}>{item.symbol}</Td>
                <Td isNumeric>{item.market_cap_rank}</Td>
              </Tr>
              )
            })
          ) : (
            <Tr>
              <Td>Loading...</Td>
            </Tr>
          )}
        </Tbody>
        {/* <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot> */}
      </Table>
    </TableContainer>
  )
}

export default TrendingTable