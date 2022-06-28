import { useState } from 'react'

import FormRow from './FormRow'

import {
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text
} from '@chakra-ui/react'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Login = ({ onClose, isOpen }) => {
  const [values, setValues] = useState(initialState)

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {values.isMember ? 'Log In' : 'Sign Up' }
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize='sm'>
              {values.isMember ? 'No account yet?' : 'Already have an account?' }
                <Button 
                  bg='transparent' 
                  size='sm' 
                  pl={2} 
                  _hover={{ bg: 'transparent' }}
                  _focus={{ bg: 'transparent'}}
                  onClick={toggleMember}
                >
                  {values.isMember ? 'Create an account' : 'Log In' }
                </Button>
            </Text>
            <Stack spacing={4} my={4}>
              <FormRow
                name='username'
              />
              {!values.isMember && 
                <FormRow
                  name='email'
                  type='email'
                />
              }
              <FormRow
                name='password'
                type='password'
                isMember={values.isMember}
              />
            </Stack>
            
          </ModalBody>
          <ModalFooter>
            <Button 
              w='100%' 
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.300',
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Login