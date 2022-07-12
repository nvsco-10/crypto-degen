import { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext';

import TransactionModalBalance from './TransactionModalBalance';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  Input,
  InputRightAddon,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Image,
  Box
} from '@chakra-ui/react'

import {
  Select,
} from "chakra-react-select";

import formatDollar from '../utils/formatDollar';

const list = [
  {
    value: "deposit",
    label: "deposit",  
  },
  {
    value: "withdraw",
    label: "withdraw"
  }
]


const TransferModal = () => {
  const { tetherBalance, getCoinData, coinData, qty, handleChange, buyCoin } = useAppContext()
  const [type, setType] = useState('')
  const [disable, setDisable] = useState(true)
  const [endingBal, setEndingBal] = useState(0)

  const handleSelect = (e) => {
    setType(e.value)
  }

  const handleQtyInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    handleChange({ name, value })
  }

  const getEndingBal = () => {
    if (type && qty) {
      let balance;

      if (type === 'deposit') {
        balance = formatDollar(tetherBalance + parseFloat(qty))
      }

      if (type === 'withdraw') {
        balance = formatDollar(tetherBalance - qty)
      }

      const amount = parseFloat(balance)

      if ((Math.sign(amount)) === 1 || (Math.sign(amount) === 0)) {
        setDisable(false)
      } else {
        setDisable(true)
      }

      setEndingBal(balance)

    }

    return '-'
  }

  const handleSubmit = () => {
    if(type === 'deposit') {
      buyCoin('tether',parseFloat(qty))
    }
  }

  useEffect(() => {
    getEndingBal()
  },[qty,type])

  return (
    <>
      <ModalHeader>
        <TransactionModalBalance
          label='Tether Balance'
          amount={tetherBalance}
          size='md'
        />
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack>
          <Box display='flex' flexDir='column' w='100%' py={2} >
            <Select
              name='coins'
              options={list}
              onChange={handleSelect}
            />
            {/* <TransactionModalBalance
              label='Current Price'
              amount={coinData && coinData.current_price}
              size='sm'
              position='flex-end'
            /> */}
          </Box>
              
          <InputGroup size='md'>
            <Input 
              type='num' 
              placeholder='USDT'
              name='qty' 
              value={qty}
              onChange={handleQtyInput}
            />
            <InputRightAddon children='USDT' />
          </InputGroup>
          <VStack 
            alignItems='flex-end' 
            w='100%'
            pt={4}
          >
            <Text fontWeight={600} fontSize={{xs: 'md'}}>
              Ending Balance:
              <Text as='span' fontWeight={400} fontSize={{xs: 'md'}} ml={2}>
              {`$ ${endingBal}`}
              </Text>
            </Text>
          </VStack>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit} w='100%' isDisabled={disable}>Buy</Button>
      </ModalFooter>
    </>
  )
}

export default TransferModal