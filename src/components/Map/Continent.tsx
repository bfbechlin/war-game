import * as React from 'react';
import Country, { CountryProps } from './Country';
import { Color } from 'utils/colors';

export interface ContinentProps {
  name: string;
  color: Color;
  countries: CountryProps[];
}

const Continent: React.SFC<ContinentProps> = (props) => {
  const { name, countries } = props;
  const Countries = countries.map((country: CountryProps) => (
    <Country 
      key={`country-${country.name}`} 
      name={country.name}
      troops={country.troops}
      shape={country.shape}
      viewMode={country.viewMode}
      continentColor={country.continentColor}
      playerColor={country.playerColor}
      selectable={country.selectable}
      interactionState={country.interactionState}
      possibleChoice={country.possibleChoice}
      onAction={country.onAction}
    />
  ));
  return (
    <g id={name}>
      {Countries}
    </g>
  );
};

export default Continent;