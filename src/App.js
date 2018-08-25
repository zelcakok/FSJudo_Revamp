import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Main from './Layouts/MainLayout';

import Debug from './Layouts/DebugLayout';

class App extends Component {
  render() {
    return (
      <div>
        <Main/>
      </div>
    );
  }
}

export default App;
