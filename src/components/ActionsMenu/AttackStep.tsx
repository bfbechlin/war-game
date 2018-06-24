import * as React from 'react';
import { Countries } from 'store/country/types';
import RaisedButton from 'material-ui/RaisedButton';

import CountrySelector, { SelectionAction } from './CountrySelector';
import AmountSelector from './QuantitySelector';

import { countrySelectionTransition } from 'core/transitions/countrySelection';
import { AppStoreInterface } from 'store/';

interface AttackStepProps {
  store: AppStoreInterface;
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
    if (selectedFrom && selectedTo && store.gameActionResolver.attack(selectedFrom, selectedTo, quantity)) {
      countrySelectionTransition('ATTACK', 'SELECTION-OUT', selectedTo!);  
    }
  };

  const onFinish = () => {
    // dispatch(nextGamePhase());
    store.game.nextGamePhase();
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

export default AttackStep;