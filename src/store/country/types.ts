import { Action } from 'redux';

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
  selected: {
    source: boolean;
    destination: boolean;
  };
}

export const INCREMENT_TROOPS = '@@country/INCREMENT_TROOPS';
export const DECREMENT_TROOPS = '@@country/DECREMENT_TROOPS';
export const CHANGE_OWNER = '@@country/CHANGE_OWNER';
export const CHANGE_SELECTION = '@@country/CHANGE_SELECTION';

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

export interface ChangeSelectionAction extends Action {
  type: '@@country/CHANGE_SELECTION';
  payload: {
    countryName: string;
    selectionType: 'source' | 'destination';
    newState: boolean;
  };
}

export const countries = [
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

// Down here, we'll create a discriminated union type of all actions which will be used for our reducer.
export type CountryActions = IncrementTroopsAction | DecrementTroopsAction | ChangeOwnerAction | ChangeSelectionAction;