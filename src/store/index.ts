import { combineReducers, Reducer, Dispatch } from 'redux';
import { routerReducer } from 'react-router-redux';
import { CountryState } from './country/types';
import { MenuState } from './menu/types';
import 
  countryReducer, 
  { initialState as ContryInitState } 
  from './country/reducer';
import 
  MenuReducer, 
  { initialState as MenuInitState } 
  from './menu/reducer';

export interface ApplicationState {
  country: CountryState;
  menu: MenuState;
}

export const initialState = {
  country: ContryInitState,
  menu: MenuInitState
};

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  router: routerReducer,
  country: countryReducer,
  menu: MenuReducer
});

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<S> {
  // Correct types for the `dispatch` prop passed by `react-redux`.
  // Additional type information is given through generics.
  dispatch: Dispatch<S>;
}