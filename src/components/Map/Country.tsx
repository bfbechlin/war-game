import * as React from 'react';
const parseSVG = require('svg-path-parser');

const getCentroid = (path: string) => {
  const parsedPath = parseSVG.parseSVG(path);
  let centroid = {x: 0, y: 0};
  let pointCount = 0;
  for (var i = 0; i < parsedPath.length; i++) {
      var point = parsedPath[i];
      if (point.relative) {
          if (i > 0) {
            point.x += +parsedPath[i - 1].x;
            point.y += +parsedPath[i - 1].y;
          }
      }
      if (point.x && point.y) {
          centroid.x += point.x;
          centroid.y += point.y;
          pointCount++;
      }
  }
  centroid.x /= pointCount;
  centroid.y /= pointCount; 
  return centroid;
};

export interface CountryProps {
  name: string;
  path: string;
}

const Country: React.SFC<CountryProps> = (props) => {
  const { name, path } = props;
  const centroid = getCentroid(path);
  return (
    <React.Fragment>
      <path className="country" id={name} d={path}/>
      <circle cx={centroid.x} cy={centroid.y} r="16" stroke="white" stroke-width="2" fill="black" />
      <text x={centroid.x} y={centroid.y} text-anchor="middle" fill="white" font-size="15px" font-family="Arial" dy=".3em">122</text>
    </React.Fragment>
  );
};

export default Country;
