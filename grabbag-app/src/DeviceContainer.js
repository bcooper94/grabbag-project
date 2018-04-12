import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Alert from 'react-s-alert';
import { DropTarget } from 'react-dnd';
import ResponsiveGrid from './ResponsiveGrid';
import DeviceCard from './DeviceCard';
import DeviceStorageService from './services/DeviceStorageService';
import * as constants from './Constants';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-s-alert/dist/s-alert-default.css';

const deviceContainerTarget = {
  drop(props, monitor, deviceContainerComponent) {
    deviceContainerComponent.handleDrop(monitor.getItem());
  },

  hover(props, monitor, deviceContainerComponent) {
    deviceContainerComponent.props.onDeviceHover(props, monitor);
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
  static defaultProps = {
    elementsPerRow: 2,
    onDeviceDrop: () => { },
    onDeviceHover: () => { }
  };

  constructor(props) {
    super(props);
    this.state = { storedDevices: [] };
    this.clearDevices = this.clearDevices.bind(this);
  }

  componentDidMount() {
    try {
      this.deviceStorageService = new DeviceStorageService();
      let storedDevices = this.deviceStorageService.getAllDevices();

      if (storedDevices != null) {
        this.setState({ storedDevices });
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
      this.props.onDeviceDrop(targetDevice);
    } else {
      console.log('Device already in collection');
      Alert.info('You already have ' + targetDevice.display_title
        + ' in your collection.', { position: 'top-right' });
    }
  }

  addDevice(device) {
    this.setState({ storedDevices: [...this.state.storedDevices, device] });
    this._scrollToBottom();

    if (this.deviceStorageService != null) {
      this.deviceStorageService.storeDevice(device);
    }
  }

  _scrollToBottom() {
    let grid = ReactDOM.findDOMNode(this.refs.deviceContainerGrid);

    if (grid && grid.scrollTop && grid.scrollTopMax) {
      grid.scrollTop = grid.scrollTopMax;
    } else {
      console.error('DeviceContainer failed to scroll to bottom of container');
    }
  }

  removeDevice(targetDevice) {
    let storedDevices = [...this.state.storedDevices];
    const indexToRemove = storedDevices.findIndex(device =>
      device.wikiid === targetDevice.wikiid)
    storedDevices.splice(indexToRemove, 1);
    this.setState({ storedDevices });

    if (this.deviceStorageService != null) {
      this.deviceStorageService.removeDevice(targetDevice);
    }
  }

  clearDevices() {
    this.setState({ storedDevices: [] });

    if (this.deviceStorageService != null) {
      this.deviceStorageService.clearDevices();
    }
  }

  render() {
    const { connectDropTarget } = this.props;
    let deviceElements = this.state.storedDevices.map(device =>
      <DeviceCard key={device.wikiid} device={device}
        onClickRemoveDevice={this.removeDevice.bind(this, device)}
        enableDelete />);

    return connectDropTarget(
      <div className={this.props.className + ' device-container'}>
        <div className="row">
          <h1>Your Devices</h1>
        </div>
        <ResponsiveGrid
          ref='deviceContainerGrid'
          elements={deviceElements}
          elementsPerRow={this.props.elementsPerRow}
          elementHeight={67.25}
          containerHeight={600} />
        <button className='btn btn-danger remove-devices-button'
          onClick={this.clearDevices}>Remove All</button>
      </div>
    );
  }
}
