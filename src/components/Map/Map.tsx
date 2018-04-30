import * as React from 'react';
import { connect } from 'react-redux';

import Continent  from './Continent';
import { CountryProps, CountryAction } from './Country';
import { countriesShape } from './constants';
import './Map.css';

import { map } from 'utils/object';
import { Color } from 'utils/colors';

import { continentsInfo, ContinentInfo, Countries } from 'store/country/types';
import { setHover } from 'store/country/actions';
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

  handleCountryClick = (name: Countries, action: CountryAction) => (event: any) => {
    const { dispatch } = this.props;
    switch (action) {
      case 'HOVER-IN':
        dispatch(setHover(name, true));
        break;
      case 'HOVER-OUT':
        dispatch(setHover(name, false));
        break;
      default: 
        break;
    }
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
        onAction: this.handleCountryClick
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