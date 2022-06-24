import React from 'react'
import { useAppContext } from '../context/appContext'
import IconBtn from './IconBtn'

import {
  Container,
  Box,
  Heading,
  Text,
  Button
} from '@chakra-ui/react'

import { BiTransfer, BiPlus, BiMinus } from 'react-icons/bi'
import { GoSettings } from 'react-icons/go'


const PortfolioOverview = () => {
  const { portfolioBalance } = useAppContext()

  return (
    <Box display='flex' flexDirection='column' py={6} px={4}>
      <Box as='header' mb={8} display='flex' justifyContent='space-between'>
        <Box w='25px'></Box>
        <Heading 
          as='h3' 
          fontWeight={600}
          size={{xs: 'sm', md: 'md'}}
        >
          Crypto Wallet
        </Heading>
        <Box w='25px'>
          <GoSettings className='btn-icon' />
        </Box>
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center' mb={6}>
        <Text
          fontSize={{xs: 'xs'}}
        >
          TOTAL BALANCE
        </Text>
        <Box display='flex'>
          <Text fontSize={{xs: 'md'}}>
            $
            <Text as='span' px={1} fontSize={{xs: 'xx-large'}}>
              {portfolioBalance.toLocaleString('en-US')}
            </Text>
            USD
          </Text>
        </Box>
      </Box>
      <Box display='flex' justifyContent='space-evenly'>
        <IconBtn icon={<BiPlus className='btn-icon'/>} label='Buy'/>
        <IconBtn icon={<BiMinus className='btn-icon'/>} label='Sell'/>
        <IconBtn icon={<BiTransfer className='btn-icon'/>} label='Transfer'/>
      </Box>
    </Box>
  )
}

export default PortfolioOverview