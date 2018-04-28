import { Reducer } from 'redux';
import { MenuState, SET_QUANTITY, MenuActions } from './types'; 

export const initialState: MenuState = {
  quantity: 0,
  to: null,
  from: null,
  selected: 'TO'  
};

const reducer: Reducer<MenuState> = (state: MenuState = initialState, action) => { 
  let quantity;
  switch ((action as MenuActions).type) {
    case SET_QUANTITY:
      quantity = action.payload.quantity;
      return { ...state, quantity };
    default:
      return state;
  }
};

export default reducer;