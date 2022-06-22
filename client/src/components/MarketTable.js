import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppContext } from '../context/appContext';

import { Heading, Center, Input, Container, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot, HStack, Box, Text, Image, IconButton } from '@chakra-ui/react';

import { AiOutlineStar } from 'react-icons/ai'

const MarketTable = () => {
  const [ marketData, setMarketData ] = useState([]);
  const [ search, setSearch ] = useState('');
  const { updateWatchlist } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')

      setMarketData(data)
      // console.log(data)
    }

    fetchData()

    // const interval = setInterval(() => {
    //   fetchData()
    // }, 30000)

    // return () => clearInterval()
    
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
      <Heading as='h2'size='md' textAlign='center'> 
        Top 100 Cryptocurrencies
      </Heading>
      <Center>
        <Text as='i' fontSize='xs'>
          *real-time data from CoinGecko API
        </Text>
      </Center>
      <Input 
        variant='filled' 
        placeholder='Search' 
        mt={6} mb={8} 
        onChange={handleChange} 
        value={search} 
      />
    </Container>
    <TableContainer>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th></Th>
            <Th pl={0} isNumeric>#</Th>
            <Th>Name</Th>
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
          { filteredData?.length > 0 ? (
            filteredData?.map(item => {
              return (
              <Tr key={item.id}>
                <Td padding={0}>
                  <IconButton
                    variant='transparent'
                    // color='green'
                    icon={<AiOutlineStar/>}
                    boxSize='10px'
                    onClick={() => updateWatchlist(item.id)}
                  />
                </Td>
                <Td pl={0} isNumeric>{item.market_cap_rank}</Td>
                <Td>
                  <HStack spacing='24px'>
                    <Image
                      borderRadius='full'
                      boxSize={{xs: '20px', lg: '30px'}}
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
    </>
  )
}

export default MarketTable