import * as React from 'react';
import './App.css';
// import { Tabs, Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import SwipeableViews from 'react-swipeable-views';
// import CountryIcon from 'material-ui/svg-icons/social/public';
// import PlayerIcon from 'material-ui/svg-icons/maps/person-pin-circle';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Map from './components/Map';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import IconFavorites from 'material-ui/svg-icons/action/favorite';
import IconRestore from 'material-ui/svg-icons/action/restore';
// import RightMenu from 'hocs/RightMenu';
import { CSSTransitionGroup } from 'react-transition-group';
import LinearProgress from 'material-ui/LinearProgress';

const recentsIcon = <IconRestore />;
const favoritesIcon = <IconFavorites />;
const nearbyIcon = <IconLocationOn />;

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
        <div className="app-header">
          <Paper zDepth={2} style={{height: '100%'}}>
            <LinearProgress mode="indeterminate" />
            App Header
          </Paper>
        </div>
        <div className="app-content">
          <div className="row h-100">
            <div className="col-lg-9">
              <Map />
            </div>
            
            <div className="col-lg-3" style={{paddingRight: 0, paddingTop: 30, paddingBottom: 30}}>
              <Paper zDepth={1} style={{height: '100%'}}>
              <CSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
              >
                <h1>Fading at Initial Mount</h1>
              </CSSTransitionGroup>  
              </Paper>
            </div>
          </div>
        </div>
        <div className="app-nav">
          <Paper zDepth={1} style={{height: '100%'}}>
            <BottomNavigation selectedIndex={this.state.slideIndex}>
              <BottomNavigationItem
                label="Recents"
                icon={recentsIcon}
              />
              <BottomNavigationItem
                label="Favorites"
                icon={favoritesIcon}
              />
              <BottomNavigationItem
                label="Nearby"
                icon={nearbyIcon}
              />
            </BottomNavigation>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
