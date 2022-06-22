import News from './News';
import { useAppContext } from '../context/appContext';

import { AiOutlineReddit } from 'react-icons/ai'

import { 
  VStack, 
  Box, 
  StackDivider, 
  Heading, 
  Text 
} from '@chakra-ui/react';

const NewsContainer = () => {
  const { newsData } = useAppContext()
  console.log(newsData)

  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      align='stretch'
    >
      <Box display='flex'>
        <Heading as='h3'size='sm'> 
          Hottest in r/CryptoCurrency
        </Heading>
      </Box>
     { newsData?.length > 0 ? (
      newsData?.map(post => {
        console.log(post.created)
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