import { observable } from 'mobx';

class MenuStore {

  @observable quantity: number;
  @observable selectables: String[];
  @observable selecteds: String[];
  @observable viewMode: String;

  constructor() {
    this.quantity = 1;
    this.selectables = ['Brazil', 'Peru', 'Venezuela', 'North Africa'];
    this.selecteds = [];
    this.viewMode = 'PLAYER';
  }

}

const menuStore = new MenuStore();

export default menuStore;
export { MenuStore };
