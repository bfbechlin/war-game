import * as React from 'react';
import { connect } from 'react-redux';
import { MenuState } from 'store/menu/types';
import { Countries } from 'store/country/types';
import { setQuantity } from 'store/menu/actions';

import FlatButton from 'material-ui/FlatButton';
import CountrySelector, { SelectionAction } from './CountrySelector';
import AmountSelector from './QuantitySelector';
import { ApplicationState, ConnectedReduxProps } from 'store/';

import { countrySelectionTransition } from 'core/transitions/countrySelection';

interface DistributionStepProps extends ConnectedReduxProps {

}

type Props = DistributionStepProps & MenuState;

const DistributionStep: React.SFC<Props> = (props) => {
  const { dispatch, selecteds, selectables } = props;
  const onChangeQuantity = (value: number) => {
    dispatch(setQuantity(value));
  };

  const handleAction = (name: Countries, action: SelectionAction) => (event: any) => {
    countrySelectionTransition('DISTRIBUTION', action, name);
  };

  return (
    <React.Fragment>
      <CountrySelector 
        label={'To'}
        selected={selecteds[0]}
        selectables={selectables}
        onAction={handleAction}
        onFocus={() => { console.log(`FOCUS`); }}
      />
      <CountrySelector 
        label={'To'}
        selected={selecteds[0]}
        selectables={selectables}
        onAction={handleAction}
        onFocus={() => { console.log(`FOCUS`); }}
      />
      <AmountSelector value={props.quantity} max={13} onChange={onChangeQuantity} />
      <FlatButton label="ADD"/>
    </React.Fragment>
  );
};

const mapStateToProps = (state: ApplicationState) => ( state.menu );

export default connect(mapStateToProps)(DistributionStep);