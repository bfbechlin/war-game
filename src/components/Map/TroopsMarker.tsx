import * as React from 'react';

export interface TroopsMarkerProps {
  position: {
    x: number;
    y: number;
  };
  troops: number;
  color: string;
}

const TroopsMarker: React.SFC<TroopsMarkerProps> = ({ position, troops, color }) => {
  return (
    <g className="troops">
      <circle cx={position.x} cy={position.y} r="16" stroke="white" strokeWidth="2" fill={color} />
      <text x={position.x} y={position.y} textAnchor="middle" fill="white" fontSize="15px" fontFamily="Arial" dy=".3em" >
        {troops}
      </text>
    </g>
  );
};

export default TroopsMarker;