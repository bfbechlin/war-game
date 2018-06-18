import { observable, action, computed } from 'mobx';
import { MenuState, ViewMode } from './types';
import { Countries } from 'store/country/types';

class MenuStore {

  @observable quantity: number;
  @observable selectables: Countries[];
  @observable selecteds: Countries[];
  @observable viewMode: ViewMode;

  @computed get menuState(): MenuState {
    return {
      quantity: this.quantity,
      selectables: this.selectables,
      selecteds: this.selecteds,
      viewMode: this.viewMode,
    };
  }

  constructor() {
    this.quantity = 1;
    this.selectables = ['Brazil', 'Peru', 'Venezuela', 'North Africa'];
    this.selecteds = [];
    this.viewMode = 'PLAYER';
  }

  getQuantity() {
    return this.quantity;
  }

  @action setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  getSelectables(): Countries[] {
    return this.selectables;
  }

  @action setSelectables(selectables: Countries[]) {
    this.selectables = selectables;
  }

  getSelecteds(): Countries[] {
    return this.selecteds;
  }

  @action setSelecteds(selecteds: Countries[]) {
    this.selecteds = selecteds;
  }

  getViewMode(): ViewMode {
    return this.viewMode;
  }

  @action setViewMode(viewMode: ViewMode) {
    this.viewMode = viewMode;
  }

}

const menuStore = new MenuStore();

export default menuStore;
export { MenuStore };
