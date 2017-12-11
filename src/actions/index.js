import {SET_BALANCE, SET_STOCKS} from '../constants';

export function setBlance(amount){
  const action = {
    type: SET_BALANCE,
    amount
  }
  return action;
}

export function setStocks(stocks){
  const action = {
    type: SET_STOCKS,
    stocks
  }
  return action;
}
