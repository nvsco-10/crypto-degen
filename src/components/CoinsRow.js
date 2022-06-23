import { useState } from 'react'
import { useAppContext } from '../context/appContext'

import { HStack, Image, Text, Flex, StackDivider, Box, Switch, Button, useColorModeValue, } from '@chakra-ui/react'

import { StarIcon } from '@chakra-ui/icons'

const CoinsRow = ({ id, name, symbol, image }) => {
  const { addToWatchlist } = useAppContext()

  const [ isSaved, setSaved ] = useState(false)
  const handleClick = (e) => {
    setSaved(!isSaved)
    if(isSaved === false) {
      addToWatchlist(id)
    }
    
  }

  return (
    <HStack 
      px={2} 
      py={8}  
      justifyContent='space-between' 
      height='50px' 
      
      borderBottom={useColorModeValue('solid 1px lightgray', 'solid 1px rgba(243, 235, 239, 0.11)')}
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
        <Button px={2} onClick={handleClick} background='transparent' >
          <StarIcon color={ isSaved === true ? 'yellow' : 'white'}  />
        </Button>
      </HStack>
  )
}

export default CoinsRow