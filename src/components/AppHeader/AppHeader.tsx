import * as React from 'react';
import { connect } from 'react-redux';
import { ConnectedReduxProps, ApplicationState } from 'store/';

import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';

import { Color } from 'utils/colors';

export interface AppHeaderProps extends ConnectedReduxProps {
}

type Props = AppHeaderProps & MapStateToProps;

const AppHeader: React.SFC<Props> = (props: Props) => {
  const { time, color, player } = props;
  const progress = ((31 - time) / 30) * 100;
  return (
    <div className="app-header">
      <Paper zDepth={2} style={{height: '100%'}}>
        <LinearProgress mode="determinate" value={progress} />
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <a style={{display: 'block'}}>MLP-WAR</a>
          <a style={{display: 'block'}}>MODE: PvP </a> 
          <a style={{display: 'block', color: color.normal}} >
            {player}
          </a> 
        </div>
      </Paper>
    </div>
  );
};

interface MapStateToProps {
  time: number;
  player: string;
  color: Color;
}

const mapStateToProps = (state: ApplicationState): MapStateToProps => ( 
  {
    time: state.game.remainingTime,
    player: state.game.turnOwner,
    color: state.player[state.game.turnOwner].color
  }
);

export default connect(mapStateToProps)(AppHeader);