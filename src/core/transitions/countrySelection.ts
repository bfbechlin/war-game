import { Countries } from 'store/country/types';
import { CountryStoreInterface } from 'store/country/CountryStore';
import { MenuStoreInterface } from 'store/menu/MenuStore';
import { GameStoreInterface } from 'store/game/GameStore';

interface CountrySelectionResolverDelegate {
    country: CountryStoreInterface;
    menu: MenuStoreInterface;
    game: GameStoreInterface;
}

export type CountrySelection = 'HOVER-IN' | 'HOVER-OUT' | 'SELECTION-IN' | 'SELECTION-OUT';

interface CountrySelectionResolverInterface {

    delegate: CountrySelectionResolverDelegate;
    countrySelectionTransition(type: CountrySelection, country: Countries): void;

}

class CountrySelectionResolver implements CountrySelectionResolverInterface {

    delegate: CountrySelectionResolverDelegate;

    constructor(delegate: CountrySelectionResolverDelegate) {
        this.delegate = delegate;
    }

    singleSelectionTransition(type: CountrySelection, country: Countries): void {
        switch (type) {
            case 'HOVER-IN':
                this.delegate.country.setHover(country, true);
                break;
            case 'HOVER-OUT':
                this.delegate.country.setHover(country, false);
                break;
            case 'SELECTION-IN':
                this.delegate.menu.setSelecteds([country]);
                this.delegate.menu.setSelectables([]);
                break;
            case 'SELECTION-OUT':
                const { turnOwner } = this.delegate.game;
                this.delegate.menu.setSelecteds([]);
                this.delegate.menu.setSelectables((this.delegate.country.playerCountries(turnOwner, 0)));
                break;
            default:
                break;
        }
    }

    doubleSelectionTransition(type: CountrySelection, country: Countries, sameOrigin: boolean): void {
        const { selecteds } = this.delegate.menu.menuState;
        const { turnOwner } = this.delegate.game;
        switch (type) {
            case 'HOVER-IN':
                // store.dispatch(setHover(country, true));
                this.delegate.country.setHover(country, true);
                break;
            case 'HOVER-OUT':
                // store.dispatch(setHover(country, false));
                this.delegate.country.setHover(country, false);
                break;
            case 'SELECTION-IN':
                // store.dispatch(setSelecteds([...selecteds, country]));
                this.delegate.menu.setSelecteds([...selecteds, country]);
                if (selecteds.length === 0) {
                    // store.dispatch(setSelectables(borderCountries(country, state.country, sameOrigin)));
                    this.delegate.menu.setSelectables(this.delegate.country.borderCountries(country, sameOrigin));
                } else {
                    // store.dispatch(setSelectables([]));
                    this.delegate.menu.setSelectables([]);
                }
                break;
            case 'SELECTION-OUT':
                if (selecteds[0] === country) {
                    this.delegate.menu.setSelecteds([]);
                    this.delegate.menu.setSelectables(this.delegate.country.playerCountries(turnOwner, 1));
                } else {
                    this.delegate.menu.setSelecteds([selecteds[0]]);
                    this.delegate.menu.setSelectables(this.delegate.country.borderCountries(selecteds[0], sameOrigin));
                }
                break;
            default:
                break;
        }
    }

    countrySelectionTransition(type: CountrySelection, country: Countries): void {
        switch (this.delegate.game.phase) {
            case 'DISTRIBUTION':
                return this.singleSelectionTransition(type, country);
            case 'ATTACK':
                return this.doubleSelectionTransition(type, country, false);
            case 'MOVE':
                return this.doubleSelectionTransition(type, country, true);
            default:
                return;
        }
    }
}

export { CountrySelectionResolver, CountrySelectionResolverDelegate, CountrySelectionResolverInterface };