import News from './News';
import { useAppContext } from '../context/appContext';

import { AiOutlineReddit } from 'react-icons/ai'
import { FaBitcoin } from 'react-icons/fa'

import { 
  VStack, 
  Box, 
  StackDivider, 
  Heading, 
  Text 
} from '@chakra-ui/react';

const NewsContainer = () => {
  const { rCryptoData } = useAppContext()

  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      align='stretch'
      maxWidth={{xs: '500', md: '450', lg: '600' }}
    >
      <Box display='flex'>
        <FaBitcoin style={{color: 'orange'}} />
        <Heading as='h3' size={{xs: 'xs', md: 'sm'}} ml={2}>
          <a href='https://www.reddit.com/r/CryptoCurrency/' rel='noreferrer' target='_blank'> 
          Hottest in r/CryptoCurrency
          </a>
        </Heading>
      </Box>
     { rCryptoData?.length > 0 ? (
      rCryptoData?.map(post => {
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
    </VStack>
  )
}

export default NewsContainer