import * as React from 'react';
import { connect } from 'react-redux';
import { Countries } from 'store/country/types';
import RaisedButton from 'material-ui/RaisedButton';
import { ConnectedReduxProps } from 'store/';

import CountrySelector, { SelectionAction } from './CountrySelector';
import AmountSelector from './QuantitySelector';

import { countrySelectionTransition } from 'core/transitions/countrySelection';
import { addTroops } from 'core/transitions/gameActions';
import { nextGamePhase } from 'store/game/actions';
import { setQuantity } from 'store/menu/actions';

interface DistributionStepProps extends ConnectedReduxProps {
  quantity: number;
  availableTroops: number;
  player: string;
  selected: Countries | null;
  selectables: Countries[];
}

const DistributionStep: React.SFC<DistributionStepProps> = (props: DistributionStepProps) => {
  const { dispatch, selected, selectables, availableTroops, quantity } = props;

  const onChangeQuantity = (value: number) => {
    dispatch(setQuantity(value));
  };

  const onAddTroops = () => {
    const diff = availableTroops - quantity;
    addTroops(selected!, quantity);
    if (diff < quantity) {
      dispatch(setQuantity(diff));
    }
  };

  const onFinish = () => {
    dispatch(nextGamePhase('ATTACK'));
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

export default connect()(DistributionStep);