import * as React from 'react';
import './App.css';
import { Tabs, Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SwipeableViews from 'react-swipeable-views';
import CountryIcon from 'material-ui/svg-icons/social/public';
import PlayerIcon from 'material-ui/svg-icons/maps/person-pin-circle';
import Map from './components/Map';

interface AppState {
  slideIndex: number;
}

interface AppProps {

}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value: number) => {
    this.setState({
      slideIndex: value,
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Continent View" value={0} icon={<CountryIcon/>} style={{flexDirection: 'row'}}/>
          <Tab label="Player view" value={1} icon={<PlayerIcon/>}/>
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <Map />
          <Map />
        </SwipeableViews>
      </MuiThemeProvider>
    );
  }
}

export default App;
