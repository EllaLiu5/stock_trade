import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import {connect} from 'react-redux';
import TradeStocks from './TradeStocks';
import {stocksRef} from '../firebase';
import {setStocks} from '../actions';
import './Stocks.css';

class Stocks extends Component{
  constructor(){
    super();
    this.state={
      name:'',
      price:'',
      time:''
    }
  }

  componentDidMount(){
    stocksRef.on('value', snap => {
      let stocks = [];
      snap.forEach(stock => {
        let stockObject = stock.val();
        console.log('stockObject', stockObject);
        stocks.push(stockObject);
      })
      console.log('stocks', stocks);
      this.props.setStocks(stocks);
    });
  }


  getStockInfo(stockName){
    let logInfo = (name, price, time)=>{
      this.setState({name,price,time});
      console.log(this.state);
    };
    const alpha = require('alphavantage')({ key: 'qweqweqwe' });
    const price = alpha.data.intraday(stockName,`1min`,`compact`).then(data => {
      console.log(data);
      const stockPrice = data[Object.keys(data)[1]][Object.keys(data[Object.keys(data)[1]])[0]];
      const time = Object.keys(data[Object.keys(data)[1]])[0];
      const name = data["Meta Data"]["2. Symbol"];
      const price = stockPrice[Object.keys(stockPrice)[0]];
      logInfo(name, price, time);
    });
  }

  _handleSubmit(event){
    event.preventDefault();
    this.getStockInfo(this._stockName.value);
    console.log('state',this.state);
    this._stockName.value='';
  }

  getStockNum(){
    for (var i = 0, len = this.props.stocks.length; i < len; i++) {
      if(this.props.stocks[i].name==this.state.name){
        return this.props.stocks[i].quantity;
      }
    }
    return 0;
  }

render(){
  var stocks = this.props.stocks.map((stock)=>{
    return(
        <li><b>{stock.name}</b>:  {stock.quantity}</li>
    );
  });
  return(
    <div>
      <div className="displayStocks">
        <ul>
          <li>Stock Name: Current Quantity</li>
          {stocks}
        </ul>
      </div>
      <form className="queryForm" onSubmit={this._handleSubmit.bind(this)}>
        <div className="queryFormFields">
          <span>
            <input placeholder="query here.." ref={(input) => this._stockName = input} />
            <button type="submit" class="btn btn-default">
              Check
            </button>
          </span>
        </div>
      </form>
      <div className="displayCurrentStock">
        <div className="stockName"><h3>{this.state.name}</h3></div>
        <div className="stockPrice">{this.state.price}</div>
        <div className="time">{this.state.time}</div>
        <TradeStocks currentStockName={this.state.name} currentStockPrice={this.state.price} currentStockNum={this.getStockNum()}/>
      </div>
    </div>
  )
}
}

function mapStateToProps(state){
  console.log('state', state);
  const {stocks} = state;
  return {
    stocks
  };
}

export default connect(mapStateToProps, {setStocks})(Stocks);
