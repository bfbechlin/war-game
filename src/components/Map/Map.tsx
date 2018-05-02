import * as React from 'react';
import { connect } from 'react-redux';

import Continent  from './Continent';
import { CountryProps } from './Country';
import { countriesShape } from './constants';
import './Map.css';

import { map } from 'utils/object';
import { Color } from 'utils/colors';

import { continentsInfo, ContinentInfo, Countries } from 'store/country/types';
import { countrySelectionTransition, CountrySelection } from 'core/transitions/countrySelection';
import { ConnectedReduxProps } from 'store/';

import { 
  MapTransducer, 
  MapStateToProps, 
  selectableTransducer, 
  interactionStateTransducer,
  possibleChoiceTransducer } from 'core/transducers/map';

export interface MapProps extends ConnectedReduxProps<MapStateToProps> {
}

type MapState = {
};

type Props = MapProps & MapStateToProps;

export class Map extends React.Component<Props, MapState> {
  state: MapState = {
  };

  handleAction = (name: Countries, action: CountrySelection) => (event: any) => {
    countrySelectionTransition(this.props.gamePhase, action, name);
  }

  countriesData = (countries: Countries[], color: Color): CountryProps[] => {
    const { players, gamePhase, viewMode, selectedables, selecteds, selectorType } = this.props;
    const countriesState = this.props.countries;
    return countries.map((country: Countries) => {
      const countryState = countriesState[country];
      const shape = countriesShape[country].shape;
      return {
        name: country,
        troops: countryState.troops,
        shape: shape,
        viewMode: viewMode,
        continentColor: color,
        playerColor: players[countryState.owner].color,
        selectable: selectableTransducer(country, selectedables, selecteds),
        interactionState: interactionStateTransducer(country, countryState, selecteds),
        possibleChoice: possibleChoiceTransducer(country, selectedables, gamePhase, selectorType),
        onAction: this.handleAction
      };
    });
  }

  render() {
    const Continents = map<ContinentInfo, React.ReactNode>(continentsInfo, (info: ContinentInfo, name: string) => (
      <Continent 
        key={`continent-${name}`} 
        name={name} 
        color={info.color} 
        countries={this.countriesData(info.countries, info.color)}
      />
    ));
    return(
      <svg className="map" viewBox="0 0 1100 650" xmlns="http://www.w3.org/2000/svg" >
        {Continents}
      </svg>
    );  
  }
}

export default connect(MapTransducer)(Map);