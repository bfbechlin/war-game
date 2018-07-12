import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { PlayerInfo } from 'store/player/types';

interface EndGameProps {
  winner: PlayerInfo;
}

const EndGame: React.SFC<EndGameProps> = (props: EndGameProps) =>  {
  const { winner } = props;

  return (
    <div className="end-game" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{textAlign: 'center'}}>
        <p>Congratulations <a style={{color: winner.color.normal}}>{winner.name}</a> !</p>
        <p>You won the game.</p>
      </div>
      <RaisedButton label={'NEW GAME'} primary={true} onClick={(event: any) => location.reload()}/>
    </div>
  );
};

export default EndGame;