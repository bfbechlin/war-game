import * as React from 'react';
import Continent  from './Continent';
import { countriesShape } from './constants';
import './Map.css';

import { map } from 'utils/object';
import { connect } from 'react-redux';
import { continentsInfo } from 'store/country/types';
import { incrementTroops } from 'store/country/actions';
import { ApplicationState, ConnectedReduxProps } from 'store/';

import { MapTransducer, MapStateToProps } from 'core/transducers/map';

export interface MapProps extends ConnectedReduxProps<MapStateToProps> {
}

type MapState = {
};

type Props = MapProps & MapStateToProps;

export class Map extends React.Component<Props, MapState> {
  state: MapState = {
  };

  handleCountryClick = (countryName: string) => (event: any) => {
    this.props.dispatch(incrementTroops(countryName, 1));
  }

  countriesData = (continent: ContinentInfo) => {
    return map<>(,(country: CountryType) => (
      Object.assign(country, this.props[country.name])
    ));
  }

  render() {
    const Continents = continents.map((continent: ContinentType) => (
      <Continent 
        key={`continent-${continent.name}`} 
        name={continent.name} 
        color={continent.color} 
        countries={this.countriesData(continent)}
        click={this.handleCountryClick} 
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