import { Reducer } from 'redux';
import { CountryState,
  CountryActions,
  INCREMENT_TROOPS,
  DECREMENT_TROOPS,
  CHANGE_OWNER,
  CHANGE_STATE,
  CountryInfo,
} from './types';

export const initialState: CountryState = {
  'East Africa':            { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Egypt':                  { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Congo':                  { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Madagascar':             { troops: 1, owner: 'ID', state: 'NORMAL' },
  'South Africa':           { troops: 1, owner: 'ID', state: 'NORMAL' },
  'North Africa':           { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Afghanistan':            { troops: 1, owner: 'ID', state: 'NORMAL' },
  'India':                  { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Irkutsk':                { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Kamchatka':              { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Middle East':            { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Mongolia':               { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Siam':                   { troops: 1, owner: 'ID', state: 'NORMAL' },
  'China':                  { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Japan':                  { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Siberia':                { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Ural':                   { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Yakutsk':                { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Eastern Australia':      { troops: 1, owner: 'ID', state: 'NORMAL' },
  'New Guniea':             { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Western Australia':      { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Indonesia':              { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Great Britain':          { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Iceland':                { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Northern Europe':        { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Scandinavia':            { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Southern Europe':        { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Ukraine':                { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Western Europe':         { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Alaska':                 { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Alberta':                { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Central America':        { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Eastern United States':  { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Greenland':              { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Northwest Territory':    { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Ontario':                { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Western United States':  { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Quebec':                 { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Argentina':              { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Brazil':                 { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Peru':                   { troops: 1, owner: 'ID', state: 'NORMAL' },
  'Venezuela':              { troops: 1, owner: 'ID', state: 'NORMAL' },
};

const reducer: Reducer<CountryState> = (state: CountryState = initialState, action) => {
  let countryName: string; 
  let country: CountryInfo; 
  switch ((action as CountryActions).type) {
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
    case CHANGE_STATE:
      countryName = action.payload.countryName;
      country = { ...state[countryName] };
      country.state = action.payload.newState;
      return { ...state, [countryName]: country };
    default:
      return state;
  }
};

export default reducer;