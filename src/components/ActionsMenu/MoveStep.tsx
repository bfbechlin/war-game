import * as React from 'react';
import { Countries } from 'store/country/types';
import RaisedButton from 'material-ui/RaisedButton';
import { AppStore } from 'store/';

import CountrySelector, { SelectionAction } from './CountrySelector';
import AmountSelector from './QuantitySelector';

import { countrySelectionTransition } from 'core/transitions/countrySelection';
import { move } from 'core/transitions/gameActions';

interface AttackStepProps {
  store: AppStore;
  quantity: number;
  maxAttack: number;
  player: string;
  selectedFrom: Countries | null;
  selectedTo: Countries | null;
  selectables: Countries[];
}

const AttackStep: React.SFC<AttackStepProps> = (props: AttackStepProps) => {
  const { store, selectedTo, selectedFrom, selectables, maxAttack, quantity } = props;

  if (maxAttack < quantity) {
    // dispatch(setQuantity(maxAttack));
    store.menu.setQuantity(maxAttack);
  }

  const onChangeQuantity = (value: number) => {
    // dispatch(setQuantity(value));
    store.menu.setQuantity(value);
  };

  const onAttack = () => {
    if (move(selectedFrom!, selectedTo!, quantity)) {
      countrySelectionTransition('MOVE', 'SELECTION-OUT', selectedTo!);  
    }
  };

  const onFinish = () => {
    // dispatch(nextGamePhase());
    store.game.nextGamePhase();
  };

  const handleAction = (name: Countries, action: SelectionAction) => (event: any) => {
    countrySelectionTransition('MOVE', action, name);
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
            countrySelectionTransition('MOVE', 'SELECTION-OUT', selectedFrom) ;
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
            countrySelectionTransition('MOVE', 'SELECTION-OUT', selectedTo) ;
          }
        }}
      />
      <AmountSelector 
        value={maxAttack < quantity ? maxAttack : quantity} 
        max={maxAttack} 
        onChange={onChangeQuantity} 
      />
      <div style={{margin: 5, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <RaisedButton label="MOVE" disabled={maxAttack === 0 || selectedFrom === null || selectedFrom === null} onClick={onAttack}/> 
        <RaisedButton label="FINISH" primary={true} onClick={onFinish}/>
      </div>
    </div>
  );
};

export default AttackStep;