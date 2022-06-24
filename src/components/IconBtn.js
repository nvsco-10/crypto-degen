import { useState } from 'react'
import { TransactionModal } from '.'
import { Button, VStack, Text, useDisclosure } from '@chakra-ui/react/'

const IconBtn = ({ icon, label }) => {
  const [ modalType, setModalType ] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    onOpen()
    setModalType(label.toLowerCase())
  }

  return (
    <>
    <VStack>
      <Button
        size='sm'
        w='50px'
        h='40px'
        onClick={handleClick}
      >
        {icon}
      </Button>
      <Text as='span' fontSize={{xs: 'sm'}}>
        {label}
      </Text>
    </VStack>
    <TransactionModal onClose={onClose} isOpen={isOpen} type={modalType} />
    </>
  )
}

export default IconBtn