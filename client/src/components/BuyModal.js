import { useState } from 'react'

import { useAppContext } from '../context/appContext';

import { TransactionModalBalance } from '.'
import cryptoList from '../utils/cryptoList'
import formatDollar from '../utils/formatDollar';

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

const list = [
  {
    value: "bitcoin",
    label: "bitcoin",  
  },
  {
    value: "monero",
    label: "monero"
  },
  {
    value: "dogecoin",
    label: "dogecoin"
  },
]

const BuyModal = () => {
  const { tetherBalance, getCoinData, coinData, coinId, qty, handleChange } = useAppContext()
  const [disable, setDisable] = useState(true)

  const handleSelect = (e) => {
    getCoinData(e.value)
    handleChange({ name:'coinId', value: e.value })
  }

  const handleQtyInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    handleChange({ name, value })
  }

  const getTotal = () => {
    if (coinData && qty) {
      return formatDollar(coinData.current_price * qty)
    }

    return '-'
  }

  const getEndingBal = () => {
    if (coinData && qty) {
      const balance = formatDollar(tetherBalance - (coinData.current_price * qty))
      const amount = parseFloat(balance)

      if ((Math.sign(amount)) === 1 || (Math.sign(amount) === 0)) {
        setDisable(false)
      }
    
      return balance
    }
  
    return '-'
  }

  const handleSubmit = () => {
    console.log(qty)
  }
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
              name='coinId'
              options={list}
              onChange={handleSelect}
            />
            <TransactionModalBalance
              label='Current Price'
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
            <InputRightAddon children='qty' />
          </InputGroup>
          <VStack 
            alignItems='flex-end' 
            w='100%'
            pt={4}
          >
            <Text fontWeight={600} fontSize={{xs: 'md'}}>
              Total:
              <Text as='span' fontWeight={400} fontSize={{xs: 'md'}} ml={2}>
              {`$ ${getTotal()}`}
              </Text>
            </Text>
            <Text fontWeight={600} fontSize={{xs: 'md'}}>
              Ending Balance:
              <Text as='span' fontWeight={400} fontSize={{xs: 'md'}} ml={2}>
              {`$ ${getEndingBal()}`}
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

export default BuyModal