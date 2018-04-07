import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DeviceCard from './DeviceCard';
import * as constants from './Constants';

import 'bootstrap/dist/css/bootstrap.min.css';

const draggableDeviceSource = {
  beginDrag(props, monitor) {
    return { ...props.device };
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  };
}

@DragSource(constants.DRAG_DROP_TYPES.DEVICE, draggableDeviceSource, collect)
export default class DraggableDevice extends Component {
  render() {
    const { device, connectDragSource } = this.props;

    return connectDragSource(
      <div>
        <DeviceCard device={device} />
      </div>
    );
  }
}
