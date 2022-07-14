import { useState, useEffect } from 'react'

import { useAppContext } from '../context/appContext';

import { TransactionModalBalance } from '.'
import cryptoList from '../utils/cryptoList';
import createSelectList from '../utils/createSelectList';
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

const cryptolist = [
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

const BuyModal = ({ type }) => {
  const { tetherBalance, getCoinData, coinData, coinId, qty, handleChange, buyCoin, sellCoin, portfolioMarketData, availableQty } = useAppContext()
  const [disable, setDisable] = useState(true)
  const [endingBal, setEndingBal] = useState(0)
  const [list, setList] = useState([]);


  const handleSelect = (e) => {
    getCoinData(e.value)
    handleChange({ name:'coinId', value: e.value })
    handleChange({ name: 'availableQty', value: e.qty})
  }

  const handleQtyInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    if(type === 'sell') {
      if (parseFloat(value) < parseFloat(availableQty)) {
        setDisable(false)
      }
    }

    handleChange({ name, value })

  }

  const getTotal = () => {
    if (coinData && qty) {
      return formatDollar(coinData.current_price * qty)
    }

    return '-'
  }

  const getEndingBal = () => {
    if (type === 'buy') {
      if (coinData && qty) {
        const balance = formatDollar(tetherBalance - (coinData.current_price * qty))

        if ((Math.sign(parseFloat(balance))) === 1 || (Math.sign(parseFloat(balance)) === 0)) {
          setDisable(false)
        }
        setEndingBal(balance)
        return
      }
      return '-'
    }
  }

  const setMax = () => {
    if (type === 'buy') {
      const maxQty = tetherBalance / coinData.current_price
      handleChange({ name: 'qty', value: maxQty })
    }

    if (type === 'sell') {
      handleChange({ name: 'qty', value: availableQty })
    }
    
  }

  const handleSubmit = () => {
    if (type === 'buy') {
      buyCoin(coinId, qty, coinData.current_price)
    }

    if (type === 'sell') {
      sellCoin(coinId, qty, coinData.current_price)
    }
    
  }

  const getList = () => {
    if (type === 'buy') {
      setList(cryptolist)
    }

    if (type === 'sell') {
      const coins = portfolioMarketData.filter(coin => 
        coin.coinId !== 'tether'
      )
      const portfolioList = createSelectList(coins)
      setList(portfolioList)

    }
  }

  useEffect(() => {
    getEndingBal()
  },[coinId,qty])

  useEffect(() => {
    getList()
  },[])



  return (
    <>
      <ModalHeader>
          {type === 'buy' && (
            <TransactionModalBalance
             label='Tether Balance'
             amount={tetherBalance}
             size='md'
           />
          )}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack>
          <Box display='flex' flexDir='column' w='100%' py={2} >
            {
              type === 'buy' ? (
                <Select
                  name='coinId'
                  options={list}
                  onChange={handleSelect}
                />
              ) : (
                <Select
                  name='coinId'
                  options={list}
                  onChange={handleSelect}
                />
              )
            }
            
            <TransactionModalBalance
              label='Current Price'
              amount={coinData && coinData.current_price}
              size='sm'
              position='flex-end'
            />
          </Box>

          <Box display='flex' flexDir='column' w='100%' py={2} >   
            <InputGroup size='md'>
              <Input 
                type='num' 
                placeholder='qty'
                name='qty' 
                value={qty}
                onChange={handleQtyInput}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setMax()} >
                  max
                </Button>
              </InputRightElement>
            </InputGroup>
            {( type === 'sell' && coinData) && (
               <TransactionModalBalance
                  label={`Available ${coinData.name}`}
                  amount={availableQty}
                  size='sm'
                  position='flex-end'
                />
            )}
           
            </Box> 
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
            {type === 'buy' && (
              <Text fontWeight={600} fontSize={{xs: 'md'}}>
                Ending Balance:
                <Text as='span' fontWeight={400} fontSize={{xs: 'md'}} ml={2}>
                {`$ ${endingBal}`}
                </Text>
              </Text>
            )}
          </VStack>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit} w='100%' isDisabled={disable}>{type}</Button>
      </ModalFooter>
    </>
  )
}

export default BuyModal