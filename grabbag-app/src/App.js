import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import WikiService from './services/WikiService';
import DeviceContainer from './DeviceContainer';
import DraggableDevice from './DraggableDevice';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

@DragDropContext(HTML5Backend)
export default class App extends Component {
  constructor() {
    super();
    this.state = { devices: [], currentPage: 0 };
  }

  componentDidMount() {
    this.fetchWikiItemsForPage(this.state.currentPage);
  }

  async fetchWikiItemsForPage(page) {
    this.wikiService = new WikiService();
    try {
      let wikiItems = await this.wikiService.getWikiItems(page);
      this.setState({ devices: wikiItems });
    } catch (error) {
      console.error('Failed to fetch wiki items for page=' + page
        + ': ' + error);
    }
  }

  render() {
    let devices = this.state.devices.map(device =>
      <DraggableDevice className="row" key={device.wikiid} device={device} />);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Grabbag Device Picker</h1>
        </header>
        <div className="container">
          <div className="row all-devices">
            <DeviceContainer className="col-md-4 device-grid" />
            <div className="col-md-8 device-grid">
              <div className="row">
                <h1>All Devices</h1>
              </div>
              {devices}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
