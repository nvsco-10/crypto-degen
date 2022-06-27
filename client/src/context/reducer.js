import {
  HANDLE_CHANGE,
  GET_COINDATA_SUCCESS,
  GET_COINDATA_ERROR,
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

import { initialState } from './appContext'

const reducer = (state, action) => {

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    }
  }

  if (action.type === GET_COINDATA_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      coinData: action.payload.coinData,
    }
  }

  if(action.type === GET_COINDATA_ERROR) {
    return {
      ...state
    }
  }
  
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

  if(action.type === ADD_PORTFOLIO_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if(action.type === ADD_PORTFOLIO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      portfolio: action.payload.portfolio
    }
  }

  if(action.type === ADD_PORTFOLIO_ERROR) {
    return {
      ...state
    }
  }

  if (action.type === GET_PORTFOLIO_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === GET_PORTFOLIO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      portfolioMarketData: action.payload.portfolioMarketData,
      portfolioBalance: action.payload.portfolioBalance,
      tetherBalance: action.payload.tetherBalance
    }
  }

  if(action.type === GET_PORTFOLIO_ERROR) {
    return {
      ...state
    }
  }

  throw new Error(`no such action: ${action.type}`)
}

export default reducer