import * as React from 'react';
import './App.css';
import Map from './components/Map';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Risk</h1>
          </header>
          <p className="App-intro">
            Online board game!
          </p>
        </div>
       <Map/>
    </React.Fragment>
    );
  }
}

export default App;
