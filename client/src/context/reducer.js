import {
  UPDATE_WATCHLIST,
  UPDATE_WATCHLIST_SUCCESS,
  GET_WATCHLISTDATA_BEGIN,
  GET_WATCHLISTDATA_SUCCESS,
  GET_WATCHLISTDATA_ERROR
} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {

  if (action.type === UPDATE_WATCHLIST) {
    const favorites = [...state.watchlist] || []
    
    const foundCoin = state.watchlist.find(coin => coin === action.payload.coin)

    if(foundCoin) return
    
    favorites.push(action.payload.coin)

    console.log(favorites)
    return {
      ...state,
      isLoading: true,
      watchlist: favorites
    }
  }

  if(action.type === UPDATE_WATCHLIST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    }
  }

  if(action.type === GET_WATCHLISTDATA_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if(action.type === GET_WATCHLISTDATA_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      watchlistData: action.payload.data
    }
  }

  throw new Error(`no such action: ${action.type}`)
}

export default reducer