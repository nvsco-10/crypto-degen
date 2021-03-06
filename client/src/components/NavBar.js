import { useState, useEffect } from 'react' 
import { useAppContext } from '../context/appContext'
import logo from '../assets/images/logo.png'
import logolight from '../assets/images/logo-light.png'

import { useNavigate, useLocation } from 'react-router-dom'

import { Login } from '.'

// Chakra imports
import {
  Container,
  Box,
  Flex,
  Text,
  Avatar,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Heading,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';

import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon, 
  SunIcon
} from '@chakra-ui/icons';

import navItems from '../utils/navItems.js'

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: modalIsOpen, onOpen, onClose } = useDisclosure()
  const { user, logoutUser } = useAppContext()

  const navigate = useNavigate()
  const location = useLocation()

  const { colorMode, toggleColorMode } = useColorMode()

  const logout = () => {
    logoutUser()

    if(location.pathname === '/') {
      navigate(0)
    }

    if(location.pathname === '/trade-simulator') {
      navigate('/')
    }
    
  }


  return (
    <Container 
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.600', 'white')}
      maxW='1600' 
      as="header" 
      position="sticky" 
      top='0' 
      zIndex={1} >
      <Flex
        minH={'4rem'}
        py={{ base: 2 }}
        px={{ base: 2 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={ isOpen 
              ? <CloseIcon w={3} h={3} /> 
              : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex 
          flex={{ base: 1 }} 
          justify={{ base: 'center', md: 'start' }}>
        {/* logo  */}
          <Box w='80px'>
            <Link href='/'>
              <Image 
                src={ colorMode === 'light' ? logo : logolight } 
                alt='crypto degen' />
            </Link>
          </Box>
          <Flex 
            display={{ base: 'none', md: 'flex' }} 
            alignItems='center' 
            ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>

          {/* { !user ? (
            <>
              <Button onClick={onOpen} fontSize='sm' bg='transparent'>Log In</Button>
              <Login onClose={onClose} isOpen={modalIsOpen} />
            </>
          ) : (
          <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList zIndex='popover'>
                <MenuItem>Profile</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => logout()}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )
            } */}
            
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Container>
  );
}

export default NavBar

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label} display='flex' alignItems='center'>
          <Link
            p={2}
            href={navItem.href ?? '#'}
            fontSize={'sm'}
            fontWeight={600}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}>
            {navItem.label}
          </Link>
          { navItem.span && (
            <Text as='i' fontSize={10} textColor='center'>
              *{navItem.span}
            </Text>
          )}
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={6}
      display={{ md: 'none' }}>
      {navItems.map((navItem) => (
        <MobileNavItem 
          key={navItem.label} 
          {...navItem} 
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href, span }) => {

  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        { span && (
          <Text as='i' fontSize={10} textColor='center'>
            *{span}
          </Text>
        )}
      </Flex>

    </Stack>
  );
};



