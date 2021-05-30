import {
  GET_HOLDINGS_LOADING,
  GET_HOLDINGS_SUCCESS,
  GET_HOLDINGS_FAILURE,
  GET_COIN_MARKET_LOADING,
  GET_COIN_MARKET_SUCCESS,
  GET_COIN_MARKET_FAILURE,
} from './marketConstants';

const initialState = {
  myHoldings: [],
  coins: [],
  error: null,
  loading: false,
};

const marketReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOLDINGS_LOADING:
    case GET_COIN_MARKET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_HOLDINGS_SUCCESS:
      return {
        ...state,
        myHoldings: action.payload.myHoldings,
      };
    case GET_COIN_MARKET_SUCCESS:
      return {
        ...state,
        coins: action.payload.coin,
      };
    case GET_HOLDINGS_FAILURE:
    case GET_COIN_MARKET_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default marketReducer;
