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
  InputRightElement,
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
  const { tetherBalance, tetherQty, getCoinData, coinData, qty, handleChange, depositTether, withdrawTether } = useAppContext()
  const [type, setType] = useState('')
  const [disable, setDisable] = useState(true)
  const [endingBal, setEndingBal] = useState(0)

  const handleSelect = (e) => {
    getCoinData('tether')
    setType(e.value)
  }

  const handleQtyInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    if(qty) {
      setDisable(false)
    }

    handleChange({ name, value })
  }

  const getEndingBal = () => {
    if (type && qty) {
      let balance;

      if (type === 'deposit') {
        balance = formatDollar(tetherBalance + parseFloat(qty * coinData.current_price))
      }

      if (type === 'withdraw') {
        balance = formatDollar(tetherBalance - parseFloat(qty * coinData.current_price))
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

  const setMax = () => {
    const maxQty = tetherBalance / coinData.current_price
    console.log(maxQty)
    handleChange({ name: 'qty', value: maxQty })
  }

  const handleSubmit = () => {
    if(type === 'deposit') {
      depositTether(parseFloat(qty))
    }

    if(type === 'withdraw') {
      withdrawTether(parseFloat(qty))
    }
  }

  useEffect(() => {
    getEndingBal()
  },[qty,type])

  return (
    <>
      <ModalHeader>
        <TransactionModalBalance
          label='Available Balance'
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
            <TransactionModalBalance
              label='Current USDT Price'
              amount={coinData && coinData.current_price}
              size='sm'
              position='flex-end'
            />
          </Box>
              
          <InputGroup size='md'>
            <Input 
              type='num' 
              placeholder='qty'
              name='qty' 
              value={qty}
              onChange={handleQtyInput}
            />
            { (type && type === 'withdraw') &&
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setMax()} >
                  max
                </Button>
              </InputRightElement>
            }
            
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
        <Button onClick={handleSubmit} w='100%' isDisabled={disable}>{type === 'deposit' ? 'Deposit' : 'Withdraw'}</Button>
      </ModalFooter>
    </>
  )
}

export default TransferModal