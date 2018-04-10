import * as React from 'react';
import Country from './Country';

export interface ContinentProps {
  name: string;
  fillColor: string;
  borderColor: string;
  countries: [CountryType];
}

interface CountryType {
  name: string;
  path: string;
}

const Continent: React.SFC<ContinentProps> = (props) => {
  const { name, fillColor, borderColor, countries } = props;
  const Countries = countries.map((country: CountryType) => (
    <Country name={country.name} path={country.path}/>
  ));
  return (
    <g id={name} stroke={borderColor} fill={fillColor} visibility="visible">
      {Countries}
    </g>
  );
};

export default Continent;