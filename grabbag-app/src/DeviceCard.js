import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export default class DeviceCard extends Component {
  static DELETE_BUTTON_STYLE = {
    cursor: 'pointer',
    position: 'absolute',
    top: '5%'
  };

  static propTypes = {
    device: PropTypes.object.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    enableDelete: false,
    onClickRemoveDevice: () => {}
  };

  constructor(props) {
    super(props);
    this.state = { isHovering: false };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    if (!this.state.isHovering) {
      this.setState({ isHovering: true });
    }
  }

  handleMouseLeave() {
    if (this.state.isHovering) {
      this.setState({ isHovering: false });
    }
  }

  render() {
    const { device } = this.props;
    const imageUrl = device.image && device.image.thumbnail ?
      device.image.thumbnail : null;
    let deleteButton = null;

    if (this.props.enableDelete && this.state.isHovering) {
      deleteButton = (
        <i className='fa fa-lg fa-times-circle'
          style={DeviceCard.DELETE_BUTTON_STYLE}
          onClick={this.props.onClickRemoveDevice}></i>
      );
    }

    return (
      <div className="row device-card"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <div>
          <img src={imageUrl}
          alt={device.display_title}
          className={this.props.className} />
          {deleteButton}
        </div>
      </div>
    );
  }
}
