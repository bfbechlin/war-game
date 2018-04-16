import { Reducer } from 'redux';
import { CountryState,
  CountryActions,
  INCREMENT_TROOPS,
  DECREMENT_TROOPS,
  CHANGE_OWNER,
  CountryInfo
} from './types';

export const initialState: CountryState = {
  'East Africa': { troops: 1, owner: 'NONAME' },
  'Egypt': { troops: 1, owner: 'NONAME' },
  'Congo': { troops: 1, owner: 'NONAME' },
  'Madagascar': { troops: 1, owner: 'NONAME' },
  'South Africa': { troops: 1, owner: 'NONAME' },
  'North Africa': { troops: 1, owner: 'NONAME' },
  'Afghanistan': { troops: 1, owner: 'NONAME' },
  'India': { troops: 1, owner: 'NONAME' },
  'Irkutsk': { troops: 1, owner: 'NONAME' },
  'Kamchatka': { troops: 1, owner: 'NONAME' },
  'Middle East': { troops: 1, owner: 'NONAME' },
  'Mongolia': { troops: 1, owner: 'NONAME' },
  'Siam': { troops: 1, owner: 'NONAME' },
  'China': { troops: 1, owner: 'NONAME' },
  'Japan': { troops: 1, owner: 'NONAME' },
  'Siberia': { troops: 1, owner: 'NONAME' },
  'Ural': { troops: 1, owner: 'NONAME' },
  'Yakutsk': { troops: 1, owner: 'NONAME' },
  'Eastern Australia': { troops: 1, owner: 'NONAME' },
  'New Guniea': { troops: 1, owner: 'NONAME' },
  'Western Australia': { troops: 1, owner: 'NONAME' },
  'Indonesia': { troops: 1, owner: 'NONAME' },
  'Great Britain': { troops: 1, owner: 'NONAME' },
  'Iceland': { troops: 1, owner: 'NONAME' },
  'Northern Europe': { troops: 1, owner: 'NONAME' },
  'Scandinavia': { troops: 1, owner: 'NONAME' },
  'Southern Europe': { troops: 1, owner: 'NONAME' },
  'Ukraine': { troops: 1, owner: 'NONAME' },
  'Western Europe': { troops: 1, owner: 'NONAME' },
  'Alaska': { troops: 1, owner: 'NONAME' },
  'Alberta': { troops: 1, owner: 'NONAME' },
  'Central America': { troops: 1, owner: 'NONAME' },
  'Eastern United States': { troops: 1, owner: 'NONAME' },
  'Greenland': { troops: 1, owner: 'NONAME' },
  'Northwest Territory': { troops: 1, owner: 'NONAME' },
  'Ontario': { troops: 1, owner: 'NONAME' },
  'Western United States': { troops: 1, owner: 'NONAME' },
  'Quebec': { troops: 1, owner: 'NONAME' },
  'Argentina': { troops: 1, owner: 'NONAME' },
  'Brazil': { troops: 1, owner: 'NONAME' },
  'Peru': { troops: 1, owner: 'NONAME' },
  'Venezuela': { troops: 1, owner: 'NONAME' }
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
    default:
      return state;
  }
};

export default reducer;