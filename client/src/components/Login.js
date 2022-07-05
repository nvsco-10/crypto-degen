import { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import FormRow from './FormRow'
import { useNavigate } from 'react-router-dom'

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


import validateEmail from '../utils/validateEmail.js'

const initialState = {
  username: '',
  email: '',
  password: '',
  isMember: true,
}

const Login = ({ onClose, isOpen }) => {
  const [values, setValues] = useState(initialState)
  const [ disable, setDisable ] = useState(true)
  const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext()

  const navigate = useNavigate()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    isDisabled()
  }

  const isDisabled = () => {
    const { username, email, password, isMember } = values

    if (!username || !password || (!isMember && !email)) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { username, email, password, isMember } = values

    const currentUser = { username, email, password }

    if (isMember) {
      await setupUser({
        currentUser,
        endPoint: 'login',
        alertText: `Welcome back, ${currentUser.username}!`,
      })
 
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'Account successfully created!',
      })
    }

    setTimeout(() => {
      navigate('/trade-simulator')
    }, 2000)
  }

  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       navigate('/trade-simulator')
  //     }, 2000)
  //   }
  // }, [user, navigate])

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
                value={values.username}
                handleChange={handleChange}
              />
              {!values.isMember && 
                <FormRow
                  name='email'
                  type='email'
                  value={values.email}
                  handleChange={handleChange}
                />
              }
              <FormRow
                name='password'
                type='password'
                value={values.password}
                handleChange={handleChange}
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
              onClick={handleSubmit}
              disabled={isDisabled()}
              isLoading={isLoading}
              loadingText='Submitting'
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