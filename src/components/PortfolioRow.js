import React from 'react'
import { HStack, Image, Text, Flex, StackDivider } from '@chakra-ui/react'

const PortfolioRow = () => {
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
            src='https://bitcoin.org/img/icons/opengraph.png?1652976465'
            alt='bitcoin'
          />
          <Flex flexDir='column' px={2} >
            <Text fontSize={{xs: 'sm'}}>
              Bitcoin
            </Text>
            <HStack>
              <Text as='span' fontSize={{xs: 'xs'}}>
                $23,809.00
              </Text>
              <Text as='span' fontSize={{xs: 'xs'}} color={Math.sign(21) === 1 ? 'limegreen' : 'tomato'}>
                2.45%
              </Text>
            </HStack>
          </Flex>
        </HStack>
        <Flex flexDir='column' px={2} alignItems='flex-end' >
          <Text fontSize={{xs: 'sm'}}>
            1203 BTC
          </Text>
          <Text as='span' fontSize={{xs: 'xs'}}>
            $1,809.00
          </Text>
        </Flex>
      </HStack>
  )
}

export default PortfolioRow