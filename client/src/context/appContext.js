import React, { useReducer, useContext } from 'react'

import reducer  from './reducer'
import axios from 'axios'

import { 
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  GET_COINDATA_SUCCESS,
  GET_COINDATA_ERROR,
  GET_COINSDATA_BEGIN,
  GET_COINSDATA_SUCCESS,
  GET_COINSDATA_ERROR,
  BUY_COIN_BEGIN, 
  BUY_COIN_SUCCESS,
  BUY_COIN_ERROR,
  GET_PORTFOLIO_BEGIN,
  GET_PORTFOLIO_SUCCESS,
  GET_PORTFOLIO_ERROR,
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  trendingData: [],
  marketData: [],
  rCryptoData: [],
  rSatoshiData: [],
  portfolio: [],
  portfolioMarketData: [],
  portfolioBalance: 0,
  tetherBalance: 0,
  tetherQty: 0,
  coinId: '',
  coinData: {},
  qty: 0,
  availableQty: 0,
  endingBalance: 0
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
    // getCoinsData()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  const getCoinsData = async () => {
    dispatch({ type: GET_COINSDATA_BEGIN })

    try {
      const [ trendingResponse, marketResponse, rCryptoResponse, rSatoshiResponse ] = await Promise.all([
        axios.get('https://api.coingecko.com/api/v3/search/trending'),
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'),
        axios.get('https://www.reddit.com/r/cryptocurrency/hot.json'),
        axios.get('https://www.reddit.com/r/SatoshiStreetBets/hot.json')
      ])

      const rCryptoPosts = (rCryptoResponse.data.data.children).slice(0,4)
      const rSatoshiPosts = (rSatoshiResponse.data.data.children).slice(0,6)
      
      dispatch({
        type: GET_COINSDATA_SUCCESS,
        payload: {
          trendingData: trendingResponse.data.coins,
          marketData: marketResponse.data,
          rCryptoData: rCryptoPosts,
          rSatoshiData: rSatoshiPosts
        }
      })

    } catch (error) {
      throw new Error('API Limit for the minute exceeded')
    }
  }

  const getCoinData = async (coinId) => {
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)

      // console.log(data)
      dispatch({
        type: GET_COINDATA_SUCCESS,
        payload: {
          coinData: data[0]
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const buyCoin = async (coinId,qty,price) => {
    try {
      const tetherAmount = await convertToTether(qty,price);
      console.log(tetherAmount)
     
      let userPortfolio = JSON.parse(localStorage.getItem('userPortfolio') || '[]')
      let updatedPortfolio = [];
        
      // is coin in portfolio?
      const foundCoin = userPortfolio.find(coin => coin.coinId === coinId)

      // if coin exists, update qty
      if(foundCoin) {
        updatedPortfolio = userPortfolio.map(coin => 
          coin.coinId === coinId ? {...coin, qty: coin.qty + qty} : coin)
      } else {
        // if not, add to existing portfolio
        updatedPortfolio = [...userPortfolio, {coinId,qty}]
      }

      localStorage.setItem('userPortfolio', JSON.stringify(updatedPortfolio))
      withdrawTether(tetherAmount)

      getPortfolio()
      clearValues()
      
    } catch (error) {
      console.log(error)
    }
    
  }

  const sellCoin = async (coinId,qty,price) => {
    try {
      const tetherAmount = await convertToTether(qty,price);
      let userPortfolio = JSON.parse(localStorage.getItem('userPortfolio') || '[]')
      let updatedPortfolio = [];

      if (userPortfolio) {
        const foundCoin = userPortfolio.find(coin => coin.coinId === coinId)

        if (foundCoin && foundCoin.qty === qty) {
          updatedPortfolio = userPortfolio.filter(coin => coin.coinId !== coinId)
        }

        if (foundCoin && foundCoin.qty !== qty) {
          updatedPortfolio = userPortfolio.map(coin => 
            coin.coinId === coinId ? {...coin, qty: coin.qty - qty} : coin
          )
        }
        
        localStorage.setItem('userPortfolio', JSON.stringify(updatedPortfolio))
      } 

      depositTether(tetherAmount)
      
      clearValues()
      getPortfolio()
      
      
    } catch (error) {
      console.log(error)
    }
    
  }

  const depositTether = (qty) => {
    try {
      let userPortfolio = JSON.parse(localStorage.getItem('userPortfolio') || '[]')
      
      if (userPortfolio.length > 0) { 
        let updatedPortfolio = [];
        const foundCoin = userPortfolio.find(coin => coin.coinId === 'tether')

        // if coin exists, update qty
        if(foundCoin) {
          updatedPortfolio = userPortfolio.map(coin => 
            coin.coinId === 'tether' ? {...coin, qty: coin.qty + qty} : coin
          )
        } else {
          // if not, add to portfolio
          updatedPortfolio = [...userPortfolio, {coinId: 'tether', qty}]
        }

        localStorage.setItem('userPortfolio', JSON.stringify(updatedPortfolio))
        
      } else {
        userPortfolio.push({coinId:'tether',qty})
        localStorage.setItem('userPortfolio', JSON.stringify(userPortfolio))
      }

      clearValues()
      getPortfolio()

    } catch (error) {
      console.log(error)
    }

  }

  const withdrawTether = (qty) => {
    try {
      const coinId = 'tether'
      let userPortfolio = JSON.parse(localStorage.getItem('userPortfolio') || '[]')

      if (userPortfolio.length > 0) {
        let updatedPortfolio;

        const foundCoin = userPortfolio.find(coin => coin.coinId === coinId)

        if (foundCoin && foundCoin.qty === qty) {
          updatedPortfolio = userPortfolio.filter(coin => coin.coinId !== coinId)
        }

        if (foundCoin && foundCoin.qty !== qty) {
          updatedPortfolio = userPortfolio.map(coin => 
            coin.coinId === coinId ? {...coin, qty: coin.qty - qty} : coin
          )
        }
        
        localStorage.setItem('userPortfolio', JSON.stringify(updatedPortfolio))
      } 
      
      clearValues()
      getPortfolio()
      
      
    } catch (error) {
      console.log(error)
    }
    
  }

  const convertToTether = async (qty,price) => {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether&order=market_cap_desc&per_page=100&page=1&sparkline=false`)

    // get coin's fiat amount
    const convertedAmount = qty*price

    // get amount of tether needed to buy coin
    const tetherAmount = convertedAmount / data[0].current_price

    return tetherAmount
  }

  const getPortfolio = async () => {
    dispatch({ type: GET_PORTFOLIO_BEGIN })

    try {
      // const { portfolio } = state
      // localStorage.removeItem('userPortfolio');

      const userPortfolio = JSON.parse(localStorage.getItem('userPortfolio') || '[]')
      console.log(userPortfolio)

      let mergedData = [];
      let totalBal = 0;
      let tetherBal = 0;
      let tetherQty = 0;

      // get coin data if user portfolio is not empty
      if(userPortfolio.length > 0) {
        let ids = '';

        for(let i=0; i<userPortfolio.length; i++) {
          if(i < userPortfolio.length - 1) {
            ids += `${userPortfolio[i].coinId}%2C`
          }
          if(i === userPortfolio.length - 1) {
            ids += userPortfolio[i].coinId
          } 
        }

        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)

        

        for (let i=0; i<userPortfolio.length; i++) {
          const coinData = data.find(coin => coin.id === userPortfolio[i].coinId)

          let obj = {
            ...userPortfolio[i],
            "current_balance": userPortfolio[i].qty * coinData.current_price,
            "symbol": coinData.symbol,
            "name": coinData.name,
            "current_price": coinData.current_price,
            "price_change_percentage_24h": coinData.price_change_percentage_24h,
            "image": coinData.image
          }
          mergedData.push(obj)

          totalBal += (userPortfolio[i].qty * coinData.current_price)
          
          if(userPortfolio[i].coinId === 'tether') {
            tetherBal = obj.current_balance
            tetherQty = obj.qty
          }
        }

      }

      dispatch({
        type: GET_PORTFOLIO_SUCCESS,
        payload: {
          portfolioMarketData: mergedData,
          portfolioBalance: totalBal,
          tetherBalance: tetherBal,
          tetherQty: tetherQty
        }
      })


    } catch (error) {
      console.log(error)
    }
    
  }


        

  return (
    <AppContext.Provider
      value={
        {...state,
          displayAlert,
          setupUser,
          logoutUser,
          handleChange,
          getCoinsData,
          getCoinData,
          buyCoin,
          sellCoin,
          depositTether,
          withdrawTether,
          getPortfolio
        }
      }
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }