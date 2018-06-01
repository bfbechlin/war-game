import { Reducer } from 'redux';
import { CountryState,
  CountryActions,
  MASS_CHANGE_OWNER,
  SET_TROOPS,
  INCREMENT_TROOPS,
  DECREMENT_TROOPS,
  CHANGE_OWNER,
  SET_HOVER,
  CountryInfo,
} from './types';

export const countryInitState: CountryState = {
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

const reducer: Reducer<CountryState> = (state: CountryState = countryInitState, action) => {
  let countryName: string; 
  let country: CountryInfo;
  let countries: CountryState; 
  switch ((action as CountryActions).type) {
    case MASS_CHANGE_OWNER:
      let owner = action.payload.onwer;
      countries = Object.assign(state, {});
      action.payload.countries.forEach((ctName: string) => {
        countries[ctName] = {
          troops: 1,
          owner,
          hovered: false
        };
      });
      return countries;
    case SET_TROOPS:
      countryName = action.payload.countryName;
      country = { ...state[countryName] };
      country.troops = action.payload.quantity;    
      return { ...state, [countryName]: country };
    case INCREMENT_TROOPS:
      countryName = action.payload.countryName;
      country = { ...state[countryName] };
      country.troops += action.payload.quantity;    
      return { ...state, [countryName]: country };
    case DECREMENT_TROOPS:
      countryName = action.payload.countryName;
      country = { ...state[countryName] };
      country.troops -= action.payload.quantity; 
      country.troops = country.troops < 1 ? 1 : country.troops;       
      return { ...state, [countryName]: country };
    case CHANGE_OWNER:
      countryName = action.payload.countryName;
      country = { ...state[countryName] };
      country.owner = action.payload.newOwner;
      return { ...state, [countryName]: country };
    case SET_HOVER:
      countryName = action.payload.countryName;
      country = { ...state[countryName] };
      country.hovered = action.payload.hovered;
      return { ...state, [countryName]: country };
    default:
      return state;
  }
};

export default reducer;