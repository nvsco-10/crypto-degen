import React, { useReducer, useContext } from 'react'

import reducer  from './reducer'
import axios from 'axios'

import portfolioMockData from '../utils/portfolioMockData.js'

import { 
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
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
  coinId: '',
  coinData: {},
  qty: 0,
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

  const buyCoin = (coinId) => {
    // console.log(coinId)
    dispatch({ type: BUY_COIN_BEGIN })
    try {
      const { portfolio } = state

      if (portfolio) {
        const foundCoin = portfolio.find(coin => coin === coinId)

        if(foundCoin) {
          return
        }

        const updatedList = [...portfolio, coinId]
        dispatch({
          type: BUY_COIN_SUCCESS,
          payload: {
            portfolio: updatedList
          }
        })

        return
      } 

      dispatch({
        type: BUY_COIN_SUCCESS,
        payload: {
          portfolio: [coinId]
        }
      })

    } catch (error) {
      console.log(error)
    }
    
  }

  const getPortfolio = async () => {
    dispatch({ type: GET_PORTFOLIO_BEGIN })

    try {
      const { portfolio } = state
      
      let ids = '';

      for(let i=0; i<portfolioMockData.length; i++) {
        if(i < portfolioMockData.length - 1) {
          ids += `${portfolioMockData[i].coinId}%2C`
        }
        if(i === portfolioMockData.length - 1) {
          ids += portfolioMockData[i].coinId
        } 
      }

      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)

      let mergedData = [];
      let totalBal = 0;
      let tetherBal = 0;

      for (let i=0; i<portfolioMockData.length; i++) {
        const coinData = data.find(coin => coin.id === portfolioMockData[i].coinId)

        let obj = {
          ...portfolioMockData[i],
          "current_balance": portfolioMockData[i].qty * coinData.current_price,
          "symbol": coinData.symbol,
          "name": coinData.name,
          "current_price": coinData.current_price,
          "price_change_percentage_24h": coinData.price_change_percentage_24h,
          "image": coinData.image
        }
        mergedData.push(obj)

        totalBal += (portfolioMockData[i].qty * coinData.current_price)
        
        if(portfolioMockData[i].coinId === 'tether') {
          tetherBal = obj.current_balance
        }
      }

      dispatch({
        type: GET_PORTFOLIO_SUCCESS,
        payload: {
          portfolioMarketData: mergedData,
          portfolioBalance: totalBal,
          tetherBalance: tetherBal
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