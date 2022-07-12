import { useAppContext } from '../context/appContext';
import BuyModal from './BuyModal';
import TransferModal from './TransferModal';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
} from '@chakra-ui/react'


const TransactionModal = ({onClose, isOpen, type}) => {
  const { tetherBalance, getCoinData, coinData, coinId, qty, handleChange } = useAppContext()

  const renderModal = () => {
    if(type === 'buy') {
      return <BuyModal />
    }

    if(type === 'transfer') {
      return <TransferModal />
    }
  }

  // const handleSubmit = () => {
  //   console.log(coinId, qty)
  // }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={{xs: 'xs', sm: 'sm'}}>
      <ModalOverlay />
      <ModalContent>
        {renderModal()}
        {/* <ModalFooter>
          <Button onClick={handleSubmit} w='100%'>{type}</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  )
}

export default TransactionModal