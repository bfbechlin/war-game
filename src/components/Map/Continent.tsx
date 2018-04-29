import * as React from 'react';
import Country from './Country';
import { CountryType } from './constants';
import { CountryInfo } from 'store/country/types';
import { Color } from 'utils/colors';

export interface ContinentProps {
  name: string;
  color: Color;
  countries: (CountryType & CountryInfo)[];
  click: ((countryName: string) => (event: any) => void);
}

const Continent: React.SFC<ContinentProps> = (props) => {
  const { name, color, countries, click } = props;
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
    <g id={name} stroke={color.dark} fill={color.normal} visibility="visible">
      {Countries}
    </g>
  );
};

export default Continent;