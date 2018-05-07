import * as React from 'react';
import { connect } from 'react-redux';
import { ConnectedReduxProps, ApplicationState } from 'store/';

import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';

export interface AppHeaderProps extends ConnectedReduxProps {
}

type Props = AppHeaderProps & MapStateToProps;

const AppHeader: React.SFC<Props> = (props: Props) => {
  const { time } = props;
  const progress = ((31 - time) / 30) * 100;
  return (
    <div className="app-header">
      <Paper zDepth={2} style={{height: '100%'}}>
        <LinearProgress mode="determinate" value={progress} />
        App Header
      </Paper>
    </div>
  );
};

interface MapStateToProps {
  time: number;
}

const mapStateToProps = (state: ApplicationState): MapStateToProps => ( 
  {time: state.game.remainingTime}
);

export default connect(mapStateToProps)(AppHeader);