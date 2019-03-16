import React, { Component } from 'react';
import './App.css';
import Clock from "./clock.js";

class App extends Component {
  constructor(props){
    super(props)
  this.state ={
    break:5,
    Session:25,
    type:"working"
  }
    this.increment=this.increment.bind(this);
    this.decrement=this.decrement.bind(this);
    this.breakSetdec= this.breakSetdec.bind(this);
    this.sessionSetdec=this.sessionSetdec.bind(this);
    this.breakSetinc= this.breakSetinc.bind(this);
    this.sessionSetinc=this.sessionSetinc.bind(this);
    this.timereset=this.timereset.bind(this);
  }
 timereset() {
  this.setState({
Session:25,
break:5
  });
 }
  increment(value){
      return ++value;
  }
  decrement(value){
    return --value;
  }
  breakSetinc(){
    let temp=this.increment(this.state.break);

    if(temp<=60){
    this.setState({
      break:temp
    });
  }else{
    alert("Too much time for rest");
  }
  }
  breakSetdec(){
    let temp=this.decrement(this.state.break);
    if(temp>=0){
    this.setState({
      break:temp
    })
  }else{
    alert("You can't set time in past");
  }
  }
  sessionSetinc(){

    let temp=this.increment(this.state.Session);
    if(temp<=60){
    this.setState({
      Session:temp
    });
  }else{
    alert("Too much time for work");
  }
  }
  sessionSetdec(){
    let temp=this.decrement(this.state.Session);
    if(temp>=0){
    this.setState({
      Session:temp
    });
  }else{
    alert("You can't set time in past");
  }
  }

  render() {
    return (
      <div className="App">
      <h1 className="Head">Pomodoro</h1>
      <div className="Session">
      <div className="Break">
      <h1>Break</h1>
      <div className="timesetter">
      <button onClick={this.breakSetdec}>-</button>
      <p>{this.state.break}</p>
      <button onClick={ this.breakSetinc }>+</button>
      </div>
      </div>
      <div className="Working">
      <h1>Session</h1>
      <div className="timesetter">
      <button onClick={ this.sessionSetdec }>-</button>
      <p>{this.state.Session}</p>
      <button onClick={ this.sessionSetinc }>+</button>
      </div>
      </div>
      </div>
      <Clock className="Clock" Session={this.state.Session} Break={ this.state.break } timereset={ this.timereset } />
      <footer>
        Created By <em>Krishna Kamal</em>
      </footer>
      </div>
    );
  }
}

export default App;
