import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import theme from './utils/theme.js'
import { NavBar } from './components'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar/>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
