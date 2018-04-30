import * as React from 'react';
import { v4 as UUID } from 'uuid';
import * as classNames from 'classnames';
import './Country.css';
import 'utils/colors.css';
import getCentroid from 'utils/pathCentroid';

import TroopsMarker from './TroopsMarker';
import TroopsChangeMarker from './TroopsChangeMarker';

import { Countries } from 'store/country/types';
import { ViewMode } from 'store/menu/types';
import { Color } from 'utils/colors';
import { InteractionState } from 'core/transducers/map';

export type CountryAction = 'HOVER-IN' | 'HOVER-OUT' | 'SELECTION-IN' | 'SELECTION-OUT';

export interface CountryProps {
  name: Countries;
  troops: number;
  shape: string;
  viewMode: ViewMode;
  continentColor: Color;
  playerColor: Color;
  selectable: boolean;
  interactionState: InteractionState;
  possibleChoice: boolean;
  onAction: ((name: Countries, type: CountryAction) => (event: any) => void);
}

interface TroopsChange {
  id: string;
  quantity: number;
}

export interface CountryState {
  troopsChanges: TroopsChange[];
}

class Country extends React.Component<CountryProps, CountryState> {
  constructor(props: CountryProps) {
    super(props);
    this.state = {
      troopsChanges: []
    };
  }

  componentDidUpdate({troops}: CountryProps, {troopsChanges}: CountryState) {
    if (troops !== this.props.troops) {
      const quantity = this.props.troops - troops;
      const id = UUID();
      this.setState({troopsChanges: [...troopsChanges, {id, quantity}]});
      setTimeout(() => { this.setState({troopsChanges : troopsChanges.slice(1)}); }, 1100);
    }
  }

  faddingElement(shapeID: string) {
    const { viewMode, playerColor, continentColor } = this.props;
    const color = viewMode === 'PLAYER' ? playerColor : continentColor;
    const classes = classNames('country-selectable', `${color.name}-fade`);
    return (
      <use xlinkHref={`#${shapeID}`} className={classes} stroke={color.dark} />
    );
  }

  countryElement(shapeID: string, hidden: boolean) {
    const { viewMode, playerColor, continentColor, selectable, interactionState } = this.props;
    const color = viewMode === 'PLAYER' ? playerColor : continentColor;
    const colorMapper = {
      'NORMAL': color.normal,
      'SELECT': color.dark,
      'HOVER': color.light,
    };
    const classes = classNames({'country-selectable': selectable});
    return (
      <use 
        xlinkHref={`#${shapeID}`} 
        className={classes} 
        fill={colorMapper[interactionState]} 
        stroke={color.dark} 
        style={hidden ? {visibility: 'hidden'} : {}} 
      />
    );
  }

  render() {
    const { name, shape, troops, viewMode, playerColor, continentColor, selectable, interactionState, onAction, possibleChoice } = this.props;
    const color = viewMode === 'PLAYER' ? playerColor : continentColor;
    const colorMapper = {
      'NORMAL': color.normal,
      'SELECT': color.dark,
      'HOVER': color.light,
    };
    const shapeID = `${name}-shape`;
    const centroid = getCentroid(shape);

    const troopsChanges: React.ReactNode[] = this.state.troopsChanges.map(({id, quantity}) => (
      <TroopsChangeMarker key={`troopsChange-${id}`} position={centroid} quantity={quantity}/>
    ));
    const country: React.ReactNode = (
      <use 
        xlinkHref={`#${shapeID}`} 
        className={classNames({'country-selectable': selectable})} 
        fill={colorMapper[interactionState]} 
        stroke={color.dark} 
        style={possibleChoice && interactionState === 'NORMAL' ? {visibility: 'hidden'} : {}} 
      />
    );
    const fadding: React.ReactNode = possibleChoice ? (
      <use 
        xlinkHref={`#${shapeID}`} 
        className={classNames('country-selectable', `${color.name}-fade`)} 
        stroke={color.dark} 
      />
    ) : null;
    if (name === 'Brazil') {
      console.log(this.props, fadding);
    }
    return (
      <g 
        className={classNames('country-container', {'country-container-selectable': selectable})} 
        onClick={selectable ? onAction(name, interactionState === 'SELECT' ? 'SELECTION-OUT' : 'SELECTION-IN') : undefined} 
        onMouseEnter={selectable ? onAction(name, 'HOVER-IN') : undefined}
        onMouseLeave={selectable ? onAction(name, 'HOVER-OUT') : undefined}
      >
        <defs>
          <path id={shapeID} d={shape} />
        </defs>
        {fadding}
        {country}
        <TroopsMarker position={centroid} troops={troops} color={viewMode === 'CONTINENT' ? playerColor.normal : '#000000'} />
        {troopsChanges}
      </g>
    );
  }
}

export default Country;