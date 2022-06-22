import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
// custom theme for Chakra
import theme from './utils/theme.js'

import { SharedLayout, Home, Simulator } from './pages'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout/>} >
            <Route index element={<Home/>} />
            <Route path="trade-simulator" element={<Simulator/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
