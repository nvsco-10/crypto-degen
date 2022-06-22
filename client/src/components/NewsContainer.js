import News from './News';

import { 
  VStack, 
  Box, 
  StackDivider, 
  Heading, 
  Text 
} from '@chakra-ui/react';

import mockData from '../utils/mockData'

const NewsContainer = () => {

  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      align='stretch'
    >
      <Box display='flex' flexDirection='column'>
        {/* <ImFire style={{color: 'orange'}}/> */}
        <Heading as='h3'size='sm'> 
          Latest News
        </Heading>
        <Text as='i' fontSize='xs'>
          *mock news data
        </Text>
      </Box>
     { mockData ? (
      mockData?.data.map(article => {
        return (
          <News
            key={article.uuid}
            title={article.title}
            snippet={article.snippet}
            image={article.image_url}
            url={article.url} 
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