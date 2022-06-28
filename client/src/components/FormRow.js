import React, { useState } from 'react'

import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  IconButton
} from '@chakra-ui/react'

import {
  ViewIcon,
  ViewOffIcon
} from '@chakra-ui/icons'

const FormRow = ({name, label, type, value, handleChange, isMember}) => {
  const [show, setShow] = useState(false)

  const isError = value === ''

  return (
    <FormControl>
      <FormLabel 
        htmlFor='email' 
        fontSize='sm'
        fontWeight={600}
        textTransform='capitalize'
      >
        {label || name}
      </FormLabel>
      {type !== 'password'
        ? <Input
            fontSize='sm'
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={`Enter your ${label || name}..`}
          />
        : <InputGroup size='md'>
            <Input
              fontSize='sm'
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder={`Enter your ${label || name}..`}
            />
            <InputRightElement width='3rem'>
              <Button 
                bg='transparent' 
                size='sm' 
                onClick={() => setShow(!show)} 
                _hover={{ bg: 'transparent' }}
                _focus={{ border: 'none', bg: 'transparent' }}
              >
                { show ? <ViewIcon /> : <ViewOffIcon /> }
              </Button>
            </InputRightElement>
          </InputGroup>
      }
      
      {type === "password" && !isError && !isMember ? (
        <FormHelperText fontSize='xs'>
          Password should have a minimum length of 6 characters.
        </FormHelperText>
      ) : (
        <FormErrorMessage>{name} is required.</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default FormRow