import { useAppContext } from '../context/appContext';

import { 
  Heading, 
  TableContainer, 
  Table, 
  Thead, 
  Tr, 
  Th, 
  Tbody, 
  Td, 
  HStack, 
  Box, 
  Image, 
} from '@chakra-ui/react';

import { ImFire } from 'react-icons/im'

const TrendingTable = () => {
  const { trendingData } = useAppContext()

  return (
    <TableContainer minWidth={300}>
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
          {trendingData.length > 0 && (
            trendingData.map(data => {
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
                <Td fontWeight={600} fontSize='xs'>{item.symbol}</Td>
                <Td isNumeric>{item.market_cap_rank}</Td>
              </Tr>
              )
            })
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