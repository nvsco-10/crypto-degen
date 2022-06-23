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

import { initialState } from './appContext'

const reducer = (state, action) => {
  
  if (action.type === GET_COINSDATA_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === GET_COINSDATA_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      trendingData: action.payload.trendingData,
      marketData: action.payload.marketData,
      rCryptoData: action.payload.rCryptoData,
      rSatoshiData: action.payload.rSatoshiData
    }
  }

  if(action.type === GET_COINSDATA_ERROR) {
    return {
      ...state
    }
  }

  if(action.type === ADD_WATCHLIST_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if(action.type === ADD_WATCHLIST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      watchlist: action.payload.watchlist
    }
  }

  if(action.type === ADD_WATCHLIST_ERROR) {
    return {
      ...state
    }
  }

  if (action.type === GET_WATCHLIST_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === GET_WATCHLIST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      watchlistData: action.payload.watchlistData
    }
  }

  if(action.type === GET_WATCHLIST_ERROR) {
    return {
      ...state
    }
  }

  throw new Error(`no such action: ${action.type}`)
}

export default reducer