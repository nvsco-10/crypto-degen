import React, { useReducer, useContext } from 'react'

import reducer  from './reducer'
import axios from 'axios'

import { 
  GET_COINSDATA_BEGIN,
  GET_COINSDATA_SUCCESS,
  GET_COINSDATA_ERROR,
  ADD_WATCHLIST_BEGIN, 
  ADD_WATCHLIST_SUCCESS,
  ADD_WATCHLIST_ERROR,
  GET_WATCHLIST_BEGIN,
  GET_WATCHLIST_SUCCESS,
  GET_WATCHLIST_ERROR,
} from './actions'

const initialState = {
  isLoading: false,
  trendingData: [],
  marketData: [],
  rCryptoData: [],
  rSatoshiData: [],
  watchlist: [],
  watchListData: []
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

  const addToWatchlist = (coinId) => {
    // console.log(coinId)
    dispatch({ type: ADD_WATCHLIST_BEGIN })
    try {
      const { watchlist } = state

      if (watchlist) {
        const foundCoin = watchlist.find(coin => coin === coinId)

        if(foundCoin) {
          return
        }

        const updatedList = [...watchlist, coinId]
        dispatch({
          type: ADD_WATCHLIST_SUCCESS,
          payload: {
            watchlist: updatedList
          }
        })

        return
      } 

      dispatch({
        type: ADD_WATCHLIST_SUCCESS,
        payload: {
          watchlist: [coinId]
        }
      })

    } catch (error) {
      console.log(error)
    }
    
  }

  const getWatchlist = async () => {
    dispatch({ type: GET_WATCHLIST_BEGIN })

    try {
      // const { watchlist } = state
      const watchlist = ['bitcoin', 'ethereum', 'solana', 'monero', 'dogecoin'];
      let ids = '';

      for(let i=0; i<watchlist.length; i++) {
        if(i < watchlist.length - 1) {
          ids += `${watchlist[i]}%2C`
        }
        if(i === watchlist.length - 1) {
          ids += watchlist[i]
        } 
      }

      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)

      console.log(data)
      dispatch({
        type: GET_WATCHLIST_SUCCESS,
        payload: {
          watchlistData: data
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
          addToWatchlist,
          getWatchlist
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