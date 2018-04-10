import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import DeviceCard from './DeviceCard';
import DeviceStorageService from './services/DeviceStorageService';
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
    try {
      this.deviceStorageService = new DeviceStorageService();
      let storedDevices = this.deviceStorageService.getAllDevices();
      console.debug('Got devices from local storage: ' + JSON.stringify(storedDevices));

      if (storedDevices != null) {
        this.setState({storedDevices});
      }
    } catch (e) {
      console.error('Local storage is not available on this platform');
      this.deviceStorageService = null;
    }
  }

  handleDrop(targetDevice) {
    if (!this.state.storedDevices.find(device =>
      device.wikiid === targetDevice.wikiid)) {
      this.addDevice(targetDevice);
    }
  }

  addDevice(device) {
    this.setState({ storedDevices: [...this.state.storedDevices, device] });

    if (this.deviceStorageService != null) {
      this.deviceStorageService.storeDevice(device);
    }
  }

  removeDevice(targetDevice) {
    let storedDevices = [...this.state.storedDevices];
    const indexToRemove = storedDevices.findIndex(device =>
      device.wikiid === targetDevice.wikiid)
    storedDevices.splice(indexToRemove, 1);
    this.setState({storedDevices});

    if (this.deviceStorageService != null) {
      this.deviceStorageService.removeDevice(targetDevice);
    }
  }

  render() {
    const { connectDropTarget } = this.props;
    let { devices } = this.state;

    devices = this.state.storedDevices.map(device =>
      <DeviceCard key={device.wikiid} device={device}
        onClickRemoveDevice={this.removeDevice.bind(this, device)}
        enableDelete  />);

    return connectDropTarget(
      <div className={this.props.className + ' device-container'}>
        <div className="row"><h1>Your Devices</h1></div>
        {devices}
      </div>
    );
  }
}
