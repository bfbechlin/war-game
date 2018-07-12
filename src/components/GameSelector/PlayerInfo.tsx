import * as React from 'react';

import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import { avatarName } from 'utils/name';

export interface PlayerInfoProps {
  name: string;
  color: string;
  controllable: boolean;
  mode: 'PVP' | 'CPU';
  onChangeName: ((event: any, name: string) => void);
  onChangeControllable: ((event: any, controllable: boolean) => void);
}

const PlayerInfo: React.SFC<PlayerInfoProps> = (props: PlayerInfoProps) => {
  const { name, color, mode, controllable, onChangeName, onChangeControllable } = props;
  return (
    <div className="row" style={{alignItems: 'center'}}>
      <div className="col-md-2">
        <Avatar backgroundColor={color}>
          {avatarName(name)}
        </Avatar>
      </div>
      <div className="col-md-6">
        <div style={{marginTop: -14}}>
          <TextField
            id="PLAYER-NAME"
            floatingLabelText="Name"
            value={name}
            onChange={onChangeName}
          />
        </div>
      </div>
      <div className="col-md-3">
        {mode === 'CPU' && <Toggle toggled={controllable} onToggle={onChangeControllable} label={'Controllable'}/>}
      </div>
     
    </div>
  );
};

export default PlayerInfo;