import {combineReducers} from 'redux';
import balance from './reducer_balance';
import stocks from './reducer_stocks';

export default combineReducers({
  balance,
  stocks
})
