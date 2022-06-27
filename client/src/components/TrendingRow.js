import React from 'react'
import {
  Tr,
  Td,
  HStack,
  Image,
  Box
} from '@chakra-ui/react'

const TrendingRow = ({ id, thumb, name, symbol, rank}) => {
  return (
    <Tr key={id}>
      <Td>
        <HStack spacing='24px'>
          <Image
            borderRadius='full'
            boxSize={{xs: '20px', lg: '30px'}}
            src={thumb}
            alt={name}
          />
          <Box>
            {name}
          </Box>
        </HStack>
      </Td>
      <Td fontWeight={600} fontSize='xs'>{symbol}</Td>
      <Td isNumeric>{rank}</Td>
    </Tr>
  )
}

export default TrendingRow