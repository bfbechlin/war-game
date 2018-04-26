import { CSSTransitionGroup } from 'react-transition-group';
import './SideMenu.css';
import * as React from 'react';

interface RightMenuProps {
  current: number;
}

const RightMenu: React.SFC<RightMenuProps> = (props) => { 
  const { children, current } = props;
  return (
    <CSSTransitionGroup
      transitionName="side-menu"
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={800}
    >
      {React.Children.toArray(children)[current]}
    </CSSTransitionGroup>
  );
};

export default RightMenu;