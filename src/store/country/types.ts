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
  troopsBonus: number;
  countries: Countries[];
}

export interface Continents {
  [index: string]: ContinentInfo;
}

export const continentsInfo: Continents = {
  'North America': { 
    color: YELLOW,
    troopsBonus: 5,
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
    troopsBonus: 5,
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
    troopsBonus: 7,
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
    troopsBonus: 3,
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
    troopsBonus: 2,
    countries: [
      'Indonesia',
      'New Guniea',
      'Eastern Australia',
      'Western Australia',
    ]
  },
  'South America': {
    color: GREEN,
    troopsBonus: 2,
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
  'Brazil': ['Peru', 'Venezuela', 'Argentina', 'North Africa'],
  'East Africa': ['North Africa', 'Egypt', 'South Africa', 'Congo'],
  'Egypt': ['East Africa', 'North Africa', 'Middle East'],
  'Congo': ['East Africa', 'North Africa', 'South Africa'],
  'Madagascar': ['South Africa'],
  'South Africa': ['East Africa', 'Congo', 'Madagascar'],
  'North Africa': ['East Africa', 'Egypt', 'Congo'],
  'Afghanistan': ['Ukraine', 'Ural', 'China', 'India', 'Middle East'],
  'India': ['Middle East', 'Afghanistan', 'China', 'Siam'],
  'Irkutsk': ['Siberia', 'Yakutsk', 'Kamchatka', 'Mongolia'],
  'Kamchatka': ['Yakutsk', 'Irkutsk', 'Mongolia', 'Japan'],
  'Middle East': ['Afghanistan', 'India', 'Ukraine', 'Southern Europe', 'Egypt'],
  'Mongolia': ['China', 'Irkutsk', 'Kamchatka', 'Siberia', 'Ural', 'Japan'],
  'Siam': ['India', 'China', 'Indonesia'],
  'China': ['India', 'Afghanistan', 'Ural', 'Siberia', 'Mongolia', 'Siam'],
  'Japan': ['China', 'Mongolia', 'Kamchatka'],
  'Siberia': ['Ural', 'Yakutsk', 'Irkutsk', 'Mongolia'],
  'Ural': ['Ukraine', 'Siberia', 'China', 'Afghanistan'],
  'Yakutsk': ['Siberia', 'Kamchatka', 'Irkutsk'],
  'Eastern Australia': ['New Guniea', 'Western Australia'],
  'New Guniea': ['Indonesia', 'Eastern Australia'],
  'Western Australia': ['Eastern Australia'],
  'Indonesia': ['New Guniea', 'Eastern Australia', 'Siam'],
  'Great Britain': ['Western Europe', 'Northern Europe', 'Scandinavia', 'Iceland'],
  'Iceland': ['Greenland', 'Scandinavia', 'Great Britain'],
  'Northern Europe': ['Western Europe', 'Great Britain', 'Scandinavia', 'Ukraine', 'Southern Europe'],
  'Scandinavia': ['Iceland', 'Ukraine', 'Northern Europe'],
  'Southern Europe': ['Western Europe', 'Northern Europe', 'Ukraine', 'Middle East', 'Egypt'],
  'Ukraine': ['Southern Europe', 'Northern Europe', 'Scandinavia', 'Ural', 'Afghanistan', 'Middle East'],
  'Western Europe': ['Great Britain', 'Northern Europe', 'Southern Europe', 'North Africa'],
  'Alaska': ['Northwest Territory', 'Alberta', 'Kamchatka'],
  'Alberta': ['Alaska', 'Northwest Territory', 'Ontario', 'Western United States'],
  'Central America': ['Western United States', 'Eastern United States', 'Venezuela'],
  'Eastern United States': ['Central America', 'Western United States', 'Ontario', 'Quebec'],
  'Greenland': ['Northwest Territory', 'Iceland', 'Quebec'],
  'Northwest Territory': ['Alaska', 'Alberta', 'Ontario', 'Quebec', 'Greenland'],
  'Ontario': ['Alberta', 'Northwest Territory', 'Quebec', 'Eastern United States'],
  'Western United States': ['Alberta', 'Ontario', 'Eastern United States', 'Central America'],
  'Quebec': ['Ontario', 'Northwest Territory', 'Greenland', 'Eastern United States'],
  'Argentina': ['Peru', 'Brazil'],
  'Peru': ['Venezuela', 'Brazil', 'Argentina'],
  'Venezuela': ['Brazil', 'Peru', 'Central America'],
};
