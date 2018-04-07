import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class DeviceContainer extends Component {
  constructor() {
    super();
    this.state = {storedDevices: []};
  }

  handleDrop(index, item) {
    console.debug('Dropped item at index=' + index
      + ': ' + JSON.stringify(item));
    this.setState({
      storedDevices: [item, ...this.state.storedDevices]
    });
  }

  render() {
    let devices = this.state.storedDevices.map(device =>
      <div className="row">{device.display_title}</div>);
    return (<div className="container">{devices}</div>);
  }
}
