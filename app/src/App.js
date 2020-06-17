import React, { Component } from 'react';
import logo from './logo.svg';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import Validation from './Validation/Validation';
import Char from './Char/Char';
import './App.css';

class App extends Component {
  state = {
    userName: 'Rod',
    userName2: 'Tod',
    length: 0,
    text:[],
    textString: ''
  }

  nameChangeHandler(event) {
    this.setState({ userName: event.target.value });
  }

  textLength(event) {
    this.setState({
      text: event.target.value.split(''),
      length: event.target.value.length,
      textString: event.target.value
    });
  }

  deleteLetter(event, index) {
    let list = [...this.state.text];
    list.splice(index, 1);
    this.setState({ text: list, textString: list.join('') });
  }

  render() {
    const styles = {
      marginTop: '20px',
      width: '60%',
      height: '30px',
      borderRadius: '4px'
    };

    const {userName, userName2, length, text, textString} = this.state;
    return (
      <div className="App">
        <h1>Hi I'm a react App</h1>
        <UserInput changeName={this.nameChangeHandler.bind(this)} name={userName} />
        <UserOutput userName={userName}/>
        <UserOutput userName={userName2}/>
        <input style={styles} type="text" onChange={(event) => this.textLength(event)} value={textString} />
        <Validation length={length} />
        {text && text.map((letter, index) => {
            return (
              <Char key={Math.random()} letter={letter} click={(e) => this.deleteLetter(e, index)} />
            );
          })
        }
      </div>

    );
  }
}

export default App;
