import React from 'react'
import { HStack, Image, Text, Flex, StackDivider, useColorModeValue } from '@chakra-ui/react'

const PortfolioRow = ({id, name, image, symbol, price, change, qty }) => {
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
            <HStack>
              <Text as='span' fontSize={{xs: 'xs'}}>
                { price < 1 
                    ? `$ ${price?.toFixed(8).toLocaleString('en-US')}` 
                    : `$ ${price?.toLocaleString('en-US')}` }
              </Text>
              <Text as='span' fontSize={{xs: 'xs'}} color={Math.sign(change) === 1 ? 'limegreen' : 'tomato'}>
                {`${change}%`}
              </Text>
            </HStack>
          </Flex>
        </HStack>
        <Flex flexDir='column' px={2} alignItems='flex-end' >
          <Text fontSize={{xs: 'sm'}}>
            {qty.toLocaleString('en-US')} {symbol?.toUpperCase()}
          </Text>
          <Text as='span' fontSize={{xs: 'xs'}}>
          { qty*price < 1 
                    ? `$ ${(qty*price).toFixed(4).toLocaleString('en-US')}` 
                    : `$ ${(qty*price).toLocaleString('en-US')}` }
          </Text>
        </Flex>
      </HStack>
  )
}

export default PortfolioRow