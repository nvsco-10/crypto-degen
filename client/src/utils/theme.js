import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Roboto Condensed', Sans-Serif`,
    body: `'Cabin', Sans-Serif`,
  },
  breakpoints: {
    xs: '380px',
    sm: "480px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  }
})

export default theme