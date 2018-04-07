import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import DeviceCard from './DeviceCard';
import * as constants from './Constants';

import 'bootstrap/dist/css/bootstrap.min.css';

const deviceContainerTarget = {
  drop(props, monitor, deviceContainerComponent) {
    deviceContainerComponent.handleDrop(monitor.getItem());
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

@DropTarget(constants.DRAG_DROP_TYPES.DEVICE, deviceContainerTarget, collect)
export default class DeviceContainer extends Component {
  constructor() {
    super();
    this.state = { storedDevices: [] };
  }

  componentDidMount() {
    // TODO: add load from local storage
  }

  handleDrop(targetDevice) {
    if (!this.state.storedDevices.find(device =>
      device.wikiid === targetDevice.wikiid)) {
      this.setState({
        storedDevices: [...this.state.storedDevices, targetDevice]
      });
    }
  }

  addDevice(device) {
    // TODO: add local storage support
    console.debug('DeviceContainer adding item: ' + JSON.stringify(device));
    this.setState({ storedDevices: [device, ...this.state.storedDevices] });
  }

  removeDevice(targetDevice) {
    // TODO: remove item from local storage
    console.debug('DeviceContainer: removing device=' + JSON.stringify(targetDevice));
    let storedDevices = [...this.props.storedDevices];
    const indexToRemove = storedDevices.findIndex(device =>
      device.wikiid === targetDevice.wikiid)
    storedDevices.splice(indexToRemove, 1);
    this.setState({storedDevices});
  }

  render() {
    const { connectDropTarget } = this.props;
    let { devices } = this.state;

    devices = this.state.storedDevices.map(device =>
      <DeviceCard key={device.wikiid} device={device} />);

    return connectDropTarget(
      <div className={this.props.className}>
        <div className="row"><h1>Your Devices</h1></div>
        {devices}
      </div>
    );
  }
}
