import React from 'react'
import { Td } from '@chakra-ui/react'

const CoinValue = ({ amount, fontWeight, type }) => {
  return (
    <Td 
      isNumeric 
      fontWeight={fontWeight}
    >
      {type === 'dollar'
        ? amount < 1 
          ? `$ ${amount?.toFixed(8).toLocaleString('en-US')}` 
          : `$ ${amount?.toLocaleString('en-US')}` 
        : amount.toLocaleString('en-US')
      }
  
    </Td>
  )
}

export default CoinValue