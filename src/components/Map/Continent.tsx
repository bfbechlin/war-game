import * as React from 'react';
import Country from './Country';
import { CountryType } from './constants';
import { CountryInfo } from 'store/country/types';

export interface ContinentProps {
  name: string;
  fillColor: string;
  borderColor: string;
  countries: (CountryType & CountryInfo)[];
  click: ((countryName: string) => (event: any) => void);
}

const Continent: React.SFC<ContinentProps> = (props) => {
  const { name, fillColor, borderColor, countries, click } = props;
  const Countries = countries.map((country: CountryType & CountryInfo) => (
    <Country 
      key={`country-${country.name}`} 
      name={country.name} 
      path={country.path}
      troops={country.troops}
      onClick={click}
    />
  ));
  return (
    <g id={name} stroke={borderColor} fill={fillColor} visibility="visible">
      {Countries}
    </g>
  );
};

export default Continent;