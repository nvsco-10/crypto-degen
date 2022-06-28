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

import { initialState } from './appContext'

const reducer = (state, action) => {

  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    }
  }

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

  if(action.type === BUY_COIN_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if(action.type === BUY_COIN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      portfolio: action.payload.portfolio
    }
  }

  if(action.type === BUY_COIN_ERROR) {
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