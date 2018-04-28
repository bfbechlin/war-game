import * as React from 'react';
import { connect } from 'react-redux';
import { MenuState } from 'store/menu/types';
import { setQuantity } from 'store/menu/actions';

import CountrySelector from './CountrySelector';
import FlatButton from 'material-ui/FlatButton';
import AmountSelector from './QuantitySelector';
import { ApplicationState, ConnectedReduxProps } from 'store/';

interface DistributionStepProps extends ConnectedReduxProps<MenuState> {

}

type Props = DistributionStepProps & MenuState;

const DistributionStep: React.SFC<Props> = (props) => {
  const onChangeQuantity = (value: number) => {
    props.dispatch(setQuantity(value));
  };

  return (
    <React.Fragment>
      <CountrySelector 
        label={'To'}
        selected={null}
        onSelect={(country: string) => { console.log(`SELECT: ${country}`); }}
        onUnSelect={() => { console.log(`UNSELECT`); }}
      />
      <AmountSelector value={props.quantity} max={13} onChange={onChangeQuantity} />
      <FlatButton label="ADD"/>
    </React.Fragment>
  );
};

const mapStateToProps = (state: ApplicationState) => ( state.menu );

export default connect(mapStateToProps)(DistributionStep);