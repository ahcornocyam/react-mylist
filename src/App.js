import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyList from './Mylist/MyList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <MyList>
          <span>Casa</span>
          <span>Carro</span>
        </MyList>
      </div>
    );
  }
}

export default App;
