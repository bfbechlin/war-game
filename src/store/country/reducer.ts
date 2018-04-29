import { Reducer } from 'redux';
import { CountryState,
  CountryActions,
  INCREMENT_TROOPS,
  DECREMENT_TROOPS,
  CHANGE_OWNER,
  SET_HOVER,
  CountryInfo,
} from './types';

export const countryInitState: CountryState = {
  'East Africa':            { troops: 1, owner: 'ID', hovered: false },
  'Egypt':                  { troops: 1, owner: 'ID', hovered: false },
  'Congo':                  { troops: 1, owner: 'ID', hovered: false },
  'Madagascar':             { troops: 1, owner: 'ID', hovered: false },
  'South Africa':           { troops: 1, owner: 'ID', hovered: false },
  'North Africa':           { troops: 1, owner: 'ID', hovered: false },
  'Afghanistan':            { troops: 1, owner: 'ID', hovered: false },
  'India':                  { troops: 1, owner: 'ID', hovered: false },
  'Irkutsk':                { troops: 1, owner: 'ID', hovered: false },
  'Kamchatka':              { troops: 1, owner: 'ID', hovered: false },
  'Middle East':            { troops: 1, owner: 'ID', hovered: false },
  'Mongolia':               { troops: 1, owner: 'ID', hovered: false },
  'Siam':                   { troops: 1, owner: 'ID', hovered: false },
  'China':                  { troops: 1, owner: 'ID', hovered: false },
  'Japan':                  { troops: 1, owner: 'ID', hovered: false },
  'Siberia':                { troops: 1, owner: 'ID', hovered: false },
  'Ural':                   { troops: 1, owner: 'ID', hovered: false },
  'Yakutsk':                { troops: 1, owner: 'ID', hovered: false },
  'Eastern Australia':      { troops: 1, owner: 'ID', hovered: false },
  'New Guniea':             { troops: 1, owner: 'ID', hovered: false },
  'Western Australia':      { troops: 1, owner: 'ID', hovered: false },
  'Indonesia':              { troops: 1, owner: 'ID', hovered: false },
  'Great Britain':          { troops: 1, owner: 'ID', hovered: false },
  'Iceland':                { troops: 1, owner: 'ID', hovered: false },
  'Northern Europe':        { troops: 1, owner: 'ID', hovered: false },
  'Scandinavia':            { troops: 1, owner: 'ID', hovered: false },
  'Southern Europe':        { troops: 1, owner: 'ID', hovered: false },
  'Ukraine':                { troops: 1, owner: 'ID', hovered: false },
  'Western Europe':         { troops: 1, owner: 'ID', hovered: false },
  'Alaska':                 { troops: 1, owner: 'ID', hovered: false },
  'Alberta':                { troops: 1, owner: 'ID', hovered: false },
  'Central America':        { troops: 1, owner: 'ID', hovered: false },
  'Eastern United States':  { troops: 1, owner: 'ID', hovered: false },
  'Greenland':              { troops: 1, owner: 'ID', hovered: false },
  'Northwest Territory':    { troops: 1, owner: 'ID', hovered: false },
  'Ontario':                { troops: 1, owner: 'ID', hovered: false },
  'Western United States':  { troops: 1, owner: 'ID', hovered: false },
  'Quebec':                 { troops: 1, owner: 'ID', hovered: false },
  'Argentina':              { troops: 1, owner: 'ID', hovered: false },
  'Brazil':                 { troops: 1, owner: 'ID', hovered: false },
  'Peru':                   { troops: 1, owner: 'ID', hovered: false },
  'Venezuela':              { troops: 1, owner: 'ID', hovered: false },
};

const reducer: Reducer<CountryState> = (state: CountryState = countryInitState, action) => {
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