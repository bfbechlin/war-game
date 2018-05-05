import * as React from 'react';
import { connect } from 'react-redux';
import { Countries } from 'store/country/types';
import RaisedButton from 'material-ui/RaisedButton';
import { ConnectedReduxProps } from 'store/';

import CountrySelector, { SelectionAction } from './CountrySelector';
import AmountSelector from './QuantitySelector';

import { countrySelectionTransition } from 'core/transitions/countrySelection';
import { attack } from 'core/transitions/gameActions';
import { nextGamePhase } from 'store/game/actions';
import { setQuantity } from 'store/menu/actions';

interface AttackStepProps extends ConnectedReduxProps {
  quantity: number;
  maxAttack: number;
  player: string;
  selectedFrom: Countries | null;
  selectedTo: Countries | null;
  selectables: Countries[];
}

const AttackStep: React.SFC<AttackStepProps> = (props: AttackStepProps) => {
  const { dispatch, selectedTo, selectedFrom, selectables, maxAttack, quantity } = props;

  if (maxAttack < quantity) {
    dispatch(setQuantity(maxAttack));
  }

  const onChangeQuantity = (value: number) => {
    dispatch(setQuantity(value));
  };

  const onAttack = () => {
    if (attack(selectedFrom!, selectedTo!, quantity)) {
      countrySelectionTransition('ATTACK', 'SELECTION-OUT', selectedTo!);  
    }
  };

  const onFinish = () => {
    dispatch(nextGamePhase());
  };

  const handleAction = (name: Countries, action: SelectionAction) => (event: any) => {
    countrySelectionTransition('ATTACK', action, name);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <CountrySelector 
        label={'From'}
        selected={selectedFrom}
        selectables={selectedFrom ? [] : selectables}
        onAction={handleAction}
        onFocus={() => { 
          if (selectedFrom) {
            countrySelectionTransition('ATTACK', 'SELECTION-OUT', selectedFrom) ;
          }
        }}
      />
      <CountrySelector 
        label={'To'}
        selected={selectedTo}
        selectables={selectedFrom ? selectables : []}
        onAction={handleAction}
        onFocus={() => { 
          if (selectedTo) {
            countrySelectionTransition('ATTACK', 'SELECTION-OUT', selectedTo) ;
          }
        }}
      />
      <AmountSelector 
        value={maxAttack < quantity ? maxAttack : quantity} 
        max={maxAttack} 
        onChange={onChangeQuantity} 
      />
      <div style={{margin: 5, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <RaisedButton label="ATTACK" disabled={maxAttack === 0 || selectedFrom === null || selectedFrom === null} onClick={onAttack}/> 
        <RaisedButton label="FINISH" primary={true} onClick={onFinish}/>
      </div>
    </div>
  );
};

export default connect()(AttackStep);