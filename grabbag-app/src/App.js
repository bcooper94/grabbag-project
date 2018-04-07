import React, { Component } from 'react';
import WikiService from './services/WikiService';
import DeviceContainer from './DeviceContainer';
import DraggableDevice from './DraggableDevice';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
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
    let wikiItems = this.state.devices.map(wikiItem =>
      <DraggableDevice className="row" key={wikiItem.wikiid} device={wikiItem}/>);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Grabbag Device Picker</h1>
        </header>
        <div className="container">
          {wikiItems}
        </div>
      </div>
    );
  }
}

export default App;
