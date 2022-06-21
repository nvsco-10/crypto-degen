// import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import theme from './utils/theme.js'

function App() {
  return (
    <ChakraProvider theme={theme}>
      test
    </ChakraProvider>
  );
}

export default App;
