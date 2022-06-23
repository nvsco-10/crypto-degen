import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { Coins } from '../components'

import {
  Container,

} from '@chakra-ui/react'


const Simulator = () => {
  // const { getData } = useAppContext()

  // useEffect(() => {
  //   getData()
  // },[])

  return (
    <Coins />
  )
}

export default Simulator