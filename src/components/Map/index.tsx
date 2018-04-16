import * as React from 'react';
import Continent  from './Continent';
import { continents, ContinentType, CountryType } from './constants';
import './Map.css';

import { connect } from 'react-redux';
import { CountryState } from 'store/country/types';
import { incrementTroops } from 'store/country/actions';
import { ApplicationState, ConnectedReduxProps } from 'store/';

export interface MapProps extends ConnectedReduxProps<CountryState> {
}

type MapState = {
};

type Props = MapProps & CountryState;

export class Map extends React.Component<Props, MapState> {
  state: MapState = {
  };

  handleCountryClick = (countryName: string) => (event: any) => {
    this.props.dispatch(incrementTroops(countryName, 1));
  }

  countriesData = (continent: ContinentType) => {
    return continent.countries.map((country: CountryType) => (
      Object.assign(country, this.props[country.name])
    ));
  }

  render() {
    const Continents = continents.map((continent: ContinentType) => (
      <Continent 
        key={`continent-${continent.name}`} 
        name={continent.name} 
        fillColor={continent.fillColor} 
        borderColor={continent.borderColor} 
        countries={this.countriesData(continent)}
        click={this.handleCountryClick} 
      />
    ));
    return(
      <svg viewBox="-100 0 1200 750" xmlns="http://www.w3.org/2000/svg" >
        {Continents}
      </svg>
    );  
  }
}

const mapStateToProps = (state: ApplicationState) => ( state.country );

export default connect(mapStateToProps)(Map);