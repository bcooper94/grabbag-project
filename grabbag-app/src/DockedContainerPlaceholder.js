import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import * as constants from './Constants';

const dockedContainerTarget = {
  hover(props, monitor, dockedContainerComponent) {
    dockedContainerComponent.props.onHover(props, monitor);
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const containerStyles = {
  height: '100%',
  width: '100%'
};

const headerStyles = {
  top: '50%'
};

@DropTarget(constants.DRAG_DROP_TYPES.DEVICE, dockedContainerTarget, collect)
export default class DockedContainerPlaceholder extends Component {
  static defaultProps = {
    onHover: () => {}
  };

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={containerStyles}>
        <h3 className='rotate' styles={headerStyles}>Your Devices</h3>
      </div>
    );
  }
}