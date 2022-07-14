import React from 'react'

import { Text } from '@chakra-ui/react'
import formatDollar from '../utils/formatDollar'

const TransactionModalBalance = ({label, amount, size, position}) => {
  const textSize = () => {
    if (size === 'sm') {
      return { xs: 'sm'}
    }

    if (size === 'md') {
      return { xs: 'md'}
    }
  }

  return (
    <Text alignSelf={position} fontWeight={600} fontSize={textSize()}>
      {label}:
      <Text as='span' fontWeight={400} fontSize={{xs: 'md'}} ml={2}>
      {amount ? formatDollar(amount) : '-'}
      </Text>
    </Text>
  )
}

export default TransactionModalBalance