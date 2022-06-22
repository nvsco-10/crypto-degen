import { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext';

import { Heading, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot, HStack, Box, Text, Image } from '@chakra-ui/react';

const WatchlistTable = () => {
  const { watchlist, getWatchlistData, watchlistData } = useAppContext()

  useEffect(() => {
    getWatchlistData()
    
  }, [])
  
  return (
    <TableContainer minW='400'>
      <Box display='flex'>
        {/* <ImFire style={{color: 'orange'}}/> */}
        <Heading as='h3'size='sm' mb={4} ml={2}> 
          Watchlist
        </Heading>
      </Box>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Symbol</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>24h %</Th>
          </Tr>
        </Thead>
        <Tbody>
          { watchlistData?.length > 0 ? (
            watchlistData?.map(item => {
              return (
              <Tr key={item.id}>
                <Td>
                  <HStack spacing='24px'>
                    <Image
                      borderRadius='full'
                      boxSize='30px'
                      src={item.image}
                      alt={item.name}
                    />
                    <Box>
                      {item.name}
                    </Box>
                  </HStack>
                </Td>
                <Td>{item.symbol}</Td>
                <Td isNumeric fontWeight={600}>
                  {
                    item.current_price < 1 ?
                    `$ ${item.current_price?.toFixed(8).toLocaleString('en-US')}` 
                    : `$ ${item.current_price?.toLocaleString('en-US')}`
                  }
                </Td>
                <Td isNumeric fontWeight={600} color={Math.sign(item. price_change_percentage_24h) === 1 ? 'limegreen' : 'tomato'}>{`${item.price_change_percentage_24h}%`}</Td>
              </Tr>
              )
            })
          ) : (
            <Tr>
              <Td>Loading...</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default WatchlistTable