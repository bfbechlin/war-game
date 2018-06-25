import * as React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
   } from 'material-ui/Stepper';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
// import { GamePhase  } from 'store/game/types';
// import { MenuState  } from 'store/menu/types';

import DistributionStep from './DistributionStep';
import AttackStep from './AttackStep';
import MoveStep from './MoveStep';
import { AppStoreInterface } from 'store/';
import { observer } from 'mobx-react';

type Props = {
  store?: AppStoreInterface;
};

const phaseMappper = {
  'DISTRIBUTION': 0,
  'ATTACK': 1,
  'MOVE': 2 
};

const ActionsMenu: React.SFC<Props> = observer((props: Props) => {

  const menu = props.store!.menu.menuState;
  const game = props.store!.game.gameState;
  const country = props.store!.country.countries;
  const { turnOwner, phase } = game;
  const { selecteds, quantity } = menu;
  const activePlayer = props.store!.player.isActivePlayer(game.turnOwner, game.activePlayers);
  const selectedTo = selecteds.length >= 2 ? selecteds[1] : null;
  const selectedFrom = selecteds.length >= 1  ? selecteds[0] : null;
  const maxAttack = selectedFrom ? country[selectedFrom].troops - 1 : 0;

  return (
    <div style={{maxWidth: 380, maxHeight: 400, marginLeft: 20}}>
      <Stepper activeStep={phaseMappper[phase]} orientation="vertical">
        <Step disabled={!activePlayer}>
          <StepLabel>Distribute Troops</StepLabel>
          <StepContent>
            { activePlayer ?
              <DistributionStep 
                store={props.store!}
                quantity={quantity}
                player={turnOwner}
                availableTroops={props.store!.player.players[turnOwner].availableTroops}
                selected={selectedFrom}
                selectables={menu.selectables}
              /> :
              <div style={{paddingTop: 25}}> CPU computing... </div>
            }            
          </StepContent>
        </Step>
        <Step disabled={!activePlayer}>
          <StepLabel>Atack Countries</StepLabel>
          <StepContent>
            { activePlayer ?
              <AttackStep 
                store={props.store!}
                quantity={maxAttack === 0 ? 0 : quantity}
                player={turnOwner}
                maxAttack={maxAttack}
                selectedFrom={selectedFrom}
                selectedTo={selectedTo}
                selectables={menu.selectables}
              /> :
              <div style={{paddingTop: 25}}> CPU computing... </div>
            }
          </StepContent>
        </Step>
        <Step disabled={!activePlayer}>
          <StepLabel>Move Troops</StepLabel>
          <StepContent>
            { activePlayer ?
              <MoveStep 
                store={props.store!}
                quantity={maxAttack === 0 ? 0 : quantity}
                player={turnOwner}
                maxAttack={maxAttack}
                selectedFrom={selectedFrom}
                selectedTo={selectedTo}
                selectables={menu.selectables}
              /> :
              <div style={{paddingTop: 25}}> CPU computing... </div>
            }
          </StepContent>
        </Step>
      </Stepper>    
    </div>
  );
});

export default ActionsMenu;