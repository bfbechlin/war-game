import { observable } from 'mobx';
import { CountryState } from './types';

const countryInitState: CountryState = {
    'East Africa':            { troops: 0, owner: '', hovered: false },
    'Egypt':                  { troops: 0, owner: '', hovered: false },
    'Congo':                  { troops: 0, owner: '', hovered: false },
    'Madagascar':             { troops: 0, owner: '', hovered: false },
    'South Africa':           { troops: 0, owner: '', hovered: false },
    'North Africa':           { troops: 0, owner: '', hovered: false },
    'Afghanistan':            { troops: 0, owner: '', hovered: false },
    'India':                  { troops: 0, owner: '', hovered: false },
    'Irkutsk':                { troops: 0, owner: '', hovered: false },
    'Kamchatka':              { troops: 0, owner: '', hovered: false },
    'Middle East':            { troops: 0, owner: '', hovered: false },
    'Mongolia':               { troops: 0, owner: '', hovered: false },
    'Siam':                   { troops: 0, owner: '', hovered: false },
    'China':                  { troops: 0, owner: '', hovered: false },
    'Japan':                  { troops: 0, owner: '', hovered: false },
    'Siberia':                { troops: 0, owner: '', hovered: false },
    'Ural':                   { troops: 0, owner: '', hovered: false },
    'Yakutsk':                { troops: 0, owner: '', hovered: false },
    'Eastern Australia':      { troops: 0, owner: '', hovered: false },
    'New Guniea':             { troops: 0, owner: '', hovered: false },
    'Western Australia':      { troops: 0, owner: '', hovered: false },
    'Indonesia':              { troops: 0, owner: '', hovered: false },
    'Great Britain':          { troops: 0, owner: '', hovered: false },
    'Iceland':                { troops: 0, owner: '', hovered: false },
    'Northern Europe':        { troops: 0, owner: '', hovered: false },
    'Scandinavia':            { troops: 0, owner: '', hovered: false },
    'Southern Europe':        { troops: 0, owner: '', hovered: false },
    'Ukraine':                { troops: 0, owner: '', hovered: false },
    'Western Europe':         { troops: 0, owner: '', hovered: false },
    'Alaska':                 { troops: 0, owner: '', hovered: false },
    'Alberta':                { troops: 0, owner: '', hovered: false },
    'Central America':        { troops: 0, owner: '', hovered: false },
    'Eastern United States':  { troops: 0, owner: '', hovered: false },
    'Greenland':              { troops: 0, owner: '', hovered: false },
    'Northwest Territory':    { troops: 0, owner: '', hovered: false },
    'Ontario':                { troops: 0, owner: '', hovered: false },
    'Western United States':  { troops: 0, owner: '', hovered: false },
    'Quebec':                 { troops: 0, owner: '', hovered: false },
    'Argentina':              { troops: 0, owner: '', hovered: false },
    'Brazil':                 { troops: 0, owner: '', hovered: false },
    'Peru':                   { troops: 0, owner: '', hovered: false },
    'Venezuela':              { troops: 0, owner: '', hovered: false },
  };

class CountryStore {

  @observable countries: CountryState;

  constructor() {
    this.countries = countryInitState;
  }

}

const countryStore = new CountryStore();

export default countryStore;
export { CountryStore };
