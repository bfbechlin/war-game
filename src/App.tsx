import * as React from 'react';
import './App.css';
import Map from './components/Map';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">3
            To get started, edit <code>src/App.tsx</code> and save to reload.
            Testing git pages deploy. Again
          </p>
        </div>
       <Map/>
    </React.Fragment>
    );
  }
}

export default App;
