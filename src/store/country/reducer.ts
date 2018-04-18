import { Reducer } from 'redux';
import { CountryState,
  CountryActions,
  INCREMENT_TROOPS,
  DECREMENT_TROOPS,
  CHANGE_OWNER,
  CHANGE_SELECTION,
  CountryInfo,
} from './types';

export const initialState: CountryState = {
  'East Africa':            { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Egypt':                  { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Congo':                  { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Madagascar':             { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'South Africa':           { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'North Africa':           { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Afghanistan':            { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'India':                  { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Irkutsk':                { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Kamchatka':              { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Middle East':            { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Mongolia':               { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Siam':                   { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'China':                  { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Japan':                  { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Siberia':                { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Ural':                   { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Yakutsk':                { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Eastern Australia':      { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'New Guniea':             { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Western Australia':      { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Indonesia':              { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Great Britain':          { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Iceland':                { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Northern Europe':        { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Scandinavia':            { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Southern Europe':        { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Ukraine':                { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Western Europe':         { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Alaska':                 { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Alberta':                { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Central America':        { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Eastern United States':  { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Greenland':              { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Northwest Territory':    { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Ontario':                { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Western United States':  { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Quebec':                 { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Argentina':              { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Brazil':                 { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Peru':                   { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
  'Venezuela':              { troops: 1, owner: 'ID', selected: { source: false, destination: false } },
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
    case CHANGE_SELECTION:
      countryName = action.payload.countryName;
      country = { ...state[countryName] };
      country.selected[action.payload.selectionType] = action.payload.newState;
      return { ...state, [countryName]: country };
    default:
      return state;
  }
};

export default reducer;