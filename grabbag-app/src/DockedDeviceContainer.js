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
    this.state = { isSidebarDocked: false };
    this.toggleShowSidebar = this.toggleShowSidebar.bind(this);
    this.onHover = this.onHover.bind(this);
  }

  toggleShowSidebar() {
    this.setState({
      isSidebarDocked: !this.state.isSidebarDocked
    });
  }

  onHover(props, monitor) {
    setTimeout(() => {
      if (monitor.isOver()) {
        this.setState({ isSidebarDocked: true });
      }
    }, 1000);
  }

  render() {
    let sidebarSize;
    let sidebarOpenCloseButtonClass;
    let devicesPerRow;

    if (this.state.isSidebarDocked) {
      devicesPerRow = 3;
      sidebarSize = this.props.sidebarOpenSize;
      sidebarOpenCloseButtonClass = 'fa fa-lg fa-times-circle '
        + 'device-picker-light-glyph';
    } else {
      sidebarSize = this.props.sidebarDockedSize;
      sidebarOpenCloseButtonClass = 'fa fa-lg fa-plus-circle '
        + 'device-picker-light-glyph';
      devicesPerRow = 1;
    }

    return (
      <Dock position={this.props.sidebarPosition}
        isVisible={true}
        fluid={true}
        size={sidebarSize}
        dimMode='none'
        dockStyle={dockStyle}>
        <DeviceContainer className='device-grid'
          elementsPerRow={devicesPerRow}
          onDeviceHover={this.onHover} />
        <i className={sidebarOpenCloseButtonClass}
          style={toggleButtonStyle}
          onClick={this.toggleShowSidebar}></i>
      </Dock>
    );
  }
}