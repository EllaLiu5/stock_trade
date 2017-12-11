import React, { Component } from 'react';
import './App.css';
import Balance from './components/Balance';
import Stocks from './components/Stocks';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Balance/>
        <Stocks/>
      </div>
    );
  }
}

export default App;
