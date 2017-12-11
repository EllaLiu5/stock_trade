import {SET_STOCKS} from '../constants';

export default (state = [], action) =>{
  switch(action.type){
    case SET_STOCKS:
      const {stocks} = action;
      return stocks;
    default:
      return state;
  }
}
