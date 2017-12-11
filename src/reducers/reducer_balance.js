import {SET_BALANCE} from '../constants';

let balance = {
  amount: 0
}

export default (state = balance, action) =>{
  switch(action.type){
    case SET_BALANCE:
      const {amount} = action;
      balance = {
        amount
      }
      return balance;
    default:
      return state;
  }
}
