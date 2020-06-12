import React, { Component } from 'react';
import logo from './logo.svg';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import './App.css';

class App extends Component {
  state = {
    userName: 'Rod',
    userName2: 'Tod'
  }

  nameChangeHandler(event) {
    this.setState({ userName: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1>Hi I'm a react App</h1>
        <UserInput changeName={this.nameChangeHandler.bind(this)} name={this.state.userName} />
        <UserOutput userName={this.state.userName}/>
        <UserOutput userName={this.state.userName2}/>
      </div>

    );
  }
}

export default App;
