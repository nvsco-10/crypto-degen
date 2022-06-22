import { useEffect } from 'react'
import { MarketTable, NewsContainer, TrendingTable } from '../components'
import { useAppContext } from '../context/appContext';

import { 
  Container,
  Flex,
  Spinner,
  Center
} from '@chakra-ui/react';

const Home = () => {
  const { isLoading, getCoinsData } = useAppContext()

  useEffect(() => {
    getCoinsData()
  }, [])

  return (
    <>
    { isLoading ? (
      <Container>
        <Center>
          <Spinner size='xl'/>
        </Center>
      </Container>
    ) : (
      <>
        <Container maxW='6xl'>
          <Flex 
            direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row'}} 
            align={{sm: 'center', lg: 'flex-start'}} 
            justify='center'
            gap={{ xs: '10', sm: '10', md: '10', lg: '20'}}
            mb={10}
          >
              <TrendingTable/>
              <NewsContainer/>
          </Flex>
        </Container>
        <Container maxW='7xl' pt={4}>
          <MarketTable/>
        </Container>
      </>
    )}
    </>
  )
}

export default Home