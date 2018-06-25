import { observable, action } from 'mobx';
import { CountryState, Countries, countryBorders, CountryInfo } from './types';
import { MenuStoreInterface } from 'store/menu/MenuStore';
import { GameStoreInterface } from 'store/game/GameStore';
import { filter } from 'utils/object';
import { intersection, difference } from 'utils/array';

const countryInitState: CountryState = {
    'East Africa':            { troops: 0, owner: '', hovered: false },
    'Egypt':                  { troops: 0, owner: '', hovered: false },
    'Congo':                  { troops: 0, owner: '', hovered: false },
    'Madagascar':             { troops: 0, owner: '', hovered: false },
    'South Africa':           { troops: 0, owner: '', hovered: false },
    'North Africa':           { troops: 0, owner: '', hovered: false },
    'Afghanistan':            { troops: 0, owner: '', hovered: false },
    'India':                  { troops: 0, owner: '', hovered: false },
    'Irkutsk':                { troops: 0, owner: '', hovered: false },
    'Kamchatka':              { troops: 0, owner: '', hovered: false },
    'Middle East':            { troops: 0, owner: '', hovered: false },
    'Mongolia':               { troops: 0, owner: '', hovered: false },
    'Siam':                   { troops: 0, owner: '', hovered: false },
    'China':                  { troops: 0, owner: '', hovered: false },
    'Japan':                  { troops: 0, owner: '', hovered: false },
    'Siberia':                { troops: 0, owner: '', hovered: false },
    'Ural':                   { troops: 0, owner: '', hovered: false },
    'Yakutsk':                { troops: 0, owner: '', hovered: false },
    'Eastern Australia':      { troops: 0, owner: '', hovered: false },
    'New Guniea':             { troops: 0, owner: '', hovered: false },
    'Western Australia':      { troops: 0, owner: '', hovered: false },
    'Indonesia':              { troops: 0, owner: '', hovered: false },
    'Great Britain':          { troops: 0, owner: '', hovered: false },
    'Iceland':                { troops: 0, owner: '', hovered: false },
    'Northern Europe':        { troops: 0, owner: '', hovered: false },
    'Scandinavia':            { troops: 0, owner: '', hovered: false },
    'Southern Europe':        { troops: 0, owner: '', hovered: false },
    'Ukraine':                { troops: 0, owner: '', hovered: false },
    'Western Europe':         { troops: 0, owner: '', hovered: false },
    'Alaska':                 { troops: 0, owner: '', hovered: false },
    'Alberta':                { troops: 0, owner: '', hovered: false },
    'Central America':        { troops: 0, owner: '', hovered: false },
    'Eastern United States':  { troops: 0, owner: '', hovered: false },
    'Greenland':              { troops: 0, owner: '', hovered: false },
    'Northwest Territory':    { troops: 0, owner: '', hovered: false },
    'Ontario':                { troops: 0, owner: '', hovered: false },
    'Western United States':  { troops: 0, owner: '', hovered: false },
    'Quebec':                 { troops: 0, owner: '', hovered: false },
    'Argentina':              { troops: 0, owner: '', hovered: false },
    'Brazil':                 { troops: 0, owner: '', hovered: false },
    'Peru':                   { troops: 0, owner: '', hovered: false },
    'Venezuela':              { troops: 0, owner: '', hovered: false },
  };

interface CountryStoreInterface {

    delegate: CountryStoreDelegate;
    countries: CountryState;
    setTroops(countryName: string, quantity: number): void;
    massChangeOwner(countries: string[], owner: string): void;
    incrementTroops(countryName: string, quantity: number): void;
    decrementTroops(countryName: string, quantity: number): void;
    changeOwner(countryName: string, newOwner: string): void;
    setHover(countryName: string, hovered: boolean): void;
    playerCountries(player: string, minTroops: number): Countries[];
    borderCountries(country: Countries, sameOrigin: boolean): Countries[];
}

interface CountryStoreDelegate {
    menu: MenuStoreInterface;
    game: GameStoreInterface;
}

class CountryStore implements CountryStoreInterface {

  delegate: CountryStoreDelegate;

  @observable countries: CountryState;

  constructor(delegate: CountryStoreDelegate) {
    this.delegate = delegate;
    this.countries = countryInitState;
  }
  
  @action massChangeOwner(countries: string[], owner: string) {
      countries.forEach(element => {
        this.countries[element].owner = owner;
        this.countries[element].troops = 1;
      });
  }

  @action setTroops(countryName: string, quantity: number) {
      this.countries[countryName].troops = quantity;
  }

  @action incrementTroops(countryName: string, quantity: number) {
      this.countries[countryName].troops += quantity;
  }

  @action decrementTroops(countryName: string, quantity: number) {
      this.countries[countryName].troops -= quantity;
  }

  @action changeOwner(countryName: string, newOwner: string) {
      this.countries[countryName].owner = newOwner;
  }

  @action setHover(countryName: string, hovered: boolean) {
      this.countries[countryName].hovered = hovered;
  }

playerCountries(player: string, minTroops: number = 0): Countries[] {
    console.log(filter(this.countries, (country: CountryInfo) => ( country.owner === player && country.troops > minTroops)));
    return filter(this.countries, (country: CountryInfo) => ( country.owner === player && country.troops > minTroops)) as Countries[];
}
  
  /**
   * sameOrigin:
   *  true -> ATTACK
   *  false -> MOVE
   */
  borderCountries(country: Countries, sameOrigin: boolean = true): Countries[] {
    const player = this.countries[country].owner;
    const borders = countryBorders[country] ? countryBorders[country] : [];
    return sameOrigin ? 
      intersection(borders, this.playerCountries(player)) as Countries[] :
      difference(borders, this.playerCountries(player)) as Countries[] ;
  }

}

export { CountryStore, CountryStoreInterface, CountryStoreDelegate };
