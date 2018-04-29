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

export default getCentroid;