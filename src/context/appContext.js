import React, { useReducer, useContext } from 'react'

import reducer  from './reducer'
import axios from 'axios'

import portfolioMockData from '../utils/portfolioMockData.js'

import { 
  GET_COINSDATA_BEGIN,
  GET_COINSDATA_SUCCESS,
  GET_COINSDATA_ERROR,
  ADD_PORTFOLIO_BEGIN, 
  ADD_PORTFOLIO_SUCCESS,
  ADD_PORTFOLIO_ERROR,
  GET_PORTFOLIO_BEGIN,
  GET_PORTFOLIO_SUCCESS,
  GET_PORTFOLIO_ERROR,
} from './actions'

const initialState = {
  isLoading: false,
  trendingData: [],
  marketData: [],
  rCryptoData: [],
  rSatoshiData: [],
  portfolio: [],
  portfolioMarketData: [],
  portfolioBalance: 0,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

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

  const addToPortfolio = (coinId) => {
    // console.log(coinId)
    dispatch({ type: ADD_PORTFOLIO_BEGIN })
    try {
      const { portfolio } = state

      if (portfolio) {
        const foundCoin = portfolio.find(coin => coin === coinId)

        if(foundCoin) {
          return
        }

        const updatedList = [...portfolio, coinId]
        dispatch({
          type: ADD_PORTFOLIO_SUCCESS,
          payload: {
            portfolio: updatedList
          }
        })

        return
      } 

      dispatch({
        type: ADD_PORTFOLIO_SUCCESS,
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
      // const { portfolio } = state
      // const portfolio = ['bitcoin', 'ethereum', 'solana', 'monero', 'dogecoin'];
      
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

      // console.log(data)

      let mergedData = [];
      let totalBal = 0;

      for (let i=0; i<portfolioMockData.length; i++) {
        let obj = {
          ...portfolioMockData[i],
          "symbol": data[i].symbol,
          "name": data[i].name,
          "current_price": data[i].current_price,
          "price_change_percentage_24h": data[i].price_change_percentage_24h,
          "image": data[i].image
        }
        mergedData.push(obj)

        totalBal += (portfolioMockData[i].qty * data[i].current_price)
      }

      console.log(mergedData)

      dispatch({
        type: GET_PORTFOLIO_SUCCESS,
        payload: {
          portfolioMarketData: mergedData,
          portfolioBalance: totalBal
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
          getCoinsData,
          addToPortfolio,
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