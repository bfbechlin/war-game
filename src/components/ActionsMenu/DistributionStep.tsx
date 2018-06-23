import * as React from 'react';
import { Countries } from 'store/country/types';
import RaisedButton from 'material-ui/RaisedButton';

import CountrySelector, { SelectionAction } from './CountrySelector';
import AmountSelector from './QuantitySelector';

import { countrySelectionTransition } from 'core/transitions/countrySelection';
import gameActionResolver from 'core/transitions/gameActions';
import { AppStoreInterface } from 'store/';

interface DistributionStepProps {
  store: AppStoreInterface;
  quantity: number;
  availableTroops: number;
  player: string;
  selected: Countries | null;
  selectables: Countries[];
}

const DistributionStep: React.SFC<DistributionStepProps> = (props: DistributionStepProps) => {
  const { selected, selectables, availableTroops, quantity } = props;

  const onChangeQuantity = (value: number) => {
    // dispatch(setQuantity(value));
    props.store.menu.setQuantity(value);
  };

  const onAddTroops = () => {
    const diff = availableTroops - quantity;
    console.log('Adding ' + quantity + ' troops to ' + selected);
    gameActionResolver.addTroops(selected!, quantity);
    if (diff < quantity) {
      // dispatch(setQuantity(diff));
      props.store.menu.setQuantity(diff);
    }
  };

  const onFinish = () => {
    // dispatch(nextGamePhase('ATTACK'));
    props.store.game.nextGamePhase();
  };

  const handleAction = (name: Countries, action: SelectionAction) => (event: any) => {
    countrySelectionTransition('DISTRIBUTION', action, name);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <CountrySelector 
        label={'To'}
        selected={selected}
        selectables={selectables}
        onAction={handleAction}
        onFocus={() => { 
          if (selected) {
            countrySelectionTransition('DISTRIBUTION', 'SELECTION-OUT', selected) ;
          }
        }}
      />
      <AmountSelector value={quantity} max={availableTroops} onChange={onChangeQuantity} />
      <div style={{margin: 5, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <RaisedButton label="ADD TROOPS" disabled={selected === null || availableTroops <= 0} onClick={onAddTroops}/> 
        <RaisedButton label="FINISH" primary={true} onClick={onFinish}/>
      </div>
    </div>
  );
};

export default DistributionStep;