import { Countries } from 'store/country/types';
export interface MenuState {
  amount: number;
  to: Countries;
  from: Countries;
  selected: 'TO' | 'FROM';
}