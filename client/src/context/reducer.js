import {
  GET_COINSDATA_BEGIN,
  GET_COINSDATA_SUCCESS,
  GET_COINSDATA_ERROR,
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
      marketData: action.payload.marketData
    }
  }

  throw new Error(`no such action: ${action.type}`)
}

export default reducer