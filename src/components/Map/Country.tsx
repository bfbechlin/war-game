import * as React from 'react';
import { v4 as UUID } from 'uuid';
import './Country.css';
import getCentroid from 'util/pathCentroid';

export interface CountryProps {
  name: string;
  path: string;
  troops: number;
  onClick: ((countryName: string) => (event: any) => void);
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

  componentDidUpdate(prevProps: CountryProps, prevState: CountryState) {
    let troopsChanges: TroopsChange[];
    if (prevProps.troops !== this.props.troops) {
      troopsChanges = this.state.troopsChanges.slice();
      const quantity = this.props.troops - prevProps.troops;
      const id = UUID();
      troopsChanges.push({id, quantity});
      this.setState({troopsChanges});
      setTimeout(
        () => {
          troopsChanges = this.state.troopsChanges.slice();
          troopsChanges.shift();
          this.setState({troopsChanges});
        }, 
        1100
      );
    }
  }

  render() {
    const { name, path, troops, onClick } = this.props;
    const centroid = getCentroid(path);
    const troopsChanges = this.state.troopsChanges.map((item) => (
      <g key={`troopsChange-${item.id}`} className="troops-change">
          <circle cx={centroid.x} cy={centroid.y} r="20" stroke="black" strokeWidth="1" fill="#D3D3D3" />
          <text 
            x={centroid.x}
            y={centroid.y}
            textAnchor="middle"
            fontWeight="bold" 
            fontSize="17px" 
            fontFamily="Arial" 
            dy=".3em"
            stroke={item.quantity > 0 ? 'green' : 'red'}
            fill={item.quantity > 0 ? 'green' : 'red'}
          >
           {item.quantity >= 0 ? `+${item.quantity}` : item.quantity} 
          </text>
      </g>
    ));
    return (
      <g className="country-container" onClick={onClick(name)}>
        <g className="country">
          <path className="country-selectable" id={name} d={path} />
        </g>
        <g className="troops">
          <circle cx={centroid.x} cy={centroid.y} r="16" stroke="white" strokeWidth="2" fill="black" />
          <text x={centroid.x} y={centroid.y} textAnchor="middle" fill="white" fontSize="15px" fontFamily="Arial" dy=".3em" >
            {troops}
          </text>
        </g>
        {troopsChanges}
      </g>
    );
  }
}

export default Country;
