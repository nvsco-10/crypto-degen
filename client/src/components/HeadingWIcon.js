import React from 'react'

import { Box, Heading } from '@chakra-ui/react'

const HeadingWIcon = ({text, icon, url}) => {
  return (
    <Box display='flex'>
        {icon}
        <Heading 
          as='h3' 
          size={{xs: 'xs', md: 'sm'}} 
          ml={2}>
          <a 
            href={url} 
            rel='noreferrer' 
            target='_blank'
          > 
            {text}
          </a>
        </Heading>
      </Box>
  )
}

export default HeadingWIcon