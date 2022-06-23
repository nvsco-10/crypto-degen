import React from 'react'
import { HStack, Image, Text, Flex, StackDivider, Box, Switch } from '@chakra-ui/react'

const CoinsRow = ({ id, name, symbol, image}) => {
  return (
    <HStack 
      px={2} 
      py={8}  
      justifyContent='space-between' 
      height='50px' 
      borderBottom={'solid rgba(243, 235, 239, 0.11) 1px'}
    >
        <HStack>
          <Image
            boxSize='25px'
            src={image}
            alt={name}
          />
          <Flex flexDir='column' px={2} >
            <Text fontSize={{xs: 'sm'}}>
              {name}
            </Text>
            <Text as='span' fontSize={{xs: 'xs'}}>
              {symbol}
            </Text>
          </Flex>
        </HStack>
        <Box px={2}  >
          <Switch size='md' />
        </Box>
      </HStack>
  )
}

export default CoinsRow