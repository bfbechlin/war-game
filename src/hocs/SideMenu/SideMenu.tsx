import { CSSTransitionGroup } from 'react-transition-group';
import './SideMenu.css';
import * as React from 'react';

interface RightMenuProps {
  current: number;
}

interface RightMenuState {
  transitioning: boolean;
}

class RightMenu extends React.Component<RightMenuProps, RightMenuState> { 
  constructor(props: RightMenuProps) {
    super(props);
    this.state = {
      transitioning: false
    };
  }

  shouldComponentUpdate(nextProps: RightMenuProps, nextState: RightMenuState) {
    if (nextProps.current !== this.props.current) {
      console.log(this.props, nextProps);
      if (!this.state.transitioning) {
        this.setState({transitioning: true});
      }
      setTimeout(
        () => {
          console.log(this.state);
          if (this.state.transitioning) {
            this.setState({transitioning: false});
          } else {
            this.setState({transitioning: true});
          }
        },
        300
      );
      return false;
    }
    return true;
  }

  render() {
    const { children, current } = this.props;
    const { transitioning } = this.state;
    console.log(transitioning);
    return (
      <CSSTransitionGroup
        transitionName="side-menu"
        transitionEnterTimeout={750}
        transitionLeaveTimeout={750}
      >
        {!transitioning && React.Children.toArray(children)[current]}
      </CSSTransitionGroup>
    );
  }
}

export default RightMenu;