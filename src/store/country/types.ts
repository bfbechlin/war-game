import { Action } from 'redux';
import {
  RED,
  BLUE,
  YELLOW,
  BROWN,
  PURPLE,
  GREEN,
  Color
} from 'utils/colors';

export interface CountryState {
  'East Africa': CountryInfo;
  'Egypt': CountryInfo;
  'Congo': CountryInfo;
  'Madagascar': CountryInfo;
  'South Africa': CountryInfo;
  'North Africa': CountryInfo;
  'Afghanistan': CountryInfo;
  'India': CountryInfo;
  'Irkutsk': CountryInfo;
  'Kamchatka': CountryInfo;
  'Middle East': CountryInfo;
  'Mongolia': CountryInfo;
  'Siam': CountryInfo;
  'China': CountryInfo;
  'Japan': CountryInfo;
  'Siberia': CountryInfo;
  'Ural': CountryInfo;
  'Yakutsk': CountryInfo;
  'Eastern Australia': CountryInfo;
  'New Guniea': CountryInfo;
  'Western Australia': CountryInfo;
  'Indonesia': CountryInfo;
  'Great Britain': CountryInfo;
  'Iceland': CountryInfo;
  'Northern Europe': CountryInfo;
  'Scandinavia': CountryInfo;
  'Southern Europe': CountryInfo;
  'Ukraine': CountryInfo;
  'Western Europe': CountryInfo;
  'Alaska': CountryInfo;
  'Alberta': CountryInfo;
  'Central America': CountryInfo;
  'Eastern United States': CountryInfo;
  'Greenland': CountryInfo;
  'Northwest Territory': CountryInfo;
  'Ontario': CountryInfo;
  'Western United States': CountryInfo;
  'Quebec': CountryInfo;
  'Argentina': CountryInfo;
  'Brazil': CountryInfo;
  'Peru': CountryInfo;
  'Venezuela': CountryInfo;
}

export interface CountryInfo {
  troops: number;
  owner: string;
  hovered: boolean;
}

export const INCREMENT_TROOPS = '@@country/INCREMENT_TROOPS';
export const DECREMENT_TROOPS = '@@country/DECREMENT_TROOPS';
export const CHANGE_OWNER = '@@country/CHANGE_OWNER';
export const SET_HOVER = '@@country/SET_HOVER';

export interface IncrementTroopsAction extends Action {
  type: '@@country/INCREMENT_TROOPS';
  payload: {
    countryName: string;
    quantity: number;
  };
}

export interface DecrementTroopsAction extends Action {
  type: '@@country/DECREMENT_TROOPS';
  payload: {
    countryName: string;
    quantity: number;
  };
}

export interface ChangeOwnerAction extends Action {
  type: '@@country/CHANGE_OWNER';
  payload: {
    countryName: string;
    newOwner: string;
  };
}

export interface SetHoverAction extends Action {
  type: '@@country/SET_HOVER';
  payload: {
    countryName: string;
    hovered: boolean;
  };
}

// Down here, we'll create a discriminated union type of all actions which will be used for our reducer.
export type CountryActions = IncrementTroopsAction | DecrementTroopsAction | ChangeOwnerAction | SetHoverAction;

export const countries: Countries[] = [
  'East Africa', 'Egypt', 'Congo', 'Madagascar', 'South Africa', 'North Africa', 'Afghanistan', 'India', 'Irkutsk', 'Kamchatka',
  'Middle East', 'Mongolia', 'Siam', 'China', 'Japan', 'Siberia', 'Ural', 'Yakutsk', 'Eastern Australia', 'New Guniea',
  'Western Australia', 'Indonesia', 'Great Britain', 'Iceland', 'Northern Europe', 'Scandinavia', 'Southern Europe', 'Ukraine',
  'Western Europe', 'Alaska', 'Alberta', 'Central America', 'Eastern United States', 'Greenland', 'Northwest Territory',
  'Ontario', 'Western United States', 'Quebec', 'Argentina', 'Brazil', 'Peru', 'Venezuela',
];

export type Countries = 'East Africa' | 'Egypt' | 'Congo' | 'Madagascar' | 'South Africa' | 'North Africa' | 'Afghanistan' | 'India' | 'Irkutsk' | 'Kamchatka' |
  'Middle East' | 'Mongolia' | 'Siam' | 'China' | 'Japan' | 'Siberia' | 'Ural' | 'Yakutsk' | 'Eastern Australia' | 'New Guniea' |
  'Western Australia' | 'Indonesia' | 'Great Britain' | 'Iceland' | 'Northern Europe' | 'Scandinavia' | 'Southern Europe' | 'Ukraine' |
  'Western Europe' | 'Alaska' | 'Alberta' | 'Central America' | 'Eastern United States' | 'Greenland' | 'Northwest Territory' |
  'Ontario' | 'Western United States' | 'Quebec' | 'Argentina' | 'Brazil' | 'Peru' | 'Venezuela';

export const continents = [ 'North America', 'Europe', 'Asia', 'Africa', 'Australia', 'South America' ];

export interface ContinentInfo {
  color: Color;
  countries: Countries[];
}

export interface Continents {
  [index: string]: ContinentInfo;
}

export const continentsInfo: Continents = {
  'North America': { 
    color: YELLOW,
    countries: [
      'Greenland', 
      'Northwest Territory', 
      'Alaska', 
      'Alberta', 
      'Ontario', 
      'Quebec', 
      'Western United States', 
      'Eastern United States', 
      'Central America',
    ]
  },
  'Europe': { 
    color: PURPLE,
    countries: [
      'Scandinavia',
      'Ukraine',
      'Iceland',
      'Great Britain',
      'Northern Europe',
      'Western Europe',
      'Southern Europe',
    ]
  },
  'Asia': { 
    color: RED,
    countries: [
      'Siberia',
      'Yakutsk',
      'Kamchatka',
      'Ural',
      'Irkutsk',
      'Mongolia',
      'Japan',
      'Afghanistan',
      'China',
      'India',
      'Middle East',
      'Siam',
    ]
  },
  'Africa': { 
    color: BLUE,
    countries: [
      'Egypt',
      'North Africa',
      'Congo',
      'East Africa',
      'Madagascar',
      'South Africa',
    ]
  },
  'Australia': {
    color: BROWN,
    countries: [
      'Indonesia',
      'New Guniea',
      'Eastern Australia',
      'Western Australia',
    ]
  },
  'South America': {
    color: GREEN,
    countries: [
      'Venezuela',
      'Brazil',
      'Peru',
      'Argentina',
    ]
  },
};

export interface BorderCountry {
  [index: string]: Countries[]; 
}

export const borderCountries: BorderCountry = {
  'Brazil': ['Peru', 'Venezuela', 'Argentina', 'North Africa']
};
