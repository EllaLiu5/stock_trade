import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import {connect} from 'react-redux';
import {setBlance} from '../actions';
import { balanceRef } from '../firebase';
import {stocksRef} from '../firebase';
import './Stocks.css';

class TradeStocks extends Component{
  //pass in stockname and price
  constructor(props){
    super(props);
    this.state={
      add:'',
      remove:'',
      error:''
    };
  }

  buyStock(){
    let currentBalance = parseInt(this.props.balance.amount, 10);
    let currentAmount= parseInt(this.props.currentStockNum, 10);
    let buyAmount = parseInt(this.state.add, 10);
    let stockPrice = parseFloat(this.props.currentStockPrice);
    console.log('numbers', currentAmount, stockPrice);
    if (buyAmount<0){
      this.setState({error: "can not add negative value"});
    }
    else if (currentBalance<buyAmount*stockPrice) {
      this.setState({error: "current balance is not enough"});
    }
    else{
      let newBlance = currentBalance-buyAmount*stockPrice;
      console.log('newBlance',newBlance);
      console.log('currentStocks', currentAmount+buyAmount);
      balanceRef.set(newBlance);
      stocksRef.child(this.props.currentStockName).set({name:this.props.currentStockName, quantity: currentAmount+buyAmount});
    }
  }

  sellStock(){
    let currentAmount= parseInt(this.props.currentStockNum, 10);
    let stockPrice = parseFloat(this.props.currentStockPrice);
    let currentBalance = parseInt(this.props.balance.amount, 10);
    let sellAmount = parseInt(this.state.remove, 10);
    if (sellAmount<0){
      this.setState({error: "can not add negative value"});
    }
    else if (currentAmount<sellAmount) {
      this.setState({error: "can not sell more than you have"});
    }
    else{
      let newBlance = currentBalance+sellAmount*stockPrice;
      console.log(newBlance);
      balanceRef.set(newBlance);
      stocksRef.child(this.props.currentStockName).set({name:this.props.currentStockName, quantity: currentAmount-sellAmount});
    }
  }

  render(){
    return(
      <div className="tradeStocks">
        <div className="tradeForm">
        <FieldGroup
          id="formControlsText"
          type="text"
          placeholder="Add to account balance"
          onChange={event => this.setState({add: event.target.value})}
        />
        <Button type="submit" onClick={() => this.buyStock()}>
          Add
        </Button>
        <FieldGroup
          id="formControlsText"
          type="text"
          placeholder="Remove from account balance"
          onChange={event => this.setState({remove: event.target.value})}
        />
        <Button type="submit" onClick={() => this.sellStock()}>
          Remove
        </Button>
        <div className="error">{this.state.error}</div>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log('state', state);
  const {balance, stocks} = state;
  return {
    balance, stocks
  };
}

export default connect(mapStateToProps, null)(TradeStocks);
export const FieldGroup = ({id, label, help, inputRef, ...props}) =>
<FormGroup controlId={id}>
  <ControlLabel>{label}</ControlLabel>
  <FormControl {...props} inputRef={inputRef}/>
  {help && <HelpBlock>{help}</HelpBlock>}
</FormGroup>
