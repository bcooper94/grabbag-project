import React, { Component } from 'react';
import Dock from 'react-dock';
import DeviceContainer from './DeviceContainer';

const dockStyle = {
  background: 'white'
};

const toggleButtonStyle = {
  position: 'absolute',
  zIndex: 1,
  right: '0px',
  top: '10px',
  cursor: 'pointer'
};

export default class DockedDeviceContainer extends Component {
  static defaultProps = {
    sidebarPosition: 'left',
    sidebarOpenSize: 0.35,
    sidebarDockedSize: 0.125
  };

  constructor() {
    super();
    this.state = { isDeviceContainerVisible: false };
    this.toggleShowDeviceContainer = this.toggleShowDeviceContainer.bind(this);
    this.onHover = this.onHover.bind(this);
  }

  toggleShowDeviceContainer() {
    this.setState({
      isDeviceContainerVisible: !this.state.isDeviceContainerVisible
    });
  }

  onHover(props, monitor) {
    setTimeout(() => {
      if (monitor.isOver()) {
        this.setState({ isDeviceContainerVisible: true });
      }
    }, 1000);
  }

  render() {
    let isDeviceContainerVisible;
    let sidebarOpenCloseButtonClass;
    let devicesPerRow = 3;

    if (this.state.isDeviceContainerVisible) {
      isDeviceContainerVisible = this.props.sidebarOpenSize;
      sidebarOpenCloseButtonClass = 'fa fa-lg fa-plus-circle '
        + 'device-picker-light-glyph';
    } else {
      isDeviceContainerVisible = this.props.sidebarDockedSize;
      sidebarOpenCloseButtonClass = 'fa fa-lg fa-times-circle '
        + 'device-picker-light-glyph';
      devicesPerRow = 1;
    }

    return (
      <Dock position={this.props.sidebarPosition}
        isVisible={true}
        fluid={true}
        size={isDeviceContainerVisible}
        dimMode='none'
        dockStyle={dockStyle}>
        <DeviceContainer className='device-grid'
          elementsPerRow={devicesPerRow}
          onDeviceHover={this.onHover} />
        <i className={sidebarOpenCloseButtonClass}
          style={toggleButtonStyle}
          onClick={this.toggleShowDeviceContainer}></i>
      </Dock>
    );
  }
}