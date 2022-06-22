import React, { useReducer, useContext } from 'react'

import reducer  from './reducer'
import axios from 'axios'
import { 
  UPDATE_WATCHLIST, 
  UPDATE_WATCHLIST_SUCCESS,
  GET_WATCHLISTDATA_BEGIN,
  GET_WATCHLISTDATA_SUCCESS,
  GET_WATCHLISTDATA_ERROR,
} from './actions'

const initialState = {
  isLoading: false,
  watchlist: [],
  watchListData: []
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const updateWatchlist = async (coinId) => {
    try {
      dispatch({ 
        type: UPDATE_WATCHLIST,
        payload: {
          coin: coinId
          } 
        })
        
      getWatchlistData()

      

    } catch (err) {
      console.log(err)
    }
  }

  const getWatchlistData = async (list) => {
    dispatch({type: GET_WATCHLISTDATA_BEGIN})
    try {

      if(state.watchlist?.length > 0) {
        let ids = ''

        for(let i=0; i<= state.watchlist.length - 1; i++) {
          if(i < state.watchlist.length - 1) {
            ids += `${state.watchlist[i]}%2C`
          } else {
            ids += state.watchlist[i]
          }
        }

        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        
        // console.log(data)

        dispatch({
          type: GET_WATCHLISTDATA_SUCCESS,
          payload: {
            data
          }
        })

      }
      
    
    } catch (err) {
      console.log(err)
    }
    



  }

  return (
    <AppContext.Provider
      value={
        {...state,
          updateWatchlist,
          getWatchlistData
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