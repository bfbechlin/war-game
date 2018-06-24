import * as React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import PlayerInfo from './PlayerInfo';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import store from 'store/';
import { Color, colors } from 'utils/colors';

export interface GameSelectorProps {
}

interface Player {
  name: string;
  color: Color;
  controllable: boolean;
}

interface GameSelectorState {
  index: number;
  players: Player[];
}

class GameSelector extends React.Component<GameSelectorProps, GameSelectorState> {
  state: GameSelectorState = {
    index: 0,
    players: [{
      name: 'Player 1',
      color: colors[0],
      controllable: true
    },
    {
      name: 'Player 2',
      color: colors[1],
      controllable: true
    } 
    ]
  };

  handleGameChange = (value: any) => {
    this.setState({index: value});
  }

  handleNewPlayer = () => {
    let players = [...this.state.players];
    const index = players.length;
    players.push({
      name: `Player ${index + 1}`,
      color: colors[index],
      controllable: true
    });
    this.setState({...this.state, players});
  }

  onChangeControllable = (index: number) => (event: any, state: boolean) => {
    let players = [...this.state.players];
    players[index].controllable = state;
    this.setState({...this.state, players});
  }

  onChangeName = (index: number) => (event: any, name: string) => {
    let players = [...this.state.players];
    players[index].name = name;
    this.setState({...this.state, players});
  }

  render() {
    const players = this.state.players.map((player: Player, index: number) => (
      <PlayerInfo 
        key={`player-info-${index}`}
        name={player.name}
        color={player.color.normal}
        controllable={player.controllable}
        mode={this.state.index === 0 ? 'PVP' : 'CPU'}
        onChangeControllable={this.onChangeControllable(index)}
        onChangeName={this.onChangeName(index)}  
      />
    ));
    return (
      <div className="game-selector">
        <div style={{paddingBottom: 30}}>
          <Tabs
            value={this.state.index}
            onChange={this.handleGameChange}
          >
            <Tab label="PVP" value={0}/>
            <Tab label="CPU" value={1}/>
          </Tabs>
        </div>
        <div style={{paddingRight: 15, paddingLeft: 15, overflowY: 'auto', height: 250}}>
          {players}
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
          <FloatingActionButton onClick={this.handleNewPlayer} disabled={this.state.players.length > 5}>
            <ContentAdd />
          </FloatingActionButton>
          <RaisedButton label={'START'} primary={true} onClick={(event: any) => store.initGame(this.state.players, this.state.index === 0 ? 'PVP' : 'CPU')}/>
        </div>
      </div>
    );
  }
}

export default GameSelector;