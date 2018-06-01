import * as React from 'react';

import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

import { PlayerInfo } from 'store/player/types';
import { ViewMode } from 'store/menu/types';
// import { Color } from 'utils/colors';

export interface AppHeaderProps {
  time: number;
  player?: PlayerInfo;
  viewMode: ViewMode;
  onChangeViewMode: ((event: any) => void);
}

const AppHeader: React.SFC<AppHeaderProps> = (props: AppHeaderProps) => {
  const { time, player, viewMode, onChangeViewMode } = props;
  const progress = ((61 - time) / 60) * 100;
  return (
    <div className="app-header">
      <Paper zDepth={2} style={{height: '100%'}}>
        <LinearProgress mode="determinate" value={progress} />
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: 2}}>
          <a style={{display: 'block'}}>MLP-WAR</a>
          {
            player &&
            <React.Fragment>
              <div style={{display: 'block', color: player.color.normal}} >
                <Avatar backgroundColor={player.color.normal}>
                  {player.avatar}
                </Avatar>
                <a> {player.name} </a>
              </div> 
              <RaisedButton 
                style={{width: 150}}
                label={viewMode === 'PLAYER' ? 'CONTINENT VIEW' : 'PLAYER VIEW'} 
                primary={true} 
                onClick={onChangeViewMode}
              />
            </React.Fragment> 
          }
        </div>
      </Paper>
    </div>
  );
};

export default AppHeader;