import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import './Balance.css';
import {connect} from 'react-redux';
import { balanceRef } from '../firebase';
import {setBlance} from '../actions';

class Balance extends Component{
  constructor(){
    super();
    this.state={
      add:'',
      remove:'',
      error:''
    };
  }

  componentDidMount(){
    balanceRef.on('value', snap => {
      console.log('snap', snap.val());
      this.props.setBlance(snap.val());
    });
  }

  addToAccount(){
    let currentBalance = parseInt(this.props.balance.amount, 10);
    let removeAmount = parseInt(this.state.add, 10);
    if (removeAmount<0){
      this.setState({error: "can not add negative value"});
    }
    let newBlance = currentBalance+removeAmount;
    console.log(newBlance);
    balanceRef.set(newBlance);
  }
// TODO: remove record after user input
// TODO: FORMAT FORM
  removeFromAccount(){
    let currentBalance = parseInt(this.props.balance.amount, 10);
    let removeAmount = parseInt(this.state.remove, 10);
    let newBlance;
    if (currentBalance<removeAmount){
      console.log("cannot remove more than balance");
    }
    else{
      newBlance = currentBalance-removeAmount;
    }
    console.log(newBlance);
    balanceRef.set(newBlance);
  }

  render(){
    return(
      <div className="userBalance">
        <div className="balanceDisplay">
          <h3>Account Blance: {this.props.balance.amount}</h3>
        </div>
        <div className="balanceForm">
        <FieldGroup
          id="formControlsText"
          type="text"
          placeholder="Add to account balance"
          onChange={event => this.setState({add: event.target.value})}
        />
        <Button type="submit" onClick={() => this.addToAccount()}>
          Add
        </Button>

        <FieldGroup
          id="formControlsText"
          type="text"
          placeholder="Remove from account balance"
          onChange={event => this.setState({remove: event.target.value})}
        />
        <Button class ="input-group-btn" type="submit" onClick={() => this.removeFromAccount()}>
          Remove
        </Button>
        </div>
        <div>{this.state.error}</div>
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log('state', state);
  const {balance} = state;
  return {
    balance
  };
}

export default connect(mapStateToProps, {setBlance})(Balance);
export const FieldGroup = ({id, label, help, inputRef, ...props}) =>
<FormGroup controlId={id}>
  <ControlLabel>{label}</ControlLabel>
  <FormControl {...props} inputRef={inputRef}/>
  {help && <HelpBlock>{help}</HelpBlock>}
</FormGroup>
