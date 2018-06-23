import * as React from 'react';

import Continent  from './Continent';
import { CountryProps } from './Country';
import { countriesShape } from './constants';
import './Map.css';

import { map } from 'utils/object';
import { Color, GREY } from 'utils/colors';

import { continentsInfo, ContinentInfo, Countries } from 'store/country/types';
import { countrySelectionTransition, CountrySelection } from 'core/transitions/countrySelection';
import { AppStoreInterface } from 'store/';

import { 
  MapTransducer,
  MapStateToProps, 
  selectableTransducer, 
  interactionStateTransducer,
  possibleChoiceTransducer } from 'core/transducers/map';

import appStore from 'store/';
import { inject, observer } from 'mobx-react';

export interface MapProps {
  store?: AppStoreInterface;
}

type MapState = {
};

type Props = MapProps;

@inject('store')
@observer
export class Map extends React.Component<Props, MapState> {
  state: MapState = {
  };

  handleAction = (name: Countries, action: CountrySelection) => (event: any) => {
    countrySelectionTransition(this.props.store!.game.getGamePhase(), action, name);
  }

  countriesData = (countries: Countries[], color: Color): CountryProps[] => {

    const customProps: MapStateToProps = MapTransducer(this.props.store!);

    const { gamePhase, viewMode, selectedables, selecteds, selectorType } = customProps;
    const countriesState = this.props.store!.country.countries;
    
    return countries.map((country: Countries) => {
      const countryState = countriesState[country];
      const shape = countriesShape[country].shape;
      // const playerColor = countryState.owner ? players[countryState.owner].color : GREY; 
      const playerColor = countryState.owner ? appStore.player.players[countryState.owner].color : GREY; 
      return {
        name: country,
        troops: countryState.troops,
        shape: shape,
        viewMode: viewMode,
        continentColor: color,
        playerColor,
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

export default Map;