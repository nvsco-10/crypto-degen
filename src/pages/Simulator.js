import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { Coins, Portfolio } from './'

import {
  Container,

} from '@chakra-ui/react'


const Simulator = () => {
  // const { getData } = useAppContext()

  // useEffect(() => {
  //   getData()
  // },[])

  return (
    <Portfolio />
    // <Coins />
  )
}

export default Simulator