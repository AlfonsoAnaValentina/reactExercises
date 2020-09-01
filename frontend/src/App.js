import React, { Component } from 'react';
import './App.css';
import Error from './Error/Error';
import Chart from './Chart/Chart';

class App extends Component {
  state = {
    isError: false
  }

  render() {
    return (
      <div className="App">
        {this.state.isError ?
          <Error />
          :
          <div className="wrapper">
            <Chart />
          </div>
        }
      </div>
    );
  }
}

export default App;
