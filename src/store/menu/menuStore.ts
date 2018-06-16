import { observable, action } from 'mobx';

class MenuStore {

  @observable quantity: number;
  @observable selectables: string[];
  @observable selecteds: string[];
  @observable viewMode: string;

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

  getSelectables() {
    return this.selectables;
  }

  @action setSelectables(selectables: string[]) {
    this.selectables = selectables;
  }

  getSelecteds() {
    return this.selecteds;
  }

  @action setSelecteds(selecteds: string[]) {
    this.selecteds = selecteds;
  }

  getViewMode() {
    return this.viewMode;
  }

  @action setViewMode(viewMode: string) {
    this.viewMode = viewMode;
  }

}

const menuStore = new MenuStore();

export default menuStore;
export { MenuStore };
