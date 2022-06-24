import { useAppContext } from '../context/appContext';

import { HeadingWIcon, TrendingRow } from '.'

import { 
  TableContainer, 
  Table, 
  Thead, 
  Tr, 
  Th, 
  Tbody, 
} from '@chakra-ui/react';

import { ImFire } from 'react-icons/im'

const TrendingTable = () => {
  const { trendingData } = useAppContext()

  return (
    <TableContainer minW={{xs: '300', md: '400'}}>
       <HeadingWIcon
        text='Trending'
        icon={<ImFire style={{color: 'orange'}}/>}
        url='https://www.coingecko.com/en/watchlists/trending-crypto/united-states'
      />
      <Table size='sm' mt={4}>
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
                <TrendingRow
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  symbol={item.symbol}
                  thumb={item.thumb}
                  rank={item.market_cap_rank}
                />
              )
            })
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TrendingTable