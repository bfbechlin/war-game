import * as React from 'react';
import './App.css';
import Map from './components/Map';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">WAR</h1>
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
