import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class DeviceCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovering: false };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ isHovering: true });
  }

  handleMouseLeave() {
    this.setState({ isHovering: false });
  }

  render() {
    const { device } = this.props;
    const imageUrl = device.image && device.image.thumbnail ? device.image.thumbnail : null;
    let deleteButton = null;

    if (this.props.enableDelete && this.state.isHovering) {
      deleteButton = (
        <button className="btn btn-danger" onClick={this.props.onClickRemoveDevice}>
          Delete
        </button>);
    }

    return (
      <div className="row device-card" onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <img src={imageUrl} alt={device.display_title} />
        {deleteButton}
      </div>
    );
  }
}
