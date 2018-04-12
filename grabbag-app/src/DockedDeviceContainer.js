import React, { Component } from 'react';
import Dock from 'react-dock';
import DeviceContainer from './DeviceContainer';

const dockStyle = {
  background: 'rgb(199, 189, 189)'
};

const toggleButtonStyle = {
  position: 'absolute',
  zIndex: 1,
  right: '10px',
  top: '10px',
  cursor: 'pointer'
};

export default class DockedDeviceContainer extends Component {
  static defaultProps = {
    sidebarPosition: 'left',
    sidebarOpenSize: 0.25,
    sidebarDockedSize: 0.1
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

  renderSidebarContents() {
    return (
      <div className='container-fluid'>
        <DeviceContainer className='device-grid'
          onDeviceHover={() => this.setState({ isDeviceContainerVisible: true })} />
      </div>
    );
  }

  renderSidebarPlaceholder() {
    return (
      <DeviceContainer className='device-grid'
        elementsPerRow={1}
        onDeviceHover={this.onHover} />
    );
  }

  onHover(props, monitor) {
    setTimeout(() => {
      if (monitor.isOver()) {
        this.setState({ isDeviceContainerVisible: true });
      }
    }, 1000);
  }

  renderOpenSidebar() {
    return (
      <Dock position={this.props.sidebarPosition}
        isVisible={true}
        fluid={true}
        size={this.props.sidebarOpenSize}
        dimMode='none'
        dockStyle={dockStyle}>
        {this.renderSidebarContents()}
        <i className='fa fa-lg fa-times-circle'
          style={toggleButtonStyle}
          onClick={this.toggleShowDeviceContainer}></i>
      </Dock>
    );
  }

  renderClosedSidebar() {
    return (
      <Dock position={this.props.sidebarPosition}
        isVisible={true}
        fluid={true}
        size={this.props.sidebarDockedSize}
        dimMode='none'
        dockStyle={dockStyle}>
        {this.renderSidebarPlaceholder()}
        <i className='fa fa-lg fa-plus-circle'
          style={toggleButtonStyle}
          onClick={this.toggleShowDeviceContainer}></i>
      </Dock>
    );
  }

  render() {
    let contents;

    if (this.state.isDeviceContainerVisible) {
      contents = this.renderOpenSidebar();
    } else {
      contents = this.renderClosedSidebar();
    }

    return contents;
  }
}