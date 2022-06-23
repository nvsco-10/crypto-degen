import React from 'react'
import { Button, VStack, Text, } from '@chakra-ui/react/'

const IconBtn = ({ icon, label }) => {
  return (
    <VStack>
      <Button
        size='sm'
        w='50px'
        h='40px'
      >
        {icon}
      </Button>
      <Text as='span' fontSize={{xs: 'sm'}}>
        {label}
      </Text>
    </VStack>
  )
}

export default IconBtn