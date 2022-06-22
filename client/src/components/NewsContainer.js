import {useEffect} from 'react'
import axios from 'axios'
import News from './News';

import { Container, VStack, Box, StackDivider, Heading, Text, Image } from '@chakra-ui/react';

import mockData from '../utils/mockData'

const NewsContainer = () => {

  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      align='stretch'
    >
      <Box display='flex'>
        {/* <ImFire style={{color: 'orange'}}/> */}
        <Heading as='h3'size='sm'> 
          Latest News
        </Heading>
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