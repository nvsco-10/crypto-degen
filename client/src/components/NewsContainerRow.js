import News from './News';
import { useAppContext } from '../context/appContext';

import { FaUserAstronaut } from 'react-icons/fa'

import { 
  SimpleGrid, 
  Box, 
  Heading, 
  Divider,
  Text 
} from '@chakra-ui/react';

const NewsContainerRow = () => {
  const { rSatoshiData } = useAppContext()

  return (
    <Box mt='30px'>
      <Box display='flex' mb='20px'>
        <FaUserAstronaut />
        <Heading 
          as='h3' 
          size={{xs: 'xs', md: 'sm'}} 
          ml={2}
        >
          <a 
            href='https://www.reddit.com/r/SatoshiStreetBets/' 
            rel='noreferrer' 
            target='_blank'
          > 
            Hottest in r/SatoshiStreetBets
          </a>
        </Heading>
      </Box>
      <Divider orientation='horizontal' />
      <SimpleGrid 
        columns={{xs: 1, md: 2, lg: 3, xl: 3}} 
        spacing='20px' 
        mt={6}
      >
        {rSatoshiData?.length > 0 ? (
          rSatoshiData?.map(post => {
            return (
              <News
                key={post.data.id}
                title={post.data.title}
                snippet={post.data.selftext}
                comments={post.data.num_comments}
                upvotes={post.data.ups}
                url={post.data.url}
              />
            )
          })
        ) : (
          <Text>API limit exceeded...</Text>
        )}
      </SimpleGrid>
    </Box>
  )
}

export default NewsContainerRow