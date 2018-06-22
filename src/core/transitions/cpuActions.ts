import store from 'store/';
import { playerCountries, borderCountries } from 'core/transducers/map';
import { GamePhase } from 'store/game/types';
import { PlayerInfo } from 'store/player/types';
import { Countries } from 'store/country/types';
import gameActionResolver, { GameActionResolverInterface } from 'core/transitions/gameActions';
import { isActivePlayer } from 'core/transducers/player';
import { sortBy, shuffle } from 'utils/array';

const distributeStep = (player: PlayerInfo) => {
  const countries = store.country.countries;
  const myCountries = shuffle(playerCountries(player.name, countries));
  let availableTroops = player.availableTroops;
  myCountries.forEach((country) => {
    if (availableTroops > 0) {
      gameActionResolver.addTroops(country, 1);
      availableTroops -= 1;
    } else {
      return;
    }
  });
};

const attackStep = (player: PlayerInfo) => {
  let countries = store.country.countries;
  const myCountries = playerCountries(player.name, countries);
  
  myCountries.forEach((myCountry) => {
    countries = store.country.countries;
    const myTroops = countries[myCountry].troops;
    const bdCountries = borderCountries(myCountry, countries, false);
    bdCountries.forEach((target) => {
      const targetTroops = countries[target].troops;
      if (myTroops > 3 && myTroops > targetTroops * 2) {
        gameActionResolver.attack(myCountry, target, myTroops - 1);
      }
    });
  });
};

// RISK DESCENDING
const countriesRiskLevel = (countries: Countries[]): Countries[] => {
  const countryState = store.country.countries;
  const risks = countries.map((country) => {
    const risk = borderCountries(country, countryState, false).length * 1000 + Math.abs(Math.random() * 999);
    return {name: country, risk};
  });
  const ordered = sortBy(risks, (item) => (item.risk)); 
  return ordered.map((item) => item.name);
};

// true if risk of from is bigger than to 
const riskComparation = (countriesRisk: Countries[], from: Countries, to: Countries) => (
  countriesRisk.indexOf(from) < countriesRisk.indexOf(to)
);

const moveStep = (player: PlayerInfo) => {
  let countries = store.country.countries;
  const countriesRiskOrderer = countriesRiskLevel(playerCountries(player.name, countries));
  countriesRiskOrderer.forEach((country) => {
    countries = store.country.countries;
    const bdCountries = borderCountries(country, countries, true);
    bdCountries.forEach((origin) => {
      const originTroops = countries[origin].troops;
      if (originTroops > 1 && riskComparation(countriesRiskOrderer, origin, country)) {
        gameActionResolver.move(origin, country, originTroops - 1);
      }
    });
  });
};

export const cpuAction = (playerName: string, phase: GamePhase) => {
  const player = store.player.players[playerName];
  switch (phase) {
    case 'DISTRIBUTION':
      return distributeStep(player);
    case 'ATTACK':
      return attackStep(player);
    case 'MOVE':
      return moveStep(player);
    default:
      return;
  }
};

export default (phase: GamePhase) => {
  const { activePlayers, turnOwner } = store.game;
  if (!isActivePlayer(turnOwner, activePlayers)) {
    setTimeout(
      () => {
        cpuAction(turnOwner, phase);
        setTimeout(() => store.game.nextGamePhase(), 2000);
      },
      2000);
  }
};
