import React from 'react'
import { Text, Container }from '@chakra-ui/react';

const Footer = () => {
  return (
    <footer>
      <Container mb={4}>
        <Text 
          textDecoration='underline' 
          fontSize={12}  
          fontWeight={600} 
          color='grey'
          textAlign='center'>
          <a 
            href="https://github.com/nvsco-10" 
            target="_blank"
          >
              Built by nvsco-10 | GitHub
          </a>
        </Text>
      </Container>
    </footer>
  )
}

export default Footer