import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import './RightMenu.css';
import * as React from 'react';

interface RightMenuProps {
  
}

const RightMenu = <P extends RightMenuProps>(
  UnwrappedComponent: React.ComponentType<P>
) =>
  class RightMenuClass extends React.Component<P> {
    render() {
      return (
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <UnwrappedComponent />
        </ReactCSSTransitionGroup>
      );
    }
  };
  
export default RightMenu;