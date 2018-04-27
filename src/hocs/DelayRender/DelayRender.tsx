import * as React from 'react';

const DelayRender = (timeout: number) =>
  <TOriginalProps extends {}>(
    Component: 
      (
        React.ComponentClass<TOriginalProps> |
        React.StatelessComponent<TOriginalProps>
      )
  ) => {

};