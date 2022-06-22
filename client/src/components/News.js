import React from 'react'
import { Box, Image, Heading, Text } from '@chakra-ui/react'

const News = ({ title, snippet, image, url}) => {
  return (
    <Box display='flex'>
      <Image 
        boxSize='50px'
        src={image}
        alt='image'
      />
      <Box ml={4}>
        <Heading fontSize='sm' mb={1}><a href={url} rel='noreferrer' target='_blank'>{title}</a></Heading>
        <Text fontSize='xs'>{`${(snippet).slice(0,100)} ...`}</Text>
      </Box>
    </Box>
  )
}

export default News