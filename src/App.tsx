import * as React from 'react';
import { observer, inject } from 'mobx-react';

import './App.css';
import { AppStoreInterface } from 'store/';
import { GamePhase } from 'store/game/types';
import { PlayerInfo, DummyPlayer } from 'store/player/types';
import { ViewMode } from 'store/menu/types';

// import { Tabs, Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
// import SwipeableViews from 'react-swipeable-views';
// import CountryIcon from 'material-ui/svg-icons/social/public';
// import PlayerIcon from 'material-ui/svg-icons/maps/person-pin-circle';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

import IconRestore from 'material-ui/svg-icons/action/restore';
// import RightMenu from 'hocs/RightMenu';

import ActionsMenu from 'components/ActionsMenu/ActionsMenu';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import GameSelector from 'components/GameSelector';
import EndGame from 'components/EndGame';
import AppHeader from 'components/AppHeader';
import SideMenu from './hocs/SideMenu';
import Map from 'components/Map';

const recentsIcon = <IconRestore />;

interface AppState {
  slideIndex: number;
}

type Props = {
 store?: AppStoreInterface; 
};

interface StateToProps {
  phase: GamePhase;
  player: PlayerInfo | undefined;
  time: number;
  viewMode: ViewMode;
}

const mapStateToProps = (state: AppStoreInterface): StateToProps => (
  {
    phase: state.game.getGamePhase(), 
    player: state.game.getGamePhase() === 'INIT' ? undefined : state.player.getPlayer(state.game.getTurnOwner()),
    time: state.game.getRemainingTime(),
    viewMode: state.menu.getViewMode(),
  }
);

@inject('store')
@observer
class App extends React.Component<Props, AppState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  changeViewMode = () => {
    const mode: ViewMode = this.props.store!.menu.getViewMode() === 'PLAYER' ? 'CONTINENT' : 'PLAYER';
    // this.props.dispatch(setViewMode(mode));
    this.props.store!.menu.setViewMode(mode);
  }

  render() {
    const customProps = mapStateToProps(this.props.store!);
    const { phase, time, player, viewMode } = customProps;
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: player ? player.color.normal : '#78909c',
        accent1Color: player ? player.color.dark : '#4b636e',
      }
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <React.Fragment>
          <Dialog open={phase === 'INIT'}>
            <GameSelector />
          </Dialog>
          <Dialog open={phase === 'FINAL'}>
            <EndGame winner={player || DummyPlayer} />
          </Dialog>
          <AppHeader time={time} player={player} viewMode={viewMode} onChangeViewMode={this.changeViewMode}/>
          <div className="app-content" style={{position: 'fixed'}}>
            <div className="row h-100" style={{position: 'relative'}}>
              <div className="col-md-9">
                <Map />
              </div>
              <div className="col-md-3" style={{paddingRight: 0, paddingTop: 30, paddingBottom: 30}}>
                <SideMenu current={this.state.slideIndex}>
                  <Paper zDepth={1} style={{height: '100%'}}>
                    <ActionsMenu store={this.props.store!}/>
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
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
