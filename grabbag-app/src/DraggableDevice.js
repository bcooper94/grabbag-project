import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  static propTypes = {
    device: PropTypes.object.isRequired
  };

  render() {
    const { device, connectDragSource } = this.props;

    return connectDragSource(
      <div>
        <DeviceCard className='draggable-device'
          device={device}
          enableDelete={false} />
      </div>
    );
  }
}
