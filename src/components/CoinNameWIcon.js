import React from 'react'
import {
  Td,
  HStack,
  Image,
  Box
} from '@chakra-ui/react'

const CoinNameWIcon = ({ image, name }) => {
  return (
    <Td>
      <HStack spacing='24px'>
        <Image
          borderRadius='full'
          boxSize={{xs: '20px', lg: '30px'}}
          src={image}
          alt={name}
        />
        <Box>
          {name}
        </Box>
      </HStack>
    </Td>
  )
}

export default CoinNameWIcon