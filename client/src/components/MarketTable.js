import { useState } from 'react'
import { useAppContext } from '../context/appContext';

import { CoinNameWIcon, CoinValue } from '.'

import { 
  Heading, 
  Center, 
  Input, 
  Container, 
  TableContainer, 
  Table, 
  Thead, 
  Tr, 
  Th, 
  Tbody, 
  Td, 
  Text, 
} from '@chakra-ui/react';

const MarketTable = () => {
  const { marketData } = useAppContext();
  const [ search, setSearch ] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredData = marketData.filter(data => 
    data.name.toLowerCase().includes(search.toLowerCase())  
  )

  return (
    <>
      <Container>
        <Heading 
          as='h2' 
          size={{xs: 'sm', md: 'md'}} 
          textAlign='center'
          > 
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
            {filteredData?.length > 0 && (
              filteredData?.map(item => {
                return (
                <Tr key={item.id}>
            
                  {/* market cap rank */}
                  <Td 
                    pl={0} 
                    isNumeric
                  >
                    {item.market_cap_rank}
                  </Td>

                  {/* name and icon */}
                  <CoinNameWIcon
                    image={item.image}
                    name={item.name}
                  />

                  {/* current price */}
                  <CoinValue 
                    fontWeight={600}
                    amount={item.current_price}
                    type='dollar'
                  />
    
                  {/* 24h % change */}
                  <Td 
                    isNumeric 
                    fontWeight={600} 
                    color={Math.sign(item. price_change_percentage_24h) === 1 ? 'limegreen' : 'tomato'}
                  >
                    {`${item.price_change_percentage_24h}%`}
                  </Td>

                  {/* market cap */}
                  <CoinValue 
                    fontWeight={600}
                    amount={item.market_cap}
                    type='dollar'
                  />

                  {/* 24h high */}      
                  <CoinValue 
                    fontWeight={400}
                    amount={item.high_24h}
                    type='dollar'
                  />

                  {/* 24h low */} 
                  <CoinValue 
                    fontWeight={400}
                    amount={item.low_24h}
                    type='dollar'
                  />

                  {/* circulating supply */} 
                  <CoinValue 
                    fontWeight={600}
                    amount={item.circulating_supply}
                  />

                  {/* total supply */} 
                  <CoinValue 
                    fontWeight={400}
                    amount={item.total_supply || '-'}
                  />

                </Tr>
                )
              })
            )}
          </Tbody>

        </Table>
      </TableContainer>
    </>
  )
}

export default MarketTable