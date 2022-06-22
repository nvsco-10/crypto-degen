import React from 'react'
import { Box, Image, Heading, Text, HStack } from '@chakra-ui/react'
import { BsReddit, BsHandThumbsUpFill } from 'react-icons/bs'
import { FaComment } from 'react-icons/fa'

const News = ({ title, snippet, url, comments, upvotes }) => {

  return (
    <Box display='flex'>
      <Box size='50px'>
        <BsReddit/>
      </Box>
      <Box ml={4}>
        <Heading 
          fontSize='sm' 
          mb={1}>
            <a href={url} rel='noreferrer' target='_blank'>
              {title.slice(0,100)}
            </a>
        </Heading>
        <Text fontSize='xs'>
          {`${(snippet).slice(0,100)} ...`}
        </Text>
        <Box display='flex' mt={2}>
          <HStack fontSize='xs'>
            <BsHandThumbsUpFill/>
            <Text>
              {upvotes}
            </Text>
          </HStack>
          <HStack ml={6} fontSize='xs'>
            <FaComment />
            <Text>
              {comments}
            </Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}

export default News