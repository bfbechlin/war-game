import { playerCountries, borderCountries } from 'core/transducers/map';
import { GamePhase } from 'store/game/types';
import { PlayerInfo } from 'store/player/types';
import { Countries } from 'store/country/types';
import { isActivePlayer } from 'core/transducers/player';
import { sortBy, shuffle } from 'utils/array';
import { GameActionResolverInterface } from 'core/transitions/gameActions';
import { GameStoreInterface } from 'store/game/GameStore';
import { CountryStoreInterface } from 'store/country/CountryStore';
import { PlayerStoreInterface } from 'store/player/PlayerStore';

interface CPUActionResolverDelegate {
  gameActionResolver: GameActionResolverInterface;
  game: GameStoreInterface;
  country: CountryStoreInterface;
  player: PlayerStoreInterface;
}

interface CPUActionResolverInterface {

  delegate: CPUActionResolverDelegate;
  resolveCPUAction(phase: GamePhase): void;
  // cpuAction(playerName: string, phase: GamePhase): void;

}

class CPUActionResolver implements CPUActionResolverInterface {

  delegate: CPUActionResolverDelegate;

  constructor(delegate: CPUActionResolverDelegate) {
     this.delegate = delegate;
  }

  distributeStep(player: PlayerInfo): void {
    const countries = this.delegate.country.countries;
    const myCountries = shuffle(playerCountries(player.name, countries));
    let availableTroops = player.availableTroops;
    myCountries.forEach((country) => {
      if (availableTroops > 0) {
        this.delegate.gameActionResolver.addTroops(country, 1);
        availableTroops -= 1;
      } else {
        return;
      }
    });
  }

  attackStep(player: PlayerInfo): void {
    let countries = this.delegate.country.countries;
    const myCountries = playerCountries(player.name, countries);
    
    myCountries.forEach((myCountry) => {
      countries = this.delegate.country.countries;
      const myTroops = countries[myCountry].troops;
      const bdCountries = borderCountries(myCountry, countries, false);
      bdCountries.forEach((target) => {
        const targetTroops = countries[target].troops;
        if (myTroops > 3 && myTroops > targetTroops * 2) {
          this.delegate.gameActionResolver.attack(myCountry, target, myTroops - 1);
        }
      });
    });
  }

  moveStep(player: PlayerInfo): void {
    let countries = this.delegate.country.countries;
    const countriesRiskOrderer = this.countriesRiskLevel(playerCountries(player.name, countries));
    countriesRiskOrderer.forEach((country) => {
      countries = this.delegate.country.countries;
      const bdCountries = borderCountries(country, countries, true);
      bdCountries.forEach((origin) => {
        const originTroops = countries[origin].troops;
        if (originTroops > 1 && this.riskComparation(countriesRiskOrderer, origin, country)) {
          this.delegate.gameActionResolver.move(origin, country, originTroops - 1);
        }
      });
    });
  }

  // RISK DESCENDING
  countriesRiskLevel = (countries: Countries[]): Countries[] => {
    const countryState = this.delegate.country.countries;
    const risks = countries.map((country) => {
      const risk = borderCountries(country, countryState, false).length * 1000 + Math.abs(Math.random() * 999);
      return {name: country, risk};
    });
    const ordered = sortBy(risks, (item) => (item.risk)); 
    return ordered.map((item) => item.name);
  }

  // true if risk of from is bigger than to 
  riskComparation(countriesRisk: Countries[], from: Countries, to: Countries): boolean {
    return countriesRisk.indexOf(from) < countriesRisk.indexOf(to);
  }

  cpuAction(playerName: string, phase: GamePhase): void {
    const player = this.delegate.player.players[playerName];
    switch (phase) {
      case 'DISTRIBUTION':
        return this.distributeStep(player);
      case 'ATTACK':
        return this.attackStep(player);
      case 'MOVE':
        return this.moveStep(player);
      default:
        return;
    }
  }

  resolveCPUAction(phase: GamePhase): void {
    const { activePlayers, turnOwner } = this.delegate.game;
    if (!isActivePlayer(turnOwner, activePlayers)) {
      setTimeout(
        () => {
          this.cpuAction(turnOwner, phase);
          setTimeout(() => this.delegate.game.nextGamePhase(), 2000);
        },
        2000);
    }
  }
}

export { CPUActionResolver, CPUActionResolverInterface, CPUActionResolverDelegate };
