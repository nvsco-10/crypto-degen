import { useState, useEffect } from 'react'
import axios from 'axios'

import { Input, Container, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot, HStack, Box, Text, Image } from '@chakra-ui/react';

const MarketTable = () => {
  const [ marketData, setMarketData ] = useState([])
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')

      setMarketData(data)
      console.log(data)
    }

    fetchData()

    const interval = setInterval(() => {
      fetchData()
    }, 30000)

    return () => clearInterval()
    
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
    
  }

  const filteredData = marketData.filter(data => 
    data.name.toLowerCase().includes(search.toLowerCase())  
  )

  return (
    <>
    <Container>
      <Input variant='filled' placeholder='Search' mb={8} onChange={handleChange} value={search} />
    </Container>
    <TableContainer>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th isNumeric>#</Th>
            <Th>
              <Image />
              Name
            </Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>24h %</Th>
            <Th isNumeric>Market Cap</Th>
            <Th isNumeric>High(24h)</Th>
            <Th isNumeric>Low(24h)</Th>
            <Th isNumeric>Circulating Supply</Th>
            <Th isNumeric>Total Supply</Th>
          </Tr>
        </Thead>
        <Tbody>
          { filteredData.length > 0 ? (
            filteredData.map(item => {
              return (
              <Tr key={item.id}>
                <Td isNumeric>{item.market_cap_rank}</Td>
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
                <Td isNumeric fontWeight={600}>
                  {
                    item.current_price < 1 ?
                    `$ ${item.current_price?.toFixed(8).toLocaleString('en-US')}` 
                    : `$ ${item.current_price?.toLocaleString('en-US')}`
                  }
                </Td>
                <Td isNumeric fontWeight={600} color={Math.sign(item. price_change_percentage_24h) === 1 ? 'limegreen' : 'tomato'}>{`${item.price_change_percentage_24h}%`}</Td>
                <Td isNumeric fontWeight={600}>{`$ ${item.market_cap?.toLocaleString('en-US')}`}</Td>
                <Td isNumeric>{`$ ${item.high_24h?.toLocaleString('en-US')}`}</Td>
                <Td isNumeric>{`$ ${item.low_24h?.toLocaleString('en-US')}`}</Td>
                <Td isNumeric fontWeight={600}>{ `${item.circulating_supply?.toLocaleString('en-US')}`}</Td>
                <Td isNumeric>{ item.total_supply ? `${item.total_supply?.toLocaleString('en-US')}` : '-'}</Td>
              </Tr>
              )
            })
          ) : (
            <Text>Loading...</Text>
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
    </>
  )
}

export default MarketTable