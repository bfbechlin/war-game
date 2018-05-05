import * as React from 'react';
import { connect } from 'react-redux';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
   } from 'material-ui/Stepper';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import { ApplicationState, ConnectedReduxProps } from 'store/';
// import { GamePhase  } from 'store/game/types';
// import { MenuState  } from 'store/menu/types';

import DistributionStep from './DistributionStep';
import AttackStep from './AttackStep';
import MoveStep from './MoveStep';

export interface ActionsMenuProps extends ConnectedReduxProps {
}

type Props = ActionsMenuProps & ApplicationState;

const phaseMappper = {
  'DISTRIBUTION': 0,
  'ATTACK': 1,
  'MOVE': 2 
};

const ActionsMenu: React.SFC<Props> = (props: Props) => {
  const { menu, game, player, country } = props;
  const { turnOwner, phase } = game;
  const { selecteds, quantity } = menu;
  const selectedTo = selecteds[1] ? selecteds[1] : null;
  const selectedFrom = selecteds[0] ? selecteds[0] : null;
  const maxAttack = selectedFrom ? country[selectedFrom].troops - 1 : 0;

  return (
    <div style={{maxWidth: 380, maxHeight: 400, marginLeft: 20}}>
      <Stepper activeStep={phaseMappper[phase]} orientation="vertical">
        <Step>
          <StepLabel>Distribute Troops</StepLabel>
          <StepContent>
            <DistributionStep 
              quantity={quantity}
              player={turnOwner}
              availableTroops={player[turnOwner].availableTroops}
              selected={selectedFrom}
              selectables={menu.selectables}
            />            
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Atack Countries</StepLabel>
          <StepContent>
            <AttackStep 
              quantity={maxAttack === 0 ? 0 : quantity}
              player={turnOwner}
              maxAttack={maxAttack}
              selectedFrom={selectedFrom}
              selectedTo={selectedTo}
              selectables={menu.selectables}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Move Troops</StepLabel>
          <StepContent>
            <MoveStep 
              quantity={maxAttack === 0 ? 0 : quantity}
              player={turnOwner}
              maxAttack={maxAttack}
              selectedFrom={selectedFrom}
              selectedTo={selectedTo}
              selectables={menu.selectables}
            />
          </StepContent>
        </Step>
      </Stepper>    
    </div>
  );
};

const mapStateToProps = (state: ApplicationState): ApplicationState => ( 
  state
);

export default connect(mapStateToProps)(ActionsMenu);