import { Reducer } from 'redux';
import { 
  MenuState, 
  MenuActions,
  SET_QUANTITY,
  SET_SELECTABLES,
  SET_SELECTEDS,
  SET_VIEW_MODE,  
} from './types'; 

export const initialState: MenuState = {
  quantity: 0,
  selectables: ['Peru', 'Venezuela', 'Argentina', 'North Africa'],
  selecteds: ['Brazil'],
  viewMode: 'CONTINENT',
};  

const reducer: Reducer<MenuState> = (state: MenuState = initialState, action) => { 
  switch ((action as MenuActions).type) {
    case SET_QUANTITY:
      return { ...state, quantity: action.payload.quantity };
    case SET_SELECTABLES:
      return { ...state, selectables: action.payload.selectables };
    case SET_SELECTEDS:
      return { ...state, selecteds: action.payload.selecteds };
    case SET_VIEW_MODE:
      return { ...state, viewMode: action.payload.viewMode };
    default:
      return state;
  }
};

export default reducer;