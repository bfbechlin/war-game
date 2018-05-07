import * as React from 'react';
import './App.css';
// import { Tabs, Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import SwipeableViews from 'react-swipeable-views';
// import CountryIcon from 'material-ui/svg-icons/social/public';
// import PlayerIcon from 'material-ui/svg-icons/maps/person-pin-circle';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

import IconRestore from 'material-ui/svg-icons/action/restore';
// import RightMenu from 'hocs/RightMenu';

import ActionsMenu from 'components/ActionsMenu/ActionsMenu';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppHeader from 'components/AppHeader';
import SideMenu from './hocs/SideMenu';
import Map from 'components/Map';

const recentsIcon = <IconRestore />;

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#5f4339',
  }
});

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

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppHeader />
        <div className="app-content">
          <div className="row h-100">
            <div className="col-xl-9 col-">
              <Map />
            </div>
            
            <div className="col-xl-3" style={{paddingRight: 0, paddingTop: 30, paddingBottom: 30}}>
              <SideMenu current={this.state.slideIndex}>
                <Paper zDepth={1} style={{height: '100%'}}>
                  <ActionsMenu />
                </Paper>
                <Paper zDepth={1} style={{height: '100%'}}>
                  <h1>Second</h1>
                </Paper>
                <Paper zDepth={1} style={{height: '100%'}}>
                  <h1>Third</h1>
                </Paper>
              </SideMenu>
              
            </div>
          </div>
        </div>
        <div className="app-nav">
          <Paper zDepth={1} style={{height: '100%'}}>
            <BottomNavigation selectedIndex={this.state.slideIndex}>
              <BottomNavigationItem
                label="Actions"
                icon={recentsIcon}
              />
            </BottomNavigation>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
