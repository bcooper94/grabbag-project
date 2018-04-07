import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class DeviceCard extends Component {
  render() {
    const { device } = this.props;
    const imageUrl = device.image && device.image.thumbnail ? device.image.thumbnail : null;

    return (
      <div className="row">
        <img src={imageUrl} alt={device.display_title} />
      </div>
    );
  }
}
