import axios from 'axios';
import {
  GET_HOLDINGS_LOADING,
  GET_HOLDINGS_SUCCESS,
  GET_HOLDINGS_FAILURE,
  GET_COIN_MARKET_LOADING,
  GET_COIN_MARKET_SUCCESS,
  GET_COIN_MARKET_FAILURE,
} from './marketConstants';

// Holding /My Holdings
export const getHoldings =
  (
    holdings = [],
    currency = 'usd',
    orderBy = 'market_cap_desc',
    sparkline = true,
    priceChangePerc = '7d',
    perPage = 10,
    page = 1
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_HOLDINGS_LOADING,
      });
      let ids = holdings
        .map((item) => {
          return item.id;
        })
        .join(',');
      const apiURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;

      const response = await axios.get(apiURL);
      //   console.log('GET HOLDINGS ->> ', response);
      if (response.status === 200) {
        const myHoldings = response.data.map((item) => {
          // retrieve current holdings -> current quantity
          let coin = holdings.find((a) => a.id === item.id);
          // price from 7 days ago
          let price7d =
            item.current_price /
            (1 + item.price_change_percentage_7d_in_currency * 0.01);
          return {
            id: item.id,
            symbol: item.symbol,
            name: item.name,
            image: item.image,
            current_price: item.current_price,
            qty: coin.qty,
            total: coin.qty * item.current_price,
            price_change_percentage_7d_in_currency:
              item.price_change_percentage_7d_in_currency,
            holding_value_change_7d: (item.current_price - price7d) * coin.qty,
            sparkline_in_7d: {
              value: item.sparkline_in_7d.price.map((price) => {
                return price * coin.qty;
              }),
            },
          };
        });
        // console.log('MY HOLDINGS ->> ', myHoldings);
        dispatch({
          type: GET_HOLDINGS_SUCCESS,
          payload: { myHoldings },
        });
      } else {
        dispatch({
          type: GET_HOLDINGS_FAILURE,
          payload: { myHoldings: response.data },
        });
      }
    } catch (error) {
      dispatch({
        type: GET_HOLDINGS_FAILURE,
        payload: { error },
      });
    }
  };

// Coin Market

export const getCoinMarket =
  (
    currency = 'usd',
    orderBy = 'market_cap_desc',
    sparkline = true,
    priceChangePerc = '7d',
    perPage = 10,
    page = 1
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_COIN_MARKET_LOADING,
      });

      let apiURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;

      const response = await axios.get(apiURL);
      //   console.log('GET COIN MARKET ->> ', response)

      if (response.status === 200) {
        dispatch({
          type: GET_COIN_MARKET_SUCCESS,
          payload: { coin: response.data },
        });
      } else {
        dispatch({
          type: GET_COIN_MARKET_FAILURE,
          payload: { coin: response.data },
        });
      }
    } catch (error) {
      dispatch({
        type: GET_COIN_MARKET_FAILURE,
        payload: { error },
      });
    }
  };
