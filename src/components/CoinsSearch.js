import React from 'react'

import { HStack, Box, Input } from '@chakra-ui/react'

import { ArrowBackIcon } from '@chakra-ui/icons'

const CoinsSearch = ({coinSearch, handleChange}) => {
  

  return (
    <HStack mb={4} pl={4} pr={6}>
      <Box w='25px'>
        <ArrowBackIcon className='btn-icon' />
      </Box>
      <Input variant='filled' size='md' value={coinSearch} onChange={handleChange}/>
    </HStack>
  )
}

export default CoinsSearch