import React, { Component } from 'react';
import './App.css';
import Error from './Error/Error';
import Posts from './Posts/Posts';

class App extends Component {
  state = {
    url: 'http://localhost:4000',
    isError: false
  }

  render() {
    const { isError } = this.state;
    return (
      <div className="App">
        {isError ?
          <Error />
          :
          <div className="wrapper">
            <Posts />
          </div>
        }
      </div>
    );
  }
}

export default App;
