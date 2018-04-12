import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import Infinite from 'react-infinite';
import WikiService from './services/WikiService';
import ResponsiveGrid from './ResponsiveGrid';
import DeviceContainer from './DeviceContainer';
import DraggableDevice from './DraggableDevice';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

@DragDropContext(HTML5Backend)
export default class App extends Component {
  static defaultProps = {
    devicesPerRow: 4,
    rowsPerBatch: 8
  };

  constructor(props) {
    super(props);
    this.state = {
      devices: []
    };

    this._onInfiniteLoad = this._onInfiniteLoad.bind(this);
  }

  componentDidMount() {
    this.wikiService = new WikiService();
    this.getDeviceBatch(0);
  }

  async getDeviceBatch(batchStartingOffset) {
    try {
      let wikiItems = await this.wikiService.getWikiItems(batchStartingOffset,
        this.props.devicesPerRow * this.props.rowsPerBatch);
      this.setState({devices: this.state.devices.concat(wikiItems)});
    } catch (error) {
      console.error('Failed to fetch wiki items for page=' + batchStartingOffset
        + ': ' + error);
    }
  }

  async _onInfiniteLoad() {
    await this.getDeviceBatch(this.state.devices.length);
  }

  render() {
    const deviceHeight = 72;
    let deviceElements = this.state.devices.map(device =>
      <DraggableDevice key={device.wikiid} device={device} />);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Grabbag Device Picker</h1>
        </header>
        <div className="container">
          <div id="devices-container" className="row all-devices">
            <DeviceContainer className="col-md-4 device-grid" />
            <div className="col-md-8 device-grid">
              <div className="row">
                <h1>All Devices</h1>
              </div>
              <ResponsiveGrid
                elements={deviceElements}
                elementsPerRow={this.props.devicesPerRow}
                elementHeight={deviceHeight}
                containerHeight={600}
                onInfiniteLoad={this._onInfiniteLoad}
                isInfiniteLoadHandlerAsync={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
