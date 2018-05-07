import * as React from 'react';

export interface TroopsChangeMarkerProps {
  position: {
    x: number;
    y: number;
  };
  quantity: number;
}

const TroopsChangeMarker: React.SFC<TroopsChangeMarkerProps> = ({ position, quantity }) => {
  const color = quantity < 0 ? 'red' : 'green';
  const text = quantity < 0 ? `${quantity}` : `+${quantity}`;
  return (
    <g className="troops-change">
      <circle cx={position.x} cy={position.y} r="20" stroke="black" strokeWidth="1" fill="#D3D3D3" />
      <text 
        x={position.x}
        y={position.y}
        textAnchor="middle"
        fontWeight="bold" 
        fontSize="17px" 
        fontFamily="Arial" 
        dy=".3em"
        stroke={color}
        fill={color}
      >
        {text} 
      </text>
    </g>
  );
};

export default TroopsChangeMarker;