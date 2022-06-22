import { useEffect } from 'react'
import { MarketTable, NewsContainer, NewsContainerRow, TrendingTable } from '../components'
import { useAppContext } from '../context/appContext';

import { 
  Container,
  Flex,
  Spinner,
  Center,
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
        <Container maxW='6xl' mb='100px'>
          <Flex 
            direction={{ xs: 'column', lg: 'row' }} 
            align={{sm: 'center', lg: 'flex-start'}} 
            justify='space-between'
            gap={{ xs: '60px', md: '50px'}}
            mb='75px'
          >
              <NewsContainer/>
              <TrendingTable/>
          </Flex>
          <NewsContainerRow/>
        </Container>
        <Container maxW='7xl'>
          <MarketTable/>
        </Container>
      </>
    )}
    </>
  )
}

export default Home